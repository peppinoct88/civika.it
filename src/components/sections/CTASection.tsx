"use client";

import { ArrowRight, Calendar, FileText, Map, BarChart3, Route, Gift } from "lucide-react";
import { FadeUp } from "@/components/motion";
import { Button } from "@/components/atoms";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";

/* ── Bonus items ── */

const bonuses = [
  {
    icon: FileText,
    title: "Dossier Sblocca-Fondi™ personalizzato",
    value: "Valore: 297€",
    description: "Analisi completa dei bandi a cui puoi accedere, con importi e probabilità.",
  },
  {
    icon: Map,
    title: "Mappa dei Fondi™ del tuo settore",
    value: "Valore: 197€",
    description: "Tutti i finanziamenti attivi — europei, nazionali e regionali — per il tuo mercato.",
  },
  {
    icon: BarChart3,
    title: "Report di Fattibilità Economica",
    value: "Valore: 147€",
    description: "Quanto puoi ottenere, con quale investimento iniziale e in che tempi.",
  },
  {
    icon: Route,
    title: "Roadmap Operativa Personalizzata",
    value: "Valore: 97€",
    description: "I prossimi passi concreti per trasformare il bando in capitale.",
  },
];

/* ── CTA Section — Offer Stacking ── */

export function CTASection() {
  return (
    <SectionWrapper
      id="cta"
      bg="dark"
      className="!py-20 sm:!py-28 lg:!py-36"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0a1e2e 0%, #0a2e24 50%, #0a1e2e 100%)",
        }}
      />

      <Container size="md" className="relative">
        {/* Title */}
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="font-display text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-semibold leading-[1.1] tracking-tight text-neutral-50 mb-4">
              Scopri quanto puoi sbloccare.
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-neutral-400">
              La Diagnosi Sblocca-Fondi™ è gratuita. In 30 minuti ricevi tutto questo:
            </p>
          </div>
        </FadeUp>

        {/* Bonus stacking */}
        <div className="space-y-3 mb-10">
          {bonuses.map((bonus, i) => {
            const Icon = bonus.icon;
            return (
              <FadeUp key={bonus.title} delay={0.05 + i * 0.08}>
                <div className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-sm font-semibold text-white">{bonus.title}</h3>
                      <span className="text-xs font-bold text-gold-400">{bonus.value}</span>
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">{bonus.description}</p>
                  </div>
                  <Gift className="h-4 w-4 text-accent-400 shrink-0 mt-1 hidden sm:block" />
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Total value + CTA */}
        <FadeUp delay={0.4}>
          <div className="text-center">
            {/* Value strike */}
            <p className="text-sm text-neutral-500 mb-1">
              Valore totale: <span className="line-through">738€</span>
            </p>
            <p className="text-2xl font-bold text-accent-400 mb-1">
              Per te: GRATIS
            </p>
            <p className="text-sm text-gold-400 font-medium mb-8">
              Solo 10 slot disponibili al mese
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Button size="lg" asChild>
                <a href="/diagnosi">
                  <Calendar className="h-4 w-4" />
                  Prenota la Diagnosi Gratuita
                </a>
              </Button>

              <Button variant="secondary" size="lg" asChild>
                <a href="/risorse/mappa-fondi">
                  Scarica prima la Mappa dei Fondi™
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Trust note */}
            <p className="mt-6 text-sm text-neutral-600">
              Nessun impegno. Nessun costo. Solo chiarezza.
            </p>
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
