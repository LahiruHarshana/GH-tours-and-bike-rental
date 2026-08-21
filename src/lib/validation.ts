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
    vehicleId: optionalText,
    estimatedAmountUSD: z.preprocess(
      (value: unknown) => (value === "" || value === null || value === undefined ? undefined : value),
      z.coerce.number().min(0).optional(),
    ),
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
      if (!data.guests) {
        ctx.addIssue({ code: "custom", path: ["guests"], message: "Passenger count is required." });
      }
      if (!data.vehicleType && !data.vehicleId) {
        ctx.addIssue({ code: "custom", path: ["vehicleType"], message: "Please choose a car, van or bus." });
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

export const airportVehicleSchema = z.object({
  name: z.string().trim().min(2).max(140),
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9-]+$/),
  vehicleClass: z.enum(["CAR", "VAN", "MINIBUS"]),
  tier: z.enum(["BUDGET", "STANDARD", "LUXURY"]),
  minPassengers: z.coerce.number().int().min(1).max(40),
  maxPassengers: z.coerce.number().int().min(1).max(40),
  luggagePieces: z.coerce.number().int().min(0).max(40),
  priceFromUSD: z.coerce.number().min(0),
  routePrices: z
    .array(
      z.object({
        destination: z.string().trim().min(2).max(80),
        duration: optionalText,
        priceUSD: z.coerce.number().min(0),
      }),
    )
    .max(20)
    .default([]),
  image: z.string().trim().min(1).max(500),
  shortDescription: z.string().trim().min(12).max(260),
  features: z.array(z.string().trim().min(1)).max(20),
  recommended: z.boolean().default(false),
  available: z.boolean().default(true),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
}).superRefine((data, ctx) => {
  if (data.maxPassengers < data.minPassengers) {
    ctx.addIssue({ code: "custom", path: ["maxPassengers"], message: "Maximum passengers must be at least the minimum." });
  }
});

export const bookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "DECLINED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  paymentStatus: z.enum(["UNPAID", "PARTIAL", "PAID", "REFUNDED"]),
  totalAmountUSD: z.coerce.number().min(0).optional(),
  adminNotes: optionalText,
});

const contentText = z.string().trim().min(1).max(2000);
const contentImage = z.string().trim().min(1).max(500);

export const customTourRequestSchema = z
  .object({
    customerName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().toLowerCase(),
    phone: z.string().trim().min(7).max(30),
    whatsapp: optionalText,
    country: optionalText,
    destinations: z.array(z.string().trim().min(2)).min(1).max(20),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    guests: z.object({
      adults: z.coerce.number().int().min(1).max(30),
      children: z.coerce.number().int().min(0).max(30).default(0),
    }),
    accommodationPreference: optionalText,
    vehiclePreference: optionalText,
    additionalNotes: optionalText,
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({ code: "custom", path: ["endDate"], message: "End date must be after start date." });
    }
  });

export const customTourStatusSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "QUOTED", "ACCEPTED", "REJECTED"]),
  quotedPrice: z.coerce.number().min(0).optional(),
  adminNotes: optionalText,
});

export const websiteContentSchema = z.object({
  global: z.object({
    brandName: contentText.max(80),
    footerLead: contentText.max(160),
    footerTagline: contentText.max(200),
    address: contentText.max(240),
    phone: contentText.max(40),
    whatsapp: contentText.max(30),
    email: z.string().trim().email().max(200),
  }),
  home: z.object({
    heroEyebrow: contentText.max(120),
    heroTitle: contentText.max(160),
    heroImage: contentImage,
    heroImageAlt: contentText.max(240),
    heroCaption: contentText.max(120),
    heroPromise: contentText,
    assurances: z.array(contentText.max(100)).min(1).max(8),
    experiencesEyebrow: contentText.max(120),
    experiencesTitle: contentText.max(180),
    experiencesCopy: contentText,
    chooserEyebrow: contentText.max(120),
    chooserTitle: contentText.max(180),
    chooserCopy: contentText,
    bikeEyebrow: contentText.max(120),
    bikeTitle: contentText.max(180),
    airportCardTitle: contentText.max(180),
    airportCardCopy: contentText,
    proofTitle: contentText.max(180),
    proofCopy: contentText,
    guestStats: z.array(z.object({
      value: contentText.max(40),
      label: contentText.max(100),
      detail: contentText.max(240),
    })).min(1).max(6),
    testimonial: contentText,
    testimonialByline: contentText.max(240),
    storyEyebrow: contentText.max(120),
    storyTitle: contentText.max(120),
    storyImage: contentImage,
    storyImageAlt: contentText.max(240),
    storyMovements: z.array(contentText.max(40)).min(1).max(8),
    finalEyebrow: contentText.max(120),
    finalTitle: contentText.max(180),
    finalAccent: contentText.max(80),
    finalCopy: contentText,
  }),
});
