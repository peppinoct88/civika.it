import { NextRequest, NextResponse } from "next/server";

/* ═══════════════════════════════════════════════
   FIRST-PARTY PROXY — Google Analytics (gtag.js)
   ═══════════════════════════════════════════════
   Serves the GA script from YOUR domain.
   AdBlockers block "googletagmanager.com" but NOT "www.civika.it/api/t/ga".
*/

const GA_ID = "G-K0JZPPYSG4";
const GA_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

let cachedScript: string | null = null;
let cacheTime = 0;
const CACHE_DURATION = 3600_000; // 1 hour

export async function GET(request: NextRequest) {
  const now = Date.now();

  if (cachedScript && now - cacheTime < CACHE_DURATION) {
    return new NextResponse(cachedScript, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  try {
    const res = await fetch(GA_SCRIPT_URL, {
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
