import type { AirportVehicleDTO, VehicleClass, VehicleTier } from "@/types";

export const VEHICLE_CLASS_LABELS: Record<VehicleClass, string> = {
  CAR: "Car",
  VAN: "Van",
  MINIBUS: "Minibus",
};

export const VEHICLE_CLASS_CAPACITY: Record<VehicleClass, string> = {
  CAR: "1–3 travellers",
  VAN: "1–7 travellers",
  MINIBUS: "8–18 travellers",
};

export const VEHICLE_TIER_LABELS: Record<VehicleTier, string> = {
  BUDGET: "Budget",
  STANDARD: "Standard",
  LUXURY: "Luxury",
};

const CLASS_ORDER: VehicleClass[] = ["CAR", "VAN", "MINIBUS"];
const TIER_ORDER: VehicleTier[] = ["BUDGET", "STANDARD", "LUXURY"];

export function formatVehicleChoice(vehicle: Pick<AirportVehicleDTO, "name" | "vehicleClass" | "tier">) {
  return `${vehicle.name} · ${VEHICLE_TIER_LABELS[vehicle.tier]} ${VEHICLE_CLASS_LABELS[vehicle.vehicleClass]}`;
}

export function vehiclesForGuests(vehicles: AirportVehicleDTO[], guests: number) {
  return vehicles
    .filter((vehicle) => guests >= vehicle.minPassengers && guests <= vehicle.maxPassengers)
    .sort((a, b) => {
      const classDiff = CLASS_ORDER.indexOf(a.vehicleClass) - CLASS_ORDER.indexOf(b.vehicleClass);
      if (classDiff !== 0) return classDiff;
      const tierDiff = TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
      if (tierDiff !== 0) return tierDiff;
      return a.sortOrder - b.sortOrder || a.priceFromUSD - b.priceFromUSD;
    });
}

export function groupVehiclesByClass(vehicles: AirportVehicleDTO[]) {
  return CLASS_ORDER.map((vehicleClass) => ({
    vehicleClass,
    label: VEHICLE_CLASS_LABELS[vehicleClass],
    capacity: VEHICLE_CLASS_CAPACITY[vehicleClass],
    vehicles: vehicles.filter((vehicle) => vehicle.vehicleClass === vehicleClass),
  })).filter((group) => group.vehicles.length > 0);
}

export function matchRoutePrice(vehicle: AirportVehicleDTO, destination?: string) {
  const query = destination?.trim().toLowerCase();
  if (!query) return undefined;
  return vehicle.routePrices.find((route) => {
    const name = route.destination.trim().toLowerCase();
    return query.includes(name) || name.includes(query);
  });
}

export function quotedPriceForVehicle(vehicle: AirportVehicleDTO, destination?: string) {
  return matchRoutePrice(vehicle, destination)?.priceUSD ?? vehicle.priceFromUSD;
}

export function resolveInitialVehicle(
  vehicles: AirportVehicleDTO[],
  guests: number,
  preferredClass?: VehicleClass | string,
  preferredId?: string,
) {
  const matching = vehiclesForGuests(vehicles, guests);
  if (preferredId) {
    const byId = matching.find((vehicle) => vehicle.id === preferredId);
    if (byId) return byId;
  }
  if (preferredClass === "CAR" || preferredClass === "VAN" || preferredClass === "MINIBUS") {
    const inClass = matching.filter((vehicle) => vehicle.vehicleClass === preferredClass);
    return inClass.find((vehicle) => vehicle.tier === "STANDARD") ?? inClass[0] ?? matching[0];
  }
  return matching.find((vehicle) => vehicle.recommended) ?? matching[0];
}
