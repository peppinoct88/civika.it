"use client";

import { motion } from "framer-motion";
import { Handshake, Layers, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Badge } from "@/components/atoms/Badge";
import { GradientText } from "@/components/atoms/GradientText";
import { Button } from "@/components/atoms/Button";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const valueProps = [
  {
    icon: Handshake,
    title: "Un unico partner",
    description:
      "Strategia, creatività e tecnologia in un solo interlocutore. Nessuna frammentazione, massima coerenza.",
  },
  {
    icon: Layers,
    title: "Approccio integrato",
    description:
      "Comunicazione, digital, eventi e formazione lavorano insieme verso obiettivi condivisi.",
  },
  {
    icon: BarChart3,
    title: "Risultati misurabili",
    description:
      "Ogni azione è tracciata e ottimizzata. Report chiari per dimostrare l'impatto concreto.",
  },
] as const;

/* ── Component ── */

export function SolutionSection() {
  return (
    <SectionWrapper id="soluzione" bg="gradient">
      <Container>
        <SectionHeader
          overline="La soluzione"
          title="Ogni Comune merita di essere visto."
          subtitle="CIVIKA è la regia per la visibilità istituzionale."
          dark
        />

        {/* Central block */}
        <FadeUp className="mx-auto max-w-3xl text-center mb-14 lg:mb-16">
          <Badge variant="default" className="mb-6">
            CIVIKA SRL
          </Badge>

          <p className="text-lg leading-relaxed text-neutral-300">
            Siamo il partner strategico che affianca le amministrazioni locali
            nella costruzione della propria{" "}
            <GradientText variant="accent">visibilità</GradientText>.
            Dalla comunicazione istituzionale al digitale, dagli eventi alla
            formazione: trasformiamo i Comuni in protagonisti del proprio
            territorio.
          </p>
        </FadeUp>

        {/* Value propositions */}
        <StaggerContainer
          className="grid gap-6 sm:grid-cols-3 mb-14 lg:mb-16"
          staggerDelay={0.12}
          delayChildren={0.2}
        >
          {valueProps.map((prop) => {
            const Icon = prop.icon;

            return (
              <motion.div
                key={prop.title}
                variants={fadeUpChild}
                className={cn(
                  "group relative rounded-2xl p-6 text-center",
                  "bg-white/[0.03] border border-white/[0.06]",
                  "hover:bg-white/[0.06] hover:border-white/10",
                  "transition-colors duration-300"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                    "bg-primary-500/10 text-primary-400"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <h3 className="font-heading text-base font-semibold text-neutral-100">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.3} className="text-center">
          <Button variant="primary" size="lg" asChild>
            <Link href="/servizi">
              Scopri i servizi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
