import { InferSchemaType, Schema, model, models } from "mongoose";

const routePriceSchema = new Schema(
  {
    destination: { type: String, required: true, trim: true },
    duration: { type: String, trim: true },
    priceUSD: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const airportVehicleSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    vehicleClass: { type: String, enum: ["CAR", "VAN", "MINIBUS"], required: true, index: true },
    tier: { type: String, enum: ["BUDGET", "STANDARD", "LUXURY"], required: true, index: true },
    minPassengers: { type: Number, required: true, min: 1, max: 40 },
    maxPassengers: { type: Number, required: true, min: 1, max: 40 },
    luggagePieces: { type: Number, required: true, min: 0, max: 40 },
    priceFromUSD: { type: Number, required: true, min: 0 },
    routePrices: { type: [routePriceSchema], default: [] },
    image: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
    recommended: { type: Boolean, default: false, index: true },
    available: { type: Boolean, default: true, index: true },
    status: { type: String, enum: ["DRAFT", "PUBLISHED"], default: "DRAFT", index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

airportVehicleSchema.index({ status: 1, available: 1, sortOrder: 1 });

export type AirportVehicleDocument = InferSchemaType<typeof airportVehicleSchema>;
export const AirportVehicle = models.AirportVehicle || model("AirportVehicle", airportVehicleSchema);
