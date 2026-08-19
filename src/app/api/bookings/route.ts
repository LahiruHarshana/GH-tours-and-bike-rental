import { randomBytes } from "crypto";
import { apiSuccess, handleApiError } from "@/lib/api";
import { connectDB } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { Booking } from "@/models/Booking";
import { getWebsiteContent } from "@/lib/data";
import { buildAdminRequestMessage, buildWhatsAppUrl } from "@/lib/whatsapp-links";

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
    const content = await getWebsiteContent();
    const message = buildAdminRequestMessage({
      bookingCode: booking.bookingCode,
      type: booking.type,
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      country: booking.country,
      sourceTitle: booking.sourceTitle,
      travelDate: booking.travelDate,
      returnDate: booking.returnDate,
      guests: booking.guests,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      flightNumber: booking.flightNumber,
      arrivalTime: booking.arrivalTime,
      vehicleType: booking.vehicleType,
      estimatedAmountUSD: booking.estimatedAmountUSD,
      notes: booking.notes,
    });
    return apiSuccess(
      {
        bookingCode: booking.bookingCode,
        status: booking.status,
        message: "Booking request received.",
        whatsappUrl: buildWhatsAppUrl(content.global.whatsapp, message),
      },
      201,
    );
  } catch (error) {
    return handleApiError(error);
  }
}
