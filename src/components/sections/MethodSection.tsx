"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const phases = [
  {
    number: "01",
    title: "Ascolto",
    description:
      "Partiamo sempre dall'ascolto. Ogni Comune ha una storia diversa, esigenze uniche, un territorio con le sue specificità.",
  },
  {
    number: "02",
    title: "Strategia",
    description:
      "Definiamo obiettivi chiari e misurabili. Ogni azione ha uno scopo preciso dentro un piano organico.",
  },
  {
    number: "03",
    title: "Esecuzione",
    description:
      "Realizziamo con standard professionali. Dalla grafica alla logistica, ogni dettaglio è curato.",
  },
  {
    number: "04",
    title: "Misurazione",
    description:
      "Misuriamo i risultati e documentiamo tutto. Report dettagliati per il Sindaco e la Giunta.",
  },
] as const;

/* ── Component ── */

export function MethodSection() {
  return (
    <SectionWrapper id="metodo" bg="dark">
      <Container>
        <SectionHeader
          overline="Il metodo"
          title="Il Metodo CIVIKA"
          subtitle="Non improvvisiamo."
          dark
        />

        {/* Desktop connecting line */}
        <div className="relative">
          {/* Horizontal dotted line - desktop only */}
          <div
            className={cn(
              "hidden lg:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-px",
              "border-t border-dashed border-primary-500/30"
            )}
            aria-hidden="true"
          />

          <StaggerContainer
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 relative"
            staggerDelay={0.15}
            delayChildren={0.1}
          >
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                variants={fadeUpChild}
                className="relative flex flex-col items-center text-center"
              >
                {/* Mobile vertical connector */}
                {index > 0 && (
                  <div
                    className={cn(
                      "lg:hidden absolute -top-5 left-1/2 -translate-x-1/2",
                      "h-5 w-px border-l border-dashed border-primary-500/30"
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Number circle */}
                <div
                  className={cn(
                    "relative z-10 flex h-[3.5rem] w-[3.5rem] items-center justify-center",
                    "rounded-full border border-primary-500/20 bg-primary-500/10",
                    "mb-5"
                  )}
                >
                  <span className="font-display text-lg font-bold text-primary-400">
                    {phase.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-semibold text-neutral-100 mb-2">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-neutral-400 max-w-[260px]">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </SectionWrapper>
  );
}
