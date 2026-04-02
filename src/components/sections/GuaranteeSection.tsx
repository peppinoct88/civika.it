"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data — Garanzia Tripla Protezione ── */

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Garanzia di Risultato",
    description:
      "Se il progetto non viene approvato, rivediamo insieme la strategia e ripresentiamo a nostre spese. Il tuo investimento non va mai perso.",
  },
  {
    icon: Eye,
    title: "Garanzia di Trasparenza",
    description:
      "Sai sempre a che punto è il tuo progetto. Report di avanzamento, accesso ai documenti, comunicazione diretta. Zero sorprese.",
  },
  {
    icon: CircleDollarSign,
    title: "Garanzia Nessun Rischio",
    description:
      "La Diagnosi Sblocca-Fondi™ è gratuita. Scopri il tuo potenziale prima di investire un euro. Se non ci sono opportunità concrete, te lo diciamo.",
  },
] as const;

/* ── Component ── */

export function GuaranteeSection() {
  return (
    <SectionWrapper id="garanzia" bg="darker">
      <Container>
        <SectionHeader
          overline="Tripla Protezione"
          title="Il rischio lo prendiamo noi."
          subtitle="Tre garanzie concrete per eliminare ogni dubbio."
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
              <motion.div key={guarantee.title} variants={fadeUpChild}>
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

                    {/* Text */}
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-neutral-100">
                        {guarantee.title}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral-400">
                        {guarantee.description}
                      </p>
                    </div>
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
