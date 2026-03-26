"use client";

import { motion } from "framer-motion";
import { EyeOff, CalendarX, FileX, Users } from "lucide-react";
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
    icon: EyeOff,
    title: "Invisibilit\u00E0 digitale",
    description:
      "Il 78% dei Comuni siciliani non ha una presenza online strutturata. I cittadini non trovano informazioni, non sanno cosa fa l\u2019amministrazione.",
  },
  {
    icon: CalendarX,
    title: "Eventi senza eco",
    description:
      "Inaugurazioni, feste patronali, convegni: senza comunicazione professionale, la partecipazione crolla e l\u2019investimento si perde.",
  },
  {
    icon: FileX,
    title: "Fondi non richiesti",
    description:
      "Miliardi di euro in bandi europei e PNRR restano inutilizzati perch\u00E9 mancano le competenze per accedervi.",
  },
  {
    icon: Users,
    title: "Cittadini disconnessi",
    description:
      "Senza canali di comunicazione attivi, il gap tra amministrazione e comunit\u00E0 cresce. La fiducia diminuisce.",
  },
] as const;

/* ── Component ── */

export function ProblemSection() {
  return (
    <SectionWrapper id="problema" bg="darker">
      <Container>
        <SectionHeader
          overline="Il problema"
          title="Cosa succede quando il Comune non comunica"
          subtitle="L&#39;invisibilit\u00E0 costa pi\u00F9 di qualsiasi investimento in comunicazione."
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
