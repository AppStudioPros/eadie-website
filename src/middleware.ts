import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Demo gate — protects /demo and everything under it with HTTP Basic Auth.
// Single shared password distributed by Dr. Jeff Woodson / Encore Services.
// Set DEMO_PASSWORD in Vercel env to override. Falls back to a default so the
// gate is never accidentally wide open if the env var is missing.

const DEMO_USER = process.env.DEMO_USER || "encore";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "EADIE-Briefing-2026";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/demo")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    try {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      if (sep >= 0) {
        const user = decoded.slice(0, sep);
        const pass = decoded.slice(sep + 1);
        if (user === DEMO_USER && pass === DEMO_PASSWORD) {
          return NextResponse.next();
        }
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="EADIE Demo — Encore Services LLC", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/demo/:path*", "/demo"],
};
