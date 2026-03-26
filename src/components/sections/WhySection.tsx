"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Puzzle,
  MapPin,
  Scale,
  Clock,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const differentials = [
  {
    icon: Shield,
    title: "Specializzazione PA",
    description:
      "Non siamo un'agenzia generica. Lavoriamo esclusivamente con Comuni e istituzioni pubbliche siciliane.",
  },
  {
    icon: Puzzle,
    title: "Approccio integrato",
    description:
      "Eventi, comunicazione, bandi: un unico partner per tutte le esigenze di visibilità.",
  },
  {
    icon: MapPin,
    title: "Radicamento territoriale",
    description:
      "Conosciamo la Sicilia, i suoi Comuni, le sue dinamiche. Siamo del territorio.",
  },
  {
    icon: Scale,
    title: "Compliance garantita",
    description:
      "Ogni nostro output è conforme alla normativa vigente. Zero rischi per l'amministrazione.",
  },
  {
    icon: Clock,
    title: "Agenda corta",
    description:
      "Lavoriamo con un numero limitato di partner per garantire la massima attenzione.",
  },
  {
    icon: BarChart3,
    title: "Risultati misurabili",
    description:
      "Report dettagliati, numeri reali, impatto documentato. Niente fumo, solo risultati.",
  },
] as const;

/* ── Component ── */

export function WhySection() {
  return (
    <SectionWrapper id="perche-noi" bg="gradient">
      <Container>
        <SectionHeader
          overline="Perché noi"
          title="Perché scegliere CIVIKA"
          subtitle="6 ragioni concrete."
          dark
        />

        <StaggerContainer
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
          delayChildren={0.15}
        >
          {differentials.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div key={item.title} variants={fadeUpChild}>
                <Card variant="glass" className="h-full">
                  {/* Icon */}
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                      "bg-primary-500/10 text-primary-400"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base font-semibold text-neutral-100">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  );
}
