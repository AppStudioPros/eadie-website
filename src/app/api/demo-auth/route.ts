import { NextResponse } from "next/server";

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "EADIE-Briefing-2026";
const SESSION_COOKIE = "eadie_demo_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function sessionTokenFor(password: string): string {
  let h = 5381;
  for (let i = 0; i < password.length; i++) {
    h = ((h << 5) + h + password.charCodeAt(i)) | 0;
  }
  return "v1." + Math.abs(h).toString(36) + "." + password.length.toString(36);
}

const VALID_TOKEN = sessionTokenFor(DEMO_PASSWORD);

interface AuthRequest {
  password?: string;
}

export async function POST(request: Request) {
  let body: AuthRequest;
  try {
    body = (await request.json()) as AuthRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = (body.password || "").trim();
  if (!password) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  // Constant-time-ish comparison
  if (password.length !== DEMO_PASSWORD.length) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  let diff = 0;
  for (let i = 0; i < password.length; i++) {
    diff |= password.charCodeAt(i) ^ DEMO_PASSWORD.charCodeAt(i);
  }
  if (diff !== 0) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: VALID_TOKEN,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
