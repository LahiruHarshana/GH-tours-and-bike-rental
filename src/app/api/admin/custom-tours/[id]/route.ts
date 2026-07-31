import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CustomTourRequest } from "@/models/CustomTourRequest";
import { getAdminSession } from "@/lib/auth";
import { customTourStatusSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAdminSession();
    if (!auth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const resolvedParams = await params;
    await connectDB();
    const customTour = await CustomTourRequest.findById(resolvedParams.id).lean();

    if (!customTour) {
      return NextResponse.json({ success: false, error: "Custom tour request not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: customTour });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAdminSession();
    if (!auth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const payload = customTourStatusSchema.parse(await request.json());
    const resolvedParams = await params;
    await connectDB();
    const customTour = await CustomTourRequest.findByIdAndUpdate(
      resolvedParams.id,
      { $set: payload },
      { new: true, runValidators: true }
    ).lean();

    if (!customTour) {
      return NextResponse.json({ success: false, error: "Custom tour request not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: customTour });
  } catch (error) {
    return handleApiError(error);
  }
}
