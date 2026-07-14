import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { tourSchema } from "@/lib/validation";
import { TourPackage } from "@/models/TourPackage";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();
    const tours = await TourPackage.find().sort({ createdAt: -1 }).lean();
    return apiSuccess(tours);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const payload = tourSchema.parse(await request.json());
    await connectDB();
    const exists = await TourPackage.exists({ slug: payload.slug });
    if (exists) return apiError("A tour with this slug already exists.", 409);
    const tour = await TourPackage.create(payload);
    return apiSuccess({ id: String(tour._id), slug: tour.slug }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
