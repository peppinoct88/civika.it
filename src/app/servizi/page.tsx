"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageShell from "@/components/PageShell";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.8, ease: EASE, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85, y: 30 } as const,
  whileInView: { opacity: 1, scale: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.9, ease: EASE, delay },
});

function GrowLine({ color = "bg-accent", delay = 0 }: { color?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className={`h-[3px] rounded-full mx-auto ${color}`}
      initial={{ width: 0 }}
      animate={inView ? { width: 60 } : {}}
      transition={{ duration: 1, ease: EASE, delay }}
    />
  );
}

function TextReveal({ text, className = "", delay = 0, stagger = 0.04 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function ServiziPage() {
  const services = [
    {
      icon: "📢",
      title: "Comunicazione Istituzionale",
      desc: "Strategia comunicativa completa, gestione della reputazione online,\ncoordinamento tra uffici e cittadinanza.",
      link: "/servizi/comunicazione-istituzionale",
    },
    {
      icon: "🌐",
      title: "Sito Web Comunale AGID",
      desc: "Siti conformi al modello AGID, responsive, accessibili,\ncon integrazione PagoPa e CIE.",
      link: "/servizi/sito-web-comunale-agid",
    },
    {
      icon: "📱",
      title: "Social Media per Comuni",
      desc: "Gestione profili ufficiali, calendar editoriale, engagement\ncon cittadini, reportistica settimanale.",
      link: "/servizi/social-media-comuni",
    },
    {
      icon: "🎪",
      title: "Eventi Istituzionali",
      desc: "Organizzazione completa, comunicazione preventiva,\ncopertura live, report fotografico.",
      link: "/servizi/eventi-istituzionali",
    },
    {
      icon: "🏆",
      title: "Bandi Europei e PNRR",
      desc: "Ricerca bandi, redazione progetti, rendicontazione tecnica\ne finanziaria, compliance normativa.",
      link: "/servizi/bandi-europei-comuni",
    },
    {
      icon: "📰",
      title: "Ufficio Stampa",
      desc: "Rassegna stampa, comunicati stampa, relazioni con media,\ngestione crisi comunicativa.",
      link: "/servizi/ufficio-stampa-comuni",
    },
  ];

  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Servizi
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="I Nostri Servizi per i Comuni Siciliani" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Un unico partner per comunicazione, eventi e progettazione europea. Tutto integrato, tutto a norma.
          </motion.p>
        </div>
      </header>

      {/* ══ SERVIZI ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.a
                key={i}
                href={service.link}
                className="group bg-[#0F1F33] rounded-2xl p-7 sm:p-8 border border-gray-700 hover:border-[#D4A03C] transition-all duration-500 hover:shadow-xl hover:shadow-[#D4A03C]/20 no-underline flex flex-col"
                {...scaleIn(0.08 * i)}
              >
                <div className="text-4xl sm:text-5xl mb-4">{service.icon}</div>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-3 group-hover:text-[#D4A03C] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow whitespace-pre-line">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-[#D4A03C] font-semibold text-sm group-hover:gap-3 transition-all duration-500">
                  <span>Scopri di più</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-gradient-to-br from-[#0F1F33] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(20px,3.5vw,40px)] font-black text-white leading-tight mb-4">
            <TextReveal text="Parliamo del vostro Comune" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Il primo incontro è sempre gratuito e senza impegno.
          </motion.p>
          <motion.div {...fadeUp(0.8)}>
            <a
              href="/contatti"
              className="inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-[#D4A03C]/30 hover:shadow-2xl hover:shadow-[#D4A03C]/40 transition-shadow duration-500"
            >
              Contattaci
            </a>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
