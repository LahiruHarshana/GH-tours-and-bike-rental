"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { cn } from "@/lib/utils";

export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    event.currentTarget.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
  };

  const reset = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty("--magnetic-x");
    event.currentTarget.style.removeProperty("--magnetic-y");
  };

  return (
    <Link
      href={href}
      className={cn("magnetic-link", className)}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={(event) => {
        event.currentTarget.style.removeProperty("--magnetic-x");
        event.currentTarget.style.removeProperty("--magnetic-y");
      }}
    >
      {children}
    </Link>
  );
}
