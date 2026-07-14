import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, message, ...(details ? { details } : {}) },
    { status },
  );
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return apiError("Please check the submitted information.", 422, error.flatten());
  }

  if (error instanceof Error) {
    console.error(error);
    return apiError(error.message || "Unexpected server error.", 500);
  }

  return apiError("Unexpected server error.", 500);
}
