import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      return apiError("Cloudinary is not configured. Add the cloud name and unsigned upload preset.", 503);
    }

    const input = await request.formData();
    const file = input.get("file");
    if (!(file instanceof File)) return apiError("Choose an image to upload.", 400);
    if (!file.type.startsWith("image/")) return apiError("Only image files are allowed.", 400);
    if (file.size > MAX_IMAGE_BYTES) return apiError("Images must be 10 MB or smaller.", 400);

    const cloudinaryForm = new FormData();
    cloudinaryForm.set("file", file);
    cloudinaryForm.set("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`, {
      method: "POST",
      body: cloudinaryForm,
    });
    const result = await response.json() as {
      secure_url?: string;
      public_id?: string;
      width?: number;
      height?: number;
      error?: { message?: string };
    };
    if (!response.ok || !result.secure_url) {
      return apiError(result.error?.message ?? "Cloudinary could not upload this image.", 502);
    }
    return apiSuccess({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    return handleApiError(error);
  }
}

