import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { demoAirportVehicles } from "@/lib/demo-data";
import { AirportVehicle } from "@/models/AirportVehicle";

export async function POST() {
  try {
    await requireAdmin();
    await connectDB();
    let created = 0;
    for (const vehicle of demoAirportVehicles) {
      const { id: _id, ...payload } = vehicle;
      void _id;
      const result = await AirportVehicle.findOneAndUpdate(
        { slug: payload.slug },
        { $setOnInsert: payload },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      if (result) created += 1;
    }
    return apiSuccess({ count: created });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}
