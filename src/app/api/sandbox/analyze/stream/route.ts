import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 300; // allow up to 5 minutes for full streaming analysis

const EADIE_API_URL = process.env.EADIE_API_URL || "http://localhost:8000";

/**
 * Proxy the SSE analyze stream from the Python backend through to the browser.
 * Keeps the auth cookie + middleware gate in place; the actual streaming work
 * happens on the Python side.
 */
export async function POST(request: NextRequest) {
  let body: { scenario_key?: string; workspace_id?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "invalid_json", message: "Request body must be JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!body.scenario_key) {
    return new Response(
      JSON.stringify({ error: "missing_scenario_key", message: "Specify scenario_key in the request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const upstream = await fetch(`${EADIE_API_URL}/analyze/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario_key: body.scenario_key,
        workspace_id: body.workspace_id,
      }),
      // No timeout signal; long-running stream by design
    });

    if (!upstream.ok || !upstream.body) {
      return new Response(
        JSON.stringify({
          error: "engine_unhealthy",
          message: `EADIE engine returned HTTP ${upstream.status}`,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Pipe the SSE stream straight through
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "engine_unreachable",
        message: e instanceof Error ? e.message : "unknown",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}
