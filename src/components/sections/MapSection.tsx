"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { FadeUp, Counter } from "@/components/motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

/* ── Data ── */

interface City {
  name: string;
  x: number;
  y: number;
  isHQ?: boolean;
}

const cities: City[] = [
  { name: "Palermo", x: 108, y: 115 },
  { name: "Catania", x: 320, y: 210 },
  { name: "Messina", x: 355, y: 110 },
  { name: "Adrano", x: 300, y: 225, isHQ: true },
];

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 391, suffix: "", label: "Comuni" },
  { value: 5, suffix: "M", label: "Abitanti" },
  { value: 9, suffix: "", label: "Province" },
];

/* ── Sicily SVG path (simplified outline) ── */

const SICILY_PATH =
  "M 60 180 Q 40 160 30 140 Q 20 120 25 100 Q 30 80 50 70 Q 70 55 100 50 " +
  "Q 130 45 160 50 Q 185 55 200 60 Q 220 65 240 60 Q 260 55 280 60 " +
  "Q 300 65 320 75 Q 340 85 355 100 Q 370 115 375 135 Q 378 150 370 165 " +
  "Q 360 180 345 195 Q 330 210 310 220 Q 290 230 265 235 Q 240 240 215 240 " +
  "Q 190 240 165 235 Q 140 230 120 220 Q 100 210 85 200 Q 70 190 60 180 Z";

/* ── Pulsing dot component ── */

function CityDot({ city, delay }: { city: City; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1.5, duration: 0.4, ease: "easeOut" }}
    >
      {/* Pulse ring */}
      <motion.circle
        cx={city.x}
        cy={city.y}
        r={city.isHQ ? 10 : 7}
        fill="none"
        stroke={city.isHQ ? "#f59e0b" : "#3366cc"}
        strokeWidth={1.5}
        opacity={0.4}
        animate={{
          r: city.isHQ ? [10, 20] : [7, 16],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Solid dot */}
      <circle
        cx={city.x}
        cy={city.y}
        r={city.isHQ ? 5 : 3.5}
        fill={city.isHQ ? "#f59e0b" : "#3366cc"}
        className={city.isHQ ? "drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" : "drop-shadow-[0_0_4px_rgba(51,102,204,0.5)]"}
      />

      {/* Label */}
      <text
        x={city.x}
        y={city.y - (city.isHQ ? 14 : 12)}
        textAnchor="middle"
        className={cn(
          "text-[9px] font-medium fill-current",
          city.isHQ ? "text-accent-400" : "text-neutral-400"
        )}
      >
        {city.name}
        {city.isHQ && " (HQ)"}
      </text>
    </motion.g>
  );
}

/* ── Map Section ── */

export function MapSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (svgRef.current) {
      const path = svgRef.current.querySelector<SVGPathElement>("#sicily-outline");
      if (path) {
        setPathLength(path.getTotalLength());
      }
    }
  }, []);

  return (
    <SectionWrapper id="territorio" bg="gradient">
      <Container>
        <SectionHeader
          overline="Il territorio"
          title="391 Comuni. Una missione."
          subtitle="La Sicilia e la nostra casa."
        />

        <div ref={sectionRef} className="relative flex flex-col items-center gap-12 lg:gap-16">
          {/* ── Map ── */}
          <FadeUp className="relative w-full max-w-[500px]">
            {/* Background glow */}
            <div
              className="absolute inset-0 -m-12 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(51,102,204,0.3) 0%, transparent 70%)",
              }}
            />

            <svg
              ref={svgRef}
              viewBox="0 0 410 290"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-full h-auto"
              role="img"
              aria-label="Mappa stilizzata della Sicilia con indicazione delle citta principali"
            >
              {/* Subtle grid pattern */}
              <defs>
                <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="410" height="290" fill="url(#map-grid)" />

              {/* Sicily outline with draw animation */}
              <motion.path
                id="sicily-outline"
                d={SICILY_PATH}
                stroke="url(#outline-gradient)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(51,102,204,0.05)"
                initial={{
                  strokeDasharray: pathLength || 1200,
                  strokeDashoffset: pathLength || 1200,
                }}
                animate={
                  isInView
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: pathLength || 1200 }
                }
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Gradient for the outline */}
              <defs>
                <linearGradient id="outline-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3366cc" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3366cc" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3366cc" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* City dots */}
              {cities.map((city, i) => (
                <CityDot key={city.name} city={city} delay={i * 0.15} />
              ))}
            </svg>
          </FadeUp>

          {/* ── Stats ── */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={0.1 * i} className="text-center">
                <p className="font-heading text-3xl font-bold text-neutral-50 sm:text-4xl lg:text-5xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-sm">
                  {stat.label}
                </p>
              </FadeUp>
            ))}
          </div>

          {/* ── Legend ── */}
          <FadeUp delay={0.3}>
            <div className="flex items-center gap-6 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
                Citta principali
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-400" />
                Sede operativa
              </span>
            </div>
          </FadeUp>
        </div>
      </Container>
    </SectionWrapper>
  );
}
