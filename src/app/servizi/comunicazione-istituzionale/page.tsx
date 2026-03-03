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

export default function ComunicazioneIstituzionalePage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Servizio Principale
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Comunicazione Istituzionale per Comuni" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Un servizio completo di comunicazione istituzionale pensato per amministrazioni siciliane che
            vogliono essere visibili, trasparenti e sempre in dialogo con i cittadini.
          </motion.p>
        </div>
      </header>

      {/* ══ OPENING SECTION ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              La comunicazione istituzionale non è una scelta, è un obbligo e un&apos;opportunità. Ogni Comune,
              per legge (L.150/2000), deve comunicare in modo trasparente, tempestivo e inclusivo le proprie
              azioni, progetti e risultati. Ma spesso questa comunicazione è frammentaria, disorganizzata,
              affidata a risorse interne limitate.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              Il risultato? Cittadini disinformati, progetti ignorati, occasioni mancate di dialogo pubblico.
              CIVIKA offre un servizio integrato che prende in carico tutta la comunicazione amministrativa:
              dalla strategia editoriale alla gestione quotidiana dei canali, dalla creazione di contenuti
              professionali al monitoraggio dell&apos;impatto.
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
                icon: "📋",
                title: "Piano di comunicazione annuale",
                desc: "Sviluppiamo una strategia editoriale su 12 mesi con obiettivi chiari, pubblici target, calendario dei contenuti e attività prioritarie. Ogni comunicazione serve a uno scopo preciso.",
              },
              {
                icon: "📱",
                title: "Gestione quotidiana dei canali",
                desc: "Gestiamo sito web, social media, newsletter e altri canali ufficiali. Pubblichiamo contenuti, rispondiamo ai cittadini, manteniamo una presenza costante e professionale.",
              },
              {
                icon: "✏️",
                title: "Content creation professionale",
                desc: "Scriviamo comunicati stampa, post per i social, articoli per il sito, newsletter settimanali. Ogni testo è verificato per correttezza, conformità normativa e coerenza di tono.",
              },
              {
                icon: "📊",
                title: "Monitoraggio e reportistica",
                desc: "Analizziamo i dati di engagement, visite web, uscite stampa e impatto social. Ogni mese ricevete un report dettagliato che mostra come la comunicazione sta performando.",
              },
              {
                icon: "👥",
                title: "Formazione del personale interno",
                desc: "Addestriamo sindaci, assessori e staff su come comunicare efficacemente, sia verso i media che verso i cittadini. Periodicamente organizziamo incontri di aggiornamento.",
              },
              {
                icon: "🎯",
                title: "Coordinamento strategico",
                desc: "Coordiniamo con gli uffici interni per garantire che tutta la comunicazione sia coerente, tempestiva e allineata alle priorità dell&apos;amministrazione.",
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
              <TextReveal text="Conforme alla normativa" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "L.150/2000 - Disciplina della comunicazione pubblica",
                desc: "La legge che regola come le Amministrazioni pubbliche devono comunicare. CIVIKA assicura che ogni comunicazione rispetti i principi di trasparenza, completezza, accuratezza e accessibilità previsti dalla legge.",
              },
              {
                title: "D.Lgs 33/2013 - Trasparenza amministrativa",
                desc: "Richiede alle PA di pubblicare dati, bilanci, delibere e informazioni pubbliche in modo aggiornato e consultabile. Monitoriamo che il vostro sito sia sempre conforme agli obblighi di trasparenza.",
              },
              {
                title: "Linee guida AGID - Siti web PA",
                desc: "L&apos;Agenzia per l&apos;Italia Digitale ha stabilito standard di usabilità, accessibilità e design per i siti pubblici. Applichiamo queste linee guida in ogni contenuto e aggiornamento.",
              },
              {
                title: "GDPR - Privacy dei dati",
                desc: "Quando comunichiamo, trattiamo dati personali di cittadini. Ogni nostra azione rispetta il Regolamento europeo sulla privacy, con attenzione al consenso e alla protezione.",
              },
            ].map((norm, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
                {...fadeUp(0.1 + 0.1 * i)}
              >
                <h3 className="text-[15px] sm:text-[17px] font-bold text-[#0F1F33] mb-2">{norm.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{norm.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PERCHÉ SCEGLIERE CIVIKA ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
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
                icon: "🎯",
                title: "Specializzazione totale",
                desc: "Non siamo un&apos;agenzia generica che fa comunicazione istituzionale tra altri servizi. È il nostro unico mestiere. Conosciamo la PA a fondo, sappiamo cosa funziona e cosa no.",
              },
              {
                icon: "📈",
                title: "Risultati misurabili",
                desc: "Non promesse vaghe: dati reali. Vi raccontiamo esattamente quante persone avete raggiunto, quanti cittadini hanno visitato il sito, quante volte la stampa ha ripreso le vostre notizie.",
              },
              {
                icon: "🤝",
                title: "Continuità garantita",
                desc: "Non lavoriamo a progetto singolo, ma con retainer mensili. Siamo sempre presenti, sempre disponibili, sempre concentrati sulle vostre priorità.",
              },
              {
                icon: "✅",
                title: "Conformità a norma",
                desc: "Ogni comunicazione è controllata per conformità normativa. AGID, accessibilità, trasparenza, GDPR: non rischiate mai di violare la legge.",
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

      {/* ══ SERVIZI COMPLEMENTARI ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
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
            La comunicazione istituzionale cresce quando integrata con altri servizi specializzati.
            Ecco come CIVIKA completa l&apos;offerta:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Sito web comunale AGID",
                link: "/servizi/sito-web-comunale-agid",
                desc: "Il vostro sito è la porta principale di comunicazione verso i cittadini. Lo sviluppiamo secondo le linee AGID, ottimizzato per usabilità e trasparenza.",
              },
              {
                title: "Social media per Comuni",
                link: "/servizi/social-media-comuni",
                desc: "Facebook, Instagram, LinkedIn gestiti professionalmente. Raggiungiamo diverse generazioni di cittadini con contenuti adatti a ogni piattaforma.",
              },
              {
                title: "Ufficio stampa per Comuni",
                link: "/servizi/ufficio-stampa-comuni",
                desc: "Monitoriamo i media locali, preparare comunicati, inviamo dossier ai giornalisti, gestiamo le relazioni con la stampa e il pubblico.",
              },
              {
                title: "Bandi europei e PNRR",
                link: "/servizi/bandi-europei-comuni",
                desc: "Se avete progetti finanziati con fondi UE o PNRR, comunichiamo il vostro impegno per il rilancio territoriale e la trasparenza sul denaro pubblico.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
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
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
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
                q: "Quanto costa il servizio di comunicazione istituzionale?",
                a: "Il costo varia in base alla dimensione dell&apos;Amministrazione, alla complessità della comunicazione e ai servizi inclusi. Di solito è un retainer mensile fisso, senza sorprese. Nel primo incontro gratuito analizziamo le vostre esigenze e prepariamo una proposta trasparente.",
              },
              {
                q: "Potete garantire che il nostro sito sia conforme alle linee AGID?",
                a: "Sì. Qualcuno del nostro team ha formazione specifica sulle linee AGID e verifica costantemente che il vostro sito rispetti gli standard. Se notate non-conformità, le correggiamo subito.",
              },
              {
                q: "Quanto tempo ci vuole per passare da una gestione interna a CIVIKA?",
                a: "Il primo mese è di transizione e audit. Analizziamo lo stato attuale della comunicazione, raccogliamo materiali, documentiamo processi. Dal secondo mese siamo completamente operativi e voi potete ridurre il lavoro dei vostri uffici.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="bg-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#D4A03C]/30 hover:shadow-lg transition-all duration-500"
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
            <TextReveal text="Pronti a comunicare come merita il vostro Comune?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Richiedi un incontro gratuito con il nostro team. Nessun impegno, solo idee e strategie concrete.
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
