"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { BookingType } from "@/types";
import { AirportVehiclePicker } from "@/components/booking/AirportVehiclePicker";
import { AIRPORT_DESTINATIONS, CMB_AIRPORT, matchAirportDestination } from "@/lib/airport-vehicles";

export type BookingInitialValues = Partial<{
  travelDate: string;
  returnDate: string;
  arrivalTime: string;
  guests: number;
  pickupLocation: string;
  dropoffLocation: string;
  flightNumber: string;
  vehicleType: "CAR" | "VAN" | string;
  vehicleId: string;
}>;

function localToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export function BookingForm({
  type,
  sourceId,
  sourceTitle,
  compact = false,
  initialValues = {},
  onSuccess,
}: {
  type: BookingType;
  sourceId?: string;
  sourceTitle?: string;
  compact?: boolean;
  initialValues?: BookingInitialValues;
  onSuccess?: (bookingCode: string) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [pickupDate, setPickupDate] = useState(initialValues.travelDate ?? "");
  const [guests, setGuests] = useState(initialValues.guests ?? 2);
  const departing = Boolean(
    matchAirportDestination(initialValues.pickupLocation) &&
    /cmb|airport/i.test(initialValues.dropoffLocation ?? ""),
  );
  const [town, setTown] = useState(
    () => matchAirportDestination(initialValues.dropoffLocation)?.name
      ?? matchAirportDestination(initialValues.pickupLocation)?.name
      ?? "",
  );
  const [stayAddress, setStayAddress] = useState("");
  const [success, setSuccess] = useState<{ bookingCode: string; whatsappUrl: string } | null>(null);
  const [message, setMessage] = useState<{ type: "error"; text: string } | null>(null);
  const today = localToday();

  function continueToContact() {
    const fields = formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      '[data-booking-step="details"] input, [data-booking-step="details"] select, [data-booking-step="details"] textarea'
    );
    if (!fields) return;
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
    }
    setMessage(null);
    setStep(2);
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="customerName"]')?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitting(true);
    setMessage(null);
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    const stay = String(payload.stayAddress ?? "").trim();
    const selectedTown = String(payload.destinationTown ?? "").trim();
    delete payload.stayAddress;
    delete payload.destinationTown;
    if (type === "AIRPORT" && selectedTown) {
      if (departing) {
        payload.pickupLocation = stay ? `${selectedTown} — ${stay}` : selectedTown;
        payload.dropoffLocation = CMB_AIRPORT;
      } else {
        payload.pickupLocation = String(payload.pickupLocation || CMB_AIRPORT);
        payload.dropoffLocation = stay ? `${selectedTown} — ${stay}` : selectedTown;
      }
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type, sourceId, sourceTitle }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not submit booking.");
      const bookingCode = result.data.bookingCode as string;
      formElement.reset();
      setPickupDate("");
      setGuests(initialValues.guests ?? 2);
      setTown(
        matchAirportDestination(initialValues.dropoffLocation)?.name
          ?? matchAirportDestination(initialValues.pickupLocation)?.name
          ?? "",
      );
      setStayAddress("");
      setSuccess({ bookingCode, whatsappUrl: String(result.data.whatsappUrl ?? "") });
      onSuccess?.(bookingCode);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not submit booking." });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (message || success) {
      window.requestAnimationFrame(() => feedbackRef.current?.focus());
    }
  }, [message, success]);

  const contactFields = (
    <div className="form-grid form-grid--2">
      <label>
        <span>Full name *</span>
        <input name="customerName" required minLength={2} autoComplete="name" placeholder="Your full name" />
      </label>
      <label>
        <span>Email *</span>
        <input name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" />
      </label>
      <label>
        <span>Phone / WhatsApp *</span>
        <input name="phone" type="tel" required minLength={7} autoComplete="tel" inputMode="tel" placeholder="+94 77 131 3178" />
      </label>
      <label>
        <span>Country</span>
        <input name="country" autoComplete="country-name" placeholder="United Kingdom" />
      </label>
    </div>
  );

  const detailFields = (
    <>
      {type === "TOUR" && (
        <div className="form-grid form-grid--2">
          <label>
            <span>Preferred start date *</span>
            <input name="travelDate" type="date" min={today} defaultValue={initialValues.travelDate} required onChange={(event) => setPickupDate(event.target.value)} />
          </label>
          <label>
            <span>Travellers *</span>
            <input name="guests" type="number" min="1" max="30" defaultValue={initialValues.guests ?? 2} required />
          </label>
          <label className="form-span-2">
            <span>Pickup location</span>
            <input name="pickupLocation" autoComplete="street-address" defaultValue={initialValues.pickupLocation} placeholder="Airport, hotel or town" />
          </label>
        </div>
      )}

      {type === "AIRPORT" && (
        <div className="form-grid form-grid--2">
          <label>
            <span>Pickup date *</span>
            <input name="travelDate" type="date" min={today} defaultValue={initialValues.travelDate} required onChange={(event) => setPickupDate(event.target.value)} />
          </label>
          <label>
            <span>Pickup time</span>
            <input name="arrivalTime" type="time" defaultValue={initialValues.arrivalTime} />
          </label>
          <label>
            <span>{departing ? "Pickup town *" : "Going to *"}</span>
            <select name="destinationTown" required value={town} onChange={(event) => setTown(event.target.value)}>
              <option value="">Choose a town</option>
              {AIRPORT_DESTINATIONS.map((place) => (
                <option key={place.id} value={place.name}>
                  {place.name} · {place.duration}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{departing ? "Drop-off *" : "Pickup location *"}</span>
            <input
              name="pickupLocation"
              required={!departing}
              readOnly={departing}
              defaultValue={departing ? CMB_AIRPORT : (initialValues.pickupLocation ?? CMB_AIRPORT)}
              placeholder="CMB Airport / hotel"
            />
          </label>
          <label>
            <span>Flight number</span>
            <input name="flightNumber" defaultValue={initialValues.flightNumber} placeholder="UL 504" />
          </label>
          <label>
            <span>Passengers *</span>
            <input name="guests" type="number" min="1" max="7" value={guests} onChange={(event) => setGuests(Number(event.target.value) || 1)} required />
          </label>
          <label className="form-span-2">
            <span>Hotel or exact address</span>
            <input name="stayAddress" value={stayAddress} onChange={(event) => setStayAddress(event.target.value)} placeholder="Villa, hotel or surf camp (optional)" />
          </label>
          <div className="form-span-2">
            <AirportVehiclePicker
              guests={guests}
              destination={town}
              initialVehicleType={initialValues.vehicleType}
              initialVehicleId={initialValues.vehicleId}
              compact={compact}
            />
          </div>
        </div>
      )}

      {type === "BIKE" && (
        <div className="form-grid form-grid--2">
          <label>
            <span>Pickup date *</span>
            <input name="travelDate" type="date" min={today} defaultValue={initialValues.travelDate} required onChange={(event) => setPickupDate(event.target.value)} />
          </label>
          <label>
            <span>Return date *</span>
            <input name="returnDate" type="date" min={pickupDate || today} defaultValue={initialValues.returnDate} required />
          </label>
          <label>
            <span>Pickup town</span>
            <input name="pickupLocation" defaultValue={initialValues.pickupLocation} placeholder="Weligama / Galle" />
          </label>
          <label>
            <span>Licence / permit</span>
            <input name="licenseNumber" placeholder="Number (can add later)" />
          </label>
        </div>
      )}
    </>
  );

  const notesField = (
    <label className={compact ? "form-span-2" : undefined}>
      <span>Anything else we should know?</span>
      <textarea name="notes" rows={compact ? 3 : 5} placeholder="Luggage, children, route ideas or special requests (optional)" />
    </label>
  );

  if (success) {
    return (
      <div ref={feedbackRef} className="booking-success" role="status" tabIndex={-1}>
        <span className="booking-success__icon" aria-hidden="true">✓</span>
        <p>Request received</p>
        <h3>{type === "AIRPORT" ? "Your taxi details are on the way." : "We are checking the details."}</h3>
        <p>
          {type === "AIRPORT"
            ? "Your request is saved. Our team will WhatsApp you the vehicle details and quoted fare — you do not need to send a message."
            : "Your request is safely saved. Open WhatsApp to send the prepared details to our admin, then press Send in WhatsApp."}
        </p>
        <strong>{success.bookingCode}</strong>
        {type !== "AIRPORT" && success.whatsappUrl && (
          <a className="button button--gold" href={success.whatsappUrl} target="_blank" rel="noreferrer">
            Open prepared WhatsApp message ↗
          </a>
        )}
        <button className="button button--dark" type="button" onClick={() => { setSuccess(null); setStep(1); }}>
          Make another request
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <form ref={formRef} className="booking-form booking-form--compact" onSubmit={submit}>
        <div className="booking-progress" aria-label={`Step ${step} of 2`}>
          <span className={step >= 1 ? "is-active" : ""}><i>1</i><b>Trip details</b></span>
          <span className={step >= 2 ? "is-active" : ""}><i>2</i><b>Your details</b></span>
        </div>

        <div className="booking-form__heading">
          <span>Step {step} of 2</span>
          <h3>{step === 1 ? (type === "BIKE" ? "When would you like to ride?" : type === "TOUR" ? "Tell us about your trip" : "Share your ride details") : "Where should we reply?"}</h3>
          <p>{step === 1 ? (type === "AIRPORT" ? "Choose your town, then a budget car, premium car or van — the fare updates in rupees." : "Only the essentials — you can fine-tune everything with our local team.") : "We use these details only to answer this request."}</p>
        </div>

        <fieldset data-booking-step="details" className={step === 1 ? "booking-form__step is-active" : "booking-form__step"}>
          {detailFields}
        </fieldset>
        <fieldset data-booking-step="contact" className={step === 2 ? "booking-form__step is-active" : "booking-form__step"}>
          {contactFields}
          {notesField}
        </fieldset>

        {message && <div ref={feedbackRef} className="form-message form-message--error" role="alert" tabIndex={-1}>{message.text}</div>}
        <div className="booking-form__actions">
          {step === 1 ? (
            <button className="button button--gold button--wide" type="button" onClick={continueToContact}>
              Continue to contact details <span>→</span>
            </button>
          ) : (
            <>
              <button className="booking-form__back" type="button" onClick={() => setStep(1)}>← Back</button>
              <button className="button button--gold" disabled={submitting} aria-busy={submitting}>
                {submitting ? "Sending request..." : type === "AIRPORT" ? "Request transfer" : type === "BIKE" ? "Request this bike" : "Request this tour"}
              </button>
            </>
          )}
        </div>
        <p className="form-footnote">{type === "AIRPORT" ? "No payment now. We WhatsApp the vehicle details after you request." : "No payment or card details needed."}</p>
      </form>
    );
  }

  return (
    <form ref={formRef} className="booking-form" onSubmit={submit}>
      {detailFields}
      {contactFields}
      {notesField}
      {message && <div ref={feedbackRef} className="form-message form-message--error" role="alert" tabIndex={-1}>{message.text}</div>}
      <button className="button button--gold button--wide" disabled={submitting} aria-busy={submitting}>
        {submitting ? "Sending request..." : type === "AIRPORT" ? "Request airport transfer" : type === "BIKE" ? "Request this bike" : "Request this tour"}
      </button>
      <p className="form-footnote">
        {type === "AIRPORT"
          ? "No payment now. After you request, we WhatsApp the vehicle details and confirm the fare."
          : "No online payment required. Our local team confirms availability and the final price by WhatsApp or email."}
      </p>
    </form>
  );
}
