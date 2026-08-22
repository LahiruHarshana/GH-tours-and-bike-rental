import type { BikeDTO } from "@/types";
import { BikeBookingButton } from "@/components/booking/BikeBookingButton";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BikeCard({
  bike,
  index = 0,
  compact = false,
}: {
  bike: BikeDTO;
  index?: number;
  compact?: boolean;
}) {
  return (
    <article className={cn("bike-card", compact && "bike-card--compact")} data-cursor-depth>
      <div className="bike-card__visual">
        <span className={`availability ${bike.available && bike.quantity > 0 ? "is-available" : ""}`}>
          {bike.available && bike.quantity > 0 ? "Available" : "Unavailable"}
        </span>
        <Image
          src={bike.image}
          alt={`${bike.name} available for rental in Weligama, Sri Lanka`}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          width={1920}
          height={1280}
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized={bike.image.startsWith("http")}
        />
        <span className="bike-card__cc" style={{ fontVariantNumeric: "tabular-nums" }}>
          {bike.engineCC} cc
        </span>
      </div>
      <div className="bike-card__body">
        <p className="eyebrow" style={{ fontVariantNumeric: "tabular-nums" }}>
          {bike.category.toLowerCase()} &middot; {bike.transmission.toLowerCase()}
        </p>
        <h3>{bike.name}</h3>
        <ul>{bike.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>
        {!compact ? (
          <div className="bike-card__footer bike-card__footer--request">
            <p className="bike-card__request-note">
              Request a quote — we confirm availability and price personally.
            </p>
            <BikeBookingButton bike={bike} disabled={!bike.available || bike.quantity < 1} />
          </div>
        ) : (
          <p className="bike-card__tap-hint">Tap to view full details</p>
        )}
      </div>
    </article>
  );
}
