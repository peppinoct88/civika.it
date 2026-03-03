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

export default function UfficioStampaPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Relazioni Media
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Ufficio Stampa per Comuni" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Relazioni strategiche con i media locali, comunicati professionali, media training per i vostri sindaci. La visibilità della stampa amplifica il vostro messaggio.
          </motion.p>
        </div>
      </header>

      {/* ══ OPENING SECTION ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              La stampa locale rimane il canale più credibile e penetrante per le notizie comunali. Un articolo sul giornale locale vale mille post su Facebook: ha autorità, è archiviato, viene letto con attenzione dai cittadini e dalle istituzioni.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              Ma non tutti i Comuni hanno la competenza per gestire le relazioni con i giornalisti, scrivere comunicati persuasivi, preparare il Sindaco a una intervista pubblica. CIVIKA offre un servizio completo di ufficio stampa: dalla strategia editoriale alle relazioni quotidiane con i media, dalla preparazione del Sindaco alla gestione delle crisi. Il risultato? Il vostro Comune diventa una fonte autorevole di informazione per la stampa locale.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ COSA COMPRENDE ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
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
                icon: "✍️",
                title: "Comunicati Stampa",
                desc: "Scriviamo comunicati professionali per ogni grande notizia: nuovi progetti, risultati amministrativi, delibere importanti, grandi eventi. Ogni comunicato è costruito per interessare i giornalisti e il pubblico.",
              },
              {
                icon: "📞",
                title: "Relazioni Media",
                desc: "Conosciamo i caporedattori, i giornalisti, i blogger locali. Manteniamo rapporti costanti, li aggiorniamo sulle vostre notizie, rispondiamo ai loro dubbi, creiamo accesso diretto ai vostri amministratori.",
              },
              {
                icon: "🎤",
                title: "Media Training per Sindaci",
                desc: "Il Sindaco è la voce del Comune. Lo prepariamo a interviste, conferenze stampa, dibattiti pubblici. Insegniamo come rispondere alle domande difficili, come comunicare con chiarezza e autorità.",
              },
              {
                icon: "📰",
                title: "Rassegna Stampa Quotidiana",
                desc: "Ogni mattina o settimanalmente, vi consegniamo una rassegna completa di quello che la stampa scrive del vostro Comune e del territorio. Dati per capire l'impatto della vostra comunicazione.",
              },
              {
                icon: "🚨",
                title: "Gestione della Crisi Mediatica",
                desc: "Se una notizia negativa colpisce il Comune, rispondiamo velocemente e strategicamente. Prepariamo dichiarazioni, coordiniamo le comunicazioni, proteggiamo la reputazione del Comune.",
              },
              {
                icon: "📊",
                title: "Analisi e Reportistica",
                desc: "Tracciamo la copertura mediatica: numero di articoli, numero di lettori raggiunto, tone positivo/neutrale/negativo, reach sui principali media locali. Dati concreti sul valore della stampa.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-5 sm:p-8 border border-gray-200 group hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
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

      {/* ══ CONFORMITÀ NORMATIVA ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Conforme alla normativa sulla comunicazione" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "L.150/2000 - Disciplina della comunicazione pubblica",
                desc: "Ogni comunicato che scriviamo rispetta la legge sulla comunicazione istituzionale. Trasparenza, accuratezza, completezza sono i principi guida. Mai promesse non mantenibili, mai informazioni fuorvianti.",
              },
              {
                title: "Dichiarazioni verificate",
                desc: "Prima di mandare un comunicato ai media, verifichiamo ogni dato con gli uffici competenti. La credibilità del Comune dipende dall'accuratezza delle informazioni. Noi la proteggiamo.",
              },
              {
                title: "Etica giornalistica e neutralità",
                desc: "Pur essendo al servizio del Comune, seguiamo i principi di etica giornalistica: non falsifichiamo dati, non escludiamo informazioni rilevanti, non usiamo la stampa per attacchi personali. La stampa deve essere neutral e affidabile.",
              },
              {
                title: "Gestione della privacy in comunicati",
                desc: "Quando parliamo di cittadini in comunicati (disoccupati aiutati, benefici sociali, etc.), tuteliamo la privacy e la dignità delle persone. Mai nomi o foto senza consenso esplicito.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PERCHÉ OUTSOURCING ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Perché fare outsourcing dell'ufficio stampa" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Competenza specializzata",
                desc: "Un buon ufficio stampa richiede skills molto specifiche: conoscenza dei media locali, capacità di scrittura giornalistica, relazioni consolidate. È difficile trovare queste competenze internamente e ancora più difficile pagarle.",
              },
              {
                title: "Neutralità e credibilità",
                desc: "Un giornalista parla più facilmente con un consulente esterno che con l'assessore comunicazione del Comune. L'outsourcing aggiunge credibilità e distanza che i media apprezzano.",
              },
              {
                title: "Continuità garantita",
                desc: "Se l'ufficio stampa è interno e il responsabile se ne va, tutto crolla. Con CIVIKA, il servizio è sempre attivo, sempre di qualità, indipendente dai cambi organizzativi del Comune.",
              },
              {
                title: "Costo prevedibile",
                desc: "Pagate un retainer mensile fisso. Sapete esattamente cosa ricevete e quanto costa. Nessun costo fisso di stipendio, benefit, tasse. Solo outcome misurabili.",
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
                icon: "🤝",
                title: "Relazioni consolidate con i media",
                desc: "Conosciamo i caporedattori e i giornalisti di giornali, radio e TV locali. Le vostre notizie hanno accesso diretto a chi conta. Quando chiamiamo, rispondono.",
              },
              {
                icon: "✍️",
                title: "Scrittori esperti di comunicazione pubblica",
                desc: "Non siamo agenzie PR generiche. Abbiamo specialisti in comunicazione pubblica, che conoscono la legge, i vincoli amministrativi e il linguaggio che funziona con i media pubblici.",
              },
              {
                icon: "🎙️",
                title: "Media training efficace",
                desc: "Prepariamo il vostro Sindaco con scenari reali, domande difficili, risposte coerenti. Incontri pratici, non teorici. Il vostro Sindaco saprà come comportarsi in qualsiasi situazione mediatica.",
              },
              {
                icon: "📈",
                title: "Misurazione dell'impatto",
                desc: "Tracciamo ogni articolo, ogni menzione, ogni reach. Vi mostriamo il valore reale della vostra visibilità mediatica in termini di cittadini raggiunti e brand awareness.",
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
            L'ufficio stampa è parte di una strategia comunicativa integrata. Funziona meglio se coordinato con gli altri canali.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Comunicazione Istituzionale",
                link: "/servizi/comunicazione-istituzionale",
                desc: "La stampa e i social sono due canali della stessa strategia. Coordiniamo i messaggi per coerenza: la notizia esce prima sui media, poi rimbalza sui social.",
              },
              {
                title: "Social Media per Comuni",
                link: "/servizi/social-media-comuni",
                desc: "Quando esce un articolo importante, lo amplifichiamo sui social. Quando una notizia prende piede online, la proponiamo ai media. Un flusso bidirezionale di amplificazione.",
              },
              {
                title: "Sito Web Comunale AGID",
                link: "/servizi/sito-web-comunale-agid",
                desc: "I comunicati stampa trovano spazio nel sito: archivio stampa, rassegna, documenti ufficiali. Il sito è il repository permanente delle vostre comunicazioni.",
              },
              {
                title: "Eventi Istituzionali",
                link: "/servizi/eventi-istituzionali",
                desc: "Ogni evento importante è un'occasione di copertura stampa. Invitiamo i giornalisti, forniamo loro il materiale, assicuriamo che l'evento abbia visibility sui media.",
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
                q: "Potete garantire che i vostri comunicati verranno pubblicati?",
                a: "No, e nessuno può. I giornalisti hanno autonomia editoriale. Ma grazie alle nostre relazioni consolidate, i nostri comunicati hanno un tasso di pubblicazione molto più alto della media. La qualità della scrittura e la rilevanza della notizia fanno la differenza.",
              },
              {
                q: "Come gestite le notizie negative?",
                a: "Con trasparenza e strategia. Se una brutta notizia riguarda il Comune, prepariamo una risposta rapida e fattuale. Non cerchiamo di nascondere nulla, ma assicuriamo che il Comune sia ascoltato. Spesso una crisi gestita bene aumenta la credibilità.",
              },
              {
                q: "Quanto tempo prima di una conferenza stampa devo informarvi?",
                a: "Idealmente almeno una settimana. Così abbiamo tempo di contattare i giornalisti, preparare il materiale, assicurare una buona attendance. Per urgenze, possiamo organizzare una conferenza stampa in 48-72 ore, ma con meno copertura.",
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
            <TextReveal text="Pronti a conquistare la stampa locale?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Analizziamo come il vostro Comune è attualmente rappresentato nei media locali. Una diagnosi gratuita per capire dove potete migliorare.
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
