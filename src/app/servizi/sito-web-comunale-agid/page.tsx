"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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

function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
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

export default function SitoWebComunaleAgidPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Sito Web
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Sito Web Comunale Conforme AGID" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Un sito web comunale moderno, accessibile e completamente conforme alle linee guida AGID. Con integrazione SPID, CIE, pagoPA e Design System Italia.
          </motion.p>
        </div>
      </header>

      {/* ══ OPENING SECTION ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              Il sito web di un Comune è la sua vetrina digitale principale. Deve essere trasparente, facile da usare, accessibile a tutti i cittadini, e conforme agli standard dell'Agenzia per l'Italia Digitale (AGID). Ma molti comuni hanno siti obsoleti, lenti, poco funzionali o non conformi alla legge.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              CIVIKA sviluppa siti web comunali con tecnologie moderne, seguendo fedelmente le linee guida AGID e il Design System Italia. Integriamo i servizi digitali della PA: SPID e CIE per l'autenticazione, pagoPA per i pagamenti, App IO per le notifiche. Il risultato è un sito che i cittadini amano usare e che la legge richiede.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ CHE COSA SIGNIFICA AGID ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Che cosa significa Conforme AGID" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Design System Italia",
                desc: "Un sistema di design unificato per tutti i siti della PA italiana. Garantisce coerenza visiva, usabilità, e una user experience riconoscibile per i cittadini.",
              },
              {
                title: "Accessibilità WCAG 2.1 AA",
                desc: "Il sito deve essere navigabile e comprensibile da tutti, incluse le persone con disabilità. Supportiamo lettori di schermo, contrasti adeguati, testo ridimensionabile, e navigation da tastiera.",
              },
              {
                title: "Velocità e Performance",
                desc: "AGID richiede tempi di caricamento veloci, ottimizzazione mobile, e un'esperienza fluida. I siti lenti perdono cittadini e comunicano poca affidabilità.",
              },
              {
                title: "Responsività Mobile",
                desc: "Sempre più cittadini navigano da smartphone. Il vostro sito deve essere perfetto su desktop, tablet e mobile, con lo stesso contenuto e funzionalità.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COSA COMPRENDE ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Cosa comprende il servizio" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🏗️",
                title: "Sviluppo su Design System Italia",
                desc: "Usiamo i componenti e gli stili ufficiali AGID per garantire conformità istantanea ai requisiti di design e accessibilità.",
              },
              {
                icon: "🔐",
                title: "Integrazione SPID e CIE",
                desc: "I cittadini si autenticano con la loro identità digitale ufficiale. Tracciabilità completa, massima sicurezza, conformità all'identità digitale italiana.",
              },
              {
                icon: "💳",
                title: "pagoPA - Pagamenti Online",
                desc: "Gestite bollettini, tasse, tariffe e servizi a pagamento. pagoPA è obbligatorio per le PA e garantisce sicurezza e chiarezza ai cittadini.",
              },
              {
                icon: "📱",
                title: "Integrazione App IO",
                desc: "Le notifiche del Comune arrivano nell'app IO che tutti i cittadini stanno usando. Aumenta engagement e raggiunge direttamente i vostri abitanti.",
              },
              {
                icon: "♿",
                title: "Accessibilità WCAG 2.1 AA Verificata",
                desc: "Test di accessibilità con lettori di schermo e strumenti automatici. Auditing indipendente per garantire il pieno rispetto degli standard.",
              },
              {
                icon: "📊",
                title: "Analytics e Monitoraggio",
                desc: "Dati su come i cittadini usano il sito, quali pagine visitano, dove si fermano, che cosa cercano. Informazioni preziose per migliorare costantemente.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 group hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...scaleIn(0.1 * i)}
              >
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PNRR MISURA 1.4.1 ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Finanziabile con il PNRR" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Misura 1.4.1 del PNRR - Transizione digitale dei Comuni",
                desc: "Il Piano Nazionale di Ripresa e Resilienza finanzia la modernizzazione dei siti web comunali. Comuni fino a 5000 abitanti ricevono fino a 30.000 euro, comuni fino a 10.000 ricevono fino a 50.000 euro.",
              },
              {
                title: "Come funziona il finanziamento",
                desc: "Presentiamo il progetto del sito al vostro Comune. Se approvato, il finanziamento PNRR copre totalmente o parzialmente i costi di sviluppo. CIVIKA cura tutta la documentazione tecnica e il monitoraggio della spesa.",
              },
              {
                title: "Tempi e scadenze PNRR",
                desc: "I comuni hanno scadenze precise per completare i progetti PNRR (dipendono dalla finestra temporale assegnata). Garantiamo il rispetto degli schedule, la documentazione completa e l'ottenimento del rimborso finale.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PERCHÉ SCEGLIERE CIVIKA ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Perché scegliere CIVIKA" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "✅",
                title: "Esperienza AGID collaudata",
                desc: "Abbiamo sviluppato decine di siti web conformi AGID. Sappiamo esattamente cosa richiede l'Agenzia e come verificare la conformità prima del rilascio.",
              },
              {
                icon: "🚀",
                title: "Moderne tecnologie",
                desc: "Usiamo framework e linguaggi attuali (Next.js, TypeScript, SSR) che garantiscono performance, sicurezza e facilità di manutenzione nel tempo.",
              },
              {
                icon: "📈",
                title: "Supporto PNRR completo",
                desc: "Valutiamo l'ammissibilità al finanziamento, prepariamo la documentazione tecnica, monitoriamo i milestone PNRR, assicuriamo l'ottenimento del rimborso.",
              },
              {
                icon: "👥",
                title: "Formazione e continuità",
                desc: "Non vi lasciamo da soli. Formiamo il vostro personale sulla gestione del sito, offriamo supporto tecnico continuativo e aggiornamenti di sicurezza.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 group hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...scaleIn(0.1 * i)}
              >
                <div className="text-2xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVIZI COMPLEMENTARI ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Servizi che si integrano perfettamente" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed text-center mb-12" {...fadeUp(0.2)}>
            Un sito web conforme AGID diventa ancora più potente quando integrato con altri servizi specializzati.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Comunicazione Istituzionale",
                link: "/servizi/comunicazione-istituzionale",
                desc: "Gestione della comunicazione interna del Comune: piano editoriale, content creation, gestione canali, ufficio stampa.",
              },
              {
                title: "Social Media per Comuni",
                link: "/servizi/social-media-comuni",
                desc: "Facebook, Instagram, LinkedIn gestiti professionalmente. Il sito rimanda ai social, i social rimandano al sito.",
              },
              {
                title: "Ufficio Stampa per Comuni",
                link: "/servizi/ufficio-stampa-comuni",
                desc: "Comunicati stampa, relazioni media, media training. La visibilità del Comune si costruisce anche con la stampa locale.",
              },
              {
                title: "Bandi Europei e PNRR",
                link: "/servizi/bandi-europei-comuni",
                desc: "Se il vostro sito è finanziato con PNRR, vi aiutiamo con la rendicontazione e la comunicazione dei progetti.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.desc}</p>
                <Link
                  href={service.link}
                  className="text-[#D4A03C] font-semibold text-sm hover:underline transition-all"
                >
                  Scopri di più →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Domande frequenti" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Quanto tempo ci vuole per sviluppare un sito conforme AGID?",
                a: "Dipende dalla complessità e dalle funzionalità richieste. Un sito piccolo-medio impiega 3-4 mesi. Un sito più complesso con molti servizi integrati può richiedere 5-6 mesi. Vi comunichiamo i tempi esatti dopo un'analisi iniziale.",
              },
              {
                q: "Se il sito non è finanziato dal PNRR, quale è il costo?",
                a: "Ogni sito è unico. Il costo dipende da quanti servizi volete integrati (SPID, pagoPA, App IO), quante pagine avete, quanto contenuto c'è. Nel primo meeting gratuito analizziamo le vostre esigenze e prepariamo una proposta trasparente.",
              },
              {
                q: "Come fate a garantire l'accessibilità WCAG 2.1 AA?",
                a: "Sviluppiamo con accessibility in mente: componenti semantici, contrasti adeguati, navigation da tastiera. Usiamo strumenti automatici di test, poi un auditor umano verifica il sito con veri lettori di schermo. Solo così raggiungiamo il massimo livello di conformità.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-3">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-gradient-to-br from-[#070E18] to-[#1B3A5C] py-16 sm:py-28 px-4 sm:px-8 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(20px,3.5vw,40px)] font-black text-white leading-tight mb-4">
            <TextReveal text="Pronto a modernizzare il vostro sito comunale?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Richiedi un incontro gratuito. Ti aiuteremo a navigare il PNRR e la conformità AGID.
          </motion.p>
          <motion.div {...fadeUp(0.8)}>
            <a
              href="/contatti"
              className="inline-block no-underline bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[#0F1F33] px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-[#D4A03C]/30 hover:shadow-2xl hover:shadow-[#D4A03C]/40 transition-shadow duration-500"
            >
              Richiedi un incontro gratuito
            </a>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
