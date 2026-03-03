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

export default function SocialMediaComuniPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-20 px-8">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Social Media
          </motion.span>
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Social Media per Comuni" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/60 max-w-[560px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Gestione professionale dei vostri canali social. Piano editoriale strategico, contenuti di qualità, community management quotidiano e reportistica dettagliata. Conformi a L.150/2000 e L.69/2025.
          </motion.p>
        </div>
      </header>

      {/* ══ OPENING SECTION ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8">
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
              I social media sono dove vivono i vostri cittadini. Facebook, Instagram, TikTok, LinkedIn: ogni piattaforma è un canale di comunicazione diretto con la comunità. Ma gestirli bene richiede tempo, costanza, strategia e competenze specifiche.
            </motion.p>
            <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.2)}>
              Con l&apos;introduzione della figura di Social Media Manager nella PA (L.69/2025), anche i Comuni devono potenziare questa capacità. CIVIKA gestisce interamente i vostri canali social: dal piano editoriale alla pubblicazione quotidiana, dalla risposta ai cittadini al monitoraggio dell&apos;impatto. Il risultato? Una comunità più consapevole, informata e consenziente.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ PERCHÉ I COMUNI HANNO BISOGNO DI SOCIAL ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Perché i Comuni hanno bisogno di Social Media" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "L.69/2025 - Riforma della PA digitale",
                desc: "La riforma definisce il Social Media Manager come figura chiave nella PA. Riconoscere l&apos;importanza strategica di questi canali significa stare al passo con la modernizzazione.",
              },
              {
                title: "Raggiungere i cittadini dove sono",
                desc: "Non potete aspettare che i cittadini visitino il vostro sito. I social media vi portano da loro, sullo smartphone, nel quotidiano. Un post su Facebook raggiunge migliaia di persone in poche ore.",
              },
              {
                title: "Trasparenza e fiducia",
                desc: "Comunicare sui social significa essere visibili, disponibili, umani. Aumenta la fiducia nei confronti dell&apos;amministrazione e crea un dialogo diretto con la comunità.",
              },
              {
                title: "Gestione della crisi",
                desc: "Un evento critico? Una situazione di emergenza? I social media sono il primo canale dove i cittadini cercano risposte. Bisogna essere lì, informati, veloci e rassicuranti.",
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
                icon: "📅",
                title: "Piano editoriale strategico",
                desc: "Sviluppiamo una strategia annuale per i vostri social media. Definiamo i temi prioritari, gli stili di comunicazione, il calendario dei contenuti per ogni piattaforma.",
              },
              {
                icon: "✍️",
                title: "Content creation originale",
                desc: "Creiamo testi, grafiche, foto e video per i vostri post. Ogni contenuto è pensato per la piattaforma specifica e per il vostro target di cittadini.",
              },
              {
                icon: "🕐",
                title: "Pubblicazione quotidiana",
                desc: "Non pubblichiamo saltuariamente. Assicuriamo una presenza costante sui vostri canali, con post regolari, reel, storie e live streaming quando rilevante.",
              },
              {
                icon: "💬",
                title: "Community management",
                desc: "Rispondiamo ai commenti, leggiamo i messaggi privati, interagiamo con i vostri cittadini. Trasformiamo i social in uno spazio di dialogo reale.",
              },
              {
                icon: "🚨",
                title: "Gestione della crisi",
                desc: "Se accade un evento negativo o una criticità, siamo pronti con una risposta coordinata, informativa e rassicurante. Proteggiamo la reputazione del Comune.",
              },
              {
                icon: "📊",
                title: "Reportistica e analytics",
                desc: "Ogni mese ricevete un report dettagliato: engagement, reach, crescita follower, contenuti più performanti, insights sui vostri cittadini digitali.",
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

      {/* ══ PIATTAFORME GESTITE ══ */}
      <section className="bg-white py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Piattaforme che gestiamo" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Facebook",
                desc: "La piattaforma con la penetrazione più alta tra i cittadini italiani, soprattutto per le fasce più anziane. Lì trovate il vostro pubblico più ampio e fedele.",
              },
              {
                title: "Instagram",
                desc: "Essenziale per raggiungere i giovani e le famiglie. Usiamo foto, reel, storie e contenuti visivi che raccontano la vita del Comune in modo autentico.",
              },
              {
                title: "YouTube",
                desc: "Per i contenuti video più lunghi: interviste, documentari, tutorial, dirette di eventi. Una piattaforma dove costruire memoria e autorità.",
              },
              {
                title: "LinkedIn",
                desc: "Se il vostro Comune ha una vocazione imprenditoriale o progetti di sviluppo economico, LinkedIn vi aiuta a comunicare con professionisti e stakeholder del territorio.",
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

      {/* ══ CONFORMITÀ ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-28 px-4 sm:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(20px,3.5vw,44px)] font-black text-[#0F1F33] leading-tight">
              <TextReveal text="Conformità normativa garantita" />
            </h2>
            <motion.div className="mt-5" {...fadeUp(0.4)}>
              <GrowLine />
            </motion.div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed text-center mb-12" {...fadeUp(0.2)}>
            La comunicazione sui social deve rispettare la normativa sulla comunicazione pubblica. CIVIKA assicura piena conformità a ogni legge rilevante.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "L.150/2000 - Comunicazione pubblica",
                desc: "Ogni messaggio rispetta i principi di trasparenza, accuratezza e completezza stabiliti dalla legge sulla comunicazione istituzionale.",
              },
              {
                title: "GDPR - Protezione dati personali",
                desc: "Trattiamo i dati dei cittadini secondo il Regolamento europeo. Raccogliamo consensi dove necessario e proteggiamo la privacy.",
              },
              {
                title: "Codice della Privacy",
                desc: "Quando pubblichiamo foto o video di persone, assicuriamo il consenso e il rispetto della dignità. Nessuna immagine sensibile senza autorizzazione.",
              },
              {
                title: "Standard di accessibilità",
                desc: "I nostri contenuti sono pensati per essere comprensibili da tutti. Usiamo testi alternativi per le immagini, descrizioni per i video, linguaggio semplice.",
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
                title: "Specializzazione PA",
                desc: "Non siamo un&apos;agenzia social generica. Lavoriamo esclusivamente con Amministrazioni pubbliche e conosciamo i vincoli, le priorità e le opportunità della comunicazione pubblica.",
              },
              {
                icon: "📈",
                title: "Risultati misurabili",
                desc: "Tracciamo tutto: quanti cittadini raggiungiamo, quante interazioni otteniamo, quali contenuti funzionano meglio. Dati concreti, non promesse vaghe.",
              },
              {
                icon: "⏰",
                title: "Presenza quotidiana",
                desc: "Non pubblichiamo una volta a settimana. Siamo presenti quotidianamente, con una voce coerente e riconoscibile. I cittadini sanno che potranno trovarvi.",
              },
              {
                icon: "🤝",
                title: "Retainer mensile fisso",
                desc: "Pagate un importo fisso ogni mese e sapete esattamente cosa ricevete. Nessun costo nascosto, massima trasparenza e pianificazione.",
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
            La gestione dei social media cresce quando integrata con altri servizi di comunicazione. Scopri come CIVIKA completa l&apos;offerta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Comunicazione Istituzionale",
                link: "/servizi/comunicazione-istituzionale",
                desc: "Piano editoriale generale, gestione di tutti i canali del Comune. I social sono parte di una strategia comunicativa integrata.",
              },
              {
                title: "Sito Web Comunale AGID",
                link: "/servizi/sito-web-comunale-agid",
                desc: "Il vostro sito è il hub di tutta la comunicazione. I social rimandano al sito, il sito rimanda ai social per una coerenza totale.",
              },
              {
                title: "Ufficio Stampa per Comuni",
                link: "/servizi/ufficio-stampa-comuni",
                desc: "Quando avete una grande notizia, comunicate prima sui social, poi ai media. Un approccio coordinato amplifica il vostro messaggio.",
              },
              {
                title: "Eventi Istituzionali",
                link: "/servizi/eventi-istituzionali",
                desc: "Ogni evento organizzato dal Comune può essere amplificato sui social: promozione, copertura live, resoconto e archivio digitale.",
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
                q: "Quanti post pubblicate a settimana?",
                a: "Dipende dalla vostra strategia e dal budget. Un piano standard include 3-5 post a settimana per Facebook, 4-6 per Instagram, con storie quotidiane e reel settimanali. Nel primo meeting personalizzaremo il calendario in base alle vostre esigenze.",
              },
              {
                q: "Come gestite i commenti negativi o le critiche?",
                a: "Con professionalità e trasparenza. Non cancelliamo i commenti legittimi, ma rispondiamo in modo informativo e rassicurante. Se la critica contiene disinformazione, forniamo fatti corretti. Se è un attacco personale o ingiurioso, lo rimuoviamo e lo segnaliamo.",
              },
              {
                q: "Che succede se il Comune ha notizie urgenti o una crisi?",
                a: "Siamo disponibili 24/7 per situazioni critiche. Se accade un evento di emergenza, pubblichiamo immediatamente sui vostri social con informazioni ufficiali e rassicuranti. Abbiamo un protocollo di gestione della crisi collaudato.",
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
            <TextReveal text="Pronti a conquistare i social?" />
          </h2>
          <motion.div {...fadeUp(0.5)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p className="text-white/70 mt-6 mb-10 text-lg font-light" {...fadeUp(0.6)}>
            Richiedi una consulenza gratuita. Ti mostreremo come trasformare i vostri canali in uno strumento di engagement reale.
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
