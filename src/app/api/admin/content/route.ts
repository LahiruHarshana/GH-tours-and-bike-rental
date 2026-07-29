import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { websiteContentSchema } from "@/lib/validation";
import { WebsiteContent } from "@/models/WebsiteContent";

export async function PATCH(request: Request) {
  try {
    const admin = await requireAdmin();
    const content = websiteContentSchema.parse(await request.json());
    await connectDB();
    await WebsiteContent.findOneAndUpdate(
      { key: "primary" },
      { content, updatedBy: admin.email },
      { upsert: true, new: true, runValidators: true },
    );
    return apiSuccess({ saved: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return apiError("Unauthorized", 401);
    }
    return handleApiError(error);
  }
}

