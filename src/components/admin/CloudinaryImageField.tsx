"use client";

import Image from "next/image";
import { ChangeEvent, useId, useState } from "react";

export function CloudinaryImageField({
  name,
  label,
  defaultValue,
  required = true,
  wide = true,
}: {
  name: string;
  label: string;
  defaultValue: string;
  required?: boolean;
  wide?: boolean;
}) {
  const id = useId();
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const payload = new FormData();
    payload.set("file", file);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: payload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not upload image.");
      setUrl(result.data.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Could not upload image.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className={`cloudinary-field ${wide ? "admin-form-span-2" : ""}`}>
      <label htmlFor={`${id}-url`}><span>{label}</span></label>
      <div className="cloudinary-field__body">
        <div className="cloudinary-field__preview">
          {url ? <Image src={url} alt="" fill sizes="180px" unoptimized={url.startsWith("http")} /> : <span>No image</span>}
        </div>
        <div className="cloudinary-field__controls">
          <input id={`${id}-url`} name={name} value={url} onChange={(event) => setUrl(event.target.value)} required={required} placeholder="Cloudinary image URL" />
          <label className="admin-secondary-button" htmlFor={`${id}-file`}>
            {uploading ? "Uploading…" : "Upload to Cloudinary"}
          </label>
          <input id={`${id}-file`} className="cloudinary-field__file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} disabled={uploading} />
          <small>Upload JPG, PNG, WebP or AVIF up to 10 MB. The saved Cloudinary URL is used immediately.</small>
          {error && <span className="cloudinary-field__error" role="alert">{error}</span>}
        </div>
      </div>
    </div>
  );
}

