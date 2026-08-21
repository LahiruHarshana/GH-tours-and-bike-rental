import type { AirportTaxiType, AirportVehicleDTO, VehicleClass, VehicleRoutePrice, VehicleTier } from "@/types";

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

const CMB_ROUTES = {
  CAR: [
    { destination: "Weligama", duration: "2.5–3 hrs", priceUSD: 65 },
    { destination: "Galle", duration: "2–2.5 hrs", priceUSD: 62 },
    { destination: "Kandy", duration: "3–4 hrs", priceUSD: 80 },
    { destination: "Ella", duration: "5–6 hrs", priceUSD: 125 },
    { destination: "Colombo", duration: "45–70 min", priceUSD: 35 },
  ],
  VAN: [
    { destination: "Weligama", duration: "2.5–3 hrs", priceUSD: 90 },
    { destination: "Galle", duration: "2–2.5 hrs", priceUSD: 85 },
    { destination: "Kandy", duration: "3–4 hrs", priceUSD: 110 },
    { destination: "Ella", duration: "5–6 hrs", priceUSD: 155 },
    { destination: "Colombo", duration: "45–70 min", priceUSD: 48 },
  ],
  MINIBUS: [
    { destination: "Weligama", duration: "2.5–3 hrs", priceUSD: 140 },
    { destination: "Galle", duration: "2–2.5 hrs", priceUSD: 135 },
    { destination: "Kandy", duration: "3–4 hrs", priceUSD: 170 },
    { destination: "Ella", duration: "5–6 hrs", priceUSD: 230 },
    { destination: "Colombo", duration: "45–70 min", priceUSD: 80 },
  ],
} satisfies Record<VehicleClass, VehicleRoutePrice[]>;

export const AIRPORT_TAXI_TYPES: AirportTaxiType[] = [
  {
    id: "car",
    vehicleClass: "CAR",
    emoji: "🚗",
    label: "Car",
    minPassengers: 1,
    maxPassengers: 3,
    luggagePieces: 3,
    priceFromUSD: 50,
    routePrices: CMB_ROUTES.CAR,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    ],
    shortDescription: "A private sedan for light luggage and small groups after a long flight.",
    features: ["Air-conditioned", "Meet and greet", "Flight tracking", "3 bags"],
    capacity: VEHICLE_CLASS_CAPACITY.CAR,
  },
  {
    id: "van",
    vehicleClass: "VAN",
    emoji: "🚐",
    label: "Van",
    minPassengers: 1,
    maxPassengers: 7,
    luggagePieces: 7,
    priceFromUSD: 75,
    routePrices: CMB_ROUTES.VAN,
    image: "https://images.unsplash.com/photo-1464219782434-3473fb1918bc?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1464219782434-3473fb1918bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527786356703-4b32d19c0903?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80",
    ],
    shortDescription: "The usual family choice — private, comfortable and ready for south-coast luggage.",
    features: ["High-roof van", "Child-seat on request", "Surfboard-friendly", "7 bags"],
    capacity: VEHICLE_CLASS_CAPACITY.VAN,
  },
  {
    id: "bus",
    vehicleClass: "MINIBUS",
    emoji: "🚌",
    label: "Bus",
    minPassengers: 8,
    maxPassengers: 18,
    luggagePieces: 16,
    priceFromUSD: 110,
    routePrices: CMB_ROUTES.MINIBUS,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    photos: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544620341-11cb2cd07adc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=1200&q=80",
    ],
    shortDescription: "A roomy group transfer for larger parties heading to the coast, hills or city.",
    features: ["Up to 18 seats", "Meet and greet", "Flight tracking", "Generous luggage"],
    capacity: VEHICLE_CLASS_CAPACITY.MINIBUS,
  },
];

export function formatVehicleChoice(vehicle: Pick<AirportVehicleDTO, "name" | "vehicleClass" | "tier">) {
  return `${vehicle.name} · ${VEHICLE_TIER_LABELS[vehicle.tier]} ${VEHICLE_CLASS_LABELS[vehicle.vehicleClass]}`;
}

export function formatAirportTaxiChoice(taxi: Pick<AirportTaxiType, "emoji" | "label">) {
  return `${taxi.emoji} ${taxi.label}`;
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

export function quotedPriceForTaxi(taxi: AirportTaxiType, destination?: string) {
  return matchRoutePrice(taxi, destination)?.priceUSD ?? taxi.priceFromUSD;
}

export function taxiFitsGuests(taxi: AirportTaxiType, guests: number) {
  if (taxi.vehicleClass === "MINIBUS") return guests >= 1;
  return guests >= taxi.minPassengers && guests <= taxi.maxPassengers;
}

export function suggestAirportTaxiType(guests: number) {
  if (guests >= 8) return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "bus") ?? AIRPORT_TAXI_TYPES[2];
  if (guests >= 4) return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "van") ?? AIRPORT_TAXI_TYPES[1];
  return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "car") ?? AIRPORT_TAXI_TYPES[0];
}

export function resolveAirportTaxiType(vehicleType?: string, vehicleId?: string) {
  const haystack = `${vehicleId ?? ""} ${vehicleType ?? ""}`.trim().toUpperCase();
  if (!haystack) return undefined;

  const byId = AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === (vehicleId ?? "").toLowerCase() || taxi.vehicleClass === vehicleId);
  if (byId) return byId;

  if (/\bMINIBUS\b|\bBUS\b|\bCOACH\b|🚌/.test(haystack)) {
    return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "bus");
  }
  if (/\bVAN\b|🚐/.test(haystack)) {
    return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "van");
  }
  if (/\bCAR\b|\bTAXI\b|\bSEDAN\b|🚗/.test(haystack)) {
    return AIRPORT_TAXI_TYPES.find((taxi) => taxi.id === "car");
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
