import { NextResponse } from "next/server";

const RESEND_API_KEY =
  process.env.RESEND_API_KEY || "re_BRNFUokg_CkWU9at7SDBo96xmwwwNTWb5";
const TO = "jwoodson@encoresvcsllc.com";
const FROM = "EADIE Demo Access <noreply@mail.encoresvcsllc.com>";

interface NDARequest {
  name?: string;
  email?: string;
  organization?: string;
  agreed?: boolean;
}

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
  let body: NDARequest;
  try {
    body = (await request.json()) as NDARequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const organization = (body.organization || "").trim();
  const agreed = body.agreed === true;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  if (!organization)
    return NextResponse.json({ error: "Organization is required" }, { status: 400 });
  if (!agreed)
    return NextResponse.json({ error: "NDA agreement required" }, { status: 400 });

  const timestamp = new Date().toISOString();
  const userAgent = request.headers.get("user-agent") || "unknown";
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0].trim() || "unknown";

  const html = `
    <div style="font-family: Inter, system-ui, sans-serif; color: #101828; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0e1422 0%, #1b2238 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0;">
        <div style="font-size: 11px; color: #fbbf24; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px;">EADIE Demo Access</div>
        <h1 style="margin: 0; font-size: 22px; color: #fbbf24;">NDA Acceptance Recorded</h1>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.85;">encoreacquisitionintelligenceengine.com/demo</p>
      </div>
      <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 16px; color: #475569; font-size: 14px;">
          The following demo viewer accepted the EADIE confidentiality acknowledgment before viewing the gated walkthrough.
        </p>
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
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">Timestamp (UTC)</strong></td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${escapeHtml(timestamp)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">IP Address</strong></td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 12px;">${escapeHtml(ip)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;"><strong style="color: #0e1422;">User Agent</strong></td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; word-break: break-all;">${escapeHtml(userAgent)}</td>
          </tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <div style="background: #fef3c7; border-left: 3px solid #fbbf24; padding: 12px 16px; border-radius: 4px;">
          <div style="font-size: 11px; color: #92400e; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Acknowledgment Text Agreed To</div>
          <div style="color: #0e1422; font-size: 13px; line-height: 1.5;">
            &quot;I agree that the EADIE demonstration content shown on this site is the confidential intellectual property of Encore Services, LLC. I will not reproduce, distribute, screen-share with non-authorized parties, or use the content to develop a competing product. The content is subject to one or more pending U.S. provisional patent applications.&quot;
          </div>
        </div>
      </div>
      <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 12px;">
        Retain this email as the acceptance record. This is an automated notification from the EADIE demo gate.
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
        subject: `[EADIE NDA] ${name} (${organization}) accepted demo confidentiality`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[EADIE NDA Resend error]", err);
      return NextResponse.json({ error: "Failed to record acceptance" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[EADIE NDA route error]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
