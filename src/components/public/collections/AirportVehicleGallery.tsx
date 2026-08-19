import type { AirportVehicleDTO } from "@/types";
import {
  groupVehiclesByClass,
  VEHICLE_TIER_LABELS,
} from "@/lib/airport-vehicles";
import { formatUSD } from "@/lib/utils";
import Image from "next/image";

export function AirportVehicleGallery({ vehicles }: { vehicles: AirportVehicleDTO[] }) {
  const groups = groupVehiclesByClass(vehicles);

  return (
    <div className="vehicle-gallery">
      {groups.map((group) => (
        <section className="vehicle-gallery__group" key={group.vehicleClass}>
          <header>
            <h3>{group.label}</h3>
            <p>{group.capacity} · budget, standard and luxury</p>
          </header>
          <div className="vehicle-gallery__grid">
            {group.vehicles.map((vehicle) => (
              <article className={`vehicle-gallery__card vehicle-gallery__card--${vehicle.tier.toLowerCase()}`} key={vehicle.id}>
                <div className="vehicle-gallery__visual">
                  <Image src={vehicle.image} alt={`${vehicle.name} airport transfer`} fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} unoptimized={vehicle.image.startsWith("http")} />
                  <span>{VEHICLE_TIER_LABELS[vehicle.tier]}</span>
                  {vehicle.recommended && <em>Best value</em>}
                </div>
                <strong>{vehicle.name}</strong>
                <p>{vehicle.shortDescription}</p>
                <small>{vehicle.minPassengers}–{vehicle.maxPassengers} people · {vehicle.luggagePieces} bags</small>
                <b>From {formatUSD(vehicle.priceFromUSD)}</b>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
