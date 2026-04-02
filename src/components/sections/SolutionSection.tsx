"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, HelpCircle, ArrowRight } from "lucide-react";
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

/* ── Data — Per chi è Civika ── */

const targets = [
  {
    icon: Building2,
    title: "PMI che vogliono crescere",
    description:
      "Hai un'azienda solida ma non sai che potresti finanziare innovazione, assunzioni o internazionalizzazione con fondi pubblici. Civika te li sblocca.",
  },
  {
    icon: Rocket,
    title: "Startup che cercano fondi",
    description:
      "Hai un'idea innovativa e ti servono capitali per partire o scalare. I bandi per startup esistono — serve chi sa trasformare la tua visione in un progetto vincente.",
  },
  {
    icon: HelpCircle,
    title: "Imprese che non sanno da dove iniziare",
    description:
      "Hai sentito parlare di bandi ma pensi che siano \"roba per i grandi\" o troppo complicati. La Diagnosi gratuita ti mostra esattamente cosa puoi ottenere.",
  },
] as const;

/* ── Component ── */

export function SolutionSection() {
  return (
    <SectionWrapper id="per-chi" bg="gradient">
      <Container>
        <SectionHeader
          overline="Per chi è Civika"
          title="Trasformiamo i bandi in capitale reale."
          subtitle="Non importa la dimensione della tua azienda. Importa che ci sia un progetto di crescita."
          dark
        />

        {/* Central block */}
        <FadeUp className="mx-auto max-w-3xl text-center mb-14 lg:mb-16">
          <Badge variant="accent" className="mb-6">
            Sblocco Fondi™
          </Badge>

          <p className="text-lg leading-relaxed text-neutral-300">
            Civika è l&apos;unica società di consulenza specializzata
            esclusivamente nello{" "}
            <GradientText variant="accent">sblocco di fondi pubblici</GradientText>{" "}
            per le imprese. Non facciamo &quot;anche i bandi&quot; — facciamo{" "}
            <em>solo</em> questo, con un sistema proprietario che
            trasforma la burocrazia in opportunità.
          </p>
        </FadeUp>

        {/* Target profiles */}
        <StaggerContainer
          className="grid gap-6 sm:grid-cols-3 mb-14 lg:mb-16"
          staggerDelay={0.12}
          delayChildren={0.2}
        >
          {targets.map((target) => {
            const Icon = target.icon;

            return (
              <motion.div
                key={target.title}
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
                    "bg-accent-500/10 text-accent-400"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <h3 className="font-heading text-base font-semibold text-neutral-100">
                  {target.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {target.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.3} className="text-center">
          <Button variant="primary" size="lg" asChild>
            <a href="/diagnosi">
              Scopri cosa puoi sbloccare
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
