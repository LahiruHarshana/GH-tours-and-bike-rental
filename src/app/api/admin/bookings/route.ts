import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return apiSuccess(bookings);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
