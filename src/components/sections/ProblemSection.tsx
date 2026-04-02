"use client";

import { motion } from "framer-motion";
import { Ban, Clock, FileQuestion, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const problems = [
  {
    icon: FileQuestion,
    title: "Bandi incomprensibili",
    description:
      "Centinaia di pagine di burocrazia, requisiti tecnici e scadenze impossibili. La maggior parte degli imprenditori rinuncia prima ancora di iniziare.",
  },
  {
    icon: Clock,
    title: "Tempo che non hai",
    description:
      "Tra gestire l'azienda e decifrare un bando, il tempo non basta mai. E ogni bando perso è un'opportunità di crescita che non torna.",
  },
  {
    icon: Ban,
    title: "Consulenti generalisti",
    description:
      "Ti affidi a chi \"fa anche i bandi\" tra mille altre cose. Risultato: progetti deboli, bocciati, e soldi spesi in consulenze inutili.",
  },
  {
    icon: TrendingDown,
    title: "Il tuo competitor cresce. Tu no.",
    description:
      "Mentre tu pensi che i bandi siano \"roba per i grandi\", il tuo concorrente ha già sbloccato fondi per innovare, assumere e investire.",
  },
] as const;

/* ── Component ── */

export function ProblemSection() {
  return (
    <SectionWrapper id="problema" bg="darker">
      <Container>
        <SectionHeader
          overline="Il problema"
          title="Milioni di euro restano bloccati. E la tua azienda paga il conto."
          subtitle="Ogni anno miliardi di fondi pubblici non vengono assegnati. Non perché mancano le imprese meritevoli, ma perché nessuno le aiuta ad accedervi."
          dark
        />

        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2"
          staggerDelay={0.12}
          delayChildren={0.15}
        >
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <motion.div key={problem.title} variants={fadeUpChild}>
                <Card variant="glass" className="h-full">
                  <div className="flex flex-col gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl",
                        "bg-red-500/10 text-red-400"
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-neutral-100">
                        {problem.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-400">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  );
}
