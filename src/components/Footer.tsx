"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_COLUMNS = [
  {
    title: "Navigazione",
    links: [
      { label: "Home", href: "/" },
      { label: "Chi Siamo", href: "/chi-siamo" },
      { label: "Servizi", href: "/#servizi" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Contatti",
    links: [
      { label: "Contattaci", href: "/contatti" },
      { label: "info@civika.it", href: "mailto:info@civika.it" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

/* ── Animated divider line ── */
function GrowLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="h-px bg-gradient-to-r from-transparent via-[#D4A03C]/40 to-transparent"
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE }}
      style={{ originX: 0.5 }}
    />
  );
}

/* ═══════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════ */

export default function Footer() {
  const footerRef = useRef(null);
  const inView = useInView(footerRef, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 } as const,
    animate: inView ? ({ opacity: 1, y: 0 } as const) : {},
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#050A12] overflow-hidden"
    >
      {/* ── Ambient background glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse at center, #D4A03C 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px] opacity-[0.02]"
          style={{
            background:
              "radial-gradient(ellipse at center, #1B3A5C 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Top separator ── */}
      <GrowLine />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-6 sm:pb-10">
        {/* Top row: Logo + tagline + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          {/* Logo block */}
          <motion.div {...fadeUp(0)} className="max-w-[480px]">
            <Link href="/" className="inline-block no-underline mb-5">
              <img
                src="/logo-civika-white.svg"
                alt="CIVIKA — Comunicazione Istituzionale per Comuni Siciliani"
                width={150}
                height={50}
                className="h-[42px] w-auto"
              />
            </Link>
            <p className="text-white/50 text-[15px] leading-relaxed font-light">
              La regia per eventi e comunicazione istituzionale dei Comuni
              siciliani. Strategia, identità, risultati.
            </p>
          </motion.div>

          {/* CTA button */}
          <motion.div {...fadeUp(0.15)}>
            <Link
              href="/contatti"
              className="group relative inline-flex items-center gap-3 no-underline bg-gradient-to-br from-[#D4A03C] to-[#C89530] text-[#0F1F33] px-6 sm:px-9 py-3 sm:py-4 rounded-full font-bold text-[15px] shadow-lg shadow-[#D4A03C]/20 hover:shadow-[#D4A03C]/40 hover:scale-[1.03] transition-all duration-500"
            >
              Parliamone
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <GrowLine />

        {/* Navigation columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-16 pt-8 sm:pt-14 pb-8 sm:pb-14">
          {NAV_COLUMNS.map((col, colIdx) => (
            <motion.div key={col.title} {...fadeUp(0.1 + colIdx * 0.08)}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/30 mb-5">
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 no-underline text-[14px] hover:text-[#D4A03C] transition-colors duration-300 inline-flex items-center gap-1.5 group/link"
                    >
                      <span className="w-0 h-px bg-[#D4A03C] group-hover/link:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <GrowLine />

        {/* Bottom bar */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4"
        >
          <div className="text-[12px] text-white/30 font-light tracking-wide">
            &copy; {new Date().getFullYear()} CIVIKA SRL — Tutti i diritti
            riservati
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-white/20">
            <span>Fatto con</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#D4A03C] text-sm"
            >
              &#9829;
            </motion.span>
            <span>in Sicilia</span>
          </div>
        </motion.div>
      </div>

      {/* ── Giant watermark text ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.6, ease: EASE }}
      >
        <div className="text-[clamp(100px,18vw,260px)] font-black text-white/[0.015] leading-none tracking-tight text-center translate-y-[30%] whitespace-nowrap">
          CIVIKA
        </div>
      </motion.div>
    </footer>
  );
}
