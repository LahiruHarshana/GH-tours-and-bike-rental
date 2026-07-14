import { InferSchemaType, Schema, model, models } from "mongoose";

const bikeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    engineCC: { type: Number, required: true, min: 0 },
    category: { type: String, enum: ["SCOOTER", "MOTORBIKE", "ADVENTURE"], required: true },
    dailyRateUSD: { type: Number, required: true, min: 0 },
    depositUSD: { type: Number, required: true, min: 0 },
    transmission: { type: String, enum: ["AUTOMATIC", "MANUAL"], required: true },
    fuelType: { type: String, enum: ["PETROL", "ELECTRIC"], default: "PETROL" },
    seats: { type: Number, default: 2, min: 1, max: 3 },
    image: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
    available: { type: Boolean, default: true, index: true },
    quantity: { type: Number, default: 1, min: 0 },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT", index: true },
  },
  { timestamps: true },
);

export type BikeDocument = InferSchemaType<typeof bikeSchema>;
export const Bike = models.Bike || model("Bike", bikeSchema);
