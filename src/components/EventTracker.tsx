"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { sendMetaEvent } from "@/lib/meta-events";

/* ═══════════════════════════════════════════════
   FULL EVENT TRACKER
   ═══════════════════════════════════════════════
   Automatically tracks ALL user interactions:
   - Scroll depth (25%, 50%, 75%, 100%)
   - Time on page (30s, 60s, 120s, 300s)
   - CTA clicks (buttons, email, phone links)
   - Outbound link clicks
   - Blog article read completion
   - Form field interactions
   - Page visibility (tab focus/blur)
   - Device & viewport info

   All events fire via both Meta Pixel AND Conversions API.
*/

/* ── Helpers ── */
function getPageType(path: string): string {
  if (path === "/") return "homepage";
  if (path.startsWith("/blog/")) return "blog_article";
  if (path === "/blog") return "blog_index";
  if (path === "/chi-siamo") return "chi_siamo";
  if (path === "/contatti") return "contatti";
  if (path === "/privacy-policy") return "privacy_policy";
  if (path === "/cookie-policy") return "cookie_policy";
  return "other";
}

export default function EventTracker() {
  const pathname = usePathname();
  const scrollMilestones = useRef(new Set<number>());
  const timeMilestones = useRef(new Set<number>());
  const pageEntryTime = useRef(Date.now());
  const isVisible = useRef(true);
  const activeTime = useRef(0);
  const lastActiveCheck = useRef(Date.now());

  /* ══════════════════════════════════════════
     1. SCROLL DEPTH TRACKING
     ══════════════════════════════════════════ */
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const percent = Math.round((scrollTop / docHeight) * 100);
    const milestones = [25, 50, 75, 100];

    for (const milestone of milestones) {
      if (percent >= milestone && !scrollMilestones.current.has(milestone)) {
        scrollMilestones.current.add(milestone);
        sendMetaEvent({
          event_name: "ScrollDepth",
          custom_data: {
            scroll_percent: milestone,
            page_type: getPageType(pathname),
            page_path: pathname,
          },
        });

        /* 75% scroll on blog = article read */
        if (milestone >= 75 && pathname.startsWith("/blog/")) {
          sendMetaEvent({
            event_name: "ViewContent",
            custom_data: {
              content_name: document.title,
              content_type: "blog_article",
              content_category: "blog",
              page_path: pathname,
            },
          });
        }
      }
    }
  }, [pathname]);

  /* ══════════════════════════════════════════
     2. TIME ON PAGE TRACKING
     ══════════════════════════════════════════ */
  const checkTimeMilestones = useCallback(() => {
    /* Only count time when tab is visible */
    if (isVisible.current) {
      const now = Date.now();
      activeTime.current += now - lastActiveCheck.current;
      lastActiveCheck.current = now;
    }

    const seconds = Math.floor(activeTime.current / 1000);
    const milestones = [30, 60, 120, 300];

    for (const milestone of milestones) {
      if (seconds >= milestone && !timeMilestones.current.has(milestone)) {
        timeMilestones.current.add(milestone);
        sendMetaEvent({
          event_name: "TimeOnPage",
          custom_data: {
            seconds_on_page: milestone,
            page_type: getPageType(pathname),
            page_path: pathname,
          },
        });
      }
    }
  }, [pathname]);

  /* ══════════════════════════════════════════
     3. CLICK TRACKING (CTA, email, phone, outbound)
     ══════════════════════════════════════════ */
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      const button = target.closest("button");

      /* ── CTA Button clicks ── */
      if (button || (link && !link.getAttribute("href")?.startsWith("http"))) {
        const text =
          (button?.textContent || link?.textContent || "").trim().slice(0, 50);

        if (
          text &&
          /parliamone|contatt|scrivici|invia|scopri/i.test(text)
        ) {
          sendMetaEvent({
            event_name: "ClickCTA",
            custom_data: {
              cta_text: text,
              page_type: getPageType(pathname),
              page_path: pathname,
            },
          });
        }
      }

      if (!link) return;
      const href = link.getAttribute("href") || "";

      /* ── Email clicks ── */
      if (href.startsWith("mailto:")) {
        sendMetaEvent({
          event_name: "Contact",
          custom_data: {
            contact_method: "email",
            page_path: pathname,
          },
        });
      }

      /* ── Phone clicks ── */
      if (href.startsWith("tel:")) {
        sendMetaEvent({
          event_name: "Contact",
          custom_data: {
            contact_method: "phone",
            page_path: pathname,
          },
        });
      }

      /* ── Outbound link clicks ── */
      if (href.startsWith("http") && !href.includes("civika.it")) {
        sendMetaEvent({
          event_name: "OutboundClick",
          custom_data: {
            outbound_url: href.slice(0, 200),
            page_path: pathname,
          },
        });
      }

      /* ── Internal navigation tracking ── */
      if (href.startsWith("/") || href.includes("civika.it")) {
        const destination = href.replace("https://www.civika.it", "");
        if (destination && destination !== pathname) {
          sendMetaEvent({
            event_name: "InternalNav",
            custom_data: {
              from_page: pathname,
              to_page: destination,
            },
          });
        }
      }
    },
    [pathname]
  );

  /* ══════════════════════════════════════════
     4. FORM INTERACTION TRACKING
     ══════════════════════════════════════════ */
  const formInteracted = useRef(false);
  const handleFormFocus = useCallback(
    (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        !formInteracted.current &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        formInteracted.current = true;
        sendMetaEvent({
          event_name: "FormStart",
          custom_data: {
            form_page: pathname,
            first_field: (target as HTMLInputElement).name || target.id || "unknown",
          },
        });
      }
    },
    [pathname]
  );

  /* ══════════════════════════════════════════
     5. VISIBILITY TRACKING (tab focus/blur)
     ══════════════════════════════════════════ */
  const handleVisibility = useCallback(() => {
    const now = Date.now();
    if (document.hidden) {
      /* Tab lost focus — save active time */
      if (isVisible.current) {
        activeTime.current += now - lastActiveCheck.current;
      }
      isVisible.current = false;
    } else {
      /* Tab regained focus */
      isVisible.current = true;
      lastActiveCheck.current = now;
    }
  }, []);

  /* ══════════════════════════════════════════
     6. PAGE EXIT TRACKING (beforeunload)
     ══════════════════════════════════════════ */
  const handleBeforeUnload = useCallback(() => {
    const totalTime = Math.floor(
      (activeTime.current + (isVisible.current ? Date.now() - lastActiveCheck.current : 0)) / 1000
    );

    const maxScroll = scrollMilestones.current.size > 0
      ? Math.max(...scrollMilestones.current)
      : 0;

    /* Use sendBeacon for reliable exit tracking */
    const payload = JSON.stringify({
      event_name: "PageExit",
      event_source_url: `https://www.civika.it${pathname}`,
      custom_data: {
        time_on_page: totalTime,
        max_scroll: maxScroll,
        page_type: getPageType(pathname),
        page_path: pathname,
      },
    });

    navigator.sendBeacon("/api/meta-capi", payload);
  }, [pathname]);

  /* ══════════════════════════════════════════
     SETUP & CLEANUP
     ══════════════════════════════════════════ */
  useEffect(() => {
    /* Reset state on navigation */
    scrollMilestones.current = new Set();
    timeMilestones.current = new Set();
    formInteracted.current = false;
    pageEntryTime.current = Date.now();
    activeTime.current = 0;
    lastActiveCheck.current = Date.now();
    isVisible.current = !document.hidden;

    /* Track page type as ViewContent for key pages */
    const pageType = getPageType(pathname);
    if (["chi_siamo", "contatti"].includes(pageType)) {
      sendMetaEvent({
        event_name: "ViewContent",
        custom_data: {
          content_name: document.title,
          content_type: pageType,
          page_path: pathname,
        },
      });
    }

    /* Attach listeners */
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, true);
    document.addEventListener("focusin", handleFormFocus, true);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);

    /* Time tracking interval */
    const timeInterval = setInterval(checkTimeMilestones, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("focusin", handleFormFocus, true);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(timeInterval);
    };
  }, [
    pathname,
    handleScroll,
    handleClick,
    handleFormFocus,
    handleVisibility,
    handleBeforeUnload,
    checkTimeMilestones,
  ]);

  return null;
}
