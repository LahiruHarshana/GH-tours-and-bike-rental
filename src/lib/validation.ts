import { z } from "zod";

const optionalText = z.string().trim().max(1000).optional().or(z.literal(""));

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).max(128),
});

export const bookingSchema = z
  .object({
    type: z.enum(["TOUR", "AIRPORT", "BIKE"]),
    customerName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().toLowerCase(),
    phone: z.string().trim().min(7).max(30),
    whatsapp: optionalText,
    country: optionalText,
    sourceTitle: optionalText,
    sourceId: optionalText,
    travelDate: z.coerce.date(),
    returnDate: z.coerce.date().optional(),
    guests: z.coerce.number().int().min(1).max(30).optional(),
    pickupLocation: optionalText,
    dropoffLocation: optionalText,
    flightNumber: optionalText,
    arrivalTime: optionalText,
    vehicleType: optionalText,
    licenseNumber: optionalText,
    notes: optionalText,
  })
  .superRefine((data, ctx) => {
    if (data.type === "AIRPORT") {
      if (!data.pickupLocation) {
        ctx.addIssue({ code: "custom", path: ["pickupLocation"], message: "Pickup location is required." });
      }
      if (!data.dropoffLocation) {
        ctx.addIssue({ code: "custom", path: ["dropoffLocation"], message: "Drop-off location is required." });
      }
    }
    if (data.type === "BIKE" && !data.returnDate) {
      ctx.addIssue({ code: "custom", path: ["returnDate"], message: "Return date is required." });
    }
    if (data.returnDate && data.returnDate < data.travelDate) {
      ctx.addIssue({ code: "custom", path: ["returnDate"], message: "Return date must be after pickup date." });
    }
  });

export const tourSchema = z.object({
  title: z.string().trim().min(3).max(140),
  slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9-]+$/),
  location: z.string().trim().min(2).max(120),
  durationDays: z.coerce.number().int().min(1).max(60),
  priceFrom: z.coerce.number().min(0),
  image: z.string().trim().min(1).max(500),
  shortDescription: z.string().trim().min(20).max(260),
  description: z.string().trim().min(40).max(5000),
  highlights: z.array(z.string().trim().min(1)).max(30),
  inclusions: z.array(z.string().trim().min(1)).max(30),
  exclusions: z.array(z.string().trim().min(1)).max(30),
  itinerary: z
    .array(
      z.object({
        day: z.coerce.number().int().min(1),
        title: z.string().trim().min(2).max(120),
        description: z.string().trim().min(5).max(1000),
      }),
    )
    .max(60),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const bikeSchema = z.object({
  name: z.string().trim().min(2).max(140),
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9-]+$/),
  brand: z.string().trim().min(2).max(80),
  model: z.string().trim().min(1).max(80),
  engineCC: z.coerce.number().int().min(0).max(2000),
  category: z.enum(["SCOOTER", "MOTORBIKE", "ADVENTURE"]),
  dailyRateUSD: z.coerce.number().min(0),
  depositUSD: z.coerce.number().min(0),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  fuelType: z.enum(["PETROL", "ELECTRIC"]),
  seats: z.coerce.number().int().min(1).max(3),
  image: z.string().trim().min(1).max(500),
  features: z.array(z.string().trim().min(1)).max(30),
  available: z.boolean().default(true),
  quantity: z.coerce.number().int().min(0).max(999),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const bookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  paymentStatus: z.enum(["UNPAID", "PARTIAL", "PAID", "REFUNDED"]),
  totalAmountUSD: z.coerce.number().min(0).optional(),
  adminNotes: optionalText,
});
