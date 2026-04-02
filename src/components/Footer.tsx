"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { easeOutExpo } from "@/lib/animations";

const NAV_COLUMNS = [
  {
    title: "Civika",
    links: [
      { label: "Home", href: "/" },
      { label: "Il Metodo", href: "/metodo" },
      { label: "Servizi", href: "/servizi" },
      { label: "Chi Siamo", href: "/chi-siamo" },
    ],
  },
  {
    title: "Risorse",
    links: [
      { label: "Mappa dei Fondi\u2122", href: "/risorse/mappa-fondi" },
      { label: "Fondi Fantasma (Libro)", href: "/risorse/fondi-fantasma" },
      { label: "Blog", href: "/blog" },
      { label: "Webinar", href: "/webinar" },
    ],
  },
  {
    title: "Contatti",
    links: [
      { label: "Diagnosi Gratuita", href: "/diagnosi" },
      { label: "civikasrl@gmail.com", href: "mailto:civikasrl@gmail.com" },
      { label: "+39 349 875 0521", href: "tel:+393498750521" },
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

function GrowLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent"
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: easeOutExpo }}
      style={{ originX: 0.5 }}
    />
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const inView = useInView(footerRef, { once: true, amount: 0.1 });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 } as const,
    animate: inView ? ({ opacity: 1, y: 0 } as const) : {},
    transition: { duration: 0.8, ease: easeOutExpo, delay },
  });

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0a0a0c] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse at center, #10B981 0%, transparent 70%)",
          }}
        />
      </div>

      <GrowLine />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-6 sm:pb-10">
        {/* Top row: Logo + tagline + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <motion.div {...fadeUp(0)} className="max-w-[480px]">
            <Link href="/" className="inline-block no-underline mb-5">
              <img
                src="/logo-civika-white.svg"
                alt="CIVIKA — Sblocco Fondi per le Imprese"
                width={150}
                height={50}
                className="h-[42px] w-auto"
              />
            </Link>
            <p className="font-display italic text-neutral-400 text-lg leading-relaxed mb-2">
              I fondi non si cercano. Si progettano.
            </p>
            <p className="text-neutral-600 text-[13px]">
              Sblocco Fondi™ per PMI e Startup
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <Link
              href="/diagnosi"
              className="group relative inline-flex items-center gap-3 no-underline bg-accent-500 text-white px-6 sm:px-9 py-3 sm:py-4 rounded-[10px] font-bold text-[15px] shadow-lg shadow-accent-500/20 hover:shadow-accent-500/40 hover:bg-accent-600 transition-all duration-300"
            >
              Prenota la Diagnosi
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <GrowLine />

        {/* Navigation columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-12 pt-8 sm:pt-14 pb-8 sm:pb-14">
          {NAV_COLUMNS.map((col, colIdx) => (
            <motion.div key={col.title} {...fadeUp(0.1 + colIdx * 0.08)}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-600 mb-5">
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 no-underline text-[14px] hover:text-accent-400 transition-colors duration-300 inline-flex items-center gap-1.5 group/link"
                    >
                      <span className="w-0 h-px bg-accent-400 group-hover/link:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <GrowLine />

        {/* Bottom bar */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4"
        >
          <div className="text-[12px] text-neutral-600 tracking-wide">
            &copy; {new Date().getFullYear()} CIVIKA SRL — Tutti i diritti riservati
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-700">
            <span>Fatto con</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent-400 text-sm"
            >
              &#9829;
            </motion.span>
            <span>in Sicilia</span>
          </div>
        </motion.div>
      </div>

      {/* Giant watermark text */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.6, ease: easeOutExpo }}
        aria-hidden="true"
      >
        <div className="text-[clamp(100px,18vw,260px)] font-black text-white/[0.015] leading-none tracking-tight text-center translate-y-[30%] whitespace-nowrap">
          CIVIKA
        </div>
      </motion.div>
    </footer>
  );
}
