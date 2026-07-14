import { InferSchemaType, Schema, model, models } from "mongoose";

const itinerarySchema = new Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const tourPackageSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    location: { type: String, required: true, trim: true },
    durationDays: { type: Number, required: true, min: 1 },
    priceFrom: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    highlights: [{ type: String, trim: true }],
    inclusions: [{ type: String, trim: true }],
    exclusions: [{ type: String, trim: true }],
    itinerary: [itinerarySchema],
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT", index: true },
  },
  { timestamps: true },
);

export type TourPackageDocument = InferSchemaType<typeof tourPackageSchema>;
export const TourPackage = models.TourPackage || model("TourPackage", tourPackageSchema);
