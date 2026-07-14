import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { bikeSchema } from "@/lib/validation";
import { Bike } from "@/models/Bike";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const payload = bikeSchema.parse(await request.json());
    await connectDB();
    if (await Bike.exists({ slug: payload.slug, _id: { $ne: id } })) return apiError("A bike with this slug already exists.", 409);
    const bike = await Bike.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!bike) return apiError("Bike not found.", 404);
    return apiSuccess({ id: String(bike._id), slug: bike.slug });
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
    const bike = await Bike.findByIdAndDelete(id);
    if (!bike) return apiError("Bike not found.", 404);
    return apiSuccess({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
