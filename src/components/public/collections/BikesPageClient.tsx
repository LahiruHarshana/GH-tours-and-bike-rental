"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingModal } from "@/components/booking/BookingModal";
import { BikeDetailPanel } from "@/components/public/collections/BikeDetailPanel";
import { BikeCard } from "@/components/public/cards/BikeCard";
import type { BikeDTO } from "@/types";
import { cn } from "@/lib/utils";

export function BikesPageClient({ bikes }: { bikes: BikeDTO[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedSlug = searchParams.get("bike");
  const [selectedId, setSelectedId] = useState(bikes[0]?.id ?? "");
  const [bookingOpen, setBookingOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const activePickerRef = useRef<HTMLDivElement>(null);

  const selectedIndex = Math.max(0, bikes.findIndex((bike) => bike.id === selectedId));
  const selectedBike = bikes[selectedIndex] ?? bikes[0];

  useEffect(() => {
    if (!requestedSlug) return;
    const match = bikes.find((bike) => bike.slug === requestedSlug);
    if (match) setSelectedId(match.id);
  }, [bikes, requestedSlug]);

  useEffect(() => {
    if (!bikes.some((bike) => bike.id === selectedId) && bikes[0]) {
      setSelectedId(bikes[0].id);
    }
  }, [bikes, selectedId]);

  useEffect(() => {
    const active = activePickerRef.current;
    const container = pickerRef.current;
    if (!active || !container) return;

    const activeRect = active.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset =
      active.offsetLeft - container.offsetLeft - containerRect.width / 2 + activeRect.width / 2;

    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [selectedId]);

  const selectBike = (bike: BikeDTO) => {
    setSelectedId(bike.id);
    router.push(`/bikes?bike=${encodeURIComponent(bike.slug)}`, { scroll: false });
  };

  if (!selectedBike) return null;

  return (
    <div className="bikes-page-client" data-scroll-motion>
      <BikeDetailPanel
        key={selectedBike.id}
        bike={selectedBike}
        index={selectedIndex}
        totalBikes={bikes.length}
        className="bikes-page-client__detail"
        onRequest={() => setBookingOpen(true)}
      />

      <div className="bikes-page-client__picker-shell" data-scroll-motion>
        <div className="bikes-page-client__picker-head">
          <span className="eyebrow">
            <i />
            Fleet lineup
          </span>
          <p>Swipe through models — tap to switch the spotlight.</p>
        </div>

        <div className="bikes-page-client__picker-track" ref={pickerRef}>
          {bikes.map((bike, index) => (
            <div
              key={bike.id}
              ref={selectedBike.id === bike.id ? activePickerRef : undefined}
              role="button"
              tabIndex={0}
              className={cn(
                "bikes-page-client__picker",
                selectedBike.id === bike.id && "is-active",
              )}
              onClick={() => selectBike(bike)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectBike(bike);
                }
              }}
              aria-pressed={selectedBike.id === bike.id}
            >
              <span className="bikes-page-client__picker-no" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <BikeCard bike={bike} index={index} compact />
            </div>
          ))}
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
