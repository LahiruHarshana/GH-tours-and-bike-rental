"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { BikeDTO } from "@/types";
import { slugify, splitLines } from "@/lib/utils";

export function BikeForm({ bike }: { bike?: BikeDTO }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(bike?.name ?? "");
  const [slug, setSlug] = useState(bike?.slug ?? "");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name,
      slug,
      brand: form.get("brand"),
      model: form.get("model"),
      engineCC: form.get("engineCC"),
      category: form.get("category"),
      dailyRateUSD: form.get("dailyRateUSD"),
      depositUSD: form.get("depositUSD"),
      transmission: form.get("transmission"),
      fuelType: form.get("fuelType"),
      seats: form.get("seats"),
      image: form.get("image"),
      features: splitLines(String(form.get("features") ?? "")),
      available: form.get("available") === "on",
      quantity: form.get("quantity"),
      status: form.get("status"),
    };
    try {
      const response = await fetch(bike ? `/api/admin/bikes/${bike.id}` : "/api/admin/bikes", {
        method: bike ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not save bike.");
      router.push("/admin/bikes");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not save bike.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <section className="admin-form-card">
        <div className="admin-form-card__head"><div><h2>Bike information</h2><p>Fleet details, pricing and public availability.</p></div></div>
        <div className="admin-form-grid admin-form-grid--2">
          <label><span>Display name *</span><input value={name} onChange={(event) => { setName(event.target.value); if (!bike) setSlug(slugify(event.target.value)); }} required /></label>
          <label><span>URL slug *</span><input value={slug} onChange={(event) => setSlug(slugify(event.target.value))} required /></label>
          <label><span>Brand *</span><input name="brand" defaultValue={bike?.brand} required /></label>
          <label><span>Model *</span><input name="model" defaultValue={bike?.model} required /></label>
          <label><span>Engine CC *</span><input name="engineCC" type="number" min="0" defaultValue={bike?.engineCC ?? 110} required /></label>
          <label><span>Category *</span><select name="category" defaultValue={bike?.category ?? "SCOOTER"}><option value="SCOOTER">Scooter</option><option value="MOTORBIKE">Motorbike</option><option value="ADVENTURE">Adventure</option></select></label>
          <label><span>Daily rate (USD) *</span><input name="dailyRateUSD" type="number" min="0" step="1" defaultValue={bike?.dailyRateUSD ?? 12} required /></label>
          <label><span>Refundable deposit (USD) *</span><input name="depositUSD" type="number" min="0" step="1" defaultValue={bike?.depositUSD ?? 100} required /></label>
          <label><span>Transmission *</span><select name="transmission" defaultValue={bike?.transmission ?? "AUTOMATIC"}><option value="AUTOMATIC">Automatic</option><option value="MANUAL">Manual</option></select></label>
          <label><span>Fuel type *</span><select name="fuelType" defaultValue={bike?.fuelType ?? "PETROL"}><option value="PETROL">Petrol</option><option value="ELECTRIC">Electric</option></select></label>
          <label><span>Seats *</span><input name="seats" type="number" min="1" max="3" defaultValue={bike?.seats ?? 2} required /></label>
          <label><span>Fleet quantity *</span><input name="quantity" type="number" min="0" defaultValue={bike?.quantity ?? 1} required /></label>
          <label><span>Status *</span><select name="status" defaultValue={bike?.status ?? "DRAFT"}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></label>
          <label className="admin-form-span-2"><span>Image path or URL *</span><input name="image" defaultValue={bike?.image ?? "/images/bike-scooter.svg"} required /></label>
          <label className="admin-form-span-2"><span>Features (one per line)</span><textarea name="features" rows={7} defaultValue={bike?.features.join("\n")} placeholder="Helmet included\nPhone holder\nRoadside support" /></label>
          <label className="admin-checkbox"><input name="available" type="checkbox" defaultChecked={bike?.available ?? true} /><span>Available for new rental requests</span></label>
        </div>
      </section>
      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <div className="admin-form-actions"><button type="button" className="admin-secondary-button" onClick={() => router.back()}>Cancel</button><button className="admin-primary-button" disabled={loading}>{loading ? "Saving..." : bike ? "Update bike" : "Add bike"}</button></div>
    </form>
  );
}
