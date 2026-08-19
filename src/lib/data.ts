import { connectDB, hasDatabaseConfig } from "@/lib/db";
import { demoAirportVehicles, demoBikes, demoTours } from "@/lib/demo-data";
import { AirportVehicle } from "@/models/AirportVehicle";
import { Bike } from "@/models/Bike";
import { Booking } from "@/models/Booking";
import { TourPackage } from "@/models/TourPackage";
import { CustomTourRequest } from "@/models/CustomTourRequest";
import { WebsiteContent } from "@/models/WebsiteContent";
import { defaultSiteContent, mergeSiteContent } from "@/lib/site-content";
import type { AirportVehicleDTO, BikeDTO, BookingDTO, TourDTO } from "@/types";

function mapTour(doc: Record<string, unknown>): TourDTO {
  return {
    id: String(doc._id),
    title: String(doc.title),
    slug: String(doc.slug),
    location: String(doc.location),
    durationDays: Number(doc.durationDays),
    priceFrom: Number(doc.priceFrom),
    image: String(doc.image),
    shortDescription: String(doc.shortDescription),
    description: String(doc.description),
    highlights: (doc.highlights as string[]) ?? [],
    inclusions: (doc.inclusions as string[]) ?? [],
    exclusions: (doc.exclusions as string[]) ?? [],
    itinerary: ((doc.itinerary as TourDTO["itinerary"]) ?? []).map((day) => ({
      day: Number(day.day),
      title: String(day.title),
      description: String(day.description),
    })),
    featured: Boolean(doc.featured),
    status: doc.status as TourDTO["status"],
  };
}

function mapBike(doc: Record<string, unknown>): BikeDTO {
  return {
    id: String(doc._id),
    name: String(doc.name),
    slug: String(doc.slug),
    brand: String(doc.brand),
    model: String(doc.model),
    engineCC: Number(doc.engineCC),
    category: doc.category as BikeDTO["category"],
    dailyRateUSD: Number(doc.dailyRateUSD),
    depositUSD: Number(doc.depositUSD),
    transmission: doc.transmission as BikeDTO["transmission"],
    fuelType: doc.fuelType as BikeDTO["fuelType"],
    seats: Number(doc.seats),
    image: String(doc.image),
    features: (doc.features as string[]) ?? [],
    available: Boolean(doc.available),
    quantity: Number(doc.quantity),
    status: doc.status as BikeDTO["status"],
  };
}

export async function getTours(options?: { featured?: boolean; includeDrafts?: boolean; limit?: number }) {
  if (!hasDatabaseConfig()) {
    const tours = demoTours.filter((tour) => !options?.featured || tour.featured);
    return typeof options?.limit === "number" ? tours.slice(0, options.limit) : tours;
  }
  await connectDB();
  const filter: Record<string, unknown> = {};
  if (!options?.includeDrafts) filter.status = "PUBLISHED";
  if (options?.featured) filter.featured = true;
  const query = TourPackage.find(filter).sort({ featured: -1, createdAt: -1 });
  if (typeof options?.limit === "number") query.limit(options.limit);
  const docs = await query.lean();
  return docs.map((doc) => mapTour(doc as unknown as Record<string, unknown>));
}

export async function getTourBySlug(slug: string) {
  if (!hasDatabaseConfig()) return demoTours.find((tour) => tour.slug === slug) ?? null;
  await connectDB();
  const doc = await TourPackage.findOne({ slug, status: "PUBLISHED" }).lean();
  return doc ? mapTour(doc as unknown as Record<string, unknown>) : null;
}

export async function getTourById(id: string) {
  if (!hasDatabaseConfig()) return demoTours.find((tour) => tour.id === id) ?? null;
  await connectDB();
  const doc = await TourPackage.findById(id).lean();
  return doc ? mapTour(doc as unknown as Record<string, unknown>) : null;
}

export async function getBikes(options?: { includeDrafts?: boolean; limit?: number }) {
  if (!hasDatabaseConfig()) return typeof options?.limit === "number" ? demoBikes.slice(0, options.limit) : demoBikes;
  await connectDB();
  const filter = options?.includeDrafts ? {} : { status: "PUBLISHED" };
  const query = Bike.find(filter).sort({ available: -1, createdAt: -1 });
  if (typeof options?.limit === "number") query.limit(options.limit);
  const docs = await query.lean();
  return docs.map((doc) => mapBike(doc as unknown as Record<string, unknown>));
}

export async function getBikeById(id: string) {
  if (!hasDatabaseConfig()) return demoBikes.find((bike) => bike.id === id) ?? null;
  await connectDB();
  const doc = await Bike.findById(id).lean();
  return doc ? mapBike(doc as unknown as Record<string, unknown>) : null;
}

function mapAirportVehicle(doc: Record<string, unknown>): AirportVehicleDTO {
  return {
    id: String(doc._id ?? doc.id),
    name: String(doc.name),
    slug: String(doc.slug),
    vehicleClass: doc.vehicleClass as AirportVehicleDTO["vehicleClass"],
    tier: doc.tier as AirportVehicleDTO["tier"],
    minPassengers: Number(doc.minPassengers),
    maxPassengers: Number(doc.maxPassengers),
    luggagePieces: Number(doc.luggagePieces),
    priceFromUSD: Number(doc.priceFromUSD),
    routePrices: ((doc.routePrices as AirportVehicleDTO["routePrices"]) ?? []).map((route) => ({
      destination: String(route.destination),
      duration: route.duration ? String(route.duration) : undefined,
      priceUSD: Number(route.priceUSD),
    })),
    image: String(doc.image),
    shortDescription: String(doc.shortDescription),
    features: (doc.features as string[]) ?? [],
    recommended: Boolean(doc.recommended),
    available: Boolean(doc.available),
    status: doc.status as AirportVehicleDTO["status"],
    sortOrder: Number(doc.sortOrder ?? 0),
  };
}

export async function getAirportVehicles(options?: { includeDrafts?: boolean }) {
  if (!hasDatabaseConfig()) {
    return options?.includeDrafts ? demoAirportVehicles : demoAirportVehicles.filter((vehicle) => vehicle.status === "PUBLISHED" && vehicle.available);
  }
  await connectDB();
  const filter: Record<string, unknown> = {};
  if (!options?.includeDrafts) {
    filter.status = "PUBLISHED";
    filter.available = true;
  }
  const docs = await AirportVehicle.find(filter).sort({ sortOrder: 1, priceFromUSD: 1 }).lean();
  if (docs.length === 0 && !options?.includeDrafts) {
    return demoAirportVehicles.filter((vehicle) => vehicle.status === "PUBLISHED" && vehicle.available);
  }
  return docs.map((doc) => mapAirportVehicle(doc as unknown as Record<string, unknown>));
}

export async function getAirportVehicleById(id: string) {
  if (!hasDatabaseConfig()) return demoAirportVehicles.find((vehicle) => vehicle.id === id) ?? null;
  await connectDB();
  const doc = await AirportVehicle.findById(id).lean();
  return doc ? mapAirportVehicle(doc as unknown as Record<string, unknown>) : null;
}

export async function getBookings(): Promise<BookingDTO[]> {
  if (!hasDatabaseConfig()) return [];
  await connectDB();
  const docs = await Booking.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    bookingCode: String(doc.bookingCode),
    type: doc.type as BookingDTO["type"],
    customerName: String(doc.customerName),
    email: String(doc.email),
    phone: String(doc.phone),
    whatsapp: doc.whatsapp ? String(doc.whatsapp) : undefined,
    country: doc.country ? String(doc.country) : undefined,
    sourceTitle: doc.sourceTitle ? String(doc.sourceTitle) : undefined,
    status: doc.status as BookingDTO["status"],
    paymentStatus: doc.paymentStatus as BookingDTO["paymentStatus"],
    totalAmountUSD: doc.totalAmountUSD ? Number(doc.totalAmountUSD) : undefined,
    travelDate: new Date(doc.travelDate as Date).toISOString(),
    returnDate: doc.returnDate ? new Date(doc.returnDate as Date).toISOString() : undefined,
    guests: doc.guests ? Number(doc.guests) : undefined,
    pickupLocation: doc.pickupLocation ? String(doc.pickupLocation) : undefined,
    dropoffLocation: doc.dropoffLocation ? String(doc.dropoffLocation) : undefined,
    flightNumber: doc.flightNumber ? String(doc.flightNumber) : undefined,
    arrivalTime: doc.arrivalTime ? String(doc.arrivalTime) : undefined,
    vehicleType: doc.vehicleType ? String(doc.vehicleType) : undefined,
    vehicleId: doc.vehicleId ? String(doc.vehicleId) : undefined,
    estimatedAmountUSD: doc.estimatedAmountUSD ? Number(doc.estimatedAmountUSD) : undefined,
    notes: doc.notes ? String(doc.notes) : undefined,
    adminNotes: doc.adminNotes ? String(doc.adminNotes) : undefined,
    createdAt: new Date(doc.createdAt as Date).toISOString(),
  }));
}

export async function getWebsiteContent() {
  if (!hasDatabaseConfig()) return defaultSiteContent;
  await connectDB();
  const doc = await WebsiteContent.findOne({ key: "primary" }).lean();
  return mergeSiteContent(doc?.content as Parameters<typeof mergeSiteContent>[0]);
}

export async function getDashboardStats() {
  if (!hasDatabaseConfig()) {
    return { totalBookings: 0, pendingBookings: 0, publishedTours: demoTours.length, availableBikes: demoBikes.length, revenue: 0, pendingCustomTours: 0 };
  }
  await connectDB();
  const [totalBookings, pendingBookings, publishedTours, availableBikes, paid, pendingCustomTours] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "PENDING" }),
    TourPackage.countDocuments({ status: "PUBLISHED" }),
    Bike.countDocuments({ status: "PUBLISHED", available: true }),
    Booking.aggregate([{ $match: { paymentStatus: "PAID" } }, { $group: { _id: null, total: { $sum: "$totalAmountUSD" } } }]),
    CustomTourRequest.countDocuments({ status: "PENDING" }),
  ]);
  return {
    totalBookings,
    pendingBookings,
    publishedTours,
    availableBikes,
    revenue: Number(paid[0]?.total ?? 0),
    pendingCustomTours,
  };
}

export async function getCustomTours() {
  if (!hasDatabaseConfig()) return [];
  await connectDB();
  const docs = await CustomTourRequest.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    customerName: String(doc.customerName),
    email: String(doc.email),
    phone: String(doc.phone),
    whatsapp: doc.whatsapp ? String(doc.whatsapp) : undefined,
    country: doc.country ? String(doc.country) : undefined,
    destinations: doc.destinations as string[],
    startDate: new Date(doc.startDate as Date).toISOString(),
    endDate: new Date(doc.endDate as Date).toISOString(),
    guests: doc.guests as { adults: number; children: number },
    accommodationPreference: doc.accommodationPreference ? String(doc.accommodationPreference) : undefined,
    vehiclePreference: doc.vehiclePreference ? String(doc.vehiclePreference) : undefined,
    additionalNotes: doc.additionalNotes ? String(doc.additionalNotes) : undefined,
    status: doc.status as string,
    quotedPrice: doc.quotedPrice ? Number(doc.quotedPrice) : undefined,
    adminNotes: doc.adminNotes ? String(doc.adminNotes) : undefined,
    createdAt: new Date(doc.createdAt as Date).toISOString(),
  }));
}

