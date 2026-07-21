"use client";

import { useEffect } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));

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
}

export function ScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    
    const activeElements = new Set<HTMLElement>();
    const elementStates = new Map<HTMLElement, ElementState>();
    let frame = 0;
    let needsMeasure = true;
    let firstFrame = true;
    
    let rootCurrent = 0;
    let rootTarget = 0;
    let velocityTarget = 0;
    let velocityCurrent = 0;
    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver((entries) => {
      const currentScroll = window.scrollY;
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          activeElements.add(el);
          el.style.willChange = "transform, opacity";
          
          const rect = el.getBoundingClientRect();
          const state = elementStates.get(el) || { current: 0 } as ElementState;
          elementStates.set(el, {
            ...state,
            absoluteTop: rect.top + currentScroll,
            height: rect.height,
            rangeType: el.getAttribute("data-range") || "cross",
            depth: parseFloat(el.getAttribute("data-depth") || "1"),
            isLegacyReel: el.hasAttribute("data-scroll-reel"),
            isLegacySection: el.classList.contains("modern-section"),
            isLegacyMotion: el.hasAttribute("data-scroll-motion")
          });
          
          const chapter = el.getAttribute("data-chapter");
          if (chapter) {
            document.documentElement.style.setProperty("--active-chapter", `"${chapter}"`);
          }
        } else {
          activeElements.delete(el);
          el.style.willChange = "auto";
        }
      });
      requestUpdate();
    }, { rootMargin: "20% 0px" });
    
    const observeElements = () => {
      document.querySelectorAll<HTMLElement>("[data-scroll-3d], [data-scroll-motion], .modern-section, [data-scroll-reel]").forEach(el => observer.observe(el));
    };
    
    observeElements();
    
    const mutObserver = new MutationObserver(() => {
      observeElements();
      requestUpdate();
    });
    mutObserver.observe(document.body, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => {
      const currentScroll = window.scrollY;
      activeElements.forEach(el => {
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
      
      const diff = currentScroll - lastScrollY;
      velocityTarget = clamp(diff / 50, -1, 1);
      lastScrollY = currentScroll;
      
      activeElements.forEach(el => {
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
        elementStates.forEach(state => state.current = state.target);
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
        
        // Calculate --f (local frame progress)
        let f = phase - index;
        // Clamp to [-1, 1] for performance when out of view
        if (f < -1) f = -1;
        if (f > 1) f = 1;
        const fAbs = Math.abs(f);

        // Retain --reel-reveal for clip-path
        const reveal = isLower ? 1 : isUpper ? wipe : 0;
        
        el.style.setProperty("--f", f.toFixed(4));
        el.style.setProperty("--f-abs", fAbs.toFixed(4));
        el.style.setProperty("--reel-reveal", reveal.toFixed(4));
        
        // Only active frames should be visible and have will-change applied
        if (isActive) {
          el.style.visibility = "visible";
          el.style.willChange = "transform, opacity, filter";
        } else {
          el.style.visibility = "hidden";
          el.style.willChange = "auto";
        }
      });

      const nearest = Math.round(phase);
      copies.forEach((el, index) => {
        // Calculate --f for copy
        let f = phase - index;
        if (f < -1) f = -1;
        if (f > 1) f = 1;
        const fAbs = Math.abs(f);
        
        el.style.setProperty("--f", f.toFixed(4));
        el.style.setProperty("--f-abs", fAbs.toFixed(4));
        
        // Active visual state
        el.classList.toggle("is-active", index === nearest);
        
        // Hide visually if completely out of view to avoid overlap, but keep in DOM for screen readers
        if (Math.abs(f) >= 1) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
        } else {
          el.style.opacity = "";
          el.style.pointerEvents = "auto";
        }
      });
    };

    const render = () => {
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
        if (state.isLegacyReel) {
            el.style.setProperty("--reel-progress", state.current.toFixed(4));
            writeReelFrames(el, state.current);
        }
      });

      if (moving) frame = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      needsMeasure = true;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reducedMotion.addEventListener("change", requestUpdate);
    document.addEventListener("visibilitychange", () => {
       if (!document.hidden) requestUpdate();
    });

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
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      mutObserver.disconnect();
      resizeObserver.disconnect();
      
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-progress-smooth");
      root.style.removeProperty("--scroll-velocity");
      root.style.removeProperty("--scroll-direction");
      
      cleanups.forEach((cleanup) => cleanup());
      activeElements.forEach(el => {
        el.style.willChange = "auto";
        el.style.removeProperty("--p");
        el.style.removeProperty("--depth");
        el.style.removeProperty("--motion-progress");
        el.style.removeProperty("--section-progress");
        el.style.removeProperty("--reel-progress");
      });
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span /><i /><b>Scroll</b>
    </div>
  );
}
