import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // ✅ Let the request continue
}

// Protect dashboard and all its subroutes
export const config = {
  matcher: ["/dashboard/:path*"],
};
