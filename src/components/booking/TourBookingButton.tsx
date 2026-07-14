"use client";

import { useState } from "react";
import type { TourDTO } from "@/types";
import { BookingModal } from "@/components/booking/BookingModal";

export function TourBookingButton({ tour, label = "Book this journey" }: { tour: TourDTO; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="button button--gold" onClick={() => setOpen(true)}>{label}</button>
      <BookingModal open={open} onClose={() => setOpen(false)} type="TOUR" sourceId={tour.id} sourceTitle={tour.title} />
    </>
  );
}
