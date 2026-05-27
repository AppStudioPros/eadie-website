import { NextResponse } from "next/server";

/**
 * Sandbox connection check proxy.
 *
 * Calls the Python FastAPI service /hello endpoint and returns the JSON to the
 * browser. Used by the SandboxConnectionCheck component on /sandbox to verify
 * the Python backend is reachable.
 *
 * Once Railway is provisioned, set EADIE_API_URL to:
 *   https://api.encoreacquisitionintelligenceengine.com
 *
 * For local dev, run uvicorn locally and set EADIE_API_URL=http://localhost:8000
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EADIE_API_URL = process.env.EADIE_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const res = await fetch(`${EADIE_API_URL}/hello`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Short timeout so a hung Python service doesn't hang the browser
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "engine_unhealthy",
          message: `EADIE engine returned HTTP ${res.status}`,
          upstream_url: EADIE_API_URL,
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      {
        error: "engine_unreachable",
        message,
        upstream_url: EADIE_API_URL,
      },
      { status: 503 }
    );
  }
}
