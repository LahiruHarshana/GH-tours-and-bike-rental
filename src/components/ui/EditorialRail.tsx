"use client";

import { Children, type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function EditorialRail({
  children,
  label,
  variant,
}: {
  children: React.ReactNode;
  label: string;
  variant: "journeys" | "bikes";
}) {
  const items = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);

  const syncActiveItem = useCallback(() => {
    frameRef.current = 0;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-rail-item]"));
    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maximumScroll > 0 && viewport.scrollLeft >= maximumScroll - 2) {
      setActive(Math.max(cards.length - 1, 0));
      return;
    }
    const viewportLeft = viewport.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - viewportLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActive(closestIndex);
  }, []);

  const requestSync = () => {
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(syncActiveItem);
  };

  useEffect(() => {
    syncActiveItem();
    window.addEventListener("resize", syncActiveItem, { passive: true });
    return () => {
      window.removeEventListener("resize", syncActiveItem);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [syncActiveItem]);

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-rail-item]"));
    const targetIndex = Math.max(0, Math.min(cards.length - 1, active + direction));
    viewport.scrollTo({
      left: cards[targetIndex]?.offsetLeft ?? 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  if (!items.length) return null;

  return (
    <div className={cn("editorial-rail", `editorial-rail--${variant}`)}>
      <div className="editorial-rail__toolbar">
        <p><span>{variant === "bikes" ? "Explore the fleet" : "Drag, swipe or use arrow keys"}</span><i aria-hidden="true" /></p>
        <div className="editorial-rail__position" aria-live="polite" aria-atomic="true">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span>/</span>
          <small>{String(items.length).padStart(2, "0")}</small>
        </div>
        <div className="editorial-rail__controls">
          <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label={`Previous ${label}`}>←</button>
          <button type="button" onClick={() => move(1)} disabled={active >= items.length - 1} aria-label={`Next ${label}`}>→</button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="editorial-rail__viewport"
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={requestSync}
        onKeyDown={handleKeyboard}
      >
        <div className="editorial-rail__track">
          {items.map((item, index) => (
            <div className="editorial-rail__item" data-rail-item key={index}>
              {item}
            </div>
          ))}
          <span className="editorial-rail__end" aria-hidden="true">End of edit</span>
        </div>
      </div>

      <div className="editorial-rail__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(active + 1) / items.length})` }} />
      </div>
    </div>
  );
}
