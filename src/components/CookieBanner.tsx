"use client";

import { useState, useEffect } from "react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("civika_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie("civika_cookie_consent", "accepted", 365);
    setVisible(false);
  };

  const handleReject = () => {
    setCookie("civika_cookie_consent", "rejected", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consenso cookie"
      className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6"
    >
      <div className="max-w-[900px] mx-auto bg-[#0F1F33]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white/90 text-sm leading-relaxed">
              Questo sito utilizza cookie tecnici per garantire il corretto funzionamento.
              Non utilizziamo cookie di profilazione.
              Continuando la navigazione accetti l&apos;utilizzo dei cookie tecnici.{" "}
              <a
                href="/cookie-policy"
                className="text-[#E8C06A] underline underline-offset-2 hover:text-[#D4A03C] transition-colors"
              >
                Cookie Policy
              </a>
              {" · "}
              <a
                href="/privacy-policy"
                className="text-[#E8C06A] underline underline-offset-2 hover:text-[#D4A03C] transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Rifiuta
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#D4A03C] text-[#0F1F33] hover:bg-[#E8C06A] transition-all duration-300 shadow-lg shadow-[#D4A03C]/20 cursor-pointer"
            >
              Accetta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
