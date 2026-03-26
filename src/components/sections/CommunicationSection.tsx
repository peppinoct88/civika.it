"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Share2,
  Newspaper,
  Mail,
  Palette,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUpChild } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FadeUp } from "@/components/motion/FadeUp";

/* ── Data ── */

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "Sito web comunale",
    description:
      "Sito AGID compliant, accessibile, aggiornato. Design moderno e conforme alla normativa.",
    href: "/servizi/sito-web-comunale-agid",
  },
  {
    icon: Share2,
    title: "Social media",
    description:
      "Piano editoriale, contenuti, community management. Presenza costante sui canali giusti.",
    href: "/servizi/social-media-comuni",
  },
  {
    icon: Newspaper,
    title: "Ufficio stampa",
    description:
      "Comunicati stampa, relazioni media, rassegna stampa. Visibilit\u00E0 sui media locali e nazionali.",
    href: "/servizi/ufficio-stampa-comuni",
  },
  {
    icon: Mail,
    title: "Newsletter istituzionale",
    description:
      "Comunicazioni periodiche ai cittadini. Informare con regolarit\u00E0 e professionalit\u00E0.",
  },
  {
    icon: Palette,
    title: "Brand identity",
    description:
      "Logo, immagine coordinata, materiale istituzionale. Un\u2019identit\u00E0 visiva coerente e moderna.",
  },
];

/* ── Component ── */

export function CommunicationSection() {
  return (
    <SectionWrapper id="comunicazione" bg="dark">
      <Container>
        <SectionHeader
          overline="Comunicazione istituzionale"
          title="Un unico partner. Cinque servizi integrati."
          subtitle="Sito, social, stampa, newsletter, branding."
          dark
        />

        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
          delayChildren={0.15}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isLastTwo = i >= 3;

            const cardContent = (
              <div className="flex flex-col gap-4 h-full">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    "bg-primary-500/10 text-primary-400"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-neutral-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-400">
                    {service.description}
                  </p>
                </div>

                {/* Link arrow */}
                {service.href && (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary-400 group-hover:text-primary-300 transition-colors">
                    <span>Scopri di pi&ugrave;</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={service.title}
                variants={fadeUpChild}
                className={cn(
                  // Last two cards: center them on the 3-col grid
                  isLastTwo && i === 3 && "lg:col-start-1",
                  isLastTwo && i === 4 && "lg:col-start-2",
                  // On sm (2-col), last item spans full width if odd count
                  i === services.length - 1 &&
                    services.length % 2 !== 0 &&
                    "sm:col-span-2 lg:col-span-1"
                )}
              >
                {service.href ? (
                  <Link href={service.href} className="group block h-full">
                    <Card variant="glass" className="h-full">
                      {cardContent}
                    </Card>
                  </Link>
                ) : (
                  <Card variant="glass" className="h-full">
                    {cardContent}
                  </Card>
                )}
              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.4}>
          <div className="mt-12 text-center">
            <Button variant="secondary" size="md" asChild>
              <Link href="/servizi">
                Scopri tutti i servizi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
