"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { TourDTO } from "@/types";
import { slugify, splitLines } from "@/lib/utils";
import { CloudinaryImageField } from "@/components/admin/CloudinaryImageField";

export function TourForm({ tour }: { tour?: TourDTO }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(tour?.title ?? "");
  const [slug, setSlug] = useState(tour?.slug ?? "");
  const [itinerary, setItinerary] = useState(
    tour?.itinerary.length
      ? tour.itinerary
      : [{ day: 1, title: "Arrival and welcome", description: "Describe the plan for this day." }],
  );

  function updateItinerary(index: number, key: "title" | "description", value: string) {
    setItinerary((days) => days.map((day, i) => (i === index ? { ...day, [key]: value } : day)));
  }

  function addDay() {
    setItinerary((days) => [...days, { day: days.length + 1, title: "", description: "" }]);
  }

  function removeDay(index: number) {
    setItinerary((days) => days.filter((_, i) => i !== index).map((day, i) => ({ ...day, day: i + 1 })));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      title,
      slug,
      location: form.get("location"),
      durationDays: form.get("durationDays"),
      priceFrom: form.get("priceFrom"),
      image: form.get("image"),
      shortDescription: form.get("shortDescription"),
      description: form.get("description"),
      highlights: splitLines(String(form.get("highlights") ?? "")),
      inclusions: splitLines(String(form.get("inclusions") ?? "")),
      exclusions: splitLines(String(form.get("exclusions") ?? "")),
      itinerary,
      featured: form.get("featured") === "on",
      status: form.get("status"),
    };

    try {
      const response = await fetch(tour ? `/api/admin/tours/${tour.id}` : "/api/admin/tours", {
        method: tour ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not save tour.");
      router.push("/admin/tours");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not save tour.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <section className="admin-form-card">
        <div className="admin-form-card__head"><div><h2>Package information</h2><p>Core details shown on the public tour page.</p></div></div>
        <div className="admin-form-grid admin-form-grid--2">
          <label><span>Tour title *</span><input value={title} onChange={(event) => { setTitle(event.target.value); if (!tour) setSlug(slugify(event.target.value)); }} required /></label>
          <label><span>URL slug *</span><input value={slug} onChange={(event) => setSlug(slugify(event.target.value))} required /></label>
          <label><span>Route / location *</span><input name="location" defaultValue={tour?.location} placeholder="Sigiriya · Kandy · Ella" required /></label>
          <label><span>Duration in days *</span><input name="durationDays" type="number" min="1" defaultValue={tour?.durationDays ?? 5} required /></label>
          <label><span>Starting price (USD) *</span><input name="priceFrom" type="number" min="0" step="1" defaultValue={tour?.priceFrom ?? 500} required /></label>
          <label><span>Status *</span><select name="status" defaultValue={tour?.status ?? "DRAFT"}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></label>
          <CloudinaryImageField name="image" label="Tour image *" defaultValue={tour?.image ?? "/images/sigiriya.webp"} />
          <label className="admin-form-span-2"><span>Card summary *</span><textarea name="shortDescription" rows={3} defaultValue={tour?.shortDescription} maxLength={260} required /></label>
          <label className="admin-form-span-2"><span>Full description *</span><textarea name="description" rows={6} defaultValue={tour?.description} required /></label>
          <label className="admin-checkbox"><input name="featured" type="checkbox" defaultChecked={tour?.featured} /><span>Show as a featured journey on the home page</span></label>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card__head"><div><h2>Lists</h2><p>Enter one item per line.</p></div></div>
        <div className="admin-form-grid admin-form-grid--3">
          <label><span>Highlights</span><textarea name="highlights" rows={8} defaultValue={tour?.highlights.join("\n")} /></label>
          <label><span>Included</span><textarea name="inclusions" rows={8} defaultValue={tour?.inclusions.join("\n")} /></label>
          <label><span>Not included</span><textarea name="exclusions" rows={8} defaultValue={tour?.exclusions.join("\n")} /></label>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card__head"><div><h2>Day-by-day itinerary</h2><p>Build the journey in sequence.</p></div><button type="button" className="admin-secondary-button" onClick={addDay}>+ Add day</button></div>
        <div className="itinerary-editor">
          {itinerary.map((day, index) => (
            <div key={index} className="itinerary-editor__row">
              <span>Day {day.day}</span>
              <input value={day.title} onChange={(event) => updateItinerary(index, "title", event.target.value)} placeholder="Day title" required />
              <textarea value={day.description} onChange={(event) => updateItinerary(index, "description", event.target.value)} rows={2} placeholder="Day description" required />
              <button type="button" onClick={() => removeDay(index)} disabled={itinerary.length === 1}>×</button>
            </div>
          ))}
        </div>
      </section>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <div className="admin-form-actions"><button type="button" className="admin-secondary-button" onClick={() => router.back()}>Cancel</button><button className="admin-primary-button" disabled={loading}>{loading ? "Saving..." : tour ? "Update tour" : "Create tour"}</button></div>
    </form>
  );
}
