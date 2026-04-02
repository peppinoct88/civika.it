"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data — Sistema Sblocca-Fondi™ 4 fasi ── */

const phases = [
  {
    number: "01",
    title: "MAPPA",
    subtitle: "Scopriamo i tuoi fondi",
    description:
      "Analizziamo il tuo settore, la tua azienda e il territorio. Mappiamo tutti i bandi attivi — europei, nazionali e regionali — a cui puoi accedere oggi.",
  },
  {
    number: "02",
    title: "PROGETTO",
    subtitle: "Costruiamo la proposta vincente",
    description:
      "Progettiamo la candidatura su misura: budget, obiettivi, partner, cronoprogramma. Ogni dettaglio calibrato sui criteri di valutazione del bando.",
  },
  {
    number: "03",
    title: "VERDETTO",
    subtitle: "Presentiamo e seguiamo",
    description:
      "Presentiamo il progetto e gestiamo tutto l'iter burocratico fino alla risposta ufficiale. Tu continui a gestire la tua azienda, noi pensiamo al resto.",
  },
  {
    number: "04",
    title: "INCASSO",
    subtitle: "Sblocchi i fondi",
    description:
      "Progetto approvato, fondi sbloccati. Ti accompagniamo nella rendicontazione per assicurare l'erogazione completa, senza intoppi.",
  },
] as const;

/* ── Component ── */

export function MethodSection() {
  return (
    <SectionWrapper id="metodo" bg="dark">
      <Container>
        <SectionHeader
          overline="Il metodo"
          title="Il Sistema Sblocca-Fondi™"
          subtitle="Quattro fasi. Un unico obiettivo: trasformare i bandi da burocrazia a capitale per la tua impresa."
          dark
        />

        {/* Desktop connecting line */}
        <div className="relative">
          {/* Horizontal dotted line - desktop only */}
          <div
            className={cn(
              "hidden lg:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-px",
              "border-t border-dashed border-accent-500/30"
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
                      "h-5 w-px border-l border-dashed border-accent-500/30"
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Number circle */}
                <div
                  className={cn(
                    "relative z-10 flex h-[3.5rem] w-[3.5rem] items-center justify-center",
                    "rounded-full border border-gold-400/25 bg-gold-400/10",
                    "mb-5"
                  )}
                >
                  <span className="font-display text-lg font-bold text-gold-400">
                    {phase.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-semibold text-accent-400 mb-1">
                  {phase.title}
                </h3>
                <p className="text-xs font-medium text-neutral-300 mb-3">
                  {phase.subtitle}
                </p>

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
