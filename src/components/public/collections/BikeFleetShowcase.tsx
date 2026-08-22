"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";
import { BikeDetailPanel } from "@/components/public/collections/BikeDetailPanel";
import type { BikeDTO } from "@/types";
import { cn } from "@/lib/utils";

export function BikeFleetShowcase({ bikes }: { bikes: BikeDTO[] }) {
  const [selectedId, setSelectedId] = useState(bikes[0]?.id ?? "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(0, bikes.findIndex((bike) => bike.id === selectedId));
  const selectedBike = bikes[selectedIndex] ?? bikes[0];

  useEffect(() => {
    if (!bikes.some((bike) => bike.id === selectedId) && bikes[0]) {
      setSelectedId(bikes[0].id);
    }
  }, [bikes, selectedId]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const cards = Array.from(rail.querySelectorAll<HTMLElement>(".ss-bike-fleet__thumb"));
    const active = new Set<HTMLElement>();
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = rail.getBoundingClientRect();

      active.forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const center = bounds.left + bounds.width * 0.5;
        const railCenter = viewport.left + viewport.width * 0.5;
        const progress = Math.max(-1, Math.min(1, (center - railCenter) / (viewport.width * 0.45)));
        card.style.setProperty("--thumb-progress", progress.toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(card);
          else active.delete(card);
        });
        requestUpdate();
      },
      { root: rail, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    cards.forEach((card) => observer.observe(card));
    rail.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [bikes.length]);

  const selectBike = (bike: BikeDTO, button: HTMLButtonElement) => {
    setSelectedId(bike.id);
    button.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (!selectedBike) return null;

  return (
    <div className="ss-bike-fleet" data-scroll-motion>
      <div className="ss-bike-fleet__chrome" aria-hidden="true">
        <span>Tap a bike · see full details</span>
        <span>
          {String(selectedIndex + 1).padStart(2, "0")} / {String(bikes.length).padStart(2, "0")}
        </span>
      </div>

      <div className="ss-bike-fleet__stage">
        <BikeDetailPanel
          key={selectedBike.id}
          bike={selectedBike}
          index={selectedIndex}
          showFleetLink
          className="ss-bike-fleet__detail"
          onRequest={() => setBookingOpen(true)}
        />

        <div className="ss-bike-fleet__rail-wrap">
          <div className="ss-bike-fleet__rail" ref={railRef} role="tablist" aria-label="Choose a bike">
            {bikes.map((bike, index) => {
              const isActive = bike.id === selectedBike.id;
              return (
                <button
                  key={bike.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={cn("ss-bike-fleet__thumb", isActive && "is-active")}
                  onClick={(event) => selectBike(bike, event.currentTarget)}
                >
                  <span className="ss-bike-fleet__thumb-media">
                    <Image
                      src={bike.image}
                      alt=""
                      fill
                      sizes="180px"
                      unoptimized={bike.image.startsWith("http")}
                    />
                  </span>
                  <span className="ss-bike-fleet__thumb-copy">
                    <strong>{bike.name}</strong>
                    <small>{bike.engineCC} cc · {bike.transmission === "AUTOMATIC" ? "Auto" : "Manual"}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        type="BIKE"
        sourceId={selectedBike.id}
        sourceTitle={selectedBike.name}
      />
    </div>
  );
}
