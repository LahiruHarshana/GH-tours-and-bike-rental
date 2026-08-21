import type {
  AirportDestination,
  AirportTaxiId,
  AirportTaxiType,
  AirportVehicleDTO,
  VehicleClass,
  VehicleRoutePrice,
  VehicleTier,
} from "@/types";

export const CMB_AIRPORT = "Bandaranaike International Airport (CMB)";

export const VEHICLE_CLASS_LABELS: Record<VehicleClass, string> = {
  CAR: "Car",
  VAN: "Van",
  MINIBUS: "Bus",
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

function destination(
  id: string,
  name: string,
  region: string,
  duration: string,
  budgetCar: number,
  premiumCar: number,
  van: number,
  covers?: string[],
): AirportDestination {
  return {
    id,
    name,
    region,
    duration,
    covers,
    fares: {
      "budget-car": budgetCar,
      "premium-car": premiumCar,
      van,
    },
  };
}

export const AIRPORT_DESTINATIONS: AirportDestination[] = [
  destination("bentota", "Bentota", "West coast", "1.5–2 hrs", 12000, 14000, 20000, ["Aluthgama", "Beruwala"]),
  destination("hikkaduwa", "Hikkaduwa", "South coast", "2–2.5 hrs", 14000, 16000, 25000, ["Dodanduwa"]),
  destination("galle", "Galle", "South coast", "2–2.5 hrs", 14000, 16000, 25000, ["Unawatuna"]),
  destination("unawatuna", "Unawatuna", "South coast", "2–2.5 hrs", 14000, 16000, 25000),
  destination("weligama", "Weligama", "South coast", "2.5–3 hrs", 16000, 18000, 27000, ["Midigama"]),
  destination("mirissa", "Mirissa", "South coast", "2.5–3 hrs", 16000, 18000, 27000),
  destination("ahangama", "Ahangama", "South coast", "2.5–3 hrs", 16000, 18000, 27000),
  destination("hiriketiya", "Hiriketiya", "South coast", "3–3.5 hrs", 20000, 22000, 30000, ["Dikwella", "Tangalle"]),
  destination("kandy", "Kandy", "Hill country", "3–4 hrs", 20000, 22000, 30000),
  destination("sigiriya", "Sigiriya", "Cultural triangle", "3.5–4.5 hrs", 16000, 18000, 27000),
  destination("dambulla", "Dambulla", "Cultural triangle", "3.5–4 hrs", 16000, 18000, 27000),
  destination("arugam-bay", "Arugam Bay", "East coast", "6–7 hrs", 30000, 35000, 50000, ["Pottuvil"]),
];

const lowestFare = (id: AirportTaxiId) =>
  Math.min(...AIRPORT_DESTINATIONS.map((place) => place.fares[id]));

export const AIRPORT_TAXI_TYPES: AirportTaxiType[] = [
  {
    id: "budget-car",
    vehicleClass: "CAR",
    label: "Budget car",
    minPassengers: 1,
    maxPassengers: 3,
    luggagePieces: 2,
    priceFromLKR: lowestFare("budget-car"),
    shortDescription: "A clean air-conditioned car for 1–3 travellers with light luggage.",
    features: ["Air-conditioned", "Meet and greet", "Flight tracking", "2 bags"],
    capacity: "1–3 travellers",
  },
  {
    id: "premium-car",
    vehicleClass: "CAR",
    label: "Premium car",
    minPassengers: 1,
    maxPassengers: 3,
    luggagePieces: 3,
    priceFromLKR: lowestFare("premium-car"),
    shortDescription: "A more comfortable private sedan after a long flight.",
    features: ["Premium interior", "Bottled water", "Name board pickup", "3 bags"],
    capacity: "1–3 travellers",
    marketingBadge: "Premium comfort",
  },
  {
    id: "van",
    vehicleClass: "VAN",
    label: "Van",
    minPassengers: 1,
    maxPassengers: 7,
    luggagePieces: 7,
    priceFromLKR: lowestFare("van"),
    shortDescription: "The family choice for extra seats, bags and surfboards.",
    features: ["High-roof van", "Child-seat on request", "Surfboard-friendly", "7 bags"],
    capacity: "1–7 travellers",
  },
];

export function formatVehicleChoice(vehicle: Pick<AirportVehicleDTO, "name" | "vehicleClass" | "tier">) {
  return `${vehicle.name} · ${VEHICLE_TIER_LABELS[vehicle.tier]} ${VEHICLE_CLASS_LABELS[vehicle.vehicleClass]}`;
}

export function formatAirportTaxiChoice(taxi: Pick<AirportTaxiType, "label">) {
  return taxi.label;
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

export function matchRoutePrice(vehicle: { routePrices: VehicleRoutePrice[] }, destination?: string) {
  const query = destination?.trim().toLowerCase();
  if (!query) return undefined;
  return vehicle.routePrices.find((route) => {
    const name = route.destination.trim().toLowerCase();
    return query.includes(name) || name.includes(query);
  });
}

export function quotedPriceForVehicle(vehicle: Pick<AirportVehicleDTO, "routePrices" | "priceFromUSD">, destination?: string) {
  return matchRoutePrice(vehicle, destination)?.priceUSD ?? vehicle.priceFromUSD;
}

function normalisedPlace(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

export function matchAirportDestination(destination?: string) {
  const query = normalisedPlace(destination ?? "");
  if (!query) return undefined;

  return AIRPORT_DESTINATIONS.find((place) => {
    const names = [place.name, place.id.replace(/-/g, " "), ...(place.covers ?? [])].map(normalisedPlace);
    return names.some((name) => query === name || query.includes(name) || name.includes(query));
  });
}

export function quotedPriceForTaxi(taxi: AirportTaxiType, destination?: string) {
  const place = matchAirportDestination(destination);
  if (!place) return undefined;
  return place.fares[taxi.id];
}

export function taxiFitsGuests(taxi: AirportTaxiType, guests: number) {
  return guests >= taxi.minPassengers && guests <= taxi.maxPassengers;
}

export function suggestAirportTaxiType(guests: number) {
  if (guests >= 4) return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "van") ?? AIRPORT_TAXI_TYPES[2];
  return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "budget-car") ?? AIRPORT_TAXI_TYPES[0];
}

export function resolveAirportTaxiType(vehicleType?: string, vehicleId?: string) {
  const haystack = `${vehicleId ?? ""} ${vehicleType ?? ""}`.trim().toUpperCase();
  if (!haystack) return undefined;

  const byId = AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === (vehicleId ?? "").toLowerCase());
  if (byId) return byId;

  if (/\bPREMIUM\b|\bLUXURY\b/.test(haystack)) {
    return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "premium-car");
  }
  if (/\bVAN\b|\bBUS\b|\bMINIBUS\b/.test(haystack)) {
    return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "van");
  }
  if (/\bBUDGET\b|\bCAR\b|\bTAXI\b|\bSEDAN\b/.test(haystack)) {
    return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "budget-car");
  }
  return undefined;
}

export function resolveInitialTaxi(guests: number, preferredClass?: string, preferredId?: string) {
  const resolved = resolveAirportTaxiType(preferredClass, preferredId);
  if (resolved && taxiFitsGuests(resolved, guests || 1)) return resolved;
  return suggestAirportTaxiType(guests || 1);
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
