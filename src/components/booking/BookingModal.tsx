"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { BookingForm, type BookingInitialValues } from "@/components/booking/BookingForm";
import type { BookingType } from "@/types";

const modalCopy: Record<BookingType, { label: string; description: string; benefits: string[] }> = {
  BIKE: {
    label: "Bike rental request",
    description: "Choose your dates first, then tell us how to reach you. We will confirm the bike, pickup details and exact price personally.",
    benefits: ["Availability checked by our local team", "Helmet and handover included", "No payment required now"],
  },
  TOUR: {
    label: "Private tour request",
    description: "Share the essentials now. A local planner will confirm availability and shape the final itinerary around your group.",
    benefits: ["Free itinerary consultation", "Flexible dates and pickup", "No payment required now"],
  },
  AIRPORT: {
    label: "Airport transfer request",
    description: "Send your arrival details and our local team will confirm the vehicle, meeting point and fixed quotation.",
    benefits: ["Flight-aware pickup", "Private vehicle", "No payment required now"],
  },
};

export function BookingModal({
  open,
  onClose,
  type,
  sourceId,
  sourceTitle,
  initialValues,
}: {
  open: boolean;
  onClose: () => void;
  type: BookingType;
  sourceId?: string;
  sourceTitle?: string;
  initialValues?: BookingInitialValues;
}) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const copy = modalCopy[type];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]'
        )
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={modalRef}
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close booking form">×</button>

        <aside className="booking-modal__summary">
          <span className="booking-modal__type">{copy.label}</span>
          <p className="booking-modal__selected">Your selection</p>
          <h2 id={titleId}>{sourceTitle ?? "Start your Sri Lanka journey"}</h2>
          <p className="booking-modal__description">{copy.description}</p>
          <ul>
            {copy.benefits.map((benefit) => <li key={benefit}><span>✓</span>{benefit}</li>)}
          </ul>
          <div className="booking-modal__help">
            <small>What happens next?</small>
            <p>We reply by WhatsApp or email with availability and a clear quotation.</p>
          </div>
        </aside>

        <div className="booking-modal__form-panel">
          <BookingForm type={type} sourceId={sourceId} sourceTitle={sourceTitle} initialValues={initialValues} compact />
        </div>
      </div>
    </div>,
    document.body,
  );
}
