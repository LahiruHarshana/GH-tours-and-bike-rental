import type { BikeDTO } from "@/types";
import { formatUSD } from "@/lib/utils";
import { BikeBookingButton } from "@/components/booking/BikeBookingButton";
import Image from "next/image";

export function BikeCard({ bike, index = 0 }: { bike: BikeDTO; index?: number }) {
  return (
    <article className="bike-card" data-cursor-depth>
      <div className="bike-card__visual">
        <span className={`availability ${bike.available && bike.quantity > 0 ? "is-available" : ""}`}>
          {bike.available && bike.quantity > 0 ? "Available" : "Unavailable"}
        </span>
        <Image src={bike.image} alt={`${bike.name} motorbike available for rental in Sri Lanka`} loading={index < 3 ? "eager" : "lazy"} decoding="async" width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/>
        <span className="bike-card__cc" style={{ fontVariantNumeric: "tabular-nums" }}>{bike.engineCC} CC</span>
      </div>
      <div className="bike-card__body">
        <p className="eyebrow" style={{ fontVariantNumeric: "tabular-nums" }}>{bike.category.toLowerCase()} &middot; {bike.transmission.toLowerCase()}</p>
        <h3>{bike.name}</h3>
        <ul>{bike.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className="bike-card__footer">
          <div><strong style={{ fontVariantNumeric: "tabular-nums" }}>{formatUSD(bike.dailyRateUSD)}</strong><small>/ day</small></div>
          <BikeBookingButton bike={bike} disabled={!bike.available || bike.quantity < 1} />
        </div>
      </div>
    </article>
  );
}
