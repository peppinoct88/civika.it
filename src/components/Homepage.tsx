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
import { MethodSection } from "@/components/sections/MethodSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { FundingSection } from "@/components/sections/FundingSection";
import { WhySection } from "@/components/sections/WhySection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { FAQSection } from "@/components/sections/FAQSection";
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
        {/* ATTO 1: Cattura — "C'è un problema che nessuno vede" */}
        <HeroSection />
        <StatsTickerSection />
        <ProblemSection />

        {/* ATTO 2: Soluzione — "Ecco il sistema che sblocca i fondi" */}
        <MethodSection />
        <ComparisonSection />
        <SolutionSection />

        {/* ATTO 3: Prova — "Non fidarti. Guarda i fatti." */}
        <FundingSection />
        <WhySection />
        <GuaranteeSection />

        {/* ATTO 4: Chiusura — "Il primo passo è facile" */}
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
