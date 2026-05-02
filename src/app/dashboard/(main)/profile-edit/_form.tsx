/**
 * Client component `<ProfileEditForm>` — Strato 9 A4.1 frontend.
 *
 * Form a singolo campo `needs` (textarea) + submit handler che invoca
 * la Server Action `updateNeedsAction`. UI conforme al design system
 * dashboard (palette navy/oro `#D4A03C`, focus states, label uppercase).
 *
 * Caratteristiche:
 * - `useFormState` per ricevere il risultato della Server Action senza
 *   client fetch manuale.
 * - Counter live di lunghezza (warning sotto 20 / sopra 4000).
 * - Stato di submit (`useFormStatus` via component figlio).
 * - Banner success/error in cima, dismissibile.
 */

"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Save, Loader2, Sparkles } from "lucide-react";

import {
  type UpdateNeedsState,
  initialState,
  updateNeedsAction,
} from "./actions";

interface ProfileEditFormProps {
  clienteId: string;
  clienteNome: string;
  initialNeeds: string;
}

const MIN_NEEDS_LENGTH = 20;
const MAX_NEEDS_LENGTH = 4000;

export function ProfileEditForm({
  clienteId,
  clienteNome,
  initialNeeds,
}: ProfileEditFormProps) {
  const boundAction = updateNeedsAction.bind(null, clienteId);
  const [state, formAction] = useActionState<UpdateNeedsState, FormData>(
    boundAction,
    initialState,
  );

  // Mantieni il valore corrente del textarea: la Server Action ritorna
  // `needs` aggiornato in caso di successo, oppure il valore tentato in
  // caso di errore (così l'utente non perde il testo).
  // Pattern "adjust state during render" (React 19 docs) per sincronizzare
  // il valore quando arriva un nuovo state dalla Server Action — evita
  // useEffect+setState che ESLint segnala come cascading render.
  const [value, setValue] = useState<string>(initialNeeds);
  const [lastSyncedNeeds, setLastSyncedNeeds] =
    useState<string | undefined>(undefined);
  if (state.needs !== undefined && state.needs !== lastSyncedNeeds) {
    setLastSyncedNeeds(state.needs);
    setValue(state.needs);
  }

  const length = value.length;
  const tooShort = length > 0 && length < MIN_NEEDS_LENGTH;
  const tooLong = length > MAX_NEEDS_LENGTH;
  const counterColor = tooLong
    ? "text-red-400"
    : tooShort
      ? "text-amber-400"
      : "text-[#6B8AAD]";

  return (
    <form action={formAction} className="space-y-5">
      {state.status !== "idle" && (
        <FeedbackBanner state={state} />
      )}

      <div>
        <label
          htmlFor="needs"
          className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-[#6B8AAD]"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A03C]" />
            Profilo cliente — `needs`
          </span>
          <span className={`text-[11px] normal-case tracking-normal ${counterColor}`}>
            {length} / {MAX_NEEDS_LENGTH} caratteri
          </span>
        </label>
        <textarea
          id="needs"
          name="needs"
          rows={12}
          required
          minLength={MIN_NEEDS_LENGTH}
          maxLength={MAX_NEEDS_LENGTH}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Es. "Comune di Adrano (CT), 35.000 abitanti. Cerca bandi PNRR per riqualificazione urbana, transizione digitale PA, valorizzazione patrimonio storico-culturale (Castello Normanno). Capacità cofinanziamento ~50.000€."'
          className="w-full resize-y rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-3 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
        />
        <p className="mt-2 text-xs text-[#4A6A8A]">
          Descrivi cliente <span className="text-[#A0BED8]">{clienteNome}</span> in linguaggio naturale: settori
          attivi, territorio, capacità di cofinanziamento, priorità strategiche.
          Il testo viene embedato con BGE-M3 (1024 dim) e usato dal matcher
          semantico per il rerank Sonnet 4.6.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#1B3A5C]/20 pt-5">
        <SubmitButton disabled={tooShort || tooLong} />
      </div>
    </form>
  );
}

function FeedbackBanner({ state }: { state: UpdateNeedsState }) {
  const isSuccess = state.status === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;
  const palette = isSuccess
    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
    : "border-amber-500/30 bg-amber-500/5 text-amber-400";

  return (
    <div className={`rounded-2xl border ${palette} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold">{state.message}</p>
          {state.hint && (
            <p className="mt-1 text-xs opacity-80">{state.hint}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
        isDisabled
          ? "cursor-not-allowed bg-[#1B3A5C]/40 text-[#4A6A8A]"
          : "bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] text-[#0A1628] hover:shadow-lg hover:shadow-[#D4A03C]/20"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Salvataggio…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Salva profilo
        </>
      )}
    </button>
  );
}
