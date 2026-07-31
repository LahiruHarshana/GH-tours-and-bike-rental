import { apiSuccess, handleApiError } from "@/lib/api";
import { connectDB } from "@/lib/db";
import { customTourRequestSchema } from "@/lib/validation";
import { CustomTourRequest } from "@/models/CustomTourRequest";
import { getWebsiteContent } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const payload = customTourRequestSchema.parse(await request.json());
    await connectDB();
    const customTour = await CustomTourRequest.create({
      ...payload,
      status: "PENDING",
    });

    const content = await getWebsiteContent();
    
    // Create a whatsapp message text to optionally direct the user
    const text = `Hi ${content.global.brandName}, I just submitted a custom tour request. My name is ${customTour.customerName}. Looking forward to hearing from you.`;
    const whatsappUrl = `https://wa.me/${content.global.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;

    return apiSuccess(
      {
        id: customTour._id,
        status: customTour.status,
        message: "Custom tour request received successfully.",
        whatsappUrl,
      },
      201,
    );
  } catch (error) {
    return handleApiError(error);
  }
}
