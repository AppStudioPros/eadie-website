import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EADIE_API_URL = process.env.EADIE_API_URL || "http://localhost:8000";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  try {
    const res = await fetch(`${EADIE_API_URL}/scenarios/${encodeURIComponent(key)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) {
      return NextResponse.json(
        { error: "scenario_not_found", message: `No scenario with key '${key}'` },
        { status: 404 }
      );
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: "engine_unhealthy", message: `EADIE engine returned HTTP ${res.status}` },
        { status: 502 }
      );
    }
    return NextResponse.json(await res.json());
  } catch (e) {
    return NextResponse.json(
      { error: "engine_unreachable", message: e instanceof Error ? e.message : "unknown" },
      { status: 503 }
    );
  }
}
