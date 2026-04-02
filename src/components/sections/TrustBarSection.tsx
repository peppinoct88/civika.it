"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/* ── Trust Bar — "Visto su" loghi media ── */

const logos = [
  { name: "Il Sole 24 Ore", width: 120 },
  { name: "ANSA", width: 80 },
  { name: "Corriere della Sera", width: 130 },
  { name: "Forbes Italia", width: 100 },
  { name: "La Repubblica", width: 120 },
];

export function TrustBarSection() {
  return (
    <section className="relative py-10 border-y border-white/[0.06]" aria-label="Menzionati su">
      <div className="mx-auto max-w-5xl px-5">
        <FadeUp>
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-600 mb-6">
            Menzioni e collaborazioni
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-8 opacity-30 hover:opacity-60 transition-opacity duration-300"
                style={{ width: logo.width }}
              >
                {/* Placeholder — sostituire con loghi reali */}
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 text-center leading-tight">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
