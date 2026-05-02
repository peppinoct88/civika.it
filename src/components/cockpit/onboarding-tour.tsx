/**
 * OnboardingTour — tour 3-step per il primo accesso al cockpit (ADR-035 §7).
 *
 * Client Component montato nella home `/dashboard`. Si auto-mostra solo
 * la prima volta (flag `civika_onboarding_tour_v1` in localStorage). Tre
 * step lineari — niente highlight di elementi specifici, è una guida
 * concettuale che spiega dual-pane Inbox/Workspace, kanban pre-candidatura
 * e lo score Sonnet 4 dimensioni.
 *
 * L'operatore può sempre richiamarlo via `?tour=1` (utile per onboarding
 * manuale di un nuovo collega) o dal menu utente in topbar.
 */

"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

const STORAGE_KEY = "civika_onboarding_tour_v1";

interface Step {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}

const STEPS: Step[] = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Benvenuto nel Cockpit",
    body: (
      <>
        <p>
          Il cockpit è il tuo punto di partenza ogni mattina. La{" "}
          <strong className="text-[#E8C06A]">Inbox del giorno</strong> ti
          mostra cosa serve guardare ora — su tutto il tuo portafoglio
          clienti — in 4 sezioni:
        </p>
        <ul className="mt-2 space-y-1 text-[12px] text-[#A0BED8]">
          <li>
            <span className="text-[#E8C06A]">●</span> Nuovi top match (score
            ≥70 nelle 24h)
          </li>
          <li>
            <span className="text-rose-300">●</span> Scadenze imminenti
            (≤7gg, in valutazione)
          </li>
          <li>
            <span className="text-sky-300">●</span> Graduatorie attese
            (esiti previsti ≤7gg)
          </li>
          <li>
            <span className="text-violet-300">●</span> Eventi recenti
            (proroghe, FAQ, modulistica)
          </li>
        </ul>
        <p className="mt-3">
          Sul lato destro hai sempre il tuo{" "}
          <strong>Portafoglio</strong>: cliccaci sopra per entrare nel
          Workspace di un cliente.
        </p>
      </>
    ),
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Workspace cliente — kanban pre-candidatura",
    body: (
      <>
        <p>
          Ogni cliente ha un suo Workspace con un{" "}
          <strong className="text-[#E8C06A]">kanban a 3 colonne</strong>:
        </p>
        <ul className="mt-2 space-y-1 text-[12px] text-[#A0BED8]">
          <li>
            <span className="text-sky-300">Nuovi</span> — bandi appena
            proposti, ancora da triare
          </li>
          <li>
            <span className="text-[#E8C06A]">In valutazione</span> —
            decisione attiva, candidatura in lavorazione
          </li>
          <li>
            <span className="text-slate-300">Scartati</span> — archivio
            motivato per learning futuro
          </li>
        </ul>
        <p className="mt-3">
          <strong>Trascina le card</strong> tra le colonne per cambiare
          stato. La modifica è atomica e tracciata in audit log. Lo
          spostamento è ottimistico — su errore vedi un toast e la card
          torna indietro.
        </p>
      </>
    ),
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Score e motivazioni",
    body: (
      <>
        <p>
          Lo <strong className="text-[#E8C06A]">Score Sonnet</strong> (0-100)
          è il rerank LLM su 4 dimensioni:
        </p>
        <dl className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <dt className="font-semibold text-[#D4A03C]">Pertinenza</dt>
            <dd className="text-[#A0BED8]">attinenza tema/settore</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#D4A03C]">Fattibilità</dt>
            <dd className="text-[#A0BED8]">capacità del cliente di candidarsi</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#D4A03C]">Urgenza</dt>
            <dd className="text-[#A0BED8]">tempo residuo vs effort</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#D4A03C]">Valore atteso</dt>
            <dd className="text-[#A0BED8]">importo × probabilità</dd>
          </div>
        </dl>
        <p className="mt-3">
          Apri un bando per leggere le{" "}
          <strong>4 motivazioni testuali</strong>: spiegano <em>perché</em>{" "}
          quel punteggio, in italiano. Il tuo feedback (👍/👎) alimenta il
          loop di active learning.
        </p>
      </>
    ),
  },
];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Lettura di browser-only state (URL + localStorage) → necessita
    // setState in effect: non possiamo computarlo durante il render
    // perché è SSR-incompatibile.
    let shouldOpen = false;
    if (typeof window !== "undefined") {
      const forced =
        new URLSearchParams(window.location.search).get("tour") === "1";
      if (forced) {
        shouldOpen = true;
      } else {
        try {
          shouldOpen = !window.localStorage.getItem(STORAGE_KEY);
        } catch {
          // localStorage può fallire in private browsing — in tal caso
          // restiamo silenziosi (preferiamo nessun tour a un loop).
          shouldOpen = false;
        }
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (shouldOpen) setOpen(true);
  }, []);

  const close = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // ignore
    }
    setOpen(false);
    setStep(0);
  };

  if (!open) return null;

  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#D4A03C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] shadow-2xl shadow-[#D4A03C]/10">
        <header className="flex items-start justify-between gap-3 border-b border-[#1B3A5C]/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A03C]/15 text-[#E8C06A]">
              {current.icon}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4A03C]">
                Onboarding · Step {step + 1} di {STEPS.length}
              </p>
              <h2
                id="onboarding-title"
                className="text-base font-semibold text-white"
              >
                {current.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6B8AAD] transition-colors hover:bg-white/[0.04] hover:text-white"
            aria-label="Chiudi tour"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="space-y-3 px-6 py-5 text-sm leading-relaxed text-[#A0BED8]">
          {current.body}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[#1B3A5C]/30 bg-[#0A1628]/60 px-6 py-4">
          <button
            type="button"
            onClick={close}
            className="text-xs text-[#6B8AAD] hover:text-[#A0BED8]"
          >
            Salta tour
          </button>
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i === step ? "bg-[#D4A03C]" : "bg-[#1B3A5C]/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-[#1B3A5C]/40 px-3 py-1.5 text-xs text-[#A0BED8] hover:bg-white/[0.04]"
              >
                <ArrowLeft className="h-3 w-3" />
                Indietro
              </button>
            )}
            {isLast ? (
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center gap-1 rounded-lg bg-[#D4A03C] px-4 py-1.5 text-xs font-semibold text-[#0A1628] transition-colors hover:bg-[#E8C06A]"
              >
                Inizia
                <Sparkles className="h-3 w-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="inline-flex items-center gap-1 rounded-lg bg-[#D4A03C] px-4 py-1.5 text-xs font-semibold text-[#0A1628] transition-colors hover:bg-[#E8C06A]"
              >
                Avanti
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
