"use client";

import Image from "next/image";
import Link from "next/link";
import type { BikeDTO } from "@/types";
import { cn } from "@/lib/utils";

function formatCategory(category: BikeDTO["category"]) {
  if (category === "MOTORBIKE") return "Motorbike";
  if (category === "ADVENTURE") return "Adventure";
  return "Scooter";
}

export function BikeDetailPanel({
  bike,
  index,
  onRequest,
  className,
  showFleetLink = false,
}: {
  bike: BikeDTO;
  index: number;
  onRequest: () => void;
  className?: string;
  showFleetLink?: boolean;
}) {
  const available = bike.available && bike.quantity > 0;

  return (
    <article className={cn("bike-detail-panel", className)} aria-live="polite">
      <div className="bike-detail-panel__media">
        <Image
          src={bike.image}
          alt={`${bike.name} available for rental in Weligama`}
          fill
          sizes="(max-width: 900px) 100vw, 52vw"
          priority={index === 0}
          unoptimized={bike.image.startsWith("http")}
        />
        <span className="bike-detail-panel__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="bike-detail-panel__cc">{bike.engineCC} cc</span>
      </div>

      <div className="bike-detail-panel__copy">
        <div className="bike-detail-panel__head">
          <p className="bike-detail-panel__eyebrow">
            {bike.brand} · {formatCategory(bike.category)}
          </p>
          <h3>{bike.name}</h3>
          <span className={cn("bike-detail-panel__status", available && "is-available")}>
            {available ? "Available to request" : "Currently unavailable"}
          </span>
        </div>

        <dl className="bike-detail-panel__specs">
          <div>
            <dt>Engine</dt>
            <dd>{bike.engineCC} cc</dd>
          </div>
          <div>
            <dt>Transmission</dt>
            <dd>{bike.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</dd>
          </div>
          <div>
            <dt>Fuel</dt>
            <dd>{bike.fuelType === "ELECTRIC" ? "Electric" : "Petrol"}</dd>
          </div>
          <div>
            <dt>Seats</dt>
            <dd>{bike.seats}</dd>
          </div>
        </dl>

        <ul className="bike-detail-panel__features">
          {bike.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <p className="bike-detail-panel__note">
          Request a quote — we confirm licence requirements, deposit and final price before pickup.
        </p>

        <div className="bike-detail-panel__actions">
          <button
            type="button"
            className="bike-detail-panel__cta"
            disabled={!available}
            onClick={onRequest}
          >
            {available ? "Request this bike" : "Unavailable"}
            <span aria-hidden="true">↗</span>
          </button>
          {showFleetLink ? (
            <Link href={`/bikes?bike=${encodeURIComponent(bike.slug)}`} className="bike-detail-panel__link">
              Full fleet page
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
