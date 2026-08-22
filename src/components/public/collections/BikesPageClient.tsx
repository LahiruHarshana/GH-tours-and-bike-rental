"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookingModal } from "@/components/booking/BookingModal";
import { BikeDetailPanel } from "@/components/public/collections/BikeDetailPanel";
import { BikeCard } from "@/components/public/cards/BikeCard";
import type { BikeDTO } from "@/types";
import { cn } from "@/lib/utils";

export function BikesPageClient({ bikes }: { bikes: BikeDTO[] }) {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("bike");
  const [selectedId, setSelectedId] = useState(bikes[0]?.id ?? "");
  const [bookingOpen, setBookingOpen] = useState(false);

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

  if (!selectedBike) return null;

  return (
    <div className="bikes-page-client" data-scroll-motion>
      <BikeDetailPanel
        key={selectedBike.id}
        bike={selectedBike}
        index={selectedIndex}
        className="bikes-page-client__detail"
        onRequest={() => setBookingOpen(true)}
      />

      <div className="bikes-page-client__grid">
        {bikes.map((bike, index) => (
          <div
            key={bike.id}
            role="button"
            tabIndex={0}
            className={cn("bikes-page-client__picker", selectedBike.id === bike.id && "is-active")}
            onClick={() => setSelectedId(bike.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedId(bike.id);
              }
            }}
            aria-pressed={selectedBike.id === bike.id}
          >
            <BikeCard bike={bike} index={index} compact />
          </div>
        ))}
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
