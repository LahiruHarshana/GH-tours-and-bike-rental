"use client";

import { useEffect } from "react";

type MotionState = {
  current: number;
  element: HTMLElement;
  property: string;
  target: number;
};

const clamp = (value: number, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));

export function ScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const motionStates: MotionState[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-motion]"), (element) => ({
      current: 0,
      element,
      property: "--motion-progress",
      target: 0,
    }));
    const sectionStates: MotionState[] = Array.from(document.querySelectorAll<HTMLElement>(".modern-section"), (element) => ({
      current: 0,
      element,
      property: "--section-progress",
      target: 0,
    }));
    const reelStates: MotionState[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reel]"), (element) => ({
      current: 0,
      element,
      property: "--reel-progress",
      target: 0,
    }));
    const depthElements = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor-depth]"));

    let frame = 0;
    let needsMeasure = true;
    let firstFrame = true;
    let rootCurrent = 0;
    let rootTarget = 0;

    const measure = () => {
      needsMeasure = false;
      const viewport = window.innerHeight;
      const scrollRange = Math.max(document.documentElement.scrollHeight - viewport, 1);
      rootTarget = clamp(window.scrollY / scrollRange);

      motionStates.forEach((state) => {
        const bounds = state.element.getBoundingClientRect();
        state.target = clamp((viewport * 0.5 - (bounds.top + bounds.height * 0.5)) / viewport, -1, 1);
      });

      sectionStates.forEach((state) => {
        const bounds = state.element.getBoundingClientRect();
        state.target = clamp((viewport - bounds.top) / (viewport + bounds.height));
      });

      reelStates.forEach((state) => {
        const bounds = state.element.getBoundingClientRect();
        const travel = Math.max(bounds.height - viewport, 1);
        state.target = clamp(-bounds.top / travel);
      });

      if (firstFrame) {
        rootCurrent = rootTarget;
        [...motionStates, ...sectionStates, ...reelStates].forEach((state) => { state.current = state.target; });
        firstFrame = false;
      }
    };

    const writeReelFrames = (state: MotionState) => {
      const frames = Array.from(state.element.querySelectorAll<HTMLElement>("[data-reel-frame]"));
      const copies = Array.from(state.element.querySelectorAll<HTMLElement>("[data-reel-copy]"));
      const phase = state.current * Math.max(frames.length - 1, 1);

      frames.forEach((element, index) => {
        const offset = index - phase;
        const active = clamp(1 - Math.abs(offset));
        element.style.setProperty("--phase-active", active.toFixed(4));
        element.style.setProperty("--phase-offset", offset.toFixed(4));
      });
      copies.forEach((element, index) => {
        const offset = index - phase;
        const active = clamp(1 - Math.abs(offset));
        element.style.setProperty("--phase-active", active.toFixed(4));
        element.style.setProperty("--phase-offset", offset.toFixed(4));
      });
    };

    const render = () => {
      frame = 0;
      if (needsMeasure) measure();

      if (reducedMotion.matches) return;

      const ease = 0.115;
      let moving = false;
      const approach = (current: number, target: number) => {
        const next = current + (target - current) * ease;
        if (Math.abs(target - next) > 0.0005) moving = true;
        return Math.abs(target - next) <= 0.0005 ? target : next;
      };

      rootCurrent = approach(rootCurrent, rootTarget);
      root.style.setProperty("--scroll-progress", rootCurrent.toFixed(4));

      [...motionStates, ...sectionStates, ...reelStates].forEach((state) => {
        state.current = approach(state.current, state.target);
        state.element.style.setProperty(state.property, state.current.toFixed(4));
      });
      reelStates.forEach(writeReelFrames);

      if (moving) frame = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      needsMeasure = true;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    measure();
    render();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    reducedMotion.addEventListener("change", requestUpdate);

    const cleanups = depthElements.map((element) => {
      const move = (event: PointerEvent) => {
        if (!finePointer.matches || reducedMotion.matches) return;
        const bounds = element.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 5;
        element.style.setProperty("--cursor-x", `${x.toFixed(2)}px`);
        element.style.setProperty("--cursor-y", `${y.toFixed(2)}px`);
      };
      const leave = () => {
        element.style.removeProperty("--cursor-x");
        element.style.removeProperty("--cursor-y");
      };
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.removeProperty("--scroll-progress");
      cleanups.forEach((cleanup) => cleanup());
      [...motionStates, ...sectionStates, ...reelStates].forEach((state) => state.element.style.removeProperty(state.property));
      reelStates.forEach((state) => {
        state.element.querySelectorAll<HTMLElement>("[data-reel-frame], [data-reel-copy]").forEach((element) => {
          element.style.removeProperty("--phase-active");
          element.style.removeProperty("--phase-offset");
        });
      });
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span /><i /><b>Scroll</b>
    </div>
  );
}
