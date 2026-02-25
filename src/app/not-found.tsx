"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, ease: EASE, delay },
});

const NAV_LINKS = [
  { label: "Homepage", href: "/", desc: "Torna alla pagina principale" },
  { label: "Chi Siamo", href: "/chi-siamo", desc: "Scopri la nostra storia" },
  { label: "Servizi", href: "/#servizi", desc: "I nostri servizi per i Comuni" },
  { label: "Blog", href: "/blog", desc: "Articoli e approfondimenti" },
  { label: "Contatti", href: "/contatti", desc: "Parlaci del tuo progetto" },
];

export default function NotFound() {
  return (
    <PageShell>
      {/* ── JSON-LD per pagina 404 ── */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Pagina non trovata — CIVIKA",
            description:
              "La pagina cercata non esiste. Naviga il sito CIVIKA per scoprire i nostri servizi di comunicazione e eventi per Comuni siciliani.",
            url: "https://www.civika.it/404",
            isPartOf: {
              "@type": "WebSite",
              name: "CIVIKA",
              url: "https://www.civika.it",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.civika.it",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Pagina non trovata",
                },
              ],
            },
          }),
        }}
      />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#070E18] via-[#0F1F33] to-[#1B3A5C] px-6 py-32 relative overflow-hidden">
        {/* ── Ambient glow ── */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,160,60,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ── Giant watermark ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-white font-black leading-none"
            style={{ fontSize: "clamp(150px, 30vw, 400px)", opacity: 0.015 }}
          >
            404
          </span>
        </div>

        <div className="relative z-10 max-w-[640px] mx-auto text-center">
          {/* ── Badge ── */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A03C]/20 bg-[#D4A03C]/5 mb-8"
            {...fadeUp(0)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A03C] animate-[pulse-dot_2s_ease-in-out_infinite]" />
            <span className="text-[#D4A03C] text-xs font-semibold uppercase tracking-widest">
              Errore 404
            </span>
          </motion.div>

          {/* ── 404 Number ── */}
          <motion.div
            className="font-black leading-none mb-4 gradient-text"
            style={{ fontSize: "clamp(80px, 15vw, 140px)" }}
            {...fadeUp(0.05)}
          >
            404
          </motion.div>

          {/* ── Title ── */}
          <motion.h1
            className="text-white font-black mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}
            {...fadeUp(0.1)}
          >
            Pagina non trovata
          </motion.h1>

          {/* ── Description ── */}
          <motion.p
            className="text-white/50 text-base sm:text-lg mb-8 sm:mb-12 max-w-md mx-auto leading-relaxed"
            {...fadeUp(0.15)}
          >
            La pagina che cercate non esiste, è stata spostata o l'indirizzo
            contiene un errore. Ecco alcune pagine utili per orientarvi.
          </motion.p>

          {/* ── Quick links grid ── */}
          <motion.nav
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8 sm:mb-12"
            aria-label="Pagine principali"
            {...fadeUp(0.2)}
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#D4A03C]/20 transition-all duration-500 no-underline text-left"
              >
                <span className="mt-0.5 w-8 h-8 rounded-xl bg-[#D4A03C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4A03C]/20 transition-colors duration-500">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A03C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <div>
                  <span className="text-white font-semibold text-sm block group-hover:text-[#D4A03C] transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="text-white/35 text-xs mt-0.5 block">
                    {link.desc}
                  </span>
                </div>
              </Link>
            ))}
          </motion.nav>

          {/* ── CTA principale ── */}
          <motion.div {...fadeUp(0.3)}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#D4A03C]/25 hover:shadow-2xl hover:shadow-[#D4A03C]/40 hover:scale-[1.03] transition-all duration-500"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
              </svg>
              Torna alla homepage
            </Link>
          </motion.div>

          {/* ── Suggerimento search ── */}
          <motion.p
            className="text-white/25 text-xs mt-8"
            {...fadeUp(0.35)}
          >
            Se il problema persiste,{" "}
            <Link
              href="/contatti"
              className="text-[#D4A03C]/60 hover:text-[#D4A03C] transition-colors underline underline-offset-2"
            >
              contattateci
            </Link>
            .
          </motion.p>
        </div>
      </main>
    </PageShell>
  );
}
