"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { Counter } from "@/components/motion/Counter";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const results = [
  {
    icon: Target,
    value: "€2M+",
    label: "Fondi sbloccati per i clienti",
    description:
      "Capitale reale portato nelle casse delle imprese che si sono affidate al nostro sistema.",
  },
  {
    icon: TrendingUp,
    value: "1:23",
    label: "ROI medio",
    description:
      "Per ogni euro investito nella consulenza, i nostri clienti ne sbloccano 23 in fondi.",
  },
  {
    icon: Award,
    value: "85%+",
    label: "Tasso di approvazione",
    description:
      "Le proposte progettate con il Sistema Sblocca-Fondi™ superano la selezione.",
  },
] as const;

/* ── Component ── */

export function FundingSection() {
  return (
    <SectionWrapper
      id="risultati"
      bg="dark"
      className="bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(16,185,129,0.06),transparent)]"
    >
      <Container>
        <SectionHeader
          overline="I risultati"
          title="I numeri parlano."
          subtitle="Non chiediamo di fidarti. Guarda i fatti."
          dark
        />

        <StaggerContainer
          className="grid gap-5 sm:grid-cols-3"
          staggerDelay={0.12}
          delayChildren={0.15}
        >
          {results.map((result) => {
            const Icon = result.icon;

            return (
              <motion.div key={result.label} variants={fadeUpChild}>
                <Card variant="glass" className="h-full text-center">
                  <div className="flex flex-col items-center gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl",
                        "bg-accent-500/10 text-accent-400"
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    {/* Big number */}
                    <span className="font-mono text-3xl font-bold text-accent-400 sm:text-4xl">
                      {result.value}
                    </span>

                    {/* Label */}
                    <h3 className="font-heading text-base font-semibold text-neutral-100">
                      {result.label}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {result.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  );
}
