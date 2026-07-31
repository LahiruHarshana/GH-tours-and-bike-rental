import { InferSchemaType, Schema, model, models } from "mongoose";

const customTourRequestSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    country: { type: String, trim: true },
    destinations: [{ type: String, required: true, trim: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guests: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, default: 0, min: 0 },
    },
    accommodationPreference: { type: String, trim: true },
    vehiclePreference: { type: String, trim: true },
    additionalNotes: { type: String, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "QUOTED", "ACCEPTED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    quotedPrice: { type: Number, min: 0 },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

customTourRequestSchema.index({ createdAt: -1, status: 1 });

export type CustomTourRequestDocument = InferSchemaType<typeof customTourRequestSchema>;
export const CustomTourRequest = models.CustomTourRequest || model("CustomTourRequest", customTourRequestSchema);
