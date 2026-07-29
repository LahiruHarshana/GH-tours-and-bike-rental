import { randomBytes } from "crypto";
import { apiSuccess, handleApiError } from "@/lib/api";
import { connectDB } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { Booking } from "@/models/Booking";
import { sendAdminBookingNotification } from "@/lib/whatsapp";

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
      notificationStatus: "PENDING",
    });
    const notification = await sendAdminBookingNotification({
      bookingCode: booking.bookingCode,
      type: booking.type,
      customerName: booking.customerName,
      phone: booking.phone,
      travelDate: booking.travelDate,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
    });
    booking.notificationStatus = notification.status;
    if ("error" in notification) booking.notificationError = notification.error;
    if ("messageId" in notification) booking.notificationMessageId = notification.messageId;
    if (notification.status === "SENT") booking.notifiedAt = new Date();
    await booking.save();
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
