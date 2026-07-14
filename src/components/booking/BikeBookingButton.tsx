"use client";

import { useState } from "react";
import type { BikeDTO } from "@/types";
import { BookingModal } from "@/components/booking/BookingModal";

export function BikeBookingButton({ bike, disabled = false }: { bike: BikeDTO; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="button button--dark button--small" disabled={disabled} onClick={() => setOpen(true)}>
        {disabled ? "Unavailable" : "Rent now"}
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} type="BIKE" sourceId={bike.id} sourceTitle={bike.name} />
    </>
  );
}
