"use client";

import { useState, type ReactNode } from "react";
import { BookingModal } from "@/components/booking/BookingModal";

export function AirportBookingButton({
  className = "button button--gold",
  children = "Book airport pickup",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={className} type="button" onClick={() => setOpen(true)}>
        {children}
      </button>
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        type="AIRPORT"
        sourceTitle="Private Airport Transfer"
      />
    </>
  );
}
