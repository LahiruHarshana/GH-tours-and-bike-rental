import type { BikeDTO } from "@/types";
import { formatUSD } from "@/lib/utils";
import { BikeBookingButton } from "@/components/booking/BikeBookingButton";

export function BikeCard({ bike, index = 0 }: { bike: BikeDTO; index?: number }) {
  return (
    <article className="bike-card" data-cursor-depth>
      <div className="bike-card__visual">
        <span className="bike-card__frame-number" aria-hidden="true">0{index + 1}</span>
        <span className={`availability ${bike.available && bike.quantity > 0 ? "is-available" : ""}`}>
          {bike.available && bike.quantity > 0 ? "Available" : "Unavailable"}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bike.image} alt={`${bike.name} motorbike available for rental in Sri Lanka`} loading="lazy" decoding="async" />
        <span className="bike-card__cc">{bike.engineCC} CC</span>
        <span className="bike-card__direction" aria-hidden="true">Explore <b>→</b></span>
      </div>
      <div className="bike-card__body">
        <p>{bike.category.toLowerCase()} · {bike.transmission.toLowerCase()}</p>
        <h3>{bike.name}</h3>
        <ul>{bike.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className="bike-card__footer">
          <div><strong>{formatUSD(bike.dailyRateUSD)}</strong><small>/ day</small></div>
          <BikeBookingButton bike={bike} disabled={!bike.available || bike.quantity < 1} />
        </div>
      </div>
    </article>
  );
}
