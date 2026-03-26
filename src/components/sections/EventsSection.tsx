"use client";

import Link from "next/link";
import {
  Scissors,
  PartyPopper,
  Presentation,
  Award,
  Landmark,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Card } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { fadeUpChild } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface EventType {
  icon: LucideIcon;
  title: string;
  features: string[];
}

const eventTypes: EventType[] = [
  {
    icon: Scissors,
    title: "Inaugurazioni",
    features: ["Taglio nastro", "Allestimento", "Copertura media", "Post-evento"],
  },
  {
    icon: PartyPopper,
    title: "Feste patronali",
    features: ["Programma", "Logistica", "Sicurezza", "Promozione"],
  },
  {
    icon: Presentation,
    title: "Convegni",
    features: ["Relatori", "Location", "Streaming", "Atti"],
  },
  {
    icon: Award,
    title: "Premiazioni",
    features: ["Cerimonia", "Comunicazione", "Documentazione"],
  },
  {
    icon: Landmark,
    title: "Eventi culturali",
    features: ["Rassegne", "Mostre", "Spettacoli", "Partnership"],
  },
  {
    icon: Handshake,
    title: "Incontri istituzionali",
    features: ["Protocollo", "Comunicazione", "Follow-up"],
  },
];

function EventCard({ event }: { event: EventType }) {
  const Icon = event.icon;

  return (
    <motion.div variants={fadeUpChild}>
      <Card variant="glass" className="h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-primary-500/10 border border-primary-500/20">
            <Icon className="w-5 h-5 text-primary-400" aria-hidden="true" />
          </div>
          <h3 className="font-heading font-semibold text-neutral-100 text-base">
            {event.title}
          </h3>
        </div>

        <ul className="space-y-2">
          {event.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-neutral-400"
            >
              <span
                className="w-1 h-1 rounded-full bg-accent-400 shrink-0"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}

export function EventsSection() {
  return (
    <SectionWrapper id="eventi" bg="dark">
      <Container>
        <SectionHeader
          overline="Eventi istituzionali"
          title="6 tipologie di eventi. Una sola regia."
          subtitle="Dal taglio del nastro alla rassegna stampa."
        />

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.08}
        >
          {eventTypes.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12 text-center">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/servizi/eventi-istituzionali">
              Scopri il servizio eventi
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
