import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { airportVehicleSchema } from "@/lib/validation";
import { AirportVehicle } from "@/models/AirportVehicle";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const payload = airportVehicleSchema.parse(await request.json());
    await connectDB();
    if (await AirportVehicle.exists({ slug: payload.slug, _id: { $ne: id } })) {
      return apiError("A vehicle with this slug already exists.", 409);
    }
    const vehicle = await AirportVehicle.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!vehicle) return apiError("Vehicle not found.", 404);
    return apiSuccess({ id: String(vehicle._id), slug: vehicle.slug });
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
    const vehicle = await AirportVehicle.findByIdAndDelete(id);
    if (!vehicle) return apiError("Vehicle not found.", 404);
    return apiSuccess({ deleted: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
