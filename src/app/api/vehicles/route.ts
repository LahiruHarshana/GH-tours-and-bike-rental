import { apiSuccess, handleApiError } from "@/lib/api";
import { getAirportVehicles } from "@/lib/data";

export async function GET() {
  try {
    const vehicles = await getAirportVehicles();
    return apiSuccess(vehicles);
  } catch (error) {
    return handleApiError(error);
  }
}
