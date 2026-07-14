import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { apiError, apiSuccess, handleApiError } from "@/lib/api";
import { createAdminToken, SESSION_COOKIE } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import { AdminUser } from "@/models/AdminUser";

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    await connectDB();
    const user = await AdminUser.findOne({ email: payload.email, status: "ACTIVE" }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      return apiError("Invalid email or password.", 401);
    }

    const token = await createAdminToken({
      sub: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    user.lastLoginAt = new Date();
    await user.save();
    return apiSuccess({ name: user.name, role: user.role });
  } catch (error) {
    return handleApiError(error);
  }
}
