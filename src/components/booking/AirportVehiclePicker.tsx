"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AIRPORT_TAXI_TYPES,
  formatAirportTaxiChoice,
  matchRoutePrice,
  quotedPriceForTaxi,
  resolveInitialTaxi,
  suggestAirportTaxiType,
  taxiFitsGuests,
} from "@/lib/airport-vehicles";
import { formatUSD } from "@/lib/utils";

export function AirportVehiclePicker({
  guests,
  destination,
  initialVehicleType,
  initialVehicleId,
  compact = false,
}: {
  guests: number;
  destination?: string;
  initialVehicleType?: string;
  initialVehicleId?: string;
  compact?: boolean;
}) {
  const partySize = guests || 1;
  const [selectedId, setSelectedId] = useState(
    () => resolveInitialTaxi(partySize, initialVehicleType, initialVehicleId).id,
  );

  useEffect(() => {
    setSelectedId((current) => {
      const currentTaxi = AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === current);
      if (currentTaxi && taxiFitsGuests(currentTaxi, partySize)) return current;
      return resolveInitialTaxi(partySize, initialVehicleType, initialVehicleId).id;
    });
  }, [partySize, initialVehicleType, initialVehicleId]);

  const selected = AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === selectedId);
  const suggested = suggestAirportTaxiType(partySize);

  return (
    <div className={`vehicle-picker vehicle-picker--taxi ${compact ? "vehicle-picker--compact" : ""}`}>
      <div className="vehicle-picker__head">
        <div>
          <span>Choose a vehicle</span>
          <strong>Car, van or bus — tap the one that fits your group</strong>
        </div>
        <p>
          {compact
            ? "We will WhatsApp the photos and details of the taxi you pick."
            : "These are the same taxis shown below. We will send the photos and details on WhatsApp after you request."}
        </p>
      </div>

      <div className="vehicle-picker__grid" role="radiogroup" aria-label="Airport taxi type">
        {AIRPORT_TAXI_TYPES.map((taxi) => {
          const fits = taxiFitsGuests(taxi, partySize);
          const tooSmall = partySize > taxi.maxPassengers && taxi.id !== "bus";
          const checked = selectedId === taxi.id;
          const route = matchRoutePrice(taxi, destination);
          const price = quotedPriceForTaxi(taxi, destination);

          return (
            <label
              key={taxi.id}
              className={`vehicle-option vehicle-option--taxi ${checked ? "is-selected" : ""} ${!fits ? "is-disabled" : ""}`}
            >
              <input
                type="radio"
                name="vehicleId"
                value={taxi.id}
                checked={checked}
                required
                disabled={!fits}
                onChange={() => setSelectedId(taxi.id)}
              />
              <span className="vehicle-option__visual">
                <Image
                  src={taxi.image}
                  alt={`${taxi.label} airport taxi`}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </span>
              <span className="vehicle-option__emoji" aria-hidden="true">{taxi.emoji}</span>
              {suggested.id === taxi.id && fits && <span className="vehicle-option__badge">Fits this group</span>}
              <strong>{taxi.label}</strong>
              <p>{taxi.shortDescription}</p>
              <ul>
                <li>{taxi.capacity}</li>
                <li>{taxi.luggagePieces} bags</li>
              </ul>
              {tooSmall && <small className="vehicle-option__hint">Too small for {partySize} travellers</small>}
              {!tooSmall && taxi.id === "bus" && partySize < taxi.minPassengers && (
                <small className="vehicle-option__hint">Larger than this group needs</small>
              )}
              {fits && (
                <div className="vehicle-option__price">
                  <b>{formatUSD(price)}</b>
                  <small>{route ? `CMB → ${route.destination}` : "from this fare"}</small>
                </div>
              )}
            </label>
          );
        })}
      </div>

      {selected && (
        <>
          <input type="hidden" name="vehicleType" value={formatAirportTaxiChoice(selected)} />
          <input type="hidden" name="estimatedAmountUSD" value={quotedPriceForTaxi(selected, destination)} />
        </>
      )}
    </div>
  );
}
