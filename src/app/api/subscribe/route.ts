import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO_EMAIL ?? "projects@teeblix.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid body", { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 320);
  if (!name || !email) return new NextResponse("Missing required fields", { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return new NextResponse("Invalid email", { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[subscribe] RESEND_API_KEY is not set; subscription dropped:", { name, email });
    return new NextResponse("Subscriptions are not configured", { status: 503 });
  }
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  // Add to the Resend Audience (Resend → Audience → Contacts), which is also
  // what Broadcasts send to. A failure here shouldn't block the notification.
  const [firstName, ...rest] = name.split(/\s+/);
  const contact = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({ email, first_name: firstName, last_name: rest.join(" "), unsubscribed: false }),
  });
  if (!contact.ok) console.error("[subscribe] Resend contact error:", contact.status, await contact.text());

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New Drops subscriber — ${name}`,
      html: `<p style="font-family:ui-monospace,monospace;font-size:13px">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt; subscribed to Drops.</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[subscribe] Resend error:", res.status, await res.text());
    return new NextResponse("Failed to subscribe", { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
