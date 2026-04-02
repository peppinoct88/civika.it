"use client";

import { ArrowRight, Calendar, FileText, Map, BarChart3, Route, Gift, ShieldCheck, Clock, Zap } from "lucide-react";
import { FadeUp } from "@/components/motion";
import { Button } from "@/components/atoms";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";

/* ── Bonus items ── */

const bonuses = [
  {
    icon: FileText,
    title: "Dossier Sblocca-Fondi™ personalizzato",
    value: "297€",
    description: "Analisi completa dei bandi a cui puoi accedere, con importi e probabilità di successo.",
  },
  {
    icon: Map,
    title: "Mappa dei Fondi™ del tuo settore",
    value: "197€",
    description: "Tutti i finanziamenti attivi — europei, nazionali e regionali — specifici per il tuo mercato.",
  },
  {
    icon: BarChart3,
    title: "Report di Fattibilità Economica",
    value: "147€",
    description: "Quanto puoi ottenere, con quale investimento iniziale e in che tempi realistici.",
  },
  {
    icon: Route,
    title: "Roadmap Operativa Personalizzata",
    value: "97€",
    description: "I prossimi passi concreti per trasformare il bando giusto in capitale reale per la tua impresa.",
  },
];

/* ── CTA Section — Offer Stacking ── */

export function CTASection() {
  const totalValue = bonuses.reduce(
    (sum, b) => sum + parseInt(b.value),
    0
  );

  return (
    <SectionWrapper
      id="cta"
      bg="dark"
      className="!py-20 sm:!py-28 lg:!py-36"
    >
      {/* Background gradient epicness */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.08) 0%, transparent 70%), linear-gradient(to bottom, #0a1e2e 0%, #091e28 50%, #0a1e2e 100%)",
        }}
      />

      <Container size="md" className="relative">
        {/* Overline */}
        <FadeUp>
          <div className="text-center mb-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              La tua prossima mossa
            </span>
          </div>
        </FadeUp>

        {/* Title */}
        <FadeUp delay={0.05}>
          <div className="text-center mb-4">
            <h2 className="font-display text-[clamp(2rem,5vw+0.5rem,3.75rem)] font-bold leading-[1.05] tracking-tight text-white">
              Scopri quanto puoi sbloccare.
            </h2>
          </div>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.1}>
          <p className="mx-auto max-w-2xl text-center text-lg sm:text-xl leading-relaxed text-neutral-300 mb-4">
            Richiedi una{" "}
            <span className="font-semibold text-white">Diagnosi Sblocca-Fondi™ gratuita</span>: una consulenza dedicata
            in cui analizziamo la tua azienda e ti mostriamo esattamente quali fondi puoi ottenere.
          </p>
          <p className="mx-auto max-w-xl text-center text-base text-neutral-400 mb-12">
            Alla fine della consulenza, ricevi tutto questo — senza impegno, senza costi:
          </p>
        </FadeUp>

        {/* Bonus stacking */}
        <div className="space-y-3 mb-10">
          {bonuses.map((bonus, i) => {
            const Icon = bonus.icon;
            return (
              <FadeUp key={bonus.title} delay={0.15 + i * 0.08}>
                <div className="group flex items-start gap-4 rounded-xl border border-accent-500/15 bg-accent-500/[0.03] p-5 sm:p-6 transition-colors duration-300 hover:border-accent-400/30 hover:bg-accent-500/[0.06]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400 group-hover:bg-accent-500/20 transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h3 className="text-base font-semibold text-white">{bonus.title}</h3>
                      <span className="rounded-full bg-gold-400/10 px-2.5 py-0.5 text-xs font-bold text-gold-400">
                        Valore: {bonus.value}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-400">{bonus.description}</p>
                  </div>
                  <Gift className="h-5 w-5 text-accent-400/40 shrink-0 mt-1 hidden sm:block group-hover:text-accent-400 transition-colors" />
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Total value + urgency + CTA */}
        <FadeUp delay={0.5}>
          <div className="rounded-2xl border border-gold-400/20 bg-gold-400/[0.04] p-8 sm:p-10 text-center">
            {/* Value strike */}
            <p className="text-sm text-neutral-400 mb-2">
              Valore totale della consulenza:
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-neutral-500 line-through decoration-red-400/60 decoration-2 mb-2">
              {totalValue}€
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-accent-400 mb-3">
              Per te: GRATIS
            </p>

            {/* Urgency */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-400/10 border border-gold-400/20 px-4 py-2 mb-8">
              <Clock className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-semibold text-gold-400">
                Solo 10 slot disponibili al mese
              </span>
            </div>

            {/* CTA primary */}
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" asChild className="text-base px-8 py-4">
                <a href="#cta-form">
                  <Calendar className="h-5 w-5" />
                  Prenota la tua Diagnosi Gratuita
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-400" />
                Zero costi nascosti
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Zap className="h-3.5 w-3.5 text-gold-400" />
                Risposta entro 48h
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-400" />
                Nessun impegno
              </span>
            </div>
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
