"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";

/* ── Data ── */

const qualifiedFor = [
  "Sei un imprenditore o CEO di una PMI con fatturato superiore a 200.000€",
  "Hai un progetto di crescita, innovazione o internazionalizzazione",
  "Vuoi accedere a fondi pubblici ma non sai da dove iniziare",
  "Sei stanco di consulenti generalisti che promettono e non portano risultati",
  "Sei disposto a investire tempo in una diagnosi seria della tua azienda",
];

const notFor = [
  "Cerchi soldi facili senza un progetto reale",
  "Non hai nessuna intenzione seria di avviare o far crescere un'impresa",
  "Non sei disponibile a condividere dati sulla tua impresa",
  "Pensi che i bandi si vincano con il fai-da-te e un template scaricato online",
  "Non hai tempo né volontà di seguire un percorso strutturato",
];

/* ── Component ── */

export function QualificationSection() {
  return (
    <SectionWrapper id="per-chi-e" bg="dark">
      <Container size="md">
        <SectionHeader
          overline="Per chi è"
          title="La Diagnosi è per te se..."
          dark
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Sì */}
          <FadeUp>
            <div className="rounded-xl border border-accent-500/20 bg-accent-500/[0.04] p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-accent-400 mb-5">
                Fa per te se:
              </p>
              <ul className="space-y-3">
                {qualifiedFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-400 shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* No */}
          <FadeUp delay={0.1}>
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-red-400 mb-5">
                Non fa per te se:
              </p>
              <ul className="space-y-3">
                {notFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </Container>
    </SectionWrapper>
  );
}
