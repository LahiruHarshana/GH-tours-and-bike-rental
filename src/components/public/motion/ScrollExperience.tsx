"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { SiteLoaderPanel } from "@/components/public/layout/SiteLoaderPanel";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.max(minimum, Math.min(maximum, value));

interface ElementState {
  target: number;
  current: number;
  depth: number;
  absoluteTop: number;
  height: number;
  rangeType: string;
  isLegacyReel: boolean;
  isLegacySection: boolean;
  isLegacyMotion: boolean;
  isCinemaParallax: boolean;
}

const REVEAL_SELECTOR = [
  "h2",
  "h3",
  ":scope > .container > h1",
  ":scope > .container > p",
  ":scope > .container > .eyebrow",
  "[class*='__intro'] > *",
  "[class*='__head'] > *",
  "[class*='__grid'] > article",
  "[class*='__grid'] > a",
  "[class$='-grid'] > article",
  "[class$='-grid'] > a",
  ".process-list > article",
  ".route-grid > article",
  ".itinerary > article",
  ".highlight-grid > div",
  ".seo-faq details",
  ".weligama-route-list > div",
].join(",");

export function ScrollExperience() {
  const pathname = usePathname();
  const router = useRouter();
  const isFirstPath = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("cinema-leaving");
    root.classList.add("cinema-entering");

    const enterTimer = window.setTimeout(
      () => root.classList.remove("cinema-entering"),
      isFirstPath.current ? 1250 : 950,
    );
    isFirstPath.current = false;

    return () => window.clearTimeout(enterTimer);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let navigationTimer = 0;

    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noTransition === "true"
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const destination = `${url.pathname}${url.search}${url.hash}`;
      if (destination === current || (url.pathname === window.location.pathname && url.hash)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      root.classList.add("cinema-leaving");
      window.clearTimeout(navigationTimer);
      navigationTimer = window.setTimeout(() => router.push(destination), 430);
    };

    document.addEventListener("click", handleInternalNavigation, true);
    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
      window.clearTimeout(navigationTimer);
    };
  }, [router, pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    root.classList.add("cinema-enabled");

    const activeElements = new Set<HTMLElement>();
    const elementStates = new Map<HTMLElement, ElementState>();
    let frame = 0;
    let pointerFrame = 0;
    let needsMeasure = true;
    let firstFrame = true;

    let rootCurrent = 0;
    let rootTarget = 0;
    let velocityTarget = 0;
    let velocityCurrent = 0;
    let lastScrollY = window.scrollY;

    const autoRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-cinema-visible");
          autoRevealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );

    const prepareCinematicElements = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main .modern-section, main .stayscape-home section"),
      );

      sections.forEach((section, sectionIndex) => {
        if (section.dataset.cinemaSection !== "true") {
          section.dataset.cinemaSection = "true";
          section.style.setProperty("--cinema-section-index", sectionIndex.toString());
        }

        const rawCandidates = Array.from(section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
        const selected: HTMLElement[] = [];

        rawCandidates.forEach((candidate) => {
          if (
            candidate.dataset.cinema ||
            candidate.closest(".reveal, .catalog-card-stage, form, dialog, nav") ||
            selected.some((parent) => parent.contains(candidate))
          ) {
            return;
          }

          selected.push(candidate);
          const order = selected.length - 1;
          const isHeading = candidate.matches("h1, h2, h3");
          const isCard = candidate.matches("article, details, a");

          candidate.dataset.cinema = isHeading ? "wipe" : isCard ? "rise" : "drift";
          candidate.style.setProperty("--cinema-delay", `${Math.min(order % 7, 6) * 70}ms`);

          if (reducedMotion.matches) candidate.classList.add("is-cinema-visible");
          else autoRevealObserver.observe(candidate);
        });

        let parallaxIndex = 0;
        section
          .querySelectorAll<HTMLElement>(
            "figure, [class*='__image'], [class*='__visual'], [class*='__portrait']",
          )
          .forEach((media) => {
            if (media.closest(".tour-card, .bike-card, .story-reel__frame, .ss-product-card")) return;
            if (!media.querySelector("img")) return;
            media.dataset.cinemaParallax = "true";
            const depth = 0.7 + (parallaxIndex % 3) * 0.45;
            media.style.setProperty("--cinema-depth", depth.toFixed(2));
            parallaxIndex += 1;
          });

      });
    };

    const requestUpdate = () => {
      needsMeasure = true;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScroll = window.scrollY;
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            activeElements.add(el);
            el.style.willChange = "transform, opacity";

            const rect = el.getBoundingClientRect();
            const state = elementStates.get(el) || ({ current: 0 } as ElementState);
            elementStates.set(el, {
              ...state,
              absoluteTop: rect.top + currentScroll,
              height: rect.height,
              rangeType: el.getAttribute("data-range") || "cross",
              depth: Number.parseFloat(el.getAttribute("data-depth") || "1"),
              isLegacyReel: el.hasAttribute("data-scroll-reel"),
              isLegacySection: el.classList.contains("modern-section"),
              isLegacyMotion: el.hasAttribute("data-scroll-motion"),
              isCinemaParallax: el.hasAttribute("data-cinema-parallax") || el.hasAttribute("data-cinema-lift"),
            });

            const chapter = el.getAttribute("data-chapter");
            if (chapter) root.style.setProperty("--active-chapter", `"${chapter}"`);
          } else {
            activeElements.delete(el);
            el.style.willChange = "auto";
          }
        });
        requestUpdate();
      },
      { rootMargin: "20% 0px" },
    );

    const observeElements = () => {
      prepareCinematicElements();
      document
        .querySelectorAll<HTMLElement>(
          "[data-scroll-3d], [data-scroll-motion], .modern-section, [data-scroll-reel], [data-cinema-parallax], [data-cinema-lift]",
        )
        .forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
      requestUpdate();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => {
      const currentScroll = window.scrollY;
      activeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const state = elementStates.get(el);
        if (state) {
          state.absoluteTop = rect.top + currentScroll;
          state.height = rect.height;
        }
      });
      requestUpdate();
    });
    resizeObserver.observe(document.body);

    const measure = () => {
      needsMeasure = false;
      const viewport = window.innerHeight;
      const scrollRange = Math.max(document.documentElement.scrollHeight - viewport, 1);
      const currentScroll = window.scrollY;

      rootTarget = clamp(currentScroll / scrollRange);
      root.dataset.scrolled = currentScroll > 110 ? "true" : "false";

      const diff = currentScroll - lastScrollY;
      velocityTarget = clamp(diff / 50, -1, 1);
      lastScrollY = currentScroll;

      activeElements.forEach((el) => {
        const state = elementStates.get(el);
        if (!state) return;
        const top = state.absoluteTop - currentScroll;
        const height = state.height;

        let target = 0;
        if (state.isLegacyReel || state.rangeType === "sticky") {
          const travel = Math.max(height - viewport, 1);
          target = clamp(-top / travel);
        } else if (state.isLegacySection) {
          target = clamp((viewport - top) / (viewport + height));
        } else if (state.rangeType === "enter") {
          target = clamp((viewport - top) / (viewport * 0.5));
        } else {
          target = clamp((viewport * 0.5 - (top + height * 0.5)) / viewport, -1, 1);
        }
        state.target = target;
      });

      if (firstFrame) {
        rootCurrent = rootTarget;
        velocityCurrent = velocityTarget;
        elementStates.forEach((state) => {
          state.current = state.target;
        });
        firstFrame = false;
      }
    };

    const writeReelFrames = (element: HTMLElement, current: number) => {
      const frames = Array.from(element.querySelectorAll<HTMLElement>("[data-reel-frame]"));
      const copies = Array.from(element.querySelectorAll<HTMLElement>("[data-reel-copy]"));
      const count = frames.length;
      if (count === 0) return;

      const phase = current * Math.max(count - 1, 1);
      const lower = Math.min(Math.floor(phase), count - 1);
      const upper = Math.min(lower + 1, count - 1);
      const wipe = phase - lower;

      frames.forEach((el, index) => {
        const isLower = index === lower;
        const isUpper = upper !== lower && index === upper;
        const isActive = isLower || isUpper;
        const local = clamp(phase - index, -1, 1);
        const reveal = isLower ? 1 : isUpper ? wipe : 0;

        el.style.setProperty("--f", local.toFixed(4));
        el.style.setProperty("--f-abs", Math.abs(local).toFixed(4));
        el.style.setProperty("--reel-reveal", reveal.toFixed(4));
        el.style.visibility = isActive ? "visible" : "hidden";
        el.style.willChange = isActive ? "transform, opacity, filter" : "auto";
      });

      const nearest = Math.round(phase);
      copies.forEach((el, index) => {
        const local = clamp(phase - index, -1, 1);
        el.style.setProperty("--f", local.toFixed(4));
        el.style.setProperty("--f-abs", Math.abs(local).toFixed(4));
        el.classList.toggle("is-active", index === nearest);
        el.style.opacity = Math.abs(local) >= 1 ? "0" : "";
        el.style.pointerEvents = Math.abs(local) >= 1 ? "none" : "auto";
      });
    };

    function render() {
      frame = 0;
      if (needsMeasure) measure();

      if (reducedMotion.matches || document.hidden) {
        root.style.setProperty("--scroll-velocity", "0");
        root.style.setProperty("--scroll-direction", "0");
        return;
      }

      const ease = 0.115;
      let moving = false;
      const approach = (current: number, target: number) => {
        const next = current + (target - current) * ease;
        if (Math.abs(target - next) > 0.0005) moving = true;
        return Math.abs(target - next) <= 0.0005 ? target : next;
      };

      rootCurrent = approach(rootCurrent, rootTarget);
      velocityCurrent = approach(velocityCurrent, velocityTarget);

      if (!needsMeasure) {
        velocityTarget = approach(velocityTarget, 0);
        if (Math.abs(velocityTarget) > 0.01) moving = true;
      }

      root.style.setProperty("--scroll-progress", rootTarget.toFixed(4));
      root.style.setProperty("--scroll-progress-smooth", rootCurrent.toFixed(4));
      root.style.setProperty("--scroll-velocity", velocityCurrent.toFixed(4));
      root.style.setProperty("--scroll-direction", Math.sign(velocityCurrent).toString());
      if (Math.abs(velocityCurrent) > 0.05) {
        root.dataset.scrollDir = velocityCurrent > 0 ? "down" : "up";
      }
      root.style.setProperty("--viewport-width", `${window.innerWidth}px`);
      root.style.setProperty("--viewport-height", `${window.innerHeight}px`);

      activeElements.forEach((el) => {
        const state = elementStates.get(el);
        if (!state) return;
        state.current = approach(state.current, state.target);

        el.style.setProperty("--p", state.current.toFixed(4));
        el.style.setProperty("--depth", state.depth.toString());
        if (state.isLegacyMotion) el.style.setProperty("--motion-progress", state.current.toFixed(4));
        if (state.isLegacySection) el.style.setProperty("--section-progress", state.current.toFixed(4));
        if (state.isCinemaParallax) el.style.setProperty("--cinema-p", state.current.toFixed(4));
        if (state.isLegacyReel) {
          el.style.setProperty("--reel-progress", state.current.toFixed(4));
          writeReelFrames(el, state.current);
        }
      });

      if (moving) frame = window.requestAnimationFrame(render);
    }

    const handleVisibility = () => {
      if (!document.hidden) requestUpdate();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        pointerFrame = 0;
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    reducedMotion.addEventListener("change", requestUpdate);
    document.addEventListener("visibilitychange", handleVisibility);

    const depthElements = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor-depth]"));
    const cleanups = depthElements.map((element) => {
      const move = (event: PointerEvent) => {
        if (!finePointer.matches || reducedMotion.matches) return;
        const bounds = element.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty("--cursor-x", `${(px * 5).toFixed(2)}px`);
        element.style.setProperty("--cursor-y", `${(py * 5).toFixed(2)}px`);
        element.style.setProperty("--tilt-x", (-py * 11).toFixed(2));
        element.style.setProperty("--tilt-y", (px * 11).toFixed(2));
        element.style.setProperty("--glare-x", `${((px + 0.5) * 100).toFixed(1)}%`);
        element.style.setProperty("--glare-y", `${((py + 0.5) * 100).toFixed(1)}%`);
      };
      const leave = () => {
        element.style.removeProperty("--cursor-x");
        element.style.removeProperty("--cursor-y");
        element.style.removeProperty("--tilt-x");
        element.style.removeProperty("--tilt-y");
        element.style.removeProperty("--glare-x");
        element.style.removeProperty("--glare-y");
      };
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    measure();
    render();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointermove", handlePointerMove);
      reducedMotion.removeEventListener("change", requestUpdate);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      observer.disconnect();
      autoRevealObserver.disconnect();
      mutationObserver.disconnect();
      resizeObserver.disconnect();

      root.classList.remove("cinema-enabled");
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-progress-smooth");
      root.style.removeProperty("--scroll-velocity");
      root.style.removeProperty("--scroll-direction");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      delete root.dataset.scrolled;

      cleanups.forEach((cleanup) => cleanup());
      activeElements.forEach((el) => {
        el.style.willChange = "auto";
        el.style.removeProperty("--p");
        el.style.removeProperty("--depth");
        el.style.removeProperty("--motion-progress");
        el.style.removeProperty("--section-progress");
        el.style.removeProperty("--reel-progress");
        el.style.removeProperty("--cinema-p");
      });
    };
  }, [pathname]);

  return (
    <>
      <div className="cinema-atmosphere" aria-hidden="true">
        <i className="cinema-atmosphere__glow" />
        <i className="cinema-atmosphere__orb cinema-atmosphere__orb--one" />
        <i className="cinema-atmosphere__orb cinema-atmosphere__orb--two" />
        <span className="cinema-atmosphere__grain" />
      </div>
      <div className="cinema-curtain" aria-hidden="true">
        <SiteLoaderPanel message="Moving to the next page" />
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <span />
        <i />
        <b>Journey</b>
      </div>
    </>
  );
}
