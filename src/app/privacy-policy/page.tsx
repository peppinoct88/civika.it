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

/* ── Section block for the policy ── */
function PolicySection({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div className="mb-10" {...fadeUp(delay)}>
      <h2 className="text-[20px] font-bold text-[#0F1F33] mb-4">{title}</h2>
      <div className="text-[15px] text-gray-600 leading-[1.85] space-y-3">
        {children}
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      {/* ══ HERO ══ */}
      <header className="min-h-[45vh] flex items-center justify-center bg-gradient-to-br from-[#070E18] to-[#1B3A5C] relative overflow-hidden pt-28 pb-16 px-8">
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4.5 py-1.5 rounded-full bg-[#D4A03C]/10 text-[#E8C06A] text-[13px] font-semibold tracking-wide mb-6"
            {...fadeUp(0.1)}
          >
            Informativa
          </motion.span>
          <h1 className="text-[clamp(34px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Privacy Policy" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[19px] text-white/75 max-w-[520px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).
          </motion.p>
        </div>
      </header>

      {/* ══ CONTENUTO ══ */}
      <section className="bg-[#F7F5F0] py-20 px-8">
        <motion.div className="max-w-[720px] mx-auto" {...fadeUp(0.1)}>
          <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-200 shadow-sm">
            <motion.p className="text-xs text-gray-400 mb-10" {...fadeUp(0.15)}>
              Ultimo aggiornamento: 9 febbraio 2026
            </motion.p>

            <PolicySection title="1. Titolare del trattamento" delay={0.1}>
              <p>
                Il Titolare del trattamento dei dati personali è <strong>CIVIKA SRL</strong>,
                con sede in Sicilia, Italia.
              </p>
              <p>
                Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile
                scrivere a: <a href="mailto:info@civika.it" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">info@civika.it</a>
              </p>
            </PolicySection>

            <PolicySection title="2. Dati raccolti" delay={0.15}>
              <p>
                Questo sito web raccoglie le seguenti categorie di dati personali:
              </p>
              <p>
                <strong>Dati forniti volontariamente dall&apos;utente:</strong> nome e cognome, comune
                di appartenenza, ruolo istituzionale, indirizzo email, numero di telefono e
                messaggio, forniti tramite il modulo di contatto nella pagina Contatti.
              </p>
              <p>
                <strong>Dati di navigazione:</strong> durante la normale navigazione, i sistemi
                informatici e le procedure software preposte al funzionamento del sito acquisiscono
                alcuni dati personali la cui trasmissione è implicita nell&apos;uso dei protocolli di
                comunicazione Internet (es. indirizzi IP, tipo di browser, sistema operativo,
                nome di dominio e indirizzi dei siti web da cui è stato effettuato l&apos;accesso).
              </p>
            </PolicySection>

            <PolicySection title="3. Finalità del trattamento" delay={0.2}>
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <p>
                <strong>Risposta alle richieste di contatto:</strong> i dati forniti tramite il
                modulo di contatto vengono utilizzati esclusivamente per rispondere alla richiesta
                dell&apos;utente e per organizzare un eventuale incontro conoscitivo gratuito.
              </p>
              <p>
                <strong>Funzionamento del sito:</strong> i dati di navigazione sono utilizzati per
                il corretto funzionamento tecnico del sito e per la raccolta di informazioni
                statistiche aggregate sull&apos;utilizzo del sito stesso.
              </p>
              <p>
                <strong>Adempimenti di legge:</strong> per adempiere ad obblighi previsti dalla
                legge, da regolamenti o dalla normativa comunitaria.
              </p>
            </PolicySection>

            <PolicySection title="4. Base giuridica del trattamento" delay={0.25}>
              <p>
                Il trattamento dei dati forniti tramite il modulo di contatto si basa sul
                <strong> consenso dell&apos;interessato</strong> (art. 6, par. 1, lett. a del GDPR),
                espresso al momento dell&apos;invio della richiesta.
              </p>
              <p>
                Il trattamento dei dati di navigazione si basa sul <strong>legittimo interesse</strong> del
                Titolare (art. 6, par. 1, lett. f del GDPR) al corretto funzionamento del sito web.
              </p>
            </PolicySection>

            <PolicySection title="5. Cookie" delay={0.3}>
              <p>
                Questo sito utilizza esclusivamente <strong>cookie tecnici</strong> necessari per
                il corretto funzionamento del sito. In particolare:
              </p>
              <p>
                <strong>Cookie di consenso:</strong> un cookie denominato
                &ldquo;civika_cookie_consent&rdquo; viene salvato per ricordare la scelta
                dell&apos;utente riguardo al consenso cookie. Ha una durata di 12 mesi.
              </p>
              <p>
                <strong>Cookie tecnici di sessione:</strong> cookie strettamente necessari
                per la navigazione e il funzionamento del sito, che vengono cancellati alla
                chiusura del browser.
              </p>
              <p>
                Non utilizziamo cookie di profilazione, cookie di terze parti per finalità
                di marketing, né strumenti di tracciamento come Google Analytics o
                Facebook Pixel.
              </p>
            </PolicySection>

            <PolicySection title="6. Servizi di terze parti" delay={0.35}>
              <p>
                Il sito si avvale dei seguenti servizi di terze parti per il proprio funzionamento:
              </p>
              <p>
                <strong>Vercel Inc.</strong> — servizio di hosting e distribuzione del sito web.
                I server possono essere ubicati nell&apos;Unione Europea e negli Stati Uniti.
                Vercel agisce come responsabile del trattamento.
                Informativa privacy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">vercel.com/legal/privacy-policy</a>
              </p>
              <p>
                <strong>Google Fonts</strong> — servizio di distribuzione font web fornito da
                Google LLC. Il caricamento dei font comporta una connessione ai server di Google
                e la trasmissione dell&apos;indirizzo IP dell&apos;utente.
                Informativa privacy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">policies.google.com/privacy</a>
              </p>
            </PolicySection>

            <PolicySection title="7. Destinatari dei dati" delay={0.4}>
              <p>
                I dati personali non vengono venduti, ceduti o comunicati a terzi per
                finalità di marketing. I dati potranno essere comunicati esclusivamente a:
              </p>
              <p>
                Soggetti che forniscono servizi strumentali all&apos;attività del Titolare
                (es. provider di hosting, fornitori di servizi IT), in qualità di
                responsabili del trattamento, adeguatamente nominati ai sensi dell&apos;art. 28 del GDPR.
              </p>
              <p>
                Autorità competenti, nei casi previsti dalla legge.
              </p>
            </PolicySection>

            <PolicySection title="8. Conservazione dei dati" delay={0.45}>
              <p>
                I dati forniti tramite il modulo di contatto vengono conservati per il tempo
                necessario a gestire la richiesta e per un periodo massimo di
                <strong> 24 mesi</strong> dalla raccolta, salvo diversi obblighi di legge.
              </p>
              <p>
                I dati di navigazione vengono cancellati immediatamente dopo l&apos;elaborazione
                in forma aggregata e anonima.
              </p>
            </PolicySection>

            <PolicySection title="9. Diritti dell'interessato" delay={0.5}>
              <p>
                Ai sensi degli articoli 15-22 del GDPR, l&apos;interessato ha il diritto di:
              </p>
              <p>
                Accedere ai propri dati personali e ottenerne una copia; richiedere la rettifica
                dei dati inesatti o l&apos;integrazione dei dati incompleti; richiedere la
                cancellazione dei dati (&ldquo;diritto all&apos;oblio&rdquo;); richiedere la limitazione
                del trattamento; opporsi al trattamento; richiedere la portabilità dei dati;
                revocare il consenso in qualsiasi momento, senza pregiudicare la liceità
                del trattamento basato sul consenso prestato prima della revoca.
              </p>
              <p>
                Per esercitare i propri diritti, l&apos;interessato può inviare una richiesta
                a: <a href="mailto:info@civika.it" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">info@civika.it</a>
              </p>
              <p>
                L&apos;interessato ha inoltre il diritto di proporre reclamo all&apos;Autorità
                Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">www.garanteprivacy.it</a>).
              </p>
            </PolicySection>

            <PolicySection title="10. Trasferimento dati extra-UE" delay={0.55}>
              <p>
                Alcuni servizi di terze parti utilizzati dal sito (Vercel, Google Fonts)
                potrebbero comportare il trasferimento di dati verso gli Stati Uniti. Tali
                trasferimenti avvengono sulla base delle garanzie previste dal GDPR, incluse
                le Clausole Contrattuali Standard approvate dalla Commissione Europea e il
                Data Privacy Framework UE-USA.
              </p>
            </PolicySection>

            <PolicySection title="11. Sicurezza" delay={0.6}>
              <p>
                Il Titolare adotta misure tecniche e organizzative adeguate per proteggere
                i dati personali da accessi non autorizzati, perdita, distruzione o
                danneggiamento. Il sito utilizza il protocollo HTTPS per la trasmissione
                cifrata dei dati e implementa header di sicurezza conformi alle best practice.
              </p>
            </PolicySection>

            <PolicySection title="12. Modifiche alla presente informativa" delay={0.65}>
              <p>
                Il Titolare si riserva il diritto di modificare la presente informativa
                in qualsiasi momento. Le eventuali modifiche saranno pubblicate su questa
                pagina con indicazione della data di ultimo aggiornamento. Si consiglia di
                consultare periodicamente questa pagina.
              </p>
            </PolicySection>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
