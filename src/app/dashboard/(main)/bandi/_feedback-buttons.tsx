/**
 * Client component `<FeedbackButtons>` — Strato 9 A4.3 active learning UI.
 *
 * Tre pulsanti verdetto (pertinente / borderline / non_pertinente) sotto
 * un BandoCard con `match_id` valorizzato.
 *
 * UX dual-mode:
 *   - `pertinente` → submit immediato (caso comune, zero-attrito).
 *   - `borderline` / `non_pertinente` → expand inline form: chip
 *     multi-select tag motivo + textarea commento opzionale + submit.
 *     Senza expand, il consulente non avrebbe modo di alimentare il
 *     drift knowledge base con il "perché" del rifiuto — segnale muto.
 *
 * Il form expanded è chiudibile con "Annulla" senza submit. Dopo success
 * il banner mostra anche tagsCount + hasCommento per conferma esplicita.
 */

"use client";

import { useState, useTransition } from "react";
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

import type { FeedbackValutazione } from "@/lib/api/types";

import {
  type FeedbackState,
  TAG_MOTIVO_CHOICES,
  initialFeedbackState,
  submitFeedbackAction,
} from "./actions";

interface FeedbackButtonsProps {
  matchId: string;
}

type Tone = "positive" | "neutral" | "negative";

const TONE_BY_VERDICT: Record<FeedbackValutazione, Tone> = {
  pertinente: "positive",
  borderline: "neutral",
  non_pertinente: "negative",
};

export function FeedbackButtons({ matchId }: FeedbackButtonsProps) {
  const [state, setState] = useState<FeedbackState>(initialFeedbackState);
  const [expandedFor, setExpandedFor] = useState<FeedbackValutazione | null>(
    null,
  );
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [commento, setCommento] = useState("");
  const [isPending, startTransition] = useTransition();

  function reset() {
    setExpandedFor(null);
    setTags(new Set());
    setCommento("");
  }

  function submit(valutazione: FeedbackValutazione) {
    startTransition(async () => {
      const result = await submitFeedbackAction({
        matchId,
        valutazione,
        tags: Array.from(tags),
        commento: commento || null,
      });
      setState(result);
      if (result.status === "success") {
        reset();
      }
    });
  }

  function handleVerdictClick(valutazione: FeedbackValutazione) {
    if (valutazione === "pertinente") {
      submit(valutazione);
      return;
    }
    if (expandedFor === valutazione) {
      setExpandedFor(null);
      return;
    }
    setExpandedFor(valutazione);
  }

  function toggleTag(tagId: string) {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  }

  return (
    <div className="mt-4 space-y-2 border-t border-[#1B3A5C]/20 pt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6B8AAD]">
          Verdetto consulente
        </span>
        <div className="flex gap-2">
          <VerdictTrigger
            valutazione="pertinente"
            label="Pertinente"
            icon={<ThumbsUp className="h-3.5 w-3.5" />}
            active={state.status === "success" && state.valutazione === "pertinente"}
            tone="positive"
            disabled={isPending}
            expanded={false}
            onClick={() => handleVerdictClick("pertinente")}
          />
          <VerdictTrigger
            valutazione="borderline"
            label="Borderline"
            icon={<HelpCircle className="h-3.5 w-3.5" />}
            active={state.status === "success" && state.valutazione === "borderline"}
            tone="neutral"
            disabled={isPending}
            expanded={expandedFor === "borderline"}
            onClick={() => handleVerdictClick("borderline")}
          />
          <VerdictTrigger
            valutazione="non_pertinente"
            label="Non pertinente"
            icon={<ThumbsDown className="h-3.5 w-3.5" />}
            active={state.status === "success" && state.valutazione === "non_pertinente"}
            tone="negative"
            disabled={isPending}
            expanded={expandedFor === "non_pertinente"}
            onClick={() => handleVerdictClick("non_pertinente")}
          />
        </div>
      </div>

      {expandedFor !== null && (
        <ExpandedForm
          valutazione={expandedFor}
          tags={tags}
          onToggleTag={toggleTag}
          commento={commento}
          onCommentoChange={setCommento}
          onSubmit={() => submit(expandedFor)}
          onCancel={reset}
          isPending={isPending}
        />
      )}

      {state.status !== "idle" && expandedFor === null && (
        <FeedbackBanner state={state} />
      )}
    </div>
  );
}

interface VerdictTriggerProps {
  valutazione: FeedbackValutazione;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  tone: Tone;
  disabled: boolean;
  expanded: boolean;
  onClick: () => void;
}

function VerdictTrigger({
  label,
  icon,
  active,
  tone,
  disabled,
  expanded,
  onClick,
}: VerdictTriggerProps) {
  const palette = paletteFor(tone, active || expanded);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={expanded || active}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${palette}`}
    >
      {icon}
      {label}
    </button>
  );
}

interface ExpandedFormProps {
  valutazione: FeedbackValutazione;
  tags: Set<string>;
  onToggleTag: (id: string) => void;
  commento: string;
  onCommentoChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function ExpandedForm({
  valutazione,
  tags,
  onToggleTag,
  commento,
  onCommentoChange,
  onSubmit,
  onCancel,
  isPending,
}: ExpandedFormProps) {
  const tone = TONE_BY_VERDICT[valutazione];
  const accent =
    tone === "neutral"
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-red-500/30 bg-red-500/5";
  const submitPalette =
    tone === "neutral"
      ? "bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 border-amber-500/40"
      : "bg-red-500/20 text-red-200 hover:bg-red-500/30 border-red-500/40";

  return (
    <div className={`mt-2 rounded-lg border ${accent} p-3 space-y-3`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] text-[#8AACCC]">
          <span className="font-semibold">
            {valutazione === "borderline" ? "Borderline" : "Non pertinente"}
          </span>
          {" — seleziona uno o più tag motivo e (opzionale) aggiungi un commento. Senza segnale, l'active learning resta muto."}
        </p>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          aria-label="Annulla"
          className="flex-shrink-0 rounded p-0.5 text-[#6B8AAD] hover:text-[#8AACCC] disabled:opacity-50"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TAG_MOTIVO_CHOICES.map((choice) => {
          const selected = tags.has(choice.id);
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onToggleTag(choice.id)}
              disabled={isPending}
              aria-pressed={selected}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-all disabled:opacity-50 ${
                selected
                  ? "border-[#3D7BC0]/60 bg-[#3D7BC0]/20 text-[#A8C7E8]"
                  : "border-[#1B3A5C]/40 bg-[#0A1628]/40 text-[#8AACCC] hover:border-[#3D7BC0]/40 hover:text-[#A8C7E8]"
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      <div>
        <label
          htmlFor={`commento-${valutazione}`}
          className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#6B8AAD]"
        >
          Commento (opzionale)
        </label>
        <textarea
          id={`commento-${valutazione}`}
          value={commento}
          onChange={(e) => onCommentoChange(e.target.value)}
          disabled={isPending}
          maxLength={1000}
          rows={2}
          placeholder="Es. cliente non ha capacità di cofinanziamento; settore richiesto fuori scope."
          className="w-full rounded-md border border-[#1B3A5C]/40 bg-[#0A1628]/60 px-2 py-1.5 text-[11px] text-[#D7E4F2] placeholder:text-[#6B8AAD]/60 focus:border-[#3D7BC0]/60 focus:outline-none disabled:opacity-50"
        />
        {commento.length > 0 && (
          <p className="mt-0.5 text-right text-[9px] text-[#6B8AAD]">
            {commento.length}/1000
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-lg border border-[#1B3A5C]/40 bg-transparent px-2.5 py-1.5 text-[11px] font-medium text-[#8AACCC] hover:text-[#D7E4F2] disabled:opacity-50"
        >
          Annulla
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${submitPalette}`}
        >
          {isPending ? "Invio..." : "Invia verdetto"}
        </button>
      </div>
    </div>
  );
}

function FeedbackBanner({ state }: { state: FeedbackState }) {
  const isSuccess = state.status === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;
  const palette = isSuccess
    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
    : "border-amber-500/30 bg-amber-500/5 text-amber-300";

  const detailParts: string[] = [];
  if (state.tagsCount && state.tagsCount > 0) {
    detailParts.push(
      `${state.tagsCount} tag motivo`,
    );
  }
  if (state.hasCommento) {
    detailParts.push("commento allegato");
  }
  const detail = detailParts.length > 0 ? detailParts.join(" · ") : null;

  return (
    <div className={`rounded-lg border px-3 py-2 text-[11px] ${palette}`}>
      <div className="flex items-start gap-2">
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold">{state.message}</p>
          {detail && <p className="mt-0.5 opacity-80">{detail}</p>}
          {state.hint && <p className="mt-0.5 opacity-80">{state.hint}</p>}
        </div>
      </div>
    </div>
  );
}

function paletteFor(tone: Tone, active: boolean): string {
  if (tone === "positive") {
    return active
      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
      : "border-[#1B3A5C]/30 bg-[#0A1628]/40 text-[#8AACCC] hover:border-emerald-500/40 hover:text-emerald-300";
  }
  if (tone === "neutral") {
    return active
      ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
      : "border-[#1B3A5C]/30 bg-[#0A1628]/40 text-[#8AACCC] hover:border-amber-500/40 hover:text-amber-300";
  }
  return active
    ? "border-red-500/50 bg-red-500/15 text-red-300"
    : "border-[#1B3A5C]/30 bg-[#0A1628]/40 text-[#8AACCC] hover:border-red-500/40 hover:text-red-300";
}
