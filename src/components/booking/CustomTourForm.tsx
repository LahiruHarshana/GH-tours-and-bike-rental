"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

function localToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export function CustomTourForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [destinations, setDestinations] = useState<string[]>([""]);
  const [success, setSuccess] = useState<{ whatsappUrl: string } | null>(null);
  const [message, setMessage] = useState<{ type: "error"; text: string } | null>(null);
  const today = localToday();

  const addDestination = () => setDestinations([...destinations, ""]);
  const updateDestination = (index: number, value: string) => {
    const newDest = [...destinations];
    newDest[index] = value;
    setDestinations(newDest);
  };
  const removeDestination = (index: number) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

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
    // ensure at least one destination is valid
    if (destinations.filter(d => d.trim()).length === 0) {
      setMessage({ type: "error", text: "Please enter at least one destination." });
      return;
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
    
    // Parse complex fields
    const parsedPayload = {
      ...payload,
      destinations: destinations.filter(d => d.trim()),
      guests: {
        adults: parseInt(payload.guestsAdults as string) || 1,
        children: parseInt(payload.guestsChildren as string) || 0,
      }
    };

    try {
      const response = await fetch("/api/custom-tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedPayload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not submit custom tour request.");
      
      formElement.reset();
      setStartDate("");
      setDestinations([""]);
      setSuccess({ whatsappUrl: String(result.data.whatsappUrl ?? "") });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not submit custom tour request." });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (message || success) {
      window.requestAnimationFrame(() => feedbackRef.current?.focus());
    }
  }, [message, success]);

  if (success) {
    return (
      <div ref={feedbackRef} className="booking-success" role="status" tabIndex={-1}>
        <span className="booking-success__icon" aria-hidden="true">✓</span>
        <p>Request received</p>
        <h3>We are checking the details.</h3>
        <p>Your custom tour request is safely saved. Open WhatsApp to send the prepared details to our admin, then press Send in WhatsApp.</p>
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

  return (
    <form ref={formRef} className="booking-form booking-form--compact custom-tour-form" onSubmit={submit}>
      <div className="booking-progress" aria-label={`Step ${step} of 2`}>
        <span className={step >= 1 ? "is-active" : ""}><i>1</i><b>Tour Details</b></span>
        <span className={step >= 2 ? "is-active" : ""}><i>2</i><b>Contact Details</b></span>
      </div>

      <div className="booking-form__heading">
        <span>Step {step} of 2</span>
        <h3>{step === 1 ? "Design Your Perfect Tour" : "Where should we reply?"}</h3>
        <p>{step === 1 ? "Tell us where you want to go and what you need. We'll handle the rest." : "We use these details only to answer this request."}</p>
      </div>

      <fieldset data-booking-step="details" className={step === 1 ? "booking-form__step is-active" : "booking-form__step"}>
        <div className="form-grid form-grid--2">
          <label className="form-span-2">
            <span>Destinations you want to visit *</span>
            <div className="destinations-list">
              {destinations.map((dest, i) => (
                <div key={i} className="destination-input-group" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    required
                    value={dest}
                    onChange={(e) => updateDestination(i, e.target.value)}
                    placeholder={`e.g. ${i === 0 ? "Kandy" : i === 1 ? "Ella" : "Yala"}`}
                    style={{ flex: 1 }}
                  />
                  {destinations.length > 1 && (
                    <button type="button" className="button button--dark" style={{ padding: '0 15px' }} onClick={() => removeDestination(i)}>✕</button>
                  )}
                </div>
              ))}
              {destinations.length < 20 && (
                <button type="button" className="button button--outline" onClick={addDestination} style={{ marginTop: '5px' }}>+ Add another location</button>
              )}
            </div>
          </label>
          <label>
            <span>Start date *</span>
            <input name="startDate" type="date" min={today} required onChange={(event) => setStartDate(event.target.value)} />
          </label>
          <label>
            <span>End date *</span>
            <input name="endDate" type="date" min={startDate || today} required />
          </label>
          <label>
            <span>Adults *</span>
            <input name="guestsAdults" type="number" min="1" max="30" defaultValue="2" required />
          </label>
          <label>
            <span>Children</span>
            <input name="guestsChildren" type="number" min="0" max="30" defaultValue="0" />
          </label>
          <label>
            <span>Accommodation Preference</span>
            <select name="accommodationPreference">
              <option value="">No preference</option>
              <option value="Budget">Budget</option>
              <option value="3-Star">3-Star</option>
              <option value="4-Star">4-Star</option>
              <option value="5-Star / Luxury">5-Star / Luxury</option>
            </select>
          </label>
          <label>
            <span>Vehicle Preference</span>
            <select name="vehiclePreference">
              <option value="">No preference</option>
              <option value="Car">Comfort Car (1-3 Pax)</option>
              <option value="Van">Private Van (4-7 Pax)</option>
              <option value="Minibus">Minibus (8+ Pax)</option>
            </select>
          </label>
          <label className="form-span-2">
            <span>Additional requirements</span>
            <textarea name="additionalNotes" rows={3} placeholder="Dietary requirements, specific places to see, preferred pace..." />
          </label>
        </div>
      </fieldset>

      <fieldset data-booking-step="contact" className={step === 2 ? "booking-form__step is-active" : "booking-form__step"}>
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
              {submitting ? "Sending request..." : "Request Custom Tour"}
            </button>
          </>
        )}
      </div>
      <p className="form-footnote">No online payment required. Our local team will contact you with a detailed itinerary and price.</p>
    </form>
  );
}
