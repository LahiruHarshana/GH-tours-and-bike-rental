"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { CinematicHeading } from "@/components/public/typography/CinematicHeading";
import type { BikeDTO } from "@/types";
import { cn } from "@/lib/utils";

function formatCategory(category: BikeDTO["category"]) {
  if (category === "MOTORBIKE") return "Motorbike";
  if (category === "ADVENTURE") return "Adventure";
  return "Scooter";
}

const SPECS = [
  { key: "engine", label: "Engine", getValue: (bike: BikeDTO) => `${bike.engineCC} cc` },
  {
    key: "transmission",
    label: "Transmission",
    getValue: (bike: BikeDTO) => (bike.transmission === "AUTOMATIC" ? "Automatic" : "Manual"),
  },
  {
    key: "fuel",
    label: "Fuel",
    getValue: (bike: BikeDTO) => (bike.fuelType === "ELECTRIC" ? "Electric" : "Petrol"),
  },
  { key: "seats", label: "Seats", getValue: (bike: BikeDTO) => String(bike.seats) },
] as const;

export function BikeDetailPanel({
  bike,
  index,
  totalBikes,
  onRequest,
  className,
  showFleetLink = false,
}: {
  bike: BikeDTO;
  index: number;
  totalBikes: number;
  onRequest: () => void;
  className?: string;
  showFleetLink?: boolean;
}) {
  const available = bike.available && bike.quantity > 0;
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const timer = window.setTimeout(() => setEntered(true), 40);
    return () => window.clearTimeout(timer);
  }, [bike.id]);

  const nameParts = bike.name.split(" ");
  const headingLines =
    nameParts.length > 2
      ? [nameParts.slice(0, 2).join(" "), nameParts.slice(2).join(" ")]
      : [bike.brand, bike.model || bike.name];

  return (
    <article
      className={cn("bike-cinema", entered && "bike-cinema--entered", className)}
      aria-live="polite"
      data-scroll-motion
      data-cinema-parallax
    >
      <div className="bike-cinema__stage">
        <div className="bike-cinema__backdrop" aria-hidden="true">
          <Image
            src={bike.image}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            unoptimized={bike.image.startsWith("http")}
            className="bike-cinema__image"
          />
          <div className="bike-cinema__veil" />
          <div className="bike-cinema__grain" />
        </div>

        <div className="bike-cinema__chrome" aria-hidden="true">
          <span className="bike-cinema__chrome-label">
            <i />
            {bike.brand} · {formatCategory(bike.category)} · {bike.engineCC} cc
          </span>
          <span className="bike-cinema__chrome-count">
            {String(index + 1).padStart(2, "0")} <i /> {String(totalBikes).padStart(2, "0")}
          </span>
        </div>

        <div className="bike-cinema__number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="bike-cinema__content">
          <div className="bike-cinema__head">
            <p className="bike-cinema__eyebrow">
              {bike.brand} · {formatCategory(bike.category)}
            </p>
            <CinematicHeading lines={headingLines} as="h3" className="bike-cinema__title" />
            <span className={cn("bike-cinema__status", available && "is-available")}>
              {available ? "Available to request" : "Currently unavailable"}
            </span>
          </div>

          <dl className="bike-cinema__specs">
            {SPECS.map((spec, specIndex) => (
              <div
                key={spec.key}
                className="bike-cinema__spec"
                data-cinema="rise"
                style={{ "--cinema-delay": `${specIndex * 70}ms` } as CSSProperties}
              >
                <dt>{spec.label}</dt>
                <dd>{spec.getValue(bike)}</dd>
              </div>
            ))}
          </dl>

          <ul className="bike-cinema__features">
            {bike.features.map((feature, featureIndex) => (
              <li
                key={feature}
                style={{ "--feature-delay": `${featureIndex * 55}ms` } as CSSProperties}
              >
                {feature}
              </li>
            ))}
          </ul>

          <p className="bike-cinema__note">
            Request a quote — we confirm licence requirements, deposit and final price before pickup.
          </p>

          <div className="bike-cinema__actions">
            <button
              type="button"
              className="bike-cinema__cta"
              disabled={!available}
              onClick={onRequest}
            >
              {available ? "Request this bike" : "Unavailable"}
              <span aria-hidden="true">↗</span>
            </button>
            {showFleetLink ? (
              <Link
                href={`/bikes?bike=${encodeURIComponent(bike.slug)}`}
                className="bike-cinema__link"
              >
                Full fleet page
              </Link>
            ) : null}
          </div>
        </div>

        <div className="bike-cinema__scroll-hint" aria-hidden="true">
          <span>Scroll to explore fleet</span>
          <i />
        </div>
      </div>
    </article>
  );
}
