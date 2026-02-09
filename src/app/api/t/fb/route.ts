import { NextRequest, NextResponse } from "next/server";

/* ═══════════════════════════════════════════════
   FIRST-PARTY PROXY — Meta Pixel (fbevents.js)
   ═══════════════════════════════════════════════
   Serves the Facebook pixel script from YOUR domain.
   AdBlockers block "connect.facebook.net" but NOT "www.civika.it/api/t/fb".
*/

const FB_SCRIPT_URL = "https://connect.facebook.net/en_US/fbevents.js";

let cachedScript: string | null = null;
let cacheTime = 0;
const CACHE_DURATION = 3600_000; // 1 hour

export async function GET(request: NextRequest) {
  const now = Date.now();

  /* Serve from cache if fresh */
  if (cachedScript && now - cacheTime < CACHE_DURATION) {
    return new NextResponse(cachedScript, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  try {
    const res = await fetch(FB_SCRIPT_URL, {
      headers: { "User-Agent": request.headers.get("user-agent") || "" },
    });

    if (!res.ok) {
      return new NextResponse("", { status: 502 });
    }

    const script = await res.text();
    cachedScript = script;
    cacheTime = now;

    return new NextResponse(script, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("", { status: 502 });
  }
}
