"use client";

import { motion } from "framer-motion";
import { Search, FileText, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const fundingAreas = [
  {
    icon: Search,
    title: "Monitoraggio bandi",
    description:
      "Monitoriamo quotidianamente bandi europei, nazionali e regionali pertinenti al vostro Comune.",
  },
  {
    icon: FileText,
    title: "Progettazione",
    description:
      "Redigiamo le proposte progettuali con tutti gli allegati richiesti.",
  },
  {
    icon: TrendingUp,
    title: "Rendicontazione",
    description:
      "Vi seguiamo nella rendicontazione e nella gestione del progetto finanziato.",
  },
] as const;

/* ── Component ── */

export function FundingSection() {
  return (
    <SectionWrapper
      id="fondi"
      bg="dark"
      className="bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(245,158,11,0.06),transparent)]"
    >
      <Container>
        <SectionHeader
          overline="Bandi e fondi"
          title="Vi aiutiamo anche a trovare i fondi"
          subtitle="Dall'evento al bando. Dal bando all'evento."
          dark
        />

        <FadeUp>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-neutral-400 lg:mb-16">
            Un evento ben comunicato genera visibilità. La visibilità rafforza
            la candidatura ai bandi. I fondi ottenuti finanziano nuovi progetti e
            nuovi eventi. Un circolo virtuoso che parte dalla comunicazione.
          </p>
        </FadeUp>

        <StaggerContainer
          className="grid gap-5 sm:grid-cols-3"
          staggerDelay={0.12}
          delayChildren={0.15}
        >
          {fundingAreas.map((area) => {
            const Icon = area.icon;

            return (
              <motion.div key={area.title} variants={fadeUpChild}>
                <Card variant="glass" className="h-full">
                  <div className="flex flex-col gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl",
                        "bg-accent-400/10 text-accent-400"
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-neutral-100">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-400">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-12 flex justify-center lg:mt-16">
            <Button asChild variant="secondary" size="lg">
              <Link href="/servizi/bandi-europei-comuni">
                Scopri il servizio bandi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
