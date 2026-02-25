"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ═══════════════════════════════════════════════
   CIVIKA — Dashboard Login
   Design coerente con il sito: dark theme, gold accent,
   animazioni sottili, feeling premium/istituzionale
   ═══════════════════════════════════════════════ */

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute rounded-full opacity-0"
      style={{
        left: `${x}%`,
        bottom: "-10px",
        width: `${size}px`,
        height: `${size}px`,
        background: "linear-gradient(135deg, rgba(212,160,60,0.3), rgba(232,192,106,0.1))",
        animation: `floatUp 12s ${delay}s ease-in-out infinite`,
      }}
    />
  );
}

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Credenziali non valide");
        return;
      }

      document.cookie = `access_token=${data.data.accessToken}; path=/; max-age=900; samesite=strict; secure`;
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Errore di connessione. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070E18]">
      {/* ── Background gradient layers ── */}
      <div className="absolute inset-0">
        {/* Radial glow top-right */}
        <div
          className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(27,58,92,0.6) 0%, transparent 70%)",
          }}
        />
        {/* Radial glow bottom-left */}
        <div
          className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(212,160,60,0.3) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,60,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} x={15} size={4} />
        <FloatingParticle delay={2} x={35} size={3} />
        <FloatingParticle delay={4} x={55} size={5} />
        <FloatingParticle delay={6} x={75} size={3} />
        <FloatingParticle delay={8} x={90} size={4} />
      </div>

      {/* ── Film grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Login Card ── */}
      <div
        className="relative z-20 w-full max-w-[440px] px-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo & Branding */}
        <div className="mb-10 text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.8)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-civika-white.svg"
              alt="CIVIKA"
              className="h-24 w-auto"
            />
          </div>

          <h1
            className="text-2xl font-semibold tracking-tight text-white"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            Area Riservata
          </h1>
          <p
            className="mt-2 text-sm text-[#8A9AB5]"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            Accedi alla dashboard gestionale CIVIKA
          </p>
        </div>

        {/* Card con bordo gradient */}
        <div
          className="relative rounded-2xl p-[1px]"
          style={{
            background: "linear-gradient(135deg, rgba(212,160,60,0.2), rgba(42,85,128,0.2), rgba(212,160,60,0.1))",
          }}
        >
          <div className="rounded-2xl bg-[#0F1F33]/90 px-8 py-10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#8A9AB5]"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-4 w-4 transition-colors duration-300"
                      style={{ color: focusedField === "email" ? "#D4A03C" : "#4A5568" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="la-tua@email.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="email"
                    autoFocus
                    className="w-full rounded-xl border border-[#1B3A5C]/50 bg-[#070E18]/60 py-3 pl-11 pr-4 text-sm text-white placeholder-[#4A5568] transition-all duration-300 focus:border-[#D4A03C]/50 focus:bg-[#070E18]/80 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#8A9AB5]"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg
                      className="h-4 w-4 transition-colors duration-300"
                      style={{ color: focusedField === "password" ? "#D4A03C" : "#4A5568" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-[#1B3A5C]/50 bg-[#070E18]/60 py-3 pl-11 pr-4 text-sm text-white placeholder-[#4A5568] transition-all duration-300 focus:border-[#D4A03C]/50 focus:bg-[#070E18]/80 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                  role="alert"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-[#0F1F33] transition-all duration-300 disabled:opacity-60"
                style={{
                  background: loading
                    ? "linear-gradient(135deg, #8A7A4A, #A09060)"
                    : "linear-gradient(135deg, #D4A03C, #E8C06A, #D4A03C)",
                  backgroundSize: "200% auto",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget.style.backgroundPosition = "right center");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = "left center";
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
                <span className="relative">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Accesso in corso...
                    </span>
                  ) : (
                    "Accedi"
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-8 text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <p className="text-xs text-[#4A5568]">
            &copy; {new Date().getFullYear()} CIVIKA SRL — Tutti i diritti riservati
          </p>
          <p className="mt-1 text-xs text-[#4A5568]/60">
            Piattaforma gestionale per la comunicazione istituzionale
          </p>
        </div>
      </div>

      {/* ── CSS Keyframe per particelle ── */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
