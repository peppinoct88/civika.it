"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { Badge } from "@/components/atoms/Badge";
import { StaggerContainer } from "@/components/motion/StaggerContainer";

/* ── Data ── */

const complianceItems = [
  {
    law: "Legge 150/2000",
    description: "Comunicazione pubblica e informazione",
  },
  {
    law: "D.Lgs. 33/2013",
    description: "Trasparenza amministrativa",
  },
  {
    law: "Linee Guida AGID",
    description: "Design e accessibilit\u00E0 siti PA",
  },
  {
    law: "CAD (D.Lgs. 82/2005)",
    description: "Codice Amministrazione Digitale",
  },
  {
    law: "GDPR",
    description: "Protezione dati personali",
  },
  {
    law: "Direttiva UE 2016/2102",
    description: "Accessibilit\u00E0 web PA",
  },
] as const;

/* ── Component ── */

export function ComplianceSection() {
  return (
    <SectionWrapper id="compliance" bg="darker">
      <Container>
        <SectionHeader
          overline="Compliance normativa"
          title="A norma. Sempre. Su tutto."
          subtitle="Il vostro Segretario Comunale pu\u00F2 stare tranquillo."
          dark
        />

        <Card variant="glass" hover={false} className="p-0 overflow-hidden">
          <StaggerContainer
            className="divide-y divide-white/5"
            staggerDelay={0.08}
            delayChildren={0.15}
          >
            {complianceItems.map((item) => (
              <motion.div
                key={item.law}
                variants={fadeUpChild}
                className={cn(
                  "flex items-center gap-4 px-6 py-5",
                  "sm:gap-6 sm:px-8 sm:py-6",
                  "transition-colors duration-200 hover:bg-white/[0.02]"
                )}
              >
                {/* Check icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle
                    className="h-5 w-5 text-emerald-400"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Law badge + description */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <Badge
                    variant="outline"
                    className="w-fit font-mono text-[0.6875rem] tracking-normal"
                  >
                    {item.law}
                  </Badge>
                  <p className="text-[0.9375rem] leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </Card>
      </Container>
    </SectionWrapper>
  );
}
