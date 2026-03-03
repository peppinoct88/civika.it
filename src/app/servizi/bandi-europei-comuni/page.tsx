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

export default function BandiEuropeiComuniPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Finanziamenti
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Bandi Europei e PNRR per Comuni" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Dalla ricerca dei bandi più adatti alla rendicontazione finale. Trasformiamo le opportunità di finanziamento in progetti reali che trasformano il territorio.
          </motion.p>
        </div>
      </header>

      {/* ══ OPENING SECTION ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              Ogni anno, miliardi di euro di finanziamenti pubblici europei rimangono inutilizzati. Non per mancanza di denaro, ma per mancanza di capacità amministrativa e competenza nella gestione dei bandi. I Comuni più piccoli e con meno risorse sono spesso quelli che ne hanno più bisogno, ma anche quelli più in difficoltà nel accedere ai fondi.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              CIVIKA aiuta i Comuni siciliani a esplorare, candidarsi e gestire i finanziamenti europei e del PNRR. Dal FESR al FEASR, dai Fondi SNAI ai programmi LEADER: identifichiamo le opportunità, scriviamo i progetti, supportiamo l&apos;istruttoria, garantiamo la rendicontazione corretta. Il vostro Comune ottiene le risorse che merita per trasformare il territorio.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ IL NOSTRO PROCESSO ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Il nostro processo in 5 step" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                number: "1",
                title: "Scouting e identificazione opportunità",
                desc: "Monitoriamo costantemente i bandi europei, regionali e nazionali. Identifichiamo quelli che si adattano meglio alle vostre priorità territoriali, capacità amministrativa e tempistiche.",
              },
              {
                number: "2",
                title: "Analisi approfondita di ammissibilità",
                desc: "Leggiamo il bando in dettaglio. Verifichiamo che il vostro Comune sia ammissibile, che i vostri progetti rispondono ai criteri, che potete rispettare i termini di rendicontazione. È il momento di dire no a bandi non adatti.",
              },
              {
                number: "3",
                title: "Scrittura del progetto",
                desc: "Sviluppiamo il concept del progetto: obiettivi chiari, attività concrete, risultati misurabili. Scriviamo la candidatura in modo persuasivo, rispondendo alle richieste specifiche del bando con evidenza e chiarezza.",
              },
              {
                number: "4",
                title: "Supporto all&apos;istruttoria e negoziazione",
                desc: "Se il vostro progetto viene selezionato, supportiamo l&apos;istruttoria: rispondiamo alle richieste di chiarimenti, modifichiamo se necessario, nego ziamo con l&apos;ente finanziatore per raggiungere l&apos;approvazione.",
              },
              {
                number: "5",
                title: "Rendicontazione e chiusura del progetto",
                desc: "Durante l&apos;implementazione del progetto, raccogliamo documentazione, gestiamo il bilancio, prepariamo i report. Al termine, completiamo la rendicontazione finale per ottenere il rimborso completo.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#D4A03C] text-white font-bold text-lg">
                      {item.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIPOLOGIE DI BANDI ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Tipologie di bandi che gestiamo" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🚀",
                title: "PNRR - Piano Nazionale di Ripresa e Resilienza",
                desc: "Finanziamenti per trasformazione digitale, infrastrutture green, sviluppo territoriale. Abbiamo esperienza nella misura 1.4.1 (siti web), 2.4.2 (rigenerazione urbana) e altre.",
              },
              {
                icon: "🏗️",
                title: "FESR - Fondo Europeo di Sviluppo Regionale",
                desc: "Investimenti in infrastrutture, ricerca, innovazione. I Comuni accedono spesso tramite progetti per l&apos;economia locale e il turismo sostenibile.",
              },
              {
                icon: "🌾",
                title: "FEASR - Fondo Europeo Agricolo per lo Sviluppo Rurale",
                desc: "Se il vostro Comune ha vocazione agricola o rurale, FEASR finanzia progetti di agricoltura sostenibile, diversificazione economica, tutela del paesaggio.",
              },
              {
                icon: "🏡",
                title: "Programmi SNAI e LEADER",
                desc: "Specificamente disegnati per aree interne e rurali in difficoltà. Finanziano animazione territoriale, piccoli progetti comunitari, studi e analisi strategica.",
              },
              {
                icon: "🎓",
                title: "Finanziamenti per competenze digitali",
                desc: "Se volete formare staff su digitale, innovazione, accessibilità, ci sono bandi specifici che coprono formazione e acquisition di competenze.",
              },
              {
                icon: "🌍",
                title: "Bandi tematici per sostenibilità e inclusione",
                desc: "Coesione sociale, parità di genere, lotta alle discriminazioni. Tanti bandi richiedono soluzioni locali a problematiche globali.",
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

      {/* ══ DAL BANDO ALL'EVENTO ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Dall'approvazione del bando al successo territoriale" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Un approccio integrato",
                desc: "Non pensiamo ai bandi come semplici amministrazione. Un bando approvato è un&apos;opportunità per comunicare il vostro impegno verso il territorio. Lo documentiamo, lo comunichiamo ai cittadini, organizziamo eventi di presentazione e chiusura del progetto.",
              },
              {
                title: "Dal PNRR all&apos;evento: esempio concreto",
                desc: "Supponete di vincere un bando PNRR per la rigenerazione urbana di una piazza. Non solo implementiamo il progetto: creiamo una comunicazione integrata (sito web, social, stampa), organizziamo l&apos;inaugur azione, documentamos i risultati. Il bando diventa una storia di trasformazione visibile per tutta la comunità.",
              },
              {
                title: "Trasparenza sulla spesa pubblica",
                desc: "I cittadini hanno diritto di sapere come vengono spesi i loro soldi pubblici. Aiutiamo il Comune a comunicare con trasparenza il progetto finanziato, i risultati raggiunti, l&apos;impatto sulla comunità. Questa trasparenza aumenta fiducia e coinvolgimento.",
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
                icon: "📚",
                title: "Competenza multidisciplinare",
                desc: "Non siamo solo redattori di progetti. Conosciamo bandi europei, procedure PNRR, rendicontazione, conformità normativa. Un team completo per tutto il ciclo di vita del finanziamento.",
              },
              {
                icon: "🎯",
                title: "Strategie personalizzate",
                desc: "Ogni Comune è diverso. Non mandiamo candidature generiche. Sviluppiamo progetti che rispondono alle priorità del vostro territorio e alle capacità della vostra amministrazione.",
              },
              {
                icon: "📈",
                title: "Track record provato",
                desc: "Progetti finanziati, approvazioni ottenu te, rendicontazioni completate correttamente. Conosciamo cosa funziona e cosa gli enti finanziatori cercano.",
              },
              {
                icon: "🤝",
                title: "Partnership a lungo termine",
                desc: "Non siamo una scatola nera che consegna un progetto e scompare. Restiamo coinvolti durante l&apos;implementazione, la rendicontazione e la comunicazione. Il vostro successo è il nostro successo.",
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
            I bandi sono il mezzo per realizzare i vostri progetti. Li integriamo con comunicazione e gestione di progetti reali per massimizzare l&apos;impatto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Comunicazione Istituzionale",
                link: "/servizi/comunicazione-istituzionale",
                desc: "I progetti finanziati sono storie da comunicare. Integriamo i bandi nella vostra strategia comunicativa più ampia.",
              },
              {
                title: "Sito Web Comunale AGID",
                link: "/servizi/sito-web-comunale-agid",
                desc: "Molti bandi PNRR finanziano siti web conformi AGID. Gestiamo sia lo sviluppo che la rendicontazione alla finestra digitale.",
              },
              {
                title: "Eventi Istituzionali",
                link: "/servizi/eventi-istituzionali",
                desc: "Ogni progetto finanziato merita un evento di lancio e chiusura. Coordiniamo dal bando all&apos;evento finale con coerenza narrativa.",
              },
              {
                title: "Ufficio Stampa per Comuni",
                link: "/servizi/ufficio-stampa-comuni",
                desc: "I media amano storie di finanziamenti e progetti territoriali. Coordinare i bandi con la comunicazione stampa amplifica il vostro messaggio.",
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
                q: "Quali sono le possibilità che il mio progetto venga approvato?",
                a: "Dipende dal bando specifico, dalla qualità del progetto e dalla competitività. Non facciamo promesse fake, ma diciamo onestamente: se un bando è competitivo (per esempio PNRR), l&apos;approval rate è tra il 30-50% dei progetti presentati. Massimizziamo le probabilità di successo scrivendo progetti solidi, ma non possiamo garantire nulla.",
              },
              {
                q: "Se il bando richiede cofinanziamento, quanto dovrà mettere il Comune?",
                a: "Dipende dal bando. Alcuni sono 100% finanziati, altri richiedono il 15-20% di cofinanziamento locale. Nel primo incontro analizziamo i bandi e vi mostriamo i pro e contro di ciascuno, incluso il carico finanziario.",
              },
              {
                q: "Quanto costa il servizio di gestione del bando?",
                a: "Offriamo diverse modalità: una consulenza iniziale per identificare i bandi adatti, un servizio completo di redazione per un bando specifico, o un retainer per il monitoraggio continuo dei finanziamenti. Nel primo meeting vi proponiamo un preventivo trasparente basato sul vostro bisogno.",
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
            <TextReveal text="Pronti a sbloccare i finanziamenti europei?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Facciamo una prima analisi gratuita dei bandi disponibili per il vostro Comune. Scopri quali opportunità lasciate sul tavolo.
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
