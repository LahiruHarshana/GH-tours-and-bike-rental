import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "gh_admin_session";

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER";
};

function getSecret() {
  const raw = process.env.AUTH_SECRET;
  if (!raw && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is required in production.");
  }
  return new TextEncoder().encode(
    raw ?? "development-only-secret-change-before-deployment-123456",
  );
}

export async function createAdminToken(payload: AdminSession) {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecret());
}

export async function verifyAdminToken(token?: string | null): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || !payload.email || !payload.name || !payload.role) return null;
    if (payload.role !== "ADMIN" && payload.role !== "MANAGER") return null;
    return {
      sub: payload.sub,
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifyAdminToken(store.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
