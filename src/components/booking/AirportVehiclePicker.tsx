"use client";

import { useEffect, useMemo, useState } from "react";
import type { AirportVehicleDTO } from "@/types";
import {
  formatVehicleChoice,
  groupVehiclesByClass,
  matchRoutePrice,
  quotedPriceForVehicle,
  resolveInitialVehicle,
  vehiclesForGuests,
  VEHICLE_TIER_LABELS,
} from "@/lib/airport-vehicles";
import { formatUSD } from "@/lib/utils";

export function AirportVehiclePicker({
  guests,
  destination,
  initialVehicleType,
  initialVehicleId,
  vehicles: providedVehicles,
  compact = false,
}: {
  guests: number;
  destination?: string;
  initialVehicleType?: string;
  initialVehicleId?: string;
  vehicles?: AirportVehicleDTO[];
  compact?: boolean;
}) {
  const [vehicles, setVehicles] = useState<AirportVehicleDTO[]>(providedVehicles ?? []);
  const [selectedId, setSelectedId] = useState(initialVehicleId ?? "");
  const [loading, setLoading] = useState(!providedVehicles);

  useEffect(() => {
    if (providedVehicles) {
      setVehicles(providedVehicles);
      setLoading(false);
      return;
    }
    let active = true;
    fetch("/api/vehicles")
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        setVehicles((result.data as AirportVehicleDTO[]) ?? []);
      })
      .catch(() => {
        if (active) setVehicles([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [providedVehicles]);

  const matching = useMemo(() => vehiclesForGuests(vehicles, guests || 1), [vehicles, guests]);
  const groups = useMemo(() => groupVehiclesByClass(matching), [matching]);

  useEffect(() => {
    setSelectedId((current) => {
      const resolved = resolveInitialVehicle(vehicles, guests || 1, initialVehicleType, current || initialVehicleId);
      return resolved?.id ?? "";
    });
  }, [vehicles, guests, initialVehicleType, initialVehicleId]);

  const selected = matching.find((vehicle) => vehicle.id === selectedId);

  return (
    <div className={`vehicle-picker ${compact ? "vehicle-picker--compact" : ""}`}>
      <div className="vehicle-picker__head">
        <div>
          <span>Choose a vehicle</span>
          <strong>Options that fit {guests || 1} {guests === 1 ? "traveller" : "travellers"}</strong>
        </div>
        <p>Budget, standard and luxury for each class. The fare updates if your destination matches a listed route.</p>
      </div>

      {loading && <p className="vehicle-picker__status">Loading vehicles…</p>}

      {!loading && matching.length === 0 && (
        <p className="vehicle-picker__status">
          No listed vehicle fits this group size. Continue with your details and we will arrange a suitable option.
        </p>
      )}

      {groups.map((group) => (
        <section className="vehicle-picker__group" key={group.vehicleClass}>
          <header>
            <h4>{group.label}</h4>
            <small>{group.capacity}</small>
          </header>
          <div className="vehicle-picker__grid" role="radiogroup" aria-label={`${group.label} options`}>
            {group.vehicles.map((vehicle) => {
              const route = matchRoutePrice(vehicle, destination);
              const price = quotedPriceForVehicle(vehicle, destination);
              const checked = selectedId === vehicle.id;
              return (
                <label
                  key={vehicle.id}
                  className={`vehicle-option vehicle-option--${vehicle.tier.toLowerCase()} ${checked ? "is-selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="vehicleId"
                    value={vehicle.id}
                    checked={checked}
                    required={matching.length > 0}
                    onChange={() => setSelectedId(vehicle.id)}
                  />
                  <span className="vehicle-option__tier">{VEHICLE_TIER_LABELS[vehicle.tier]}</span>
                  {vehicle.recommended && <span className="vehicle-option__badge">Best value</span>}
                  <strong>{vehicle.name}</strong>
                  <p>{vehicle.shortDescription}</p>
                  <ul>
                    <li>{vehicle.minPassengers}–{vehicle.maxPassengers} people</li>
                    <li>{vehicle.luggagePieces} bags</li>
                    {vehicle.features.slice(0, 2).map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <div className="vehicle-option__price">
                    <b>{formatUSD(price)}</b>
                    <small>{route ? `CMB → ${route.destination}` : "from this fare"}</small>
                  </div>
                </label>
              );
            })}
          </div>
        </section>
      ))}

      {selected && (
        <>
          <input type="hidden" name="vehicleType" value={formatVehicleChoice(selected)} />
          <input type="hidden" name="estimatedAmountUSD" value={quotedPriceForVehicle(selected, destination)} />
        </>
      )}
    </div>
  );
}
