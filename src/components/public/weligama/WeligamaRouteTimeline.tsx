"use client";

import { useEffect, useRef } from "react";

const routes = [
  {
    name: "Mirissa",
    detail: "Beaches, harbour and coastal viewpoints",
    distance: "12 km",
    time: "20 min",
  },
  {
    name: "Midigama & Ahangama",
    detail: "Surf breaks, cafés and small coves",
    distance: "8 km",
    time: "15 min",
  },
  {
    name: "Galle Fort",
    detail: "Heritage streets and an evening by the ramparts",
    distance: "35 km",
    time: "50 min",
  },
  {
    name: "Yala region",
    detail: "A private wildlife day trip or onward journey",
    distance: "120 km",
    time: "2.5 hr",
  },
  {
    name: "Ella",
    detail: "Hill-country landscapes beyond the coast",
    distance: "160 km",
    time: "4 hr",
  },
] as const;

export function WeligamaRouteTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      line.style.setProperty("--route-progress", "1");
      return;
    }

    const update = () => {
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.85;
      const end = viewport * 0.15;
      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / (rect.height + start - end)),
      );
      line.style.setProperty("--route-progress", progress.toFixed(4));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="weligama-route-timeline" ref={trackRef}>
      <span className="weligama-route-timeline__line" ref={lineRef} aria-hidden="true" />
      <ol className="weligama-route-timeline__list">
        {routes.map((route, index) => (
          <li
            key={route.name}
            className="weligama-route-timeline__item"
            data-cinema="rise"
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <span className="weligama-route-timeline__marker" aria-hidden="true" />
            <div className="weligama-route-timeline__body">
              <div className="weligama-route-timeline__meta">
                <strong>{route.name}</strong>
                <span>
                  {route.distance} · {route.time}
                </span>
              </div>
              <p>{route.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
