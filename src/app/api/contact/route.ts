import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO_EMAIL ?? "projects@teeblix.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const FIELDS = ["name", "company", "email", "project", "budget", "timeline", "message"] as const;
type Payload = Record<(typeof FIELDS)[number], string>;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Partial<Payload>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid body", { status: 400 });
  }

  const data = Object.fromEntries(FIELDS.map((f) => [f, String(body[f] ?? "").trim().slice(0, 5000)])) as Payload;
  if (!data.name || !data.email || !data.project || !data.budget || !data.timeline || !data.message) {
    return new NextResponse("Missing required fields", { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return new NextResponse("Invalid email", { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not set; submission dropped:", data);
    return new NextResponse("Contact form is not configured", { status: 503 });
  }

  const rows = FIELDS.map(
    (f) => `<tr><td style="padding:4px 12px 4px 0;color:#888;text-transform:uppercase;font-size:11px">${f}</td><td style="padding:4px 0">${escapeHtml(data[f]).replace(/\n/g, "<br>")}</td></tr>`
  ).join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: data.email,
      subject: `New project inquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: `<table style="font-family:ui-monospace,monospace;font-size:13px;border-collapse:collapse">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error:", res.status, await res.text());
    return new NextResponse("Failed to send", { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
