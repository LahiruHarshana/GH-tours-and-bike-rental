"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BookingDTO, BookingStatus, PaymentStatus } from "@/types";
import { formatDate, formatUSD } from "@/lib/utils";

export function BookingManager({ bookings }: { bookings: BookingDTO[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<BookingDTO | null>(bookings[0] ?? null);
  const [filter, setFilter] = useState<"ALL" | BookingDTO["type"]>("ALL");
  const [saving, setSaving] = useState(false);
  const filtered = filter === "ALL" ? bookings : bookings.filter((booking) => booking.type === filter);

  async function update(form: FormData) {
    if (!selected) return;
    setSaving(true);
    const payload = {
      status: form.get("status") as BookingStatus,
      paymentStatus: form.get("paymentStatus") as PaymentStatus,
      totalAmountUSD: form.get("totalAmountUSD") || undefined,
      adminNotes: form.get("adminNotes"),
    };
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
    router.refresh();
  }

  return (
    <div className="booking-manager">
      <div className="booking-manager__list">
        <div className="booking-filters">{(["ALL", "AIRPORT", "TOUR", "BIKE"] as const).map((item) => <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item === "ALL" ? "All" : item.toLowerCase()}</button>)}</div>
        <div className="booking-list">
          {filtered.length === 0 && <div className="admin-empty"><span>◌</span><h3>No bookings found</h3><p>New public booking requests will appear here.</p></div>}
          {filtered.map((booking) => (
            <button key={booking.id} className={selected?.id === booking.id ? "is-active" : ""} onClick={() => setSelected(booking)}>
              <div><span className={`type-dot type-dot--${booking.type.toLowerCase()}`} /> <strong>{booking.customerName}</strong><small>{booking.bookingCode}</small></div>
              <div><span className={`admin-status admin-status--${booking.status.toLowerCase()}`}>{booking.status.replace("_", " ")}</span><small>{formatDate(booking.travelDate)}</small></div>
            </button>
          ))}
        </div>
      </div>
      <div className="booking-manager__detail">
        {!selected ? <div className="admin-empty"><span>◫</span><h3>Select a booking</h3><p>Choose a request from the list to view details.</p></div> : (
          <>
            <div className="booking-detail__head"><div><span>{selected.type} BOOKING</span><h2>{selected.bookingCode}</h2></div><span className={`admin-status admin-status--${selected.status.toLowerCase()}`}>{selected.status.replace("_", " ")}</span></div>
            <div className="booking-contact"><div><small>Customer</small><strong>{selected.customerName}</strong><a href={`mailto:${selected.email}`}>{selected.email}</a><a href={`tel:${selected.phone}`}>{selected.phone}</a></div><div><small>Travel date</small><strong>{formatDate(selected.travelDate)}</strong>{selected.returnDate && <span>Return: {formatDate(selected.returnDate)}</span>}<span>{selected.guests ?? 1} guest(s)</span></div></div>
            <div className="booking-route"><small>Service</small><strong>{selected.sourceTitle ?? selected.type}</strong>{selected.pickupLocation && <p><span>From</span>{selected.pickupLocation}</p>}{selected.dropoffLocation && <p><span>To</span>{selected.dropoffLocation}</p>}{selected.flightNumber && <p><span>Flight</span>{selected.flightNumber}</p>}{selected.vehicleType && <p><span>Vehicle</span>{selected.vehicleType}</p>}{selected.notes && <blockquote>{selected.notes}</blockquote>}</div>
            <form action={update} className="booking-update-form">
              <div><label><span>Booking status</span><select name="status" defaultValue={selected.status} key={`${selected.id}-status`}><option value="PENDING">Pending</option><option value="CONFIRMED">Confirmed</option><option value="IN_PROGRESS">In progress</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option></select></label><label><span>Payment status</span><select name="paymentStatus" defaultValue={selected.paymentStatus} key={`${selected.id}-payment`}><option value="UNPAID">Unpaid</option><option value="PARTIAL">Partial</option><option value="PAID">Paid</option><option value="REFUNDED">Refunded</option></select></label></div>
              <label><span>Confirmed total (USD)</span><input name="totalAmountUSD" type="number" min="0" step="1" defaultValue={selected.totalAmountUSD ?? ""} key={`${selected.id}-amount`} placeholder="0" /></label>
              <label><span>Internal notes</span><textarea name="adminNotes" rows={4} key={`${selected.id}-notes`} placeholder="Driver assignment, payment details, special handling..." /></label>
              <button className="admin-primary-button" disabled={saving}>{saving ? "Saving..." : "Update booking"}</button>
            </form>
            {selected.totalAmountUSD && <div className="booking-total"><span>Confirmed value</span><strong>{formatUSD(selected.totalAmountUSD)}</strong></div>}
          </>
        )}
      </div>
    </div>
  );
}
