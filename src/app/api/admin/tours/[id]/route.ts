import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { tourSchema } from "@/lib/validation";
import { TourPackage } from "@/models/TourPackage";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const payload = tourSchema.parse(await request.json());
    await connectDB();
    const duplicate = await TourPackage.exists({ slug: payload.slug, _id: { $ne: id } });
    if (duplicate) return apiError("A tour with this slug already exists.", 409);
    const tour = await TourPackage.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!tour) return apiError("Tour not found.", 404);
    return apiSuccess({ id: String(tour._id), slug: tour.slug });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await connectDB();
    const tour = await TourPackage.findByIdAndDelete(id);
    if (!tour) return apiError("Tour not found.", 404);
    return apiSuccess({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
