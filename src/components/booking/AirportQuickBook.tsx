"use client";

import { FormEvent, useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";
import type { BookingInitialValues } from "@/components/booking/BookingForm";

const AIRPORT = "Bandaranaike International Airport (CMB)";

function localToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export function AirportQuickBook() {
  const [direction, setDirection] = useState<"ARRIVAL" | "DEPARTURE">("ARRIVAL");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState<BookingInitialValues>({});

  function continueBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const selectedDestination = String(form.get("destination") ?? destination);
    const selectedDate = String(form.get("travelDate") ?? travelDate);
    setRequest({
      travelDate: selectedDate,
      guests: 2,
      pickupLocation: direction === "ARRIVAL" ? AIRPORT : selectedDestination,
      dropoffLocation: direction === "ARRIVAL" ? selectedDestination : AIRPORT,
      vehicleType: "CAR",
    });
    setOpen(true);
  }

  return (
    <>
      <form className="airport-quick-book" onSubmit={continueBooking}>
        <div className="airport-quick-book__head">
          <div>
            <span>Fast airport booking <small><i />Replies in 15–30 min</small></span>
            <h2>Your airport ride, ready in minutes.</h2>
          </div>
          <div className="airport-quick-book__toggle" role="group" aria-label="Transfer direction">
            <button type="button" className={direction === "ARRIVAL" ? "is-active" : ""} aria-pressed={direction === "ARRIVAL"} onClick={() => setDirection("ARRIVAL")}>Airport pickup</button>
            <button type="button" className={direction === "DEPARTURE" ? "is-active" : ""} aria-pressed={direction === "DEPARTURE"} onClick={() => setDirection("DEPARTURE")}>Airport drop-off</button>
          </div>
        </div>

        <div className="airport-quick-book__fields">
          <div className="airport-quick-book__airport">
            <span>{direction === "ARRIVAL" ? "From" : "To"}</span>
            <strong><i aria-hidden="true">✈</i> CMB Airport</strong>
          </div>
          <label>
            <span>{direction === "ARRIVAL" ? "Where are you going?" : "Where should we collect you?"}</span>
            <input
              name="destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              required
              autoComplete="street-address"
              placeholder={direction === "ARRIVAL" ? "Hotel, villa or town" : "Hotel or pickup address"}
            />
          </label>
          <label>
            <span>{direction === "ARRIVAL" ? "Arrival date" : "Pickup date"}</span>
            <input name="travelDate" type="date" min={localToday()} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} required />
          </label>
          <button className="airport-quick-book__submit" type="submit">
            <span>Continue booking</span><b aria-hidden="true">→</b>
          </button>
        </div>
        <p><span>✓ Flight delay monitoring</span><span>✓ Fixed quote before travel</span><span>✓ No payment now</span></p>
      </form>

      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        type="AIRPORT"
        sourceTitle="Private Airport Transfer"
        initialValues={request}
      />
    </>
  );
}
