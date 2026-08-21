import { AirportTaxiIcon } from "@/components/booking/AirportTaxiIcon";
import { AIRPORT_TAXI_TYPES } from "@/lib/airport-vehicles";
import { formatLKR } from "@/lib/utils";

export function AirportVehicleGallery() {
  return (
    <div className="vehicle-gallery vehicle-gallery--taxi">
      {AIRPORT_TAXI_TYPES.map((taxi) => (
        <article className="vehicle-gallery__card vehicle-gallery__card--icon" id={`taxi-${taxi.id}`} key={taxi.id}>
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
