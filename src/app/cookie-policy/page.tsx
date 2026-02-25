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
      <h2 className="text-[18px] sm:text-[20px] font-bold text-[#0F1F33] mb-4">{title}</h2>
      <div className="text-[14px] sm:text-[15px] text-gray-600 leading-[1.85] space-y-3">
        {children}
      </div>
    </motion.div>
  );
}

export default function CookiePolicyPage() {
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
          <h1 className="text-[clamp(22px,5vw,58px)] font-black text-white leading-[1.1] mb-6">
            <TextReveal text="Cookie Policy" delay={0.2} />
          </h1>
          <motion.div {...fadeUp(0.7)}>
            <GrowLine color="bg-[#D4A03C]" />
          </motion.div>
          <motion.p
            className="text-[clamp(15px,3.5vw,19px)] text-white/75 max-w-[520px] mx-auto mt-7 leading-relaxed font-light"
            {...fadeUp(0.8)}
          >
            Informativa estesa sull&apos;utilizzo dei cookie ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 e della Direttiva 2002/58/CE (ePrivacy).
          </motion.p>
        </div>
      </header>

      {/* ══ CONTENUTO ══ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-20 px-4 sm:px-8">
        <motion.div className="max-w-[720px] mx-auto" {...fadeUp(0.1)}>
          <div className="bg-white rounded-3xl p-5 sm:p-10 md:p-14 border border-gray-200 shadow-sm">
            <motion.p className="text-xs text-gray-400 mb-6 sm:mb-10" {...fadeUp(0.15)}>
              Ultimo aggiornamento: 9 febbraio 2026
            </motion.p>

            <PolicySection title="1. Cosa sono i cookie" delay={0.1}>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati inviano al dispositivo
                dell&apos;utente (computer, tablet, smartphone), dove vengono memorizzati per essere
                poi ritrasmessi agli stessi siti alla visita successiva. Grazie ai cookie, un sito
                web può ricordare le azioni e le preferenze dell&apos;utente (come la lingua, la
                dimensione dei caratteri e altre impostazioni di visualizzazione) in modo che
                l&apos;utente non debba reimpostarle ogni volta che visita il sito o naviga da una
                pagina all&apos;altra.
              </p>
              <p>
                I cookie vengono utilizzati per diverse finalità: esecuzione di autenticazioni
                informatiche, monitoraggio di sessioni, memorizzazione di informazioni su
                specifiche configurazioni riguardanti gli utenti che accedono al server,
                analisi statistica, ecc.
              </p>
            </PolicySection>

            <PolicySection title="2. Tipologie di cookie" delay={0.15}>
              <p>I cookie si distinguono in diverse categorie in base alla loro funzione e durata:</p>
              <p>
                <strong>Cookie tecnici (necessari):</strong> sono essenziali per il corretto
                funzionamento del sito web. Senza questi cookie, il sito o alcune sue parti
                potrebbero non funzionare correttamente. Non richiedono il consenso dell&apos;utente
                ai sensi dell&apos;art. 122, comma 1, del D.Lgs. 196/2003 e s.m.i.
              </p>
              <p>
                <strong>Cookie analitici:</strong> raccolgono informazioni aggregate sull&apos;utilizzo
                del sito (numero di visitatori, pagine più visitate, tempo di permanenza) per
                migliorare le prestazioni del sito. Possono essere assimilati ai cookie tecnici
                se anonimizzati e utilizzati direttamente dal gestore del sito.
              </p>
              <p>
                <strong>Cookie di profilazione:</strong> creano profili relativi all&apos;utente
                per inviargli messaggi pubblicitari in linea con le preferenze manifestate
                durante la navigazione. Richiedono il consenso preventivo dell&apos;utente.
              </p>
              <p>
                <strong>Cookie di sessione:</strong> vengono cancellati automaticamente alla
                chiusura del browser.
              </p>
              <p>
                <strong>Cookie persistenti:</strong> rimangono memorizzati sul dispositivo
                dell&apos;utente fino alla loro scadenza o fino a quando l&apos;utente li cancella
                manualmente.
              </p>
            </PolicySection>

            <PolicySection title="3. Cookie utilizzati da questo sito" delay={0.2}>
              <p>
                Il sito <strong>civika.it</strong> utilizza esclusivamente cookie tecnici.
                Di seguito l&apos;elenco completo:
              </p>

              {/* Cookie table */}
              <div className="overflow-x-auto mt-4 mb-4">
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F7F5F0]">
                      <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#0F1F33] border border-gray-200">Nome</th>
                      <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#0F1F33] border border-gray-200">Tipo</th>
                      <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#0F1F33] border border-gray-200">Finalità</th>
                      <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-[#0F1F33] border border-gray-200">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 border border-gray-200 font-mono text-xs text-[#1B3A5C]">civika_cookie_consent</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 border border-gray-200">Tecnico</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 border border-gray-200">Memorizza la scelta dell&apos;utente sul consenso cookie (accettato/rifiutato)</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 border border-gray-200">12 mesi</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <strong>Non utilizziamo:</strong> cookie di profilazione, cookie pubblicitari,
                cookie di terze parti per finalità di marketing, strumenti di tracciamento
                (Google Analytics, Facebook Pixel, Hotjar, ecc.), né tecnologie di fingerprinting.
              </p>
            </PolicySection>

            <PolicySection title="4. Cookie di terze parti" delay={0.25}>
              <p>
                Il sito si avvale di servizi di terze parti che potrebbero impostare cookie
                propri sul dispositivo dell&apos;utente:
              </p>
              <p>
                <strong>Google Fonts:</strong> il caricamento dei font web dal servizio Google
                Fonts comporta una connessione ai server di Google. Google potrebbe impostare
                cookie tecnici per ottimizzare la distribuzione dei font. Questi cookie sono
                classificati come tecnici e necessari per il corretto rendering del sito.
                Per maggiori informazioni: <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">Google Fonts Privacy FAQ</a>
              </p>
              <p>
                <strong>Vercel:</strong> la piattaforma di hosting potrebbe impostare cookie
                tecnici necessari per la distribuzione dei contenuti e la protezione da attacchi
                informatici. Per maggiori informazioni: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">Vercel Privacy Policy</a>
              </p>
            </PolicySection>

            <PolicySection title="5. Base giuridica" delay={0.3}>
              <p>
                I cookie tecnici utilizzati da questo sito non richiedono il consenso
                preventivo dell&apos;utente, in quanto strettamente necessari per la fornitura
                del servizio esplicitamente richiesto (art. 122, comma 1, del Codice Privacy
                e Linee Guida del Garante del 10 giugno 2021).
              </p>
              <p>
                Il cookie &ldquo;civika_cookie_consent&rdquo; è esso stesso un cookie tecnico
                necessario per registrare la preferenza dell&apos;utente e non riproporre il banner
                ad ogni accesso.
              </p>
              <p>
                Per trasparenza, il sito mostra comunque un banner informativo alla prima visita,
                offrendo all&apos;utente la possibilità di accettare o rifiutare i cookie.
              </p>
            </PolicySection>

            <PolicySection title="6. Come gestire i cookie dal browser" delay={0.35}>
              <p>
                L&apos;utente può gestire le preferenze relative ai cookie direttamente dal proprio
                browser. Tutti i browser moderni consentono di modificare le impostazioni dei
                cookie. Di seguito i link alle istruzioni dei principali browser:
              </p>
              <p>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">Google Chrome</a>
                {" — "}
                <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">Mozilla Firefox</a>
                {" — "}
                <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">Safari</a>
                {" — "}
                <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">Microsoft Edge</a>
              </p>
              <p>
                La disabilitazione dei cookie tecnici potrebbe compromettere il corretto
                funzionamento di alcune parti del sito web.
              </p>
            </PolicySection>

            <PolicySection title="7. Come revocare il consenso" delay={0.4}>
              <p>
                Per revocare il consenso precedentemente espresso tramite il banner cookie,
                l&apos;utente può:
              </p>
              <p>
                Cancellare il cookie &ldquo;civika_cookie_consent&rdquo; dalle impostazioni
                del proprio browser. Alla successiva visita del sito, il banner verrà
                nuovamente mostrato e l&apos;utente potrà esprimere una nuova preferenza.
              </p>
              <p>
                In alternativa, è possibile cancellare tutti i cookie del dominio civika.it
                dalle impostazioni del browser.
              </p>
            </PolicySection>

            <PolicySection title="8. Titolare del trattamento" delay={0.45}>
              <p>
                Il Titolare del trattamento è <strong>CIVIKA SRL</strong>,
                con sede in Sicilia, Italia.
              </p>
              <p>
                Per qualsiasi richiesta relativa ai cookie o al trattamento dei dati personali: <a href="mailto:info@civika.it" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">info@civika.it</a>
              </p>
            </PolicySection>

            <PolicySection title="9. Diritti dell'utente" delay={0.5}>
              <p>
                Ai sensi degli articoli 15-22 del Regolamento UE 2016/679, l&apos;utente ha
                il diritto di accedere ai propri dati, richiederne la rettifica o la
                cancellazione, limitare il trattamento, opporsi allo stesso e richiedere
                la portabilità dei dati.
              </p>
              <p>
                L&apos;utente può esercitare tali diritti scrivendo a <a href="mailto:info@civika.it" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">info@civika.it</a>.
              </p>
              <p>
                È inoltre possibile proporre reclamo all&apos;Autorità Garante per la Protezione
                dei Dati Personali: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors">www.garanteprivacy.it</a>
              </p>
            </PolicySection>

            <PolicySection title="10. Riferimenti normativi" delay={0.55}>
              <p>La presente Cookie Policy è redatta in conformità a:</p>
              <p>
                Regolamento UE 2016/679 (GDPR); Direttiva 2002/58/CE (Direttiva ePrivacy);
                D.Lgs. 196/2003 (Codice in materia di protezione dei dati personali) e
                successive modifiche (D.Lgs. 101/2018); Linee Guida del Garante per la
                protezione dei dati personali in materia di cookie e altri strumenti di
                tracciamento del 10 giugno 2021.
              </p>
            </PolicySection>

            <PolicySection title="11. Aggiornamenti" delay={0.6}>
              <p>
                Il Titolare si riserva il diritto di modificare la presente Cookie Policy in
                qualsiasi momento. Le eventuali modifiche saranno pubblicate su questa pagina
                con indicazione della data di ultimo aggiornamento. Si consiglia di consultare
                periodicamente questa pagina per restare informati sull&apos;utilizzo dei cookie.
              </p>
            </PolicySection>

            {/* Link alla Privacy Policy */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200 text-center"
              {...fadeUp(0.65)}
            >
              <p className="text-sm text-gray-500">
                Per informazioni sul trattamento dei dati personali, consulta la nostra{" "}
                <a
                  href="/privacy-policy"
                  className="text-[#D4A03C] underline underline-offset-2 hover:text-[#1B3A5C] transition-colors font-semibold"
                >
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
