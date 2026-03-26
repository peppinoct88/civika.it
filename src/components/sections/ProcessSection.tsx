"use client";

import {
  ClipboardList,
  Lightbulb,
  CalendarCog,
  Hammer,
  Users,
  FileBarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProcessStep } from "@/components/molecules/ProcessStep";
import { FadeUp } from "@/components/motion/FadeUp";

/* ── Data ── */

const steps = [
  {
    title: "Analisi e briefing",
    description:
      "Incontriamo il Sindaco, ascoltiamo le esigenze, mappiamo il territorio.",
    icon: ClipboardList,
  },
  {
    title: "Concept e strategia",
    description:
      "Progettiamo il concept dell'evento o della campagna di comunicazione.",
    icon: Lightbulb,
  },
  {
    title: "Pianificazione operativa",
    description:
      "Timeline, budget, fornitori, logistica: tutto sotto controllo.",
    icon: CalendarCog,
  },
  {
    title: "Produzione e allestimento",
    description:
      "Realizziamo tutto: dal materiale grafico all'allestimento fisico.",
    icon: Hammer,
  },
  {
    title: "Esecuzione e coordinamento",
    description:
      "Il giorno dell'evento siamo presenti con tutta la squadra.",
    icon: Users,
  },
  {
    title: "Rassegna stampa e report",
    description:
      "Documentiamo tutto: foto, video, rassegna stampa, report finale.",
    icon: FileBarChart,
  },
] as const;

/* ── Component ── */

export function ProcessSection() {
  return (
    <SectionWrapper id="processo" bg="darker">
      <Container>
        <SectionHeader
          overline="Il processo"
          title="Dal concept alla rassegna stampa"
          subtitle="Il Sindaco non deve pensare a niente."
          dark
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          {/* Timeline — left column */}
          <div className="lg:col-span-3">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.title}
                number={i + 1}
                title={step.title}
                description={step.description}
                isLast={i === steps.length - 1}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Decorative summary — right column (desktop only) */}
          <FadeUp delay={0.3} className="hidden lg:block lg:col-span-2">
            <div
              className={cn(
                "sticky top-28 rounded-2xl border border-white/5 p-8",
                "bg-gradient-to-b from-primary-500/5 to-transparent"
              )}
            >
              {/* Icon grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl",
                          "bg-primary-500/10 text-primary-400"
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="text-xs text-neutral-500 leading-tight">
                        {step.title.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent mb-8" />

              {/* Summary text */}
              <p className="text-sm text-neutral-400 leading-relaxed">
                <span className="font-semibold text-neutral-200">
                  6 fasi, un unico referente.
                </span>{" "}
                Dalla prima riunione alla consegna del report finale, gestiamo
                ogni dettaglio perché il Sindaco possa concentrarsi su
                ciò che conta.
              </p>

              {/* Decorative accent line */}
              <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-400" />
            </div>
          </FadeUp>
        </div>
      </Container>
    </SectionWrapper>
  );
}
