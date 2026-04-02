"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { StatsTickerSection } from "@/components/sections/StatsTickerSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { FundingSection } from "@/components/sections/FundingSection";
import { WhySection } from "@/components/sections/WhySection";
import { QualificationSection } from "@/components/sections/QualificationSection";
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
      <Navbar />

      <main id="main-content">
        {/* ATTO 1: Cattura — Lead capture + social proof */}
        <HeroSection />
        <TrustBarSection />
        <StatsTickerSection />

        {/* ATTO 2: Problema — "C'è un problema che nessuno vede" */}
        <ProblemSection />

        {/* ATTO 3: Soluzione — "Ecco il sistema che sblocca i fondi" */}
        <MethodSection />
        <ComparisonSection />
        <ProcessSection />
        <SolutionSection />

        {/* ATTO 4: Prova — "Non fidarti. Guarda i fatti." */}
        <FundingSection />
        <WhySection />
        <QualificationSection />
        <GuaranteeSection />

        {/* ATTO 5: Chiusura — "Il primo passo è facile" */}
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
