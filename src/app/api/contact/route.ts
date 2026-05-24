import { NextResponse } from "next/server";

// Same Resend infra Encore uses for its own contact form.
// API key can be overridden via env (preferred) but falls back to the same
// hardcoded key used by encore-rebuild so EADIE inquiries route cleanly
// from day one without an extra env step.
const RESEND_API_KEY =
  process.env.RESEND_API_KEY || "re_BRNFUokg_CkWU9at7SDBo96xmwwwNTWb5";
const TO = "jwoodson@encoresvcsllc.com";
const FROM = "EADIE Briefing Requests <noreply@mail.encoresvcsllc.com>";

interface DemoRequest {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  briefingType?: string;
  agency?: string;
  message?: string;
}

const BRIEFING_TYPES: Record<string, string> = {
  overview: "Overview briefing (30 min)",
  demo: "Live demo (60 min)",
  pilot: "Pilot conversation",
  partner: "Partner / channel inquiry",
  press: "Press / analyst inquiry",
  other: "Other",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
  if (!briefingType || !BRIEFING_TYPES[briefingType])
    return NextResponse.json({ error: "Briefing type is required" }, { status: 400 });
  if (message.length > 5000)
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });

  const briefingLabel = BRIEFING_TYPES[briefingType];

  const html = `
    <div style="font-family: Inter, system-ui, sans-serif; color: #101828; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0e1422 0%, #1b2238 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0;">
        <div style="font-size: 11px; color: #fbbf24; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px;">EADIE · Encore Acquisition Decision Intelligence Engine</div>
        <h1 style="margin: 0; font-size: 22px; color: #fbbf24;">New Briefing Request</h1>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.85;">encoreacquisitionintelligenceengine.com</p>
      </div>
      <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
        <div style="background: #fef3c7; border-left: 3px solid #fbbf24; padding: 10px 14px; border-radius: 4px; margin-bottom: 18px;">
          <div style="font-size: 11px; color: #92400e; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px;">Briefing Type</div>
          <div style="font-weight: 600; color: #0e1422;">${escapeHtml(briefingLabel)}</div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong style="color: #0e1422;">Name</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">Email</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #d97706;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">Organization</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(organization)}</td>
          </tr>
          ${
            role
              ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">Title / Role</strong></td><td style="padding: 8px 0;">${escapeHtml(role)}</td></tr>`
              : ""
          }
          ${
            agency
              ? `<tr><td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">Agency / Affiliation</strong></td><td style="padding: 8px 0;">${escapeHtml(agency)}</td></tr>`
              : ""
          }
        </table>
        ${
          message
            ? `<hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
               <div style="color: #64748b; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Notes</div>
               <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 3px solid #fbbf24; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</div>`
            : ""
        }
      </div>
      <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 12px;">
        This briefing request was submitted via the EADIE site (encoreacquisitionintelligenceengine.com).<br />
        Reply directly to this email to respond to ${escapeHtml(name)}.
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `[EADIE] ${briefingLabel} — ${name}${organization ? ` (${organization})` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[EADIE Resend error]", err);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[EADIE contact route error]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
