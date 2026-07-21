"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export interface CinematicFigureProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function CinematicFigure({ src, alt, priority = false, className = "", sizes = "100vw" }: CinematicFigureProps) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  if (src !== activeSrc) {
    setFallbackSrc(activeSrc);
    setActiveSrc(src);
  }

  return (
    <figure 
      className={`cinematic-figure ${className}`} 
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", margin: 0 }}
    >
      {fallbackSrc && (
        <Image 
          src={fallbackSrc} 
          alt="" 
          fill 
          sizes={sizes}
          style={{ objectFit: "cover", zIndex: 1 }}
          unoptimized={fallbackSrc.startsWith("http")}
        />
      )}
      <Image 
        src={activeSrc} 
        alt={alt} 
        fill 
        sizes={sizes}
        style={{ 
          objectFit: "cover", 
          zIndex: 2, 
          opacity: fallbackSrc ? 0 : 1,
          transition: "opacity 300ms ease" 
        }}
        priority={priority}
        onLoad={(e) => {
           if (isUnmounted.current) return;
           const target = e.target as HTMLImageElement;
           void target.offsetWidth;
           target.style.opacity = "1";
           
           setTimeout(() => {
             if (!isUnmounted.current) {
                setFallbackSrc(null);
             }
           }, 350);
        }}
        unoptimized={activeSrc.startsWith("http")}
      />
    </figure>
  );
}
