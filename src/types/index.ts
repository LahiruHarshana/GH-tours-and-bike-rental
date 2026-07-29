export type BookingType = "TOUR" | "AIRPORT" | "BIKE";
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
  notes?: string;
  adminNotes?: string;
  notificationStatus?: "PENDING" | "SENT" | "FAILED" | "SKIPPED";
  notificationError?: string;
  notifiedAt?: string;
  createdAt: string;
};
