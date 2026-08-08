import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, SESSION_COOKIE } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 1. Redirect incorrect domain to the correct one
  const hostname = request.headers.get("host") || "";
  if (hostname === "ghtoursandrentals.com" || hostname === "www.ghtoursandrentals.com") {
    url.hostname = "www.ghtoursandbikerentals.com";
    return NextResponse.redirect(url, 301);
  }

  // 2. Protect admin routes
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = await verifyAdminToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
