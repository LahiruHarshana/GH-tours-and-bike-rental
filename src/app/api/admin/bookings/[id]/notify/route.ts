import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { sendAdminBookingNotification } from "@/lib/whatsapp";
import { Booking } from "@/models/Booking";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await connectDB();
    const booking = await Booking.findById(id);
    if (!booking) return apiError("Booking not found.", 404);

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
    booking.notificationError = "error" in notification ? notification.error : undefined;
    booking.notificationMessageId = "messageId" in notification ? notification.messageId : undefined;
    booking.notifiedAt = notification.status === "SENT" ? new Date() : undefined;
    await booking.save();

    return apiSuccess(notification);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return apiError("Unauthorized", 401);
    }
    return handleApiError(error);
  }
}

