export type BookingType = "TOUR" | "AIRPORT" | "BIKE";
export type VehicleClass = "CAR" | "VAN" | "MINIBUS";
export type VehicleTier = "BUDGET" | "STANDARD" | "LUXURY";

export type VehicleRoutePrice = {
  destination: string;
  duration?: string;
  priceUSD: number;
};

export type AirportVehicleDTO = {
  id: string;
  name: string;
  slug: string;
  vehicleClass: VehicleClass;
  tier: VehicleTier;
  minPassengers: number;
  maxPassengers: number;
  luggagePieces: number;
  priceFromUSD: number;
  routePrices: VehicleRoutePrice[];
  image: string;
  shortDescription: string;
  features: string[];
  recommended: boolean;
  available: boolean;
  status: "DRAFT" | "PUBLISHED";
  sortOrder: number;
};

export type AirportTaxiId = "budget-car" | "premium-car" | "van";

export type AirportTaxiType = {
  id: AirportTaxiId;
  vehicleClass: Extract<VehicleClass, "CAR" | "VAN">;
  label: string;
  minPassengers: number;
  maxPassengers: number;
  luggagePieces: number;
  priceFromLKR: number;
  shortDescription: string;
  features: string[];
  capacity: string;
};

export type AirportDestination = {
  id: string;
  name: string;
  region: string;
  duration: string;
  covers?: string[];
  fares: Record<AirportTaxiId, number>;
};

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID" | "REFUNDED";

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type TourDTO = {
  id: string;
  title: string;
  slug: string;
  location: string;
  durationDays: number;
  priceFrom: number;
  image: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
};

export type BikeDTO = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  engineCC: number;
  category: "SCOOTER" | "MOTORBIKE" | "ADVENTURE";
  dailyRateUSD: number;
  depositUSD: number;
  transmission: "AUTOMATIC" | "MANUAL";
  fuelType: "PETROL" | "ELECTRIC";
  seats: number;
  image: string;
  features: string[];
  available: boolean;
  quantity: number;
  status: "DRAFT" | "PUBLISHED";
};

export type BookingDTO = {
  id: string;
  bookingCode: string;
  type: BookingType;
  customerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country?: string;
  sourceTitle?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmountUSD?: number;
  travelDate: string;
  returnDate?: string;
  guests?: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  flightNumber?: string;
  arrivalTime?: string;
  vehicleType?: string;
  vehicleId?: string;
  estimatedAmountUSD?: number;
  notes?: string;
  adminNotes?: string;
  createdAt: string;
};

export type CustomTourDTO = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country?: string;
  destinations: string[];
  startDate: string;
  endDate: string;
  guests: { adults: number; children: number };
  accommodationPreference?: string;
  vehiclePreference?: string;
  additionalNotes?: string;
  status: string;
  quotedPrice?: number;
  adminNotes?: string;
  createdAt: string;
};
