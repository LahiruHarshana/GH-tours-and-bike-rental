"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { BookingDTO, BookingStatus, PaymentStatus } from "@/types";
import { formatDate, formatLKR, formatUSD } from "@/lib/utils";
import { buildCustomerReplyMessage, buildWhatsAppUrl } from "@/lib/whatsapp-links";
import { formatAirportTaxiChoice, resolveAirportTaxiType } from "@/lib/airport-vehicles";
import { AirportTaxiIcon } from "@/components/booking/AirportTaxiIcon";

type BookingUpdate = {
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmountUSD?: FormDataEntryValue;
  adminNotes?: FormDataEntryValue | null;
};

function WhatsAppReplyComposer({ booking }: { booking: BookingDTO }) {
  const [message, setMessage] = useState(() => buildCustomerReplyMessage(booking));
  return (
    <div className="booking-whatsapp-composer">
      <div>
        <small>WhatsApp reply to customer</small>
        <strong>{booking.type === "AIRPORT" ? "Includes vehicle details — edit, then press Send in WhatsApp" : "Prepared automatically — edit before opening WhatsApp"}</strong>
      </div>
      <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={booking.type === "AIRPORT" ? 16 : 9} aria-label="Prepared WhatsApp reply" />
      <a className="admin-whatsapp-button" href={buildWhatsAppUrl(booking.whatsapp || booking.phone, message)} target="_blank" rel="noreferrer">
        Open in WhatsApp — press Send there ↗
      </a>
    </div>
  );
}

export function BookingManager({ bookings }: { bookings: BookingDTO[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(bookings[0]?.id ?? null);
  const [filter, setFilter] = useState<"ALL" | BookingDTO["type"]>("ALL");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const filtered = useMemo(
    () => filter === "ALL" ? bookings : bookings.filter((booking) => booking.type === filter),
    [bookings, filter],
  );
  const selected = filtered.find((booking) => booking.id === selectedId) ?? filtered[0] ?? null;
  const selectedTaxi = selected?.type === "AIRPORT"
    ? resolveAirportTaxiType(selected.vehicleType, selected.vehicleId)
    : undefined;

  useEffect(() => {
    const interval = window.setInterval(() => router.refresh(), 10000);
    return () => window.clearInterval(interval);
  }, [router]);

  function changeFilter(nextFilter: typeof filter) {
    setFilter(nextFilter);
    setMessage("");
    const nextBookings = nextFilter === "ALL" ? bookings : bookings.filter((booking) => booking.type === nextFilter);
    setSelectedId(nextBookings[0]?.id ?? null);
  }

  async function save(payload: BookingUpdate) {
    if (!selected) return;
    setSaving(true);
    setMessage("");
    const response = await fetch(`/api/admin/bookings/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      window.alert(result?.message ?? "Could not update booking.");
      return;
    }
    setMessage("Booking updated successfully.");
    router.refresh();
  }

  async function update(form: FormData) {
    await save({
      status: form.get("status") as BookingStatus,
      paymentStatus: form.get("paymentStatus") as PaymentStatus,
      totalAmountUSD: form.get("totalAmountUSD") || undefined,
      adminNotes: form.get("adminNotes"),
    });
  }

  async function quickDecision(status: "CONFIRMED" | "DECLINED") {
    if (!selected) return;
    await save({
      status,
      paymentStatus: selected.paymentStatus,
      totalAmountUSD: selected.totalAmountUSD ? String(selected.totalAmountUSD) : undefined,
      adminNotes: selected.adminNotes,
    });
  }

  return (
    <div className="booking-manager">
      <div className="booking-manager__list">
        <div className="booking-filters" aria-label="Filter bookings">
          {(["ALL", "AIRPORT", "TOUR", "BIKE"] as const).map((item) => (
            <button key={item} type="button" className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => changeFilter(item)}>
              {item === "ALL" ? "All" : item.toLowerCase()}
            </button>
          ))}
        </div>
        <div className="booking-list">
          {filtered.length === 0 && <div className="admin-empty"><span>◌</span><h3>No bookings found</h3><p>New public booking requests will appear here automatically.</p></div>}
          {filtered.map((booking) => (
            <button key={booking.id} type="button" className={selected?.id === booking.id ? "is-active" : ""} aria-pressed={selected?.id === booking.id} onClick={() => { setSelectedId(booking.id); setMessage(""); }}>
              <div><span className={`type-dot type-dot--${booking.type.toLowerCase()}`} /> <strong>{booking.customerName}</strong><small>{booking.bookingCode}</small></div>
              <div><span className={`admin-status admin-status--${booking.status.toLowerCase()}`}>{booking.status.replace("_", " ")}</span><small>{formatDate(booking.travelDate)}</small></div>
            </button>
          ))}
        </div>
      </div>

      <div className="booking-manager__detail">
        {!selected ? (
          <div className="admin-empty"><span>◫</span><h3>Select a booking</h3><p>Choose a request from the list to view details.</p></div>
        ) : (
          <>
            <div className="booking-detail__head">
              <div><span>{selected.type} BOOKING</span><h2>{selected.bookingCode}</h2></div>
              <span className={`admin-status admin-status--${selected.status.toLowerCase()}`}>{selected.status.replace("_", " ")}</span>
            </div>

            <div className="booking-contact">
              <div>
                <small>Customer</small><strong>{selected.customerName}</strong>
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
                <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                <a href={buildWhatsAppUrl(selected.whatsapp || selected.phone, buildCustomerReplyMessage(selected))} target="_blank" rel="noreferrer">Open prepared WhatsApp reply ↗</a>
              </div>
              <div>
                <small>Travel date</small><strong>{formatDate(selected.travelDate)}</strong>
                {selected.returnDate && <span>Return: {formatDate(selected.returnDate)}</span>}
                <span>{selected.guests ?? 1} guest(s)</span>
              </div>
            </div>

            {selected.status === "PENDING" && (
              <div className="booking-decisions">
                <button type="button" className="admin-primary-button" disabled={saving} onClick={() => quickDecision("CONFIRMED")}>Approve request</button>
                <button type="button" className="admin-decline-button" disabled={saving} onClick={() => quickDecision("DECLINED")}>Decline</button>
              </div>
            )}

            <WhatsAppReplyComposer
              key={`${selected.id}-${selected.status}-${selected.totalAmountUSD ?? ""}-${selected.adminNotes ?? ""}`}
              booking={selected}
            />

            <div className="booking-route">
              <small>Service</small><strong>{selected.sourceTitle ?? selected.type}</strong>
              {selected.pickupLocation && <p><span>From</span>{selected.pickupLocation}</p>}
              {selected.dropoffLocation && <p><span>To</span>{selected.dropoffLocation}</p>}
              {selected.flightNumber && <p><span>Flight</span>{selected.flightNumber}</p>}
              {selected.arrivalTime && <p><span>Time</span>{selected.arrivalTime}</p>}
              {selected.vehicleType && <p><span>Vehicle</span>{selected.vehicleType}</p>}
              {selected.estimatedAmountUSD !== undefined && (
                <p>
                  <span>Quoted fare</span>
                  {selected.type === "AIRPORT" ? formatLKR(selected.estimatedAmountUSD) : formatUSD(selected.estimatedAmountUSD)}
                </p>
              )}
              {selectedTaxi && (
                <div className="booking-vehicle-preview">
                  <span className="booking-vehicle-preview__icon" aria-hidden="true">
                    <AirportTaxiIcon id={selectedTaxi.id} />
                  </span>
                  <div>
                    <strong>{formatAirportTaxiChoice(selectedTaxi)}</strong>
                    <small>{selectedTaxi.capacity} · {selectedTaxi.luggagePieces} bags</small>
                    <p>Send the prepared WhatsApp message with the vehicle details and quoted fare.</p>
                  </div>
                </div>
              )}
              {selected.notes && <blockquote>{selected.notes}</blockquote>}
            </div>

            <form action={update} className="booking-update-form">
              <div>
                <label><span>Booking status</span><select name="status" defaultValue={selected.status} key={`${selected.id}-status`}><option value="PENDING">Pending</option><option value="CONFIRMED">Approved / confirmed</option><option value="DECLINED">Declined</option><option value="IN_PROGRESS">In progress</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option></select></label>
                <label><span>Payment status</span><select name="paymentStatus" defaultValue={selected.paymentStatus} key={`${selected.id}-payment`}><option value="UNPAID">Unpaid</option><option value="PARTIAL">Partial</option><option value="PAID">Paid</option><option value="REFUNDED">Refunded</option></select></label>
              </div>
              <label><span>Confirmed total (USD)</span><input name="totalAmountUSD" type="number" min="0" step="1" defaultValue={selected.totalAmountUSD ?? ""} key={`${selected.id}-amount`} placeholder={selected.estimatedAmountUSD ? String(selected.estimatedAmountUSD) : "0"} /></label>
              <label><span>Internal notes</span><textarea name="adminNotes" rows={4} defaultValue={selected.adminNotes ?? ""} key={`${selected.id}-notes`} placeholder="Driver assignment, payment details, special handling..." /></label>
              <button className="admin-primary-button" disabled={saving}>{saving ? "Saving..." : "Update booking"}</button>
              {message && <p className="admin-save-message" role="status">{message}</p>}
            </form>
            {selected.totalAmountUSD && <div className="booking-total"><span>Confirmed value</span><strong>{formatUSD(selected.totalAmountUSD)}</strong></div>}
          </>
        )}
      </div>
    </div>
  );
}
