"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { AirportVehicleDTO, VehicleRoutePrice } from "@/types";
import { slugify, splitLines } from "@/lib/utils";
import { CloudinaryImageField } from "@/components/admin/CloudinaryImageField";

const emptyRoute = (): VehicleRoutePrice => ({ destination: "", duration: "", priceUSD: 0 });

export function VehicleForm({ vehicle }: { vehicle?: AirportVehicleDTO }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(vehicle?.name ?? "");
  const [slug, setSlug] = useState(vehicle?.slug ?? "");
  const [routePrices, setRoutePrices] = useState<VehicleRoutePrice[]>(
    vehicle?.routePrices.length ? vehicle.routePrices : [emptyRoute()],
  );

  function updateRoute(index: number, patch: Partial<VehicleRoutePrice>) {
    setRoutePrices((current) => current.map((route, i) => (i === index ? { ...route, ...patch } : route)));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name,
      slug,
      vehicleClass: form.get("vehicleClass"),
      tier: form.get("tier"),
      minPassengers: form.get("minPassengers"),
      maxPassengers: form.get("maxPassengers"),
      luggagePieces: form.get("luggagePieces"),
      priceFromUSD: form.get("priceFromUSD"),
      routePrices: routePrices
        .filter((route) => route.destination.trim())
        .map((route) => ({
          destination: route.destination.trim(),
          duration: route.duration?.trim() || undefined,
          priceUSD: Number(route.priceUSD) || 0,
        })),
      image: form.get("image"),
      shortDescription: form.get("shortDescription"),
      features: splitLines(String(form.get("features") ?? "")),
      recommended: form.get("recommended") === "on",
      available: form.get("available") === "on",
      status: form.get("status"),
      sortOrder: form.get("sortOrder"),
    };
    try {
      const response = await fetch(vehicle ? `/api/admin/vehicles/${vehicle.id}` : "/api/admin/vehicles", {
        method: vehicle ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Could not save vehicle.");
      router.push("/admin/vehicles");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save vehicle.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <section className="admin-form-card">
        <div className="admin-form-card__head">
          <div>
            <h2>Vehicle details</h2>
            <p>Class, passenger capacity, public copy and starting price.</p>
          </div>
        </div>
        <div className="admin-form-grid admin-form-grid--2">
          <label>
            <span>Display name *</span>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (!vehicle) setSlug(slugify(event.target.value));
              }}
              required
              placeholder="Budget Taxi"
            />
          </label>
          <label>
            <span>URL slug *</span>
            <input value={slug} onChange={(event) => setSlug(slugify(event.target.value))} required />
          </label>
          <label>
            <span>Vehicle class *</span>
            <select name="vehicleClass" defaultValue={vehicle?.vehicleClass ?? "CAR"}>
              <option value="CAR">Car</option>
              <option value="VAN">Van</option>
              <option value="MINIBUS">Minibus</option>
            </select>
          </label>
          <label>
            <span>Price tier *</span>
            <select name="tier" defaultValue={vehicle?.tier ?? "STANDARD"}>
              <option value="BUDGET">Budget</option>
              <option value="STANDARD">Standard</option>
              <option value="LUXURY">Luxury</option>
            </select>
          </label>
          <label>
            <span>Min passengers *</span>
            <input name="minPassengers" type="number" min="1" max="40" defaultValue={vehicle?.minPassengers ?? 1} required />
          </label>
          <label>
            <span>Max passengers *</span>
            <input name="maxPassengers" type="number" min="1" max="40" defaultValue={vehicle?.maxPassengers ?? 3} required />
          </label>
          <label>
            <span>Luggage pieces *</span>
            <input name="luggagePieces" type="number" min="0" max="40" defaultValue={vehicle?.luggagePieces ?? 2} required />
          </label>
          <label>
            <span>Starting price (USD) *</span>
            <input name="priceFromUSD" type="number" min="0" step="1" defaultValue={vehicle?.priceFromUSD ?? 50} required />
            <small>Shown as “from” when the destination does not match a route price.</small>
          </label>
          <label>
            <span>Sort order</span>
            <input name="sortOrder" type="number" min="0" defaultValue={vehicle?.sortOrder ?? 10} />
          </label>
          <label>
            <span>Status *</span>
            <select name="status" defaultValue={vehicle?.status ?? "DRAFT"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </label>
          <label className="admin-form-span-2">
            <span>Short description *</span>
            <textarea name="shortDescription" rows={3} defaultValue={vehicle?.shortDescription} required placeholder="A clean, air-conditioned taxi for light luggage and small groups." />
          </label>
          <CloudinaryImageField name="image" label="Vehicle image *" defaultValue={vehicle?.image ?? "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"} />
          <label className="admin-form-span-2">
            <span>Features (one per line)</span>
            <textarea name="features" rows={5} defaultValue={vehicle?.features.join("\n")} placeholder="Air-conditioned&#10;Meet and greet&#10;Flight tracking" />
          </label>
          <label className="admin-checkbox">
            <input name="recommended" type="checkbox" defaultChecked={vehicle?.recommended ?? false} />
            <span>Mark as best value on the booking form</span>
          </label>
          <label className="admin-checkbox">
            <input name="available" type="checkbox" defaultChecked={vehicle?.available ?? true} />
            <span>Available for airport booking requests</span>
          </label>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card__head">
          <div>
            <h2>Route prices</h2>
            <p>Optional destination prices from CMB. Matching drop-off text shows this fare instead of the starting price.</p>
          </div>
          <button
            className="admin-secondary-button"
            type="button"
            onClick={() => setRoutePrices((current) => [...current, emptyRoute()])}
          >
            + Add route
          </button>
        </div>
        <div className="vehicle-route-editor">
          {routePrices.map((route, index) => (
            <div className="vehicle-route-editor__row" key={`route-${index}`}>
              <label>
                <span>Destination</span>
                <input
                  value={route.destination}
                  onChange={(event) => updateRoute(index, { destination: event.target.value })}
                  placeholder="Weligama"
                />
              </label>
              <label>
                <span>Travel time</span>
                <input
                  value={route.duration ?? ""}
                  onChange={(event) => updateRoute(index, { duration: event.target.value })}
                  placeholder="2.5–3 hrs"
                />
              </label>
              <label>
                <span>Price (USD)</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={route.priceUSD || ""}
                  onChange={(event) => updateRoute(index, { priceUSD: Number(event.target.value) || 0 })}
                  placeholder="50"
                />
              </label>
              <button
                className="admin-text-button admin-text-button--danger"
                type="button"
                onClick={() => setRoutePrices((current) => (current.length > 1 ? current.filter((_, i) => i !== index) : [emptyRoute()]))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <div className="admin-form-actions">
        <button type="button" className="admin-secondary-button" onClick={() => router.back()}>Cancel</button>
        <button className="admin-primary-button" disabled={loading}>{loading ? "Saving..." : vehicle ? "Update vehicle" : "Add vehicle"}</button>
      </div>
    </form>
  );
}
