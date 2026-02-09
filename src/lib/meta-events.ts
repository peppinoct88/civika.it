/* ═══════════════════════════════════════════════
   META PIXEL + CONVERSIONS API — Event Helper
   ═══════════════════════════════════════════════

   Sends events both client-side (fbq) and server-side (CAPI)
   for maximum tracking accuracy and deduplication.
*/

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface MetaEventOptions {
  event_name: string;
  event_source_url?: string;
  user_email?: string;
  user_phone?: string;
  user_fn?: string;
  user_ln?: string;
  custom_data?: Record<string, unknown>;
}

/**
 * Send a Meta event through both Pixel (client) and Conversions API (server).
 * The Pixel fires immediately; the CAPI call is non-blocking.
 */
export function sendMetaEvent({
  event_name,
  event_source_url,
  user_email,
  user_phone,
  user_fn,
  user_ln,
  custom_data,
}: MetaEventOptions): void {
  /* 1. Client-side: fire Pixel event */
  if (typeof window !== "undefined" && window.fbq) {
    if (custom_data) {
      window.fbq("track", event_name, custom_data);
    } else {
      window.fbq("track", event_name);
    }
  }

  /* 2. Server-side: send to Conversions API */
  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name,
      event_source_url:
        event_source_url ||
        (typeof window !== "undefined" ? window.location.href : undefined),
      user_email,
      user_phone,
      user_fn,
      user_ln,
      custom_data,
    }),
  }).catch((err) => {
    console.warn("Meta CAPI event failed:", err);
  });
}

/* ── Convenience helpers ── */

/** Track a page view (already auto-fired by Pixel, use for SPA navigations) */
export function trackPageView(): void {
  sendMetaEvent({ event_name: "PageView" });
}

/** Track a lead (e.g. contact form submission) */
export function trackLead(data?: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}): void {
  sendMetaEvent({
    event_name: "Lead",
    user_email: data?.email,
    user_phone: data?.phone,
    user_fn: data?.firstName,
    user_ln: data?.lastName,
    custom_data: { content_name: "Contact Form" },
  });
}

/** Track a contact event */
export function trackContact(data?: {
  email?: string;
  phone?: string;
}): void {
  sendMetaEvent({
    event_name: "Contact",
    user_email: data?.email,
    user_phone: data?.phone,
  });
}

/** Track viewing key content */
export function trackViewContent(contentName: string): void {
  sendMetaEvent({
    event_name: "ViewContent",
    custom_data: { content_name: contentName },
  });
}
