"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/site-content";
import { CloudinaryImageField } from "@/components/admin/CloudinaryImageField";

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function ContentForm({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const payload: SiteContent = {
      global: {
        brandName: value("brandName"),
        footerLead: value("footerLead"),
        footerTagline: value("footerTagline"),
        address: value("address"),
        phone: value("phone"),
        whatsapp: value("whatsapp"),
        email: value("email"),
      },
      home: {
        heroEyebrow: value("heroEyebrow"),
        heroTitle: value("heroTitle"),
        heroImage: value("heroImage"),
        heroImageAlt: value("heroImageAlt"),
        heroCaption: value("heroCaption"),
        heroPromise: value("heroPromise"),
        assurances: lines(value("assurances")),
        experiencesEyebrow: value("experiencesEyebrow"),
        experiencesTitle: value("experiencesTitle"),
        experiencesCopy: value("experiencesCopy"),
        chooserEyebrow: value("chooserEyebrow"),
        chooserTitle: value("chooserTitle"),
        chooserCopy: value("chooserCopy"),
        bikeEyebrow: value("bikeEyebrow"),
        bikeTitle: value("bikeTitle"),
        airportCardTitle: value("airportCardTitle"),
        airportCardCopy: value("airportCardCopy"),
        proofTitle: value("proofTitle"),
        proofCopy: value("proofCopy"),
        guestStats: [0, 1, 2].map((index) => ({
          value: value(`stat${index}Value`),
          label: value(`stat${index}Label`),
          detail: value(`stat${index}Detail`),
        })),
        testimonial: value("testimonial"),
        testimonialByline: value("testimonialByline"),
        storyEyebrow: value("storyEyebrow"),
        storyTitle: value("storyTitle"),
        storyImage: value("storyImage"),
        storyImageAlt: value("storyImageAlt"),
        storyMovements: lines(value("storyMovements")),
        finalEyebrow: value("finalEyebrow"),
        finalTitle: value("finalTitle"),
        finalAccent: value("finalAccent"),
        finalCopy: value("finalCopy"),
      },
    };

    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null);
    setSaving(false);
    if (!response.ok) {
      setError(result?.message ?? "Could not save website content.");
      return;
    }
    setMessage("Website content saved and published.");
    router.refresh();
  }

  const field = (
    name: string,
    label: string,
    value: string,
    options?: { area?: boolean; wide?: boolean; help?: string },
  ) => (
    <label className={options?.wide ? "admin-form-span-2" : undefined}>
      <span>{label}</span>
      {options?.area ? (
        <textarea name={name} defaultValue={value} rows={4} required />
      ) : (
        <input name={name} defaultValue={value} required />
      )}
      {options?.help && <small>{options.help}</small>}
    </label>
  );

  return (
    <form className="admin-form" onSubmit={submit}>
      <section className="admin-form-card">
        <div className="admin-form-card__head">
          <div><h2>Brand and contact details</h2><p>Used in the header, footer and WhatsApp links.</p></div>
        </div>
        <div className="admin-form-grid admin-form-grid--2">
          {field("brandName", "Brand name", content.global.brandName)}
          {field("footerLead", "Footer lead", content.global.footerLead)}
          {field("footerTagline", "Footer tagline", content.global.footerTagline)}
          {field("address", "Business address", content.global.address)}
          {field("phone", "Public phone", content.global.phone)}
          {field("whatsapp", "Public WhatsApp number", content.global.whatsapp, { help: "Digits only, including country code." })}
          {field("email", "Public email", content.global.email)}
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card__head">
          <div><h2>Home hero</h2><p>The first screen and the main journey promise.</p></div>
        </div>
        <div className="admin-form-grid admin-form-grid--2">
          {field("heroEyebrow", "Eyebrow", content.home.heroEyebrow)}
          {field("heroCaption", "Image caption", content.home.heroCaption)}
          {field("heroTitle", "Main heading", content.home.heroTitle, { area: true, help: "Use a new line to control the heading break." })}
          {field("heroPromise", "Promise copy", content.home.heroPromise, { area: true })}
          <CloudinaryImageField name="heroImage" label="Hero image" defaultValue={content.home.heroImage} />
          {field("heroImageAlt", "Hero image description", content.home.heroImageAlt, { wide: true })}
          {field("assurances", "Assurance pills", content.home.assurances.join("\n"), { area: true, wide: true, help: "One item per line." })}
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card__head">
          <div><h2>Journey and service sections</h2><p>Headings and supporting messages around tour and bike inventory.</p></div>
        </div>
        <div className="admin-form-grid admin-form-grid--2">
          {field("experiencesEyebrow", "Journeys eyebrow", content.home.experiencesEyebrow)}
          {field("experiencesTitle", "Journeys heading", content.home.experiencesTitle, { area: true })}
          {field("experiencesCopy", "Journeys introduction", content.home.experiencesCopy, { area: true, wide: true })}
          {field("chooserEyebrow", "Chooser eyebrow", content.home.chooserEyebrow)}
          {field("chooserTitle", "Chooser heading", content.home.chooserTitle, { area: true })}
          {field("chooserCopy", "Chooser copy", content.home.chooserCopy, { area: true, wide: true })}
          {field("bikeEyebrow", "Bike section eyebrow", content.home.bikeEyebrow)}
          {field("bikeTitle", "Bike section heading", content.home.bikeTitle, { area: true })}
          {field("airportCardTitle", "Airport card heading", content.home.airportCardTitle, { area: true })}
          {field("airportCardCopy", "Airport card copy", content.home.airportCardCopy, { area: true })}
          {field("proofTitle", "Proof card heading", content.home.proofTitle, { area: true })}
          {field("proofCopy", "Proof card copy", content.home.proofCopy, { area: true })}
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card__head">
          <div><h2>Trust, story and closing call-to-action</h2><p>Social proof and the final sections visible in the screenshots.</p></div>
        </div>
        <div className="admin-form-grid admin-form-grid--3">
          {content.home.guestStats.slice(0, 3).map((stat, index) => (
            <div className="admin-nested-card" key={stat.label}>
              {field(`stat${index}Value`, `Statistic ${index + 1} value`, stat.value)}
              {field(`stat${index}Label`, "Label", stat.label)}
              {field(`stat${index}Detail`, "Detail", stat.detail, { area: true })}
            </div>
          ))}
        </div>
        <div className="admin-form-grid admin-form-grid--2 admin-form-grid--spaced">
          {field("testimonial", "Testimonial", content.home.testimonial, { area: true })}
          {field("testimonialByline", "Testimonial byline", content.home.testimonialByline)}
          {field("storyEyebrow", "Story eyebrow", content.home.storyEyebrow)}
          {field("storyTitle", "Story heading", content.home.storyTitle)}
          <CloudinaryImageField name="storyImage" label="Story image" defaultValue={content.home.storyImage} wide={false} />
          {field("storyImageAlt", "Story image description", content.home.storyImageAlt)}
          {field("storyMovements", "Story movement labels", content.home.storyMovements.join("\n"), { area: true, wide: true, help: "One item per line." })}
          {field("finalEyebrow", "Final eyebrow", content.home.finalEyebrow)}
          {field("finalTitle", "Final heading", content.home.finalTitle, { area: true })}
          {field("finalAccent", "Orange accent words", content.home.finalAccent)}
          {field("finalCopy", "Final supporting copy", content.home.finalCopy, { area: true })}
        </div>
      </section>

      {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
      <div className="admin-form-actions">
        <a className="admin-secondary-button" href="/" target="_blank" rel="noreferrer">Preview website ↗</a>
        <button className="admin-primary-button" disabled={saving}>{saving ? "Publishing..." : "Save and publish"}</button>
      </div>
      {message && <p className="admin-save-message" role="status">{message}</p>}
    </form>
  );
}
