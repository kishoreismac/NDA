// @ts-nocheck
// Server-side route that sends the counterparty signing link by email.
// Configure SMTP credentials in `.env.local` (see .env.local.example).

import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function html({ recordTitle, recordId, url, counterpartyName }) {
  const safeTitle = (recordTitle || recordId || "NDA").toString();
  return `
  <div style="font-family:Segoe UI,Roboto,Arial,sans-serif;background:#0b1220;padding:32px;color:#e2e8f0;">
    <div style="max-width:560px;margin:0 auto;background:#111a2e;border:1px solid #1f2a44;border-radius:16px;padding:28px;">
      <div style="font-size:13px;color:#94a3b8;letter-spacing:.08em;text-transform:uppercase;">CLM · Secure E-Signature</div>
      <h2 style="margin:8px 0 4px;color:#fff;">Action required: counter-sign &ldquo;${safeTitle}&rdquo;</h2>
      <p style="color:#cbd5e1;line-height:1.55;">
        Hello${counterpartyName ? " " + counterpartyName : ""},<br/><br/>
        You have been asked to review and counter-sign the Non-Disclosure
        Agreement <strong>${safeTitle}</strong> (record <code>${recordId}</code>).
        Click the secure button below to open the document and sign it
        electronically. Your signed copy will be returned to our CLM system
        automatically.
      </p>
      <p style="text-align:center;margin:28px 0;">
        <a href="${url}" style="background:#06b6d4;color:#001018;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600;display:inline-block;">Review &amp; Sign Document</a>
      </p>
      <p style="font-size:12px;color:#94a3b8;word-break:break-all;">
        If the button doesn't work, paste this link into your browser:<br/>
        <a href="${url}" style="color:#67e8f9;">${url}</a>
      </p>
      <hr style="border:none;border-top:1px solid #1f2a44;margin:24px 0;"/>
      <p style="font-size:11px;color:#64748b;">
        This link is unique to you. Do not forward it. If you did not expect
        this request, please ignore this email.
      </p>
    </div>
  </div>`;
}

function text({ recordTitle, recordId, url }) {
  return [
    `Action required: counter-sign "${recordTitle || recordId}"`,
    ``,
    `Please review and counter-sign the Non-Disclosure Agreement (${recordId}).`,
    `Open this secure link to sign electronically:`,
    url,
    ``,
    `Your signature will be returned to our CLM system automatically.`,
  ].join("\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, recordId, recordTitle, url, counterpartyName } = body || {};
    if (!to || !url || !recordId) {
      return Response.json(
        { ok: false, error: "Missing required fields: to, url, recordId." },
        { status: 400 }
      );
    }

    const transport = getTransport();
    if (!transport) {
      return Response.json(
        {
          ok: false,
          configured: false,
          error:
            "SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM in .env.local and restart the server.",
        },
        { status: 503 }
      );
    }

    const from =
      process.env.SMTP_FROM ||
      `CLM E-Signature <${process.env.SMTP_USER}>`;

    const info = await transport.sendMail({
      from,
      to,
      subject: `Action required: counter-sign "${recordTitle || recordId}"`,
      text: text({ recordTitle, recordId, url }),
      html: html({ recordTitle, recordId, url, counterpartyName }),
    });

    return Response.json({
      ok: true,
      configured: true,
      messageId: info.messageId,
      accepted: info.accepted,
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
