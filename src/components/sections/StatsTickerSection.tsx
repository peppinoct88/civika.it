"use client";

import { Marquee } from "@/components/motion";
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
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-sm">
      <span className="font-mono text-2xl font-bold text-accent-400 sm:text-3xl">
        {value}
      </span>
      <span className="text-sm font-medium text-neutral-300">{label}</span>
    </div>
  );
}

/* ── Stats Ticker Section — scorrimento lento ── */

export function StatsTickerSection() {
  return (
    <section className="relative py-8" aria-label="Statistiche in evidenza">
      {/* Top divider */}
      <Divider variant="gradient" />

      {/* Marquee lento */}
      <div className="py-6">
        <Marquee speed={80} pauseOnHover>
          {stats.map((stat) => (
            <StatGlassCard key={stat.label} {...stat} />
          ))}
        </Marquee>
      </div>

      {/* Bottom divider */}
      <Divider variant="gradient" />
    </section>
  );
}
