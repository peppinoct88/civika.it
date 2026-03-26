"use client";

import { Marquee } from "@/components/motion";
import { Divider } from "@/components/atoms";

/* ── Data ── */

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "391", label: "Comuni in Sicilia" },
  { value: "78%", label: "non comunica online" },
  { value: "4,8M", label: "cittadini" },
  { value: "€2,1Mld", label: "fondi europei persi" },
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

/* ── Stats Ticker Section ── */

export function StatsTickerSection() {
  return (
    <section className="relative py-8" aria-label="Statistiche in evidenza">
      {/* Top divider */}
      <Divider variant="gradient" />

      {/* Marquee */}
      <div className="py-6">
        <Marquee speed={40} pauseOnHover>
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
