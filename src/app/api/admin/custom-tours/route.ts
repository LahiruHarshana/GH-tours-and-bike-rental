import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CustomTourRequest } from "@/models/CustomTourRequest";
import { getAdminSession } from "@/lib/auth";
import { handleApiError } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const auth = await getAdminSession();
    if (!auth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = parseInt(searchParams.get("skip") || "0");

    await connectDB();
    const customTours = await CustomTourRequest.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await CustomTourRequest.countDocuments();

    return NextResponse.json({
      success: true,
      data: customTours,
      meta: { total, skip, limit },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
