import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { bookingStatusSchema } from "@/lib/validation";
import { Booking } from "@/models/Booking";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const payload = bookingStatusSchema.parse(await request.json());
    await connectDB();
    const booking = await Booking.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!booking) return apiError("Booking not found.", 404);
    return apiSuccess({ id: String(booking._id), status: booking.status, paymentStatus: booking.paymentStatus });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
