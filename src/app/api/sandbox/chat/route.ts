import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 60;

const EADIE_API_URL = process.env.EADIE_API_URL || "http://localhost:8000";

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}
interface ChatPayload {
  scenario_key?: string;
  history?: ChatTurn[];
  message?: string;
}

export async function POST(request: NextRequest) {
  let body: ChatPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Body must be JSON" },
      { status: 400 }
    );
  }

  if (!body.scenario_key || !body.message) {
    return NextResponse.json(
      {
        error: "missing_fields",
        message: "scenario_key and message are required",
      },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${EADIE_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario_key: body.scenario_key,
        history: body.history || [],
        message: body.message,
      }),
      signal: AbortSignal.timeout(45000),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return NextResponse.json(
        {
          error: "engine_unhealthy",
          message: `EADIE engine returned HTTP ${upstream.status}`,
          detail: errText.slice(0, 240),
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
