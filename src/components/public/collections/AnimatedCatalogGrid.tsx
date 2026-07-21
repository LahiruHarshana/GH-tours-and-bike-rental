"use client";

import { Children, type CSSProperties, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedCatalogGrid({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "tours" | "bikes";
}) {
  const items = Children.toArray(children);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const stages = Array.from(grid.querySelectorAll<HTMLElement>("[data-catalog-card]"));
    const activeStages = new Set<HTMLElement>();
    let frame = 0;

    grid.classList.add("is-motion-ready");

    const updateMotion = () => {
      frame = 0;
      const viewport = window.innerHeight;

      activeStages.forEach((stage) => {
        const motionLayer = stage.querySelector<HTMLElement>("[data-catalog-motion]");
        if (!motionLayer) return;
        const bounds = stage.getBoundingClientRect();
        const center = bounds.top + bounds.height * 0.5;
        const progress = Math.max(-1, Math.min(1, (viewport * 0.5 - center) / viewport));
        motionLayer.style.setProperty("--catalog-progress", progress.toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );

    const motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stage = entry.target as HTMLElement;
          if (entry.isIntersecting) activeStages.add(stage);
          else activeStages.delete(stage);
        });
        requestUpdate();
      },
      { rootMargin: "45% 0px" },
    );

    stages.forEach((stage) => {
      revealObserver.observe(stage);
      motionObserver.observe(stage);
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      revealObserver.disconnect();
      motionObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      stages.forEach((stage) => {
        stage.classList.remove("is-visible");
        stage.querySelector<HTMLElement>("[data-catalog-motion]")?.style.removeProperty("--catalog-progress");
      });
      grid.classList.remove("is-motion-ready");
    };
  }, [items.length]);

  return (
    <div ref={gridRef} className={cn("catalog-grid", `catalog-grid--${variant}`)}>
      {items.map((item, index) => (
        <div
          className="catalog-card-stage"
          data-catalog-card
          key={index}
          style={{ "--catalog-delay": `${(index % 4) * 85}ms` } as CSSProperties}
        >
          <div className="catalog-card-stage__motion" data-catalog-motion>
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
