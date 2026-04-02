"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { Badge } from "@/components/atoms/Badge";

/* ── Component — Chi è Giuseppe (Authority + Empatia) ── */

export function WhySection() {
  return (
    <SectionWrapper id="chi-sono" bg="gradient">
      <Container size="md">
        <FadeUp className="text-center">
          <Badge variant="default" className="mb-8">
            Chi c&apos;è dietro Civika
          </Badge>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-neutral-50 text-center sm:text-4xl lg:text-5xl mb-8">
            &ldquo;Ho visto troppi imprenditori rinunciare a fondi che
            spettavano loro. Ho creato Civika per cambiare questo.&rdquo;
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <p className="text-lg leading-relaxed text-neutral-300">
              <strong className="text-neutral-100">Giuseppe Spalletta</strong>,
              fondatore di Civika, ha passato anni a lavorare con enti pubblici
              e istituzioni, vedendo dall&apos;interno come funziona il mondo
              dei finanziamenti.
            </p>

            <p className="text-[0.9375rem] leading-relaxed text-neutral-400">
              Una cosa lo ha sempre colpito: i fondi ci sono, ma le imprese non
              li raggiungono. Non per mancanza di merito, ma per mancanza di
              chi sappia fare il ponte tra il bando e il progetto. Civika nasce
              con una missione precisa: sbloccare i fondi per chi li merita.
            </p>

            <p className="text-sm text-neutral-500 pt-2">
              Giuseppe Spalletta — Fondatore &amp; CEO, Civika
            </p>
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
