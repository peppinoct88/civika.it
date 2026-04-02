"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/motion/FadeUp";

/* ── Component — Chi è Giuseppe (Authority + Empatia) ── */

export function WhySection() {
  return (
    <SectionWrapper id="chi-sono" bg="gradient">
      <Container size="lg">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Foto ── */}
          <FadeUp>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-gold-400/15" aria-hidden="true" />
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-b from-gold-400/10 to-transparent" aria-hidden="true" />
              <img
                src="/giuseppe-spalletta.webp"
                alt="Giuseppe Spalletta — Fondatore di Civika"
                className="relative rounded-xl w-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeUp>

          {/* ── Testo ── */}
          <div>
            <FadeUp delay={0.1}>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-gold-400 mb-3">
                Chi c&apos;è dietro Civika
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-neutral-50 sm:text-4xl lg:text-[2.75rem] mb-6">
                Mi presento:{" "}
                <span className="text-gold-400">
                  sono Giuseppe Spalletta.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-lg leading-relaxed text-neutral-300 mb-5">
                Ho passato anni a lavorare con enti pubblici e istituzioni,
                vedendo dall&apos;interno come funziona il mondo dei
                finanziamenti. Una cosa mi ha sempre colpito:{" "}
                <strong className="text-neutral-100">
                  i fondi ci sono, ma le imprese non li raggiungono.
                </strong>
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="text-base leading-relaxed text-neutral-400 mb-8">
                Non per mancanza di merito, ma per mancanza di chi sappia fare
                il ponte tra il bando e il progetto. Ho creato Civika con una
                missione precisa: sbloccare i fondi per chi li merita.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-sm font-medium text-neutral-500">
                Giuseppe Spalletta — Fondatore &amp; CEO, Civika
              </p>
            </FadeUp>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
