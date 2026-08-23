import { AirportTaxiIcon } from "@/components/booking/AirportTaxiIcon";
import { AIRPORT_TAXI_TYPES } from "@/lib/airport-vehicles";
import { formatLKR } from "@/lib/utils";

export function AirportVehicleGallery() {
  return (
    <div className="vehicle-gallery vehicle-gallery--taxi">
      {AIRPORT_TAXI_TYPES.map((taxi, index) => (
        <article
          className="vehicle-gallery__card vehicle-gallery__card--icon"
          data-cinema="rise"
          id={`taxi-${taxi.id}`}
          key={taxi.id}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          {taxi.marketingBadge && <em className="vehicle-gallery__badge vehicle-gallery__badge--premium">{taxi.marketingBadge}</em>}
          <span className="vehicle-gallery__icon" aria-hidden="true">
            <AirportTaxiIcon id={taxi.id} />
          </span>
          <strong>{taxi.label}</strong>
          <p>{taxi.shortDescription}</p>
          <small>{taxi.capacity} · {taxi.luggagePieces} bags</small>
          <b>From {formatLKR(taxi.priceFromLKR)}</b>
        </article>
      ))}
    </div>
  );
}
