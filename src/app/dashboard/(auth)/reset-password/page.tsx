"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    if (password.length < 8) {
      setError("La password deve avere almeno 8 caratteri");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Errore durante il reset");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Errore di connessione. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  // Token mancante
  if (!token) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070E18]">
        <div className="relative z-20 w-full max-w-[440px] px-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <svg className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white">Link non valido</h2>
          <p className="mt-2 text-sm text-[#8A9AB5]">
            Il link di reset non contiene un token valido. Richiedi un nuovo link.
          </p>
          <Link href="/dashboard/forgot-password" className="mt-4 inline-block text-sm text-[#D4A03C] hover:text-[#E8C06A] transition-colors">
            Richiedi nuovo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070E18]">
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(27,58,92,0.6) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(212,160,60,0.3) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,160,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,60,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Card ── */}
      <div
        className="relative z-20 w-full max-w-[440px] px-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Logo & Title */}
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
            <img src="/logo-civika-white.svg" alt="CIVIKA" className="h-24 w-auto" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
            Nuova Password
          </h1>
          <p className="mt-2 text-sm text-[#8A9AB5]" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}>
            Scegli una nuova password per il tuo account
          </p>
        </div>

        <div
          className="relative rounded-2xl p-[1px]"
          style={{ background: "linear-gradient(135deg, rgba(212,160,60,0.2), rgba(42,85,128,0.2), rgba(212,160,60,0.1))" }}
        >
          <div className="rounded-2xl bg-[#0F1F33]/90 px-8 py-10 backdrop-blur-xl">
            {success ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                  <svg className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-white">Password aggiornata!</h2>
                <p className="mt-2 text-sm text-[#8A9AB5]">
                  La tua password è stata reimpostata con successo. Ora puoi accedere.
                </p>
                <Link
                  href="/dashboard/login"
                  className="mt-6 inline-block rounded-xl px-8 py-3 text-sm font-semibold text-[#0F1F33] transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #D4A03C, #E8C06A, #D4A03C)" }}
                >
                  Vai al login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#8A9AB5]">
                    Nuova Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <svg
                        className="h-4 w-4 transition-colors duration-300"
                        style={{ color: focusedField === "password" ? "#D4A03C" : "#4A5568" }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Minimo 8 caratteri"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-[#1B3A5C]/50 bg-[#070E18]/60 py-3 pl-11 pr-4 text-sm text-white placeholder-[#4A5568] transition-all duration-300 focus:border-[#D4A03C]/50 focus:bg-[#070E18]/80 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#8A9AB5]">
                    Conferma Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <svg
                        className="h-4 w-4 transition-colors duration-300"
                        style={{ color: focusedField === "confirm" ? "#D4A03C" : "#4A5568" }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Ripeti la password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField("confirm")}
                      onBlur={() => setFocusedField(null)}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-[#1B3A5C]/50 bg-[#070E18]/60 py-3 pl-11 pr-4 text-sm text-white placeholder-[#4A5568] transition-all duration-300 focus:border-[#D4A03C]/50 focus:bg-[#070E18]/80 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password requirements */}
                <div className="rounded-xl bg-[#070E18]/40 px-4 py-3">
                  <p className="mb-2 text-xs font-medium text-[#8A9AB5]">La password deve contenere:</p>
                  <ul className="space-y-1 text-xs text-[#4A5568]">
                    <li className={password.length >= 8 ? "text-green-400" : ""}>
                      {password.length >= 8 ? "\u2713" : "\u2022"} Almeno 8 caratteri
                    </li>
                    <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>
                      {/[A-Z]/.test(password) ? "\u2713" : "\u2022"} Una lettera maiuscola
                    </li>
                    <li className={/[a-z]/.test(password) ? "text-green-400" : ""}>
                      {/[a-z]/.test(password) ? "\u2713" : "\u2022"} Una lettera minuscola
                    </li>
                    <li className={/[0-9]/.test(password) ? "text-green-400" : ""}>
                      {/[0-9]/.test(password) ? "\u2713" : "\u2022"} Un numero
                    </li>
                  </ul>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400" role="alert">
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
                >
                  <span className="relative">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Salvataggio...
                      </span>
                    ) : (
                      "Salva nuova password"
                    )}
                  </span>
                </button>

                <div className="text-center">
                  <Link href="/dashboard/login" className="text-sm text-[#8A9AB5] hover:text-[#D4A03C] transition-colors">
                    Torna al login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}>
          <p className="text-xs text-[#4A5568]">&copy; {new Date().getFullYear()} CIVIKA SRL — Tutti i diritti riservati</p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#070E18]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A03C] border-t-transparent" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
