"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 4.9, decimals: 1, suffix: "/5", label: "Guest rating" },
  { value: 20, decimals: 0, suffix: " min", label: "Typical reply" },
  { value: 100, decimals: 0, suffix: "%", label: "Private journeys" },
];

export function CountUpStats() {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const started = performance.now();
      const animate = (now: number) => {
        const elapsed = Math.min((now - started) / 1300, 1);
        setProgress(1 - Math.pow(1 - elapsed, 4));
        if (elapsed < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: .35 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="guest-stories__stats" ref={root}>
      {stats.map((stat) => (
        <span key={stat.label}>
          <strong>{(stat.value * progress).toFixed(stat.decimals)}{stat.suffix}</strong>
          {stat.label}
        </span>
      ))}
    </div>
  );
}
