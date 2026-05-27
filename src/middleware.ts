import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Demo gate — cookie-based session after branded login at /demo/login.
// Single shared password distributed by Encore Services. Override via env.

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "Encore2026";
const SESSION_COOKIE = "eadie_demo_session";

// Session token = sha-256-ish marker derived from the password. If the password
// rotates via env, old cookies stop working automatically.
function sessionTokenFor(password: string): string {
  // Lightweight deterministic token (not crypto-grade, just a stable marker)
  let h = 5381;
  for (let i = 0; i < password.length; i++) {
    h = ((h << 5) + h + password.charCodeAt(i)) | 0;
  }
  return "v1." + Math.abs(h).toString(36) + "." + password.length.toString(36);
}

const VALID_TOKEN = sessionTokenFor(DEMO_PASSWORD);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard the /demo branch (static walkthrough) AND the /sandbox branch
  // (working Mid-Demo). Both share the same auth gate / cookie.
  const isGuarded = pathname.startsWith("/demo") || pathname.startsWith("/sandbox") || pathname.startsWith("/api/sandbox");
  if (!isGuarded) {
    return NextResponse.next();
  }

  // Always allow login page + its API
  if (pathname === "/demo/login" || pathname.startsWith("/api/demo-auth")) {
    return NextResponse.next();
  }

  // Check session cookie
  const cookie = request.cookies.get(SESSION_COOKIE);
  if (cookie && cookie.value === VALID_TOKEN) {
    return NextResponse.next();
  }

  // For API requests under /api/sandbox, return 401 JSON instead of redirect
  if (pathname.startsWith("/api/sandbox")) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // No valid session — redirect to login, preserve original destination
  const loginUrl = new URL("/demo/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/demo/:path*", "/sandbox/:path*", "/api/sandbox/:path*"],
};
