import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { airportVehicleSchema } from "@/lib/validation";
import { AirportVehicle } from "@/models/AirportVehicle";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();
    const vehicles = await AirportVehicle.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    return apiSuccess(vehicles);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const payload = airportVehicleSchema.parse(await request.json());
    await connectDB();
    if (await AirportVehicle.exists({ slug: payload.slug })) {
      return apiError("A vehicle with this slug already exists.", 409);
    }
    const vehicle = await AirportVehicle.create(payload);
    return apiSuccess({ id: String(vehicle._id), slug: vehicle.slug }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
