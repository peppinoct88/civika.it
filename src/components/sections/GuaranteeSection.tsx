"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data — Garanzia Tripla Blindata ── */

const guarantees = [
  {
    icon: ShieldCheck,
    name: "Garanzia «Fondi o Riproviamo»",
    title: "Se non vinci, ripresentiamo gratis",
    description:
      "Se il progetto non viene approvato, analizziamo i feedback, rivediamo la strategia e ripresentiamo a nostre spese. Il tuo investimento non va mai perso.",
  },
  {
    icon: Eye,
    name: "Garanzia «Vetrina Aperta»",
    title: "Sai sempre a che punto sei",
    description:
      "Report di avanzamento, accesso ai documenti, comunicazione diretta col tuo project manager. Zero sorprese, zero burocrazia nascosta.",
  },
  {
    icon: Clock,
    name: "Garanzia «Risposta in 48h»",
    title: "La Diagnosi è gratis, per sempre",
    description:
      "La Diagnosi Sblocca-Fondi™ è gratuita e lo resterà. Entro 48 ore lavorative ricevi il tuo Dossier personalizzato. Se non ci sono opportunità, te lo diciamo.",
  },
] as const;

/* ── Component ── */

export function GuaranteeSection() {
  return (
    <SectionWrapper id="garanzia" bg="darker">
      <Container>
        <SectionHeader
          overline="Tripla garanzia"
          title="Il rischio lo prendiamo noi."
          subtitle="Tre garanzie concrete con nomi e cognomi. Nessun asterisco."
          dark
        />

        <StaggerContainer
          className="grid gap-6 sm:grid-cols-3"
          staggerDelay={0.12}
          delayChildren={0.15}
        >
          {guarantees.map((guarantee) => {
            const Icon = guarantee.icon;

            return (
              <motion.div key={guarantee.name} variants={fadeUpChild}>
                <Card variant="glass" className="h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        "bg-gold-400/10 text-gold-400"
                      )}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>

                    {/* Name badge */}
                    <span className="inline-block rounded-full bg-gold-400/10 border border-gold-400/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-400">
                      {guarantee.name}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-semibold text-neutral-100">
                      {guarantee.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-neutral-300">
                      {guarantee.description}
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
