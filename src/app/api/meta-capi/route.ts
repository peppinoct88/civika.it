import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/* ═══════════════════════════════════════════════
   META CONVERSIONS API — Server-Side Events
   ═══════════════════════════════════════════════ */

const PIXEL_ID = "887486544068900";
const ACCESS_TOKEN =
  process.env.META_CAPI_TOKEN ||
  "EAADjtY7vDjwBQj2XJGmlJJmuXP69dMZB5G6o0KrInQMlFpwV5iVDT1SYaQirQsXHwtOqoReDIL7LeM5CnRHRZAHsVTellOzWLUdtKpavZB9FlIJoz8WCB6oZBuNlhiZALbeMF8l7kVacQ0WmqelAlvWYGnCqpjsOeZCIPIyRFc1iM9QW3eTh1EZBfKssOwPTAunlgZDZD";

const META_API_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

/* ── Hash helper (Meta requires SHA256 for user data) ── */
function hashSHA256(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      event_name,
      event_source_url,
      user_email,
      user_phone,
      user_fn,
      user_ln,
      custom_data,
    } = body;

    /* Build user_data with hashed PII */
    const user_data: Record<string, string> = {
      client_ip_address:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "0.0.0.0",
      client_user_agent:
        request.headers.get("user-agent") || "unknown",
    };

    if (user_email) user_data.em = hashSHA256(user_email);
    if (user_phone) user_data.ph = hashSHA256(user_phone);
    if (user_fn) user_data.fn = hashSHA256(user_fn);
    if (user_ln) user_data.ln = hashSHA256(user_ln);

    /* Retrieve fbp and fbc from cookies if available */
    const fbp = request.cookies.get("_fbp")?.value;
    const fbc = request.cookies.get("_fbc")?.value;
    if (fbp) user_data.fbp = fbp;
    if (fbc) user_data.fbc = fbc;

    /* Build event payload */
    const event = {
      event_name: event_name || "PageView",
      event_time: Math.floor(Date.now() / 1000),
      event_source_url:
        event_source_url || "https://www.civika.it",
      action_source: "website",
      user_data,
      ...(custom_data ? { custom_data } : {}),
    };

    /* Send to Meta Conversions API */
    const response = await fetch(
      `${META_API_URL}?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [event],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);
      return NextResponse.json(
        { error: "Meta API error", details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("CAPI route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
