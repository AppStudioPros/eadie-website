import { NextResponse } from "next/server";

interface DemoRequest {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  briefingType?: string;
  agency?: string;
  message?: string;
}

const ALLOWED_BRIEFING_TYPES = new Set([
  "overview",
  "demo",
  "pilot",
  "partner",
  "press",
  "other",
]);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: DemoRequest;
  try {
    body = (await request.json()) as DemoRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const organization = (body.organization || "").trim();
  const role = (body.role || "").trim();
  const briefingType = (body.briefingType || "").trim();
  const agency = (body.agency || "").trim();
  const message = (body.message || "").trim();

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  if (!organization)
    return NextResponse.json({ error: "Organization is required" }, { status: 400 });
  if (!briefingType || !ALLOWED_BRIEFING_TYPES.has(briefingType))
    return NextResponse.json({ error: "Briefing type is required" }, { status: 400 });
  if (message.length > 5000)
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });

  const submission = {
    timestamp: new Date().toISOString(),
    name,
    email,
    organization,
    role,
    briefingType,
    agency,
    message,
    userAgent: request.headers.get("user-agent") || "",
  };

  // Log to Vercel runtime logs (visible in dashboard).
  // Wiring to a real email provider (SendGrid, Resend, Postmark) is a follow-up.
  console.log("[EADIE demo request]", JSON.stringify(submission));

  return NextResponse.json({ ok: true }, { status: 200 });
}
