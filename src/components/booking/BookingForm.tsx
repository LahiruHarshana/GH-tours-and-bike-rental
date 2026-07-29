"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { BookingType } from "@/types";

export type BookingInitialValues = Partial<{
  travelDate: string;
  returnDate: string;
  arrivalTime: string;
  guests: number;
  pickupLocation: string;
  dropoffLocation: string;
  flightNumber: string;
  vehicleType: "CAR" | "VAN" | "MINIBUS";
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
        <input name="phone" type="tel" required minLength={7} autoComplete="tel" inputMode="tel" placeholder="+94 77 000 0000" />
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
            <span>Pickup location *</span>
            <input name="pickupLocation" required defaultValue={initialValues.pickupLocation} placeholder="CMB Airport / hotel" />
          </label>
          <label>
            <span>Drop-off location *</span>
            <input name="dropoffLocation" required defaultValue={initialValues.dropoffLocation} placeholder="Galle, Ella, Kandy..." />
          </label>
          <label>
            <span>Flight number</span>
            <input name="flightNumber" defaultValue={initialValues.flightNumber} placeholder="UL 504" />
          </label>
          <label>
            <span>Passengers *</span>
            <input name="guests" type="number" min="1" max="30" defaultValue={initialValues.guests ?? 2} required />
          </label>
          <label className="form-span-2">
            <span>Preferred vehicle</span>
            <select name="vehicleType" defaultValue={initialValues.vehicleType ?? "CAR"}>
              <option value="CAR">Comfort car · 1–3 passengers</option>
              <option value="VAN">Private van · 1–7 passengers</option>
              <option value="MINIBUS">Minibus · 8–18 passengers</option>
            </select>
          </label>
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
        <h3>We are checking the details.</h3>
        <p>Your request is safely saved. Open WhatsApp to send the prepared details to our admin, then press Send in WhatsApp.</p>
        <strong>{success.bookingCode}</strong>
        {success.whatsappUrl && (
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
          <h3>{step === 1 ? (type === "BIKE" ? "When would you like to ride?" : type === "TOUR" ? "Tell us about your trip" : "Share your arrival details") : "Where should we reply?"}</h3>
          <p>{step === 1 ? "Only the essentials — you can fine-tune everything with our local team." : "We use these details only to answer this request."}</p>
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
        <p className="form-footnote">No payment or card details needed.</p>
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
      <p className="form-footnote">No online payment required. Our local team confirms availability and the final price by WhatsApp or email.</p>
    </form>
  );
}
