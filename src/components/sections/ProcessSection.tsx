"use client";

import { motion } from "framer-motion";
import { Phone, Search, FileText, Handshake } from "lucide-react";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data — Come funziona la Diagnosi ── */

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Prenoti",
    description:
      "Compili il form o ci chiami. Fissiamo un appuntamento di 30 minuti, senza impegno e senza costi.",
  },
  {
    number: "02",
    icon: Search,
    title: "Ti analizziamo",
    description:
      "Studiamo il tuo settore, la tua azienda e il territorio. Mappiamo tutti i bandi a cui puoi accedere oggi.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Presentiamo il Dossier",
    description:
      "Ricevi il tuo Dossier Sblocca-Fondi™ personalizzato: quali bandi, quanto valgono, che probabilità hai.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Decidi tu",
    description:
      "Nessuna pressione. Hai il dossier, hai i numeri. Se vuoi procedere, costruiamo il progetto insieme.",
  },
] as const;

/* ── Component ── */

export function ProcessSection() {
  return (
    <SectionWrapper id="come-funziona" bg="dark">
      <Container>
        <SectionHeader
          overline="Come funziona"
          title="Dalla chiamata ai fondi, in 4 passi."
          subtitle="Il processo della Diagnosi Sblocca-Fondi™ è semplice, trasparente e senza rischi."
          dark
        />

        <StaggerContainer
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.12}
          delayChildren={0.15}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUpChild}
                className="relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 text-center overflow-hidden"
              >
                {/* Background number */}
                <span className="text-[4rem] font-bold leading-none text-white/[0.04] absolute top-3 right-4 font-display select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  );
}
