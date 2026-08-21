"use client";

import { FormEvent, useState } from "react";
import { BookingModal } from "@/components/booking/BookingModal";
import type { BookingInitialValues } from "@/components/booking/BookingForm";
import { AIRPORT_DESTINATIONS, CMB_AIRPORT, suggestAirportTaxiType } from "@/lib/airport-vehicles";

function localToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export function AirportQuickBook() {
  const [direction, setDirection] = useState<"ARRIVAL" | "DEPARTURE">("ARRIVAL");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState<BookingInitialValues>({});

  function continueBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const selectedDestination = String(form.get("destination") ?? destination);
    const selectedDate = String(form.get("travelDate") ?? travelDate);
    const selectedGuests = Math.min(7, Number(form.get("guests") ?? guests) || 2);
    const taxi = suggestAirportTaxiType(selectedGuests);
    setRequest({
      travelDate: selectedDate,
      guests: selectedGuests,
      pickupLocation: direction === "ARRIVAL" ? CMB_AIRPORT : selectedDestination,
      dropoffLocation: direction === "ARRIVAL" ? selectedDestination : CMB_AIRPORT,
      vehicleId: taxi.id,
      vehicleType: `${taxi.emoji} ${taxi.label}`,
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
            <select
              name="destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              required
            >
              <option value="">Choose a town</option>
              {AIRPORT_DESTINATIONS.map((place) => (
                <option key={place.id} value={place.name}>
                  {place.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{direction === "ARRIVAL" ? "Arrival date" : "Pickup date"}</span>
            <input name="travelDate" type="date" min={localToday()} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} required />
          </label>
          <label>
            <span>Travellers</span>
            <input name="guests" type="number" min="1" max="7" value={guests} onChange={(event) => setGuests(Number(event.target.value) || 1)} required />
          </label>
          <button className="airport-quick-book__submit" type="submit">
            <span>Continue booking</span><b aria-hidden="true">→</b>
          </button>
        </div>
        <p><span>✓ Listed fares in rupees</span><span>✓ Budget or premium car</span><span>✓ Van for groups</span></p>
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
