import Image from "next/image";
import { AIRPORT_TAXI_TYPES } from "@/lib/airport-vehicles";
import { formatUSD } from "@/lib/utils";

export function AirportVehicleGallery() {
  return (
    <div className="vehicle-gallery vehicle-gallery--taxi">
      {AIRPORT_TAXI_TYPES.map((taxi) => (
        <article className="vehicle-gallery__card" id={`taxi-${taxi.id}`} key={taxi.id}>
          <div className="vehicle-gallery__visual">
            <Image
              src={taxi.image}
              alt={`${taxi.label} airport transfer`}
              fill
              sizes="(max-width: 800px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
              unoptimized
            />
            <span>{taxi.emoji} {taxi.label}</span>
          </div>
          <strong>{taxi.emoji} {taxi.label}</strong>
          <p>{taxi.shortDescription}</p>
          <small>{taxi.capacity} · {taxi.luggagePieces} bags</small>
          <b>From {formatUSD(taxi.priceFromUSD)}</b>
        </article>
      ))}
    </div>
  );
}
