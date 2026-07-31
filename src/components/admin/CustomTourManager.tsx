"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomTourDTO } from "@/types";
import { formatDate, formatUSD } from "@/lib/utils";

type CustomTourUpdate = {
  status: string;
  quotedPrice?: FormDataEntryValue;
  adminNotes?: FormDataEntryValue | null;
};

export function CustomTourManager({ customTours }: { customTours: CustomTourDTO[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(customTours[0]?.id ?? null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const selected = customTours.find((tour) => tour.id === selectedId) ?? customTours[0] ?? null;

  useEffect(() => {
    const interval = window.setInterval(() => router.refresh(), 10000);
    return () => window.clearInterval(interval);
  }, [router]);

  async function save(payload: CustomTourUpdate) {
    if (!selected) return;
    setSaving(true);
    setMessage("");
    const response = await fetch(`/api/admin/custom-tours/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      window.alert(result?.message ?? "Could not update custom tour request.");
      return;
    }
    setMessage("Custom tour updated successfully.");
    router.refresh();
  }

  async function update(form: FormData) {
    await save({
      status: form.get("status") as string,
      quotedPrice: form.get("quotedPrice") || undefined,
      adminNotes: form.get("adminNotes"),
    });
  }

  function getWhatsAppUrl(tour: CustomTourDTO) {
    const number = (tour.whatsapp || tour.phone).replace(/[^0-9]/g, "");
    let text = `Hi ${tour.customerName}, regarding your custom tour request to ${tour.destinations.join(", ")}.\n`;
    if (tour.quotedPrice) {
      text += `We can offer you a package for ${formatUSD(tour.quotedPrice)}.\n`;
    }
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="booking-manager">
      <div className="booking-manager__list">
        <div className="booking-list">
          {customTours.length === 0 && <div className="admin-empty"><span>◌</span><h3>No requests found</h3><p>New custom tour requests will appear here automatically.</p></div>}
          {customTours.map((tour) => (
            <button key={tour.id} type="button" className={selected?.id === tour.id ? "is-active" : ""} aria-pressed={selected?.id === tour.id} onClick={() => { setSelectedId(tour.id); setMessage(""); }}>
              <div><span className={`type-dot type-dot--tour`} /> <strong>{tour.customerName}</strong></div>
              <div><span className={`admin-status admin-status--${tour.status.toLowerCase()}`}>{tour.status}</span><small>{formatDate(tour.startDate)}</small></div>
            </button>
          ))}
        </div>
      </div>

      <div className="booking-manager__detail">
        {!selected ? (
          <div className="admin-empty"><span>◫</span><h3>Select a request</h3><p>Choose a request from the list to view details.</p></div>
        ) : (
          <>
            <div className="booking-detail__head">
              <div><span>CUSTOM TOUR REQUEST</span><h2>{selected.customerName}</h2></div>
              <span className={`admin-status admin-status--${selected.status.toLowerCase()}`}>{selected.status}</span>
            </div>

            <div className="booking-contact">
              <div>
                <small>Customer</small><strong>{selected.customerName}</strong>
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
                <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                <a href={getWhatsAppUrl(selected)} target="_blank" rel="noreferrer">Open WhatsApp ↗</a>
              </div>
              <div>
                <small>Travel Dates</small><strong>{formatDate(selected.startDate)} to {formatDate(selected.endDate)}</strong>
                <span>{selected.guests.adults} Adults, {selected.guests.children} Children</span>
                <span>Country: {selected.country || "N/A"}</span>
              </div>
            </div>

            <div className="booking-route">
              <small>Destinations</small>
              <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                {selected.destinations.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              {selected.accommodationPreference && <p><span>Accommodation</span>{selected.accommodationPreference}</p>}
              {selected.vehiclePreference && <p><span>Vehicle</span>{selected.vehiclePreference}</p>}
              {selected.additionalNotes && <blockquote>{selected.additionalNotes}</blockquote>}
            </div>

            <form action={update} className="booking-update-form">
              <div>
                <label><span>Status</span><select name="status" defaultValue={selected.status} key={`${selected.id}-status`}><option value="PENDING">Pending</option><option value="REVIEWED">Reviewed</option><option value="QUOTED">Quoted</option><option value="ACCEPTED">Accepted</option><option value="REJECTED">Rejected</option></select></label>
                <label><span>Quoted Price (USD)</span><input name="quotedPrice" type="number" min="0" step="1" defaultValue={selected.quotedPrice ?? ""} key={`${selected.id}-price`} placeholder="0" /></label>
              </div>
              <label><span>Internal notes</span><textarea name="adminNotes" rows={4} defaultValue={selected.adminNotes ?? ""} key={`${selected.id}-notes`} placeholder="Pricing details, vehicle availability..." /></label>
              <button className="admin-primary-button" disabled={saving}>{saving ? "Saving..." : "Update Request"}</button>
              {message && <p className="admin-save-message" role="status">{message}</p>}
            </form>
            {selected.quotedPrice && <div className="booking-total"><span>Quoted Value</span><strong>{formatUSD(selected.quotedPrice)}</strong></div>}
          </>
        )}
      </div>
    </div>
  );
}
