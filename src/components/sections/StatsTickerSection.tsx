"use client";

import { FadeUp } from "@/components/motion";
import { Divider } from "@/components/atoms";

/* ── Data ── */

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "73%", label: "dei fondi pubblici non viene utilizzato" },
  { value: "€42Mld", label: "disponibili in bandi attivi" },
  { value: "1:23", label: "ROI medio per euro investito nei bandi" },
  { value: "92%", label: "delle PMI non sa di poter accedere ai fondi" },
];

/* ── Glass Stat Card ── */

function StatGlassCard({ value, label }: Stat) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm text-center">
      <span className="font-mono text-2xl font-bold text-accent-400 sm:text-3xl">
        {value}
      </span>
      <span className="text-sm font-medium text-neutral-300 leading-snug">{label}</span>
    </div>
  );
}

/* ── Stats Section (static grid) ── */

export function StatsTickerSection() {
  return (
    <section className="relative py-8" aria-label="Statistiche in evidenza">
      {/* Top divider */}
      <Divider variant="gradient" />

      {/* Static grid */}
      <div className="mx-auto max-w-5xl px-5 py-8">
        <FadeUp>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {stats.map((stat) => (
              <StatGlassCard key={stat.label} {...stat} />
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Bottom divider */}
      <Divider variant="gradient" />
    </section>
  );
}
