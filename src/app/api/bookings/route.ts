import { randomBytes } from "crypto";
import { apiSuccess, handleApiError } from "@/lib/api";
import { connectDB } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { Booking } from "@/models/Booking";

function bookingCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `GH-${date}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const payload = bookingSchema.parse(await request.json());
    await connectDB();
    const booking = await Booking.create({
      ...payload,
      bookingCode: bookingCode(),
      status: "PENDING",
      paymentStatus: "UNPAID",
    });
    return apiSuccess(
      {
        bookingCode: booking.bookingCode,
        status: booking.status,
        message: "Booking request received.",
      },
      201,
    );
  } catch (error) {
    return handleApiError(error);
  }
}
