import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EADIE_API_URL = process.env.EADIE_API_URL || "http://localhost:8000";

/**
 * Create a new persistent workspace for a scenario. Returns workspace_id
 * the client uses for all subsequent analyze + chat calls.
 */
export async function POST(request: NextRequest) {
  let body: { scenario_key?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Body must be JSON" },
      { status: 400 }
    );
  }

  if (!body.scenario_key) {
    return NextResponse.json(
      { error: "missing_scenario_key", message: "scenario_key is required" },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${EADIE_API_URL}/workspace`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario_key: body.scenario_key }),
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: "engine_unhealthy",
          message: `EADIE engine returned HTTP ${upstream.status}`,
        },
        { status: 502 }
      );
    }
    return NextResponse.json(await upstream.json());
  } catch (e) {
    return NextResponse.json(
      {
        error: "engine_unreachable",
        message: e instanceof Error ? e.message : "unknown",
      },
      { status: 503 }
    );
  }
}
