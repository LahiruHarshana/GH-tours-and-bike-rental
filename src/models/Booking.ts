import { InferSchemaType, Schema, model, models } from "mongoose";

const bookingSchema = new Schema(
  {
    bookingCode: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: ["TOUR", "AIRPORT", "BIKE"], required: true, index: true },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    country: { type: String, trim: true },
    sourceTitle: { type: String, trim: true },
    sourceId: { type: String, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "DECLINED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PARTIAL", "PAID", "REFUNDED"],
      default: "UNPAID",
      index: true,
    },
    totalAmountUSD: { type: Number, min: 0 },
    travelDate: { type: Date, required: true, index: true },
    returnDate: { type: Date },
    guests: { type: Number, min: 1 },
    pickupLocation: { type: String, trim: true },
    dropoffLocation: { type: String, trim: true },
    flightNumber: { type: String, trim: true },
    arrivalTime: { type: String, trim: true },
    vehicleType: { type: String, trim: true },
    vehicleId: { type: String, trim: true },
    estimatedAmountUSD: { type: Number, min: 0 },
    licenseNumber: { type: String, trim: true },
    notes: { type: String, trim: true },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true },
);

bookingSchema.index({ createdAt: -1, status: 1 });

export type BookingDocument = InferSchemaType<typeof bookingSchema>;
export const Booking = models.Booking || model("Booking", bookingSchema);
