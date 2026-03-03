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

export default function EventiIstituzionaliPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Eventi
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Eventi Istituzionali per Comuni" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Dall&apos;idea alla realizzazione: concepting, logistica, comunicazione e post-evento. Creiamo momenti che lasciano il segno nella comunità.
          </motion.p>
        </div>
      </header>

      {/* ══ OPENING SECTION ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              Un evento istituzionale ben organizzato è uno dei momenti più importanti nella vita di un Comune. Che sia una festa patronale, un convegno politico, un&apos;inaugurazione o una conferenza stampa, ogni dettaglio comunica il valore e la professionalità dell&apos;amministrazione.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              CIVIKA gestisce l&apos;intero ciclo dell&apos;evento: dalla visione strategica al concept creativo, dalla logistica operativa alla comunicazione sui media e social. Il risultato è un evento che lascia il segno, rafforza la comunità e comunica efficacemente il vostro messaggio istituzionale.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ TIPOLOGIE DI EVENTI ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Tipologie di eventi che organizziamo" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🎪",
                title: "Inaugurazioni e cerimonie",
                desc: "Aperture di strutture pubbliche, intitolazioni, commemorazioni. Creiamo un programma formale, coordiniamo ospiti e autorità, assicuriamo che ogni momento sia dignitoso e memorabile.",
              },
              {
                icon: "🎤",
                title: "Convegni e conferenze",
                desc: "Incontri tematici per cittadini, professionisti e stakeholder. Dalla selezione dei relatori all&apos;allestimento della sala, dalla registrazione video al follow-up comunicativo.",
              },
              {
                icon: "🎉",
                title: "Festival e feste community",
                desc: "Celebrazioni della comunità locale: festa patronale, festa della città, festival culturali. Coordiniamo artisti, food truck, animazione, coinvolgiamo la popolazione nel divertimento.",
              },
              {
                icon: "🌱",
                title: "Animazione territoriale (SNAI e GAL)",
                desc: "Se il vostro Comune riceve finanziamenti per l&apos;animazione territoriale, organizziamo workshop, cene conviviali, laboratori che rafforzano il tessuto comunitario e il senso di appartenenza.",
              },
              {
                icon: "📰",
                title: "Conferenze stampa",
                desc: "Annunci importanti, risultati di progetti, comunicazioni ufficiali. Prepariamo la sala, invitiamo i media, coordiniamo gli interventi, assicuriamo che il messaggio sia chiarissimo.",
              },
              {
                icon: "🏛️",
                title: "Processi partecipativi",
                desc: "Assemblee pubbliche, consultazioni cittadine, dibattiti amministrativi. Facilitiamo il dialogo tra amministrazione e comunità con moderazione professionale e logistica impeccabile.",
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

      {/* ══ IL NOSTRO APPROCCIO ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Il nostro approccio full-service" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "1. Concept e Strategia",
                desc: "Ascoltiamo i vostri obiettivi, la vision dell&apos;amministrazione, il target di pubblico. Sviluppiamo un concept creativo che traduce i vostri valori in un&apos;esperienza tangibile e memorabile.",
              },
              {
                title: "2. Logistica Operativa",
                desc: "Gestione della location, allestimenti, catering, trasporti, assicurazioni. Coordinamento di fornitori, timeline progettuale, budget tracking. Nulla viene lasciato al caso.",
              },
              {
                title: "3. Comunicazione Pre-Evento",
                desc: "Lancio dell&apos;evento sui social, comunicati stampa, inviti personalizzati, reminder. Creiamo aspettativa e coinvolgiamo il pubblico nella fase preparatoria.",
              },
              {
                title: "4. Gestione Evento (Day of)",
                desc: "Coordinamento della giornata: arrivo ospiti, timeline esatta, audio/video, fotografia professionale, moderazione, gestione imprevisti. Un nostro team è presente per garantire tutto scorra perfetto.",
              },
              {
                title: "5. Post-Evento e Follow-up",
                desc: "Elaborazione foto e video, reportage sui media, articoli per il sito, grazie ai partecipanti, archivio digitale. L&apos;evento continua a vivere nel tempo tramite i contenuti.",
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

      {/* ══ PERCHÉ SCEGLIERE CIVIKA ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Perché scegliere CIVIKA per gli eventi" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "✨",
                title: "Creatività e visione",
                desc: "Non seguiamo template. Ogni evento è unico e rispecchia l&apos;identità del vostro Comune. Trasformiamo i vostri obiettivi in esperienze indimenticabili.",
              },
              {
                icon: "🎬",
                title: "Storytelling integrato",
                desc: "L&apos;evento non finisce il giorno stesso. Lo documentamos, lo comunichiamo, lo archivias come risorsa permanente di comunicazione e memoria del Comune.",
              },
              {
                icon: "🤝",
                title: "Partnership di fiducia",
                desc: "Lavoriamo con fornitori, artisti e professionisti collaudati. Ogni partner è scelto con cura per garantire la massima qualità.",
              },
              {
                icon: "💼",
                title: "Professionalità e dettaglio",
                desc: "Decine di eventi realizzati, centinaia di dettagli gestiti. Sappiamo come gestire imprevisti e assicurare che ogni evento sia un successo.",
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
            Gli eventi sono il cuore della comunicazione istituzionale. Integriamo perfettamente altre competenze per massimizzare l&apos;impatto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Comunicazione Istituzionale",
                link: "/servizi/comunicazione-istituzionale",
                desc: "Gli eventi sono momenti di comunicazione strategica. Li inseriamo nella vostra comunicazione più ampia per coerenza narrativa.",
              },
              {
                title: "Social Media per Comuni",
                link: "/servizi/social-media-comuni",
                desc: "L&apos;evento inizia sui social mesi prima e continua dopo. Gestiamo la promozione, la diretta, il follow-up digitale con competenza full-channel.",
              },
              {
                title: "Ufficio Stampa per Comuni",
                link: "/servizi/ufficio-stampa-comuni",
                desc: "Ogni evento è un&apos;occasione di visibilità media. Coordiniamo giornalisti, prepariamo dossier, assicuriamo la copertura della stampa locale.",
              },
              {
                title: "Sito Web Comunale AGID",
                link: "/servizi/sito-web-comunale-agid",
                desc: "L&apos;archivio digitale degli eventi vive nel vostro sito. Foto, video, articoli rimangono accessibili come memoria pubblica della comunità.",
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
                q: "Quanto tempo prima dell&apos;evento iniziate a lavorarci?",
                a: "Consigliamo di contattarci almeno 2-3 mesi prima, soprattutto se l&apos;evento è complesso. Per eventi più semplici, anche 4-6 settimane sono sufficienti. Più tempo abbiamo, più ampi sono gli spazi creativi e di coordinamento.",
              },
              {
                q: "Come definite il budget per un evento?",
                a: "Dipende da tipologia, grandezza, ambizione creativa e numero di partecipanti. Nell&apos;incontro iniziale ascoltiamo le vostre priorità e prepariamo una proposta con il breakdown completo dei costi. Trasparenza totale, senza sorprese.",
              },
              {
                q: "Gestite il giorno dell&apos;evento o solo la pianificazione?",
                a: "Gestiamo tutto: pianificazione, coordinamento pre-evento e soprattutto il day-of. Un nostro project manager sarà presente dall&apos;inizio alla fine, coordinando tutti i dettagli e risolvendo imprevisti.",
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
            <TextReveal text="Pronto a creare un evento memorabile?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Parliamo della vostra visione. Ti mostreremo come trasformarla in un evento indimenticabile.
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
