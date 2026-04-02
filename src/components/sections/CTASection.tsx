"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { FadeUp } from "@/components/motion";
import { Button } from "@/components/atoms";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";

/* ── CTA Section — Diagnosi Sblocca-Fondi™ ── */

export function CTASection() {
  return (
    <SectionWrapper
      id="cta"
      bg="dark"
      className="!py-28 sm:!py-36 lg:!py-44"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #111113 0%, #0a1e1a 50%, #111113 100%)",
        }}
      />

      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] sm:h-[500px] sm:w-[800px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 40%, transparent 70%)",
        }}
      />

      <Container size="md" className="relative text-center">
        {/* Title */}
        <FadeUp>
          <h2 className="font-display text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-bold italic leading-[1.1] tracking-tight text-neutral-50">
            Scopri quanto puoi sbloccare.
          </h2>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            La Diagnosi Sblocca-Fondi™ è gratuita. In 30 minuti analizziamo il
            tuo settore, la tua azienda e ti mostriamo esattamente quali fondi
            puoi ottenere e quanto valgono.
          </p>
        </FadeUp>

        {/* Urgency */}
        <FadeUp delay={0.15}>
          <p className="mt-4 text-sm font-medium text-accent-400">
            Solo 10 slot disponibili al mese
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
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
        </FadeUp>

        {/* Trust note */}
        <FadeUp delay={0.3}>
          <p className="mt-8 text-sm text-neutral-600">
            Nessun impegno. Nessun costo. Solo chiarezza.
          </p>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
