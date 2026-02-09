"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ═══════════════════════════════════════════════
   SERVER-SIDE PAGEVIEW TRACKER
   ═══════════════════════════════════════════════
   Sends a PageView event to Meta Conversions API
   on every page navigation. This works even when
   the client-side Pixel is blocked by AdBlockers.
*/

export default function ServerPageView() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    /* Avoid duplicate fires on same path */
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    /* Small delay to let the page render */
    const timer = setTimeout(() => {
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "PageView",
          event_source_url: `https://www.civika.it${pathname}`,
        }),
      }).catch(() => {
        /* Silent fail — non-critical */
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
