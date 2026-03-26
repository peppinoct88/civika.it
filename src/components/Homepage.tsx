"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsTickerSection } from "@/components/sections/StatsTickerSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CommunicationSection } from "@/components/sections/CommunicationSection";
import { ComplianceSection } from "@/components/sections/ComplianceSection";
import { FundingSection } from "@/components/sections/FundingSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { WhySection } from "@/components/sections/WhySection";
import { MapSection } from "@/components/sections/MapSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Homepage() {
  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <ScrollProgress />
      <FilmGrain />
      <Navbar />

      <main id="main-content">
        {/* ATTO 1: Setup — "C'e un problema che nessuno vede" */}
        <HeroSection />
        <StatsTickerSection />
        <ProblemSection />

        {/* ATTO 2: Confronto — "Ecco la differenza che possiamo fare" */}
        <SolutionSection />
        <ComparisonSection />
        <EventsSection />
        <ProcessSection />
        <CommunicationSection />

        {/* ATTO 3: Prova — "Non dovete fidarvi. Guardate i fatti." */}
        <ComplianceSection />
        <FundingSection />
        <MethodSection />
        <WhySection />

        {/* ATTO 4: Chiusura — "Il primo passo e facile" */}
        <MapSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
