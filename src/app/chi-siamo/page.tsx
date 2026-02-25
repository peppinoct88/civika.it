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

export default function ChiSiamoPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Chi Siamo
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="La regia dietro la visibilità dei Comuni siciliani." delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            CIVIKA nasce da un&apos;idea semplice: ogni Comune siciliano merita di essere visto,
            ascoltato, e raccontato nel modo giusto.
          </motion.p>
        </div>
      </header>

      {/* ══ LA NOSTRA STORIA ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="La nostra storia" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              Siamo un team di professionisti della comunicazione istituzionale, dell&apos;organizzazione
              di eventi e della progettazione europea. Lavoriamo esclusivamente con la Pubblica
              Amministrazione perché crediamo che la comunicazione pubblica meriti la stessa qualità
              e cura del settore privato.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              In Sicilia, il 90% dei Comuni non ha un ufficio comunicazione dedicato. Il risultato?
              Amministrazioni che lavorano ma che nessuno vede. Progetti finanziati che restano
              sconosciuti. Territori ricchi di potenziale ma invisibili.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.3)}>
              CIVIKA è la risposta a questo problema. Un partner unico che si occupa di tutto:
              dal sito web alla gestione social, dagli eventi istituzionali alla rassegna stampa,
              dalla scrittura dei bandi alla rendicontazione.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ I NOSTRI VALORI ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="I valori che ci guidano" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Specializzazione",
                desc: "Il 100% del nostro lavoro è dedicato alla PA. Non siamo un'agenzia generica che fa anche comunicazione istituzionale: è il nostro unico mestiere.",
              },
              {
                icon: "🤝",
                title: "Prossimità",
                desc: "Siamo in Sicilia, conosciamo i territori, parliamo la stessa lingua. Ci muoviamo noi, ci sediamo con voi.",
              },
              {
                icon: "📐",
                title: "Rigore",
                desc: "Ogni contenuto viene verificato per conformità normativa. AGID, accessibilità, trasparenza, GDPR — sempre a norma.",
              },
              {
                icon: "📊",
                title: "Misurabilità",
                desc: "Report con dati reali, non slide. Vi diciamo quante persone avete raggiunto e come migliorare.",
              },
              {
                icon: "🔄",
                title: "Continuità",
                desc: "Non lavoriamo a progetto: costruiamo relazioni durature con retainer mensili e presenza costante.",
              },
              {
                icon: "💡",
                title: "Innovazione",
                desc: "Portiamo nel settore pubblico gli standard di qualità e creatività del settore privato.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-5 sm:p-8 border border-gray-200 group hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...scaleIn(0.1 * i)}
              >
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-3">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NUMERI ══ */}
      <section className="bg-gradient-to-br from-[#0F1F33] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-white leading-tight">
              <TextReveal text="CIVIKA in numeri" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine color="bg-[#D4A03C]" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { num: "391", label: "Comuni in Sicilia", sub: "Il nostro mercato" },
              { num: "100%", label: "Focus PA", sub: "Nessun cliente privato" },
              { num: "5", label: "Servizi integrati", sub: "Un unico partner" },
              { num: "24h", label: "Risposta garantita", sub: "Sempre disponibili" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.04] rounded-2xl px-4 sm:px-6 py-5 sm:py-8 border border-white/[0.08] text-center backdrop-blur-sm"
                {...scaleIn(0.12 * i)}
              >
                <div className="text-2xl sm:text-4xl font-black text-[#D4A03C] mb-2">{stat.num}</div>
                <div className="text-[15px] font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-white/70">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COME LAVORIAMO ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Come lavoriamo con i Comuni" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          {[
            {
              n: "01",
              title: "Primo incontro gratuito",
              desc: "Ci sediamo con il Sindaco e la Giunta. Ascoltiamo le priorità, analizziamo lo stato attuale della comunicazione, identifichiamo le opportunità.",
            },
            {
              n: "02",
              title: "Proposta operativa su misura",
              desc: "Prepariamo un piano completo con obiettivi, attività, timeline e budget trasparente. Nessuna sorpresa, nessun costo nascosto.",
            },
            {
              n: "03",
              title: "Attivazione e gestione",
              desc: "Prendiamo in carico la comunicazione: sito web, social media, eventi, rapporti con la stampa. Il Sindaco non deve pensare a niente.",
            },
            {
              n: "04",
              title: "Report e misurazione",
              desc: "Ogni mese ricevete un report chiaro con i risultati: visite al sito, reach social, uscite stampa, partecipazione agli eventi.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              className={`flex gap-3 sm:gap-6 items-start ${i < 3 ? "mb-6" : ""}`}
              {...fadeUp(0.1 + 0.1 * i)}
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#D4A03C] to-[#1B3A5C] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-lg">
                {step.n}
              </div>
              <div className="bg-[#F7F5F0] rounded-2xl px-4 sm:px-7 py-4 sm:py-5 flex-1 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500">
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-gradient-to-br from-[#070E18] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(20px,3.5vw,40px)] font-black text-white leading-tight mb-4">
            <TextReveal text="Pronti a far vedere il vostro Comune?" />
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
