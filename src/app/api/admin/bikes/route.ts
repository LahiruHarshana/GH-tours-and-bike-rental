import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { bikeSchema } from "@/lib/validation";
import { Bike } from "@/models/Bike";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();
    const bikes = await Bike.find().sort({ createdAt: -1 }).lean();
    return apiSuccess(bikes);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const payload = bikeSchema.parse(await request.json());
    await connectDB();
    if (await Bike.exists({ slug: payload.slug })) return apiError("A bike with this slug already exists.", 409);
    const bike = await Bike.create(payload);
    return apiSuccess({ id: String(bike._id), slug: bike.slug }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
