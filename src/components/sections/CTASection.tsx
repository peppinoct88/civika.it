"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion";
import { Button } from "@/components/atoms";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";

/* ── CTA Section ── */

export function CTASection() {
  return (
    <SectionWrapper
      id="cta"
      bg="dark"
      className="!py-28 sm:!py-36 lg:!py-44"
    >
      {/* Background gradient: dark to blue-tinted */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #111113 0%, #0d1420 50%, #111113 100%)",
        }}
      />

      {/* Decorative glow behind title */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] sm:h-[500px] sm:w-[800px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(51,102,204,0.12) 0%, rgba(51,102,204,0.04) 40%, transparent 70%)",
        }}
      />

      <Container size="md" className="relative text-center">
        {/* Title */}
        <FadeUp>
          <h2 className="font-display text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-bold leading-[1.1] tracking-tight text-neutral-50">
            Parliamo del vostro Comune.
          </h2>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            Il primo passo e una conversazione. Nessun impegno, nessun costo.
            Solo una chiacchierata per capire come possiamo aiutarvi.
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Button size="lg" asChild>
              <Link href="/contatti">
                Contattaci
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button variant="secondary" size="lg" asChild>
              <a href="tel:+390957691111">
                <Phone className="h-4 w-4" />
                Chiamaci
              </a>
            </Button>
          </div>
        </FadeUp>

        {/* Trust note */}
        <FadeUp delay={0.3}>
          <p className="mt-8 text-sm text-neutral-600">
            Risposta entro 24 ore lavorative
          </p>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
