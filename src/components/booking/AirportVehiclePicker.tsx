"use client";

import { useEffect, useState } from "react";
import { AirportTaxiIcon } from "@/components/booking/AirportTaxiIcon";
import {
  AIRPORT_TAXI_TYPES,
  formatAirportTaxiChoice,
  matchAirportDestination,
  quotedPriceForTaxi,
  resolveInitialTaxi,
  suggestAirportTaxiType,
  taxiFitsGuests,
} from "@/lib/airport-vehicles";
import { formatLKR } from "@/lib/utils";

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
  const place = matchAirportDestination(destination);
  const selectedFare = selected ? quotedPriceForTaxi(selected, destination) : undefined;

  return (
    <div className={`vehicle-picker vehicle-picker--taxi ${compact ? "vehicle-picker--compact" : ""}`}>
      <div className="vehicle-picker__head">
        <div>
          <span>Choose a vehicle</span>
          <strong>Budget car, premium car or van</strong>
        </div>
        <p>
          {place
            ? `CMB → ${place.name} · about ${place.duration}. Budget and premium apply to cars only.`
            : "Select your town first to see the exact fare. Budget and premium apply to cars only."}
        </p>
      </div>

      <div className="vehicle-picker__grid" role="radiogroup" aria-label="Airport taxi type">
        {AIRPORT_TAXI_TYPES.map((taxi) => {
          const fits = taxiFitsGuests(taxi, partySize);
          const tooSmall = partySize > taxi.maxPassengers;
          const checked = selectedId === taxi.id;
          const fare = quotedPriceForTaxi(taxi, destination);

          return (
            <label
              key={taxi.id}
              className={`vehicle-option vehicle-option--taxi vehicle-option--icon ${checked ? "is-selected" : ""} ${!fits ? "is-disabled" : ""}`}
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
              <span className={`vehicle-option__icon vehicle-option__icon--${taxi.id}`} aria-hidden="true">
                <AirportTaxiIcon id={taxi.id} />
              </span>
              {taxi.marketingBadge && fits && (
                <span className="vehicle-option__badge vehicle-option__badge--premium">{taxi.marketingBadge}</span>
              )}
              {suggested.id === taxi.id && fits && !taxi.marketingBadge && (
                <span className="vehicle-option__badge">Fits this group</span>
              )}
              <strong>{taxi.label}</strong>
              <p>{taxi.shortDescription}</p>
              <ul>
                <li>{taxi.capacity}</li>
                <li>{taxi.luggagePieces} bags</li>
              </ul>
              {tooSmall && <small className="vehicle-option__hint">Too small for {partySize} travellers</small>}
              {fits && (
                <div className="vehicle-option__price">
                  <b>{fare !== undefined ? formatLKR(fare) : `From ${formatLKR(taxi.priceFromLKR)}`}</b>
                  <small>{place ? `CMB → ${place.name}` : "choose a town to lock the fare"}</small>
                </div>
              )}
            </label>
          );
        })}
      </div>

      {selected && selectedFare !== undefined && place && (
        <p className="vehicle-picker__quote" role="status">
          {formatAirportTaxiChoice(selected)} to {place.name}: <strong>{formatLKR(selectedFare)}</strong>
        </p>
      )}

      {partySize > 7 && (
        <p className="vehicle-picker__status">Groups larger than 7 should add a note — we will arrange a suitable vehicle and confirm the fare on WhatsApp.</p>
      )}

      {selected && (
        <>
          <input type="hidden" name="vehicleType" value={formatAirportTaxiChoice(selected)} />
          {selectedFare !== undefined && <input type="hidden" name="estimatedAmountUSD" value={selectedFare} />}
        </>
      )}
    </div>
  );
}
