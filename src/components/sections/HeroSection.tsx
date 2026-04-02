"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { TextReveal } from "@/components/motion";
import { Button } from "@/components/atoms";
import { Badge } from "@/components/atoms";
import { Container } from "@/components/layout/Container";
import {
  staggerContainer,
  heroSubtitle,
  heroCTA,
  easeOutExpo,
} from "@/lib/animations";

/* ── Scroll indicator ── */

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
        Scorri
      </span>
      <div
        className="h-10 w-[1px] bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.div>
  );
}

/* ── Hero Section — Sblocco Fondi™ ── */

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* Parallax: background image moves slower than scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerVariants = staggerContainer(0.15, 0.2);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Photo Background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        style={{ y: bgY }}
      >
        {/* Giuseppe's photo — replace /hero-giuseppe.webp with actual photo */}
        <img
          className="h-full w-full object-cover object-top"
          src="/hero-giuseppe.webp"
          alt=""
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Gradient Overlays ── */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-900/85 via-neutral-900/60 to-neutral-900/95"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-neutral-900/40 via-transparent to-neutral-900/40"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <Container
        size="lg"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6"
        >
          {/* Overline — stat che agita il problema */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <Badge variant="gold">
              Il 73% dei fondi pubblici resta inutilizzato
            </Badge>
          </motion.div>

          {/* Main Title — Battlecry */}
          <h1 className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            <TextReveal
              text="I fondi non si cercano."
              delay={0.3}
              stagger={0.05}
            />
            <br />
            <TextReveal
              text="Si progettano."
              delay={0.55}
              stagger={0.05}
            />
          </h1>

          {/* Subtitle — Promessa + meccanismo */}
          <motion.p
            className="max-w-2xl text-lg leading-[1.8] text-neutral-300 sm:text-xl"
            variants={heroSubtitle}
          >
            Civika trasforma i bandi pubblici
            <br />
            in capitale reale per la tua impresa.
            <br />
            <br />
            Con il <span className="font-semibold text-gold-400">Sistema Sblocca-Fondi™</span>,
            <br />
            il tuo progetto diventa la risposta
            <br />
            che i bandi stanno cercando.
          </motion.p>

          {/* CTAs — Primaria + Secondaria */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
            variants={heroCTA}
          >
            <Button variant="primary" size="lg" asChild>
              <a href="/diagnosi">Prenota la Diagnosi Gratuita</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/risorse/mappa-fondi">Scarica la Mappa dei Fondi™</a>
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
