/**
 * Client component `<SegnalaForm>` — Strato 10 ZERO MISS Mecc. 4.
 *
 * Form per la segnalazione manuale di un bando rilevante che il sistema
 * non ha intercettato (ADR-011 Mecc. 4). Campi:
 *   - titolo (obbligatorio, 3-500 char)
 *   - url_fonte (opzionale, http/https)
 *   - ente_pubblicatore (opzionale, max 300)
 *   - scadenza_dichiarata (opzionale, ISO date)
 *   - descrizione (opzionale, max 4000)
 *
 * UX coerente con `_form.tsx` di profile-edit: useActionState + useFormStatus,
 * banner success/error, palette navy/oro, focus states.
 */

"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  Crosshair,
} from "lucide-react";

import {
  type CreateSegnalazioneState,
  createSegnalazioneAction,
  initialState,
} from "./actions";

const MAX_TITOLO_LENGTH = 500;
const MAX_DESCRIZIONE_LENGTH = 4000;

export function SegnalaForm() {
  const [state, formAction] = useActionState<CreateSegnalazioneState, FormData>(
    createSegnalazioneAction,
    initialState,
  );

  // Su successo, ripulisci i campi: il form deve tornare neutro.
  // Su errore, ripopola con i valori echo restituiti dalla Server Action.
  const echoed = state.status === "error" ? state.values : undefined;

  const [titolo, setTitolo] = useState<string>(echoed?.titolo ?? "");
  const [descrizione, setDescrizione] = useState<string>(
    echoed?.descrizione ?? "",
  );

  const titoloLen = titolo.length;
  const descrLen = descrizione.length;

  return (
    <form action={formAction} className="space-y-5">
      {state.status !== "idle" && <FeedbackBanner state={state} />}

      <div>
        <Label htmlFor="titolo" required>
          Titolo del bando
        </Label>
        <input
          id="titolo"
          name="titolo"
          type="text"
          required
          minLength={3}
          maxLength={MAX_TITOLO_LENGTH}
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          placeholder="Es. Avviso pubblico — Riqualificazione borghi minori, PNRR M1C3 Inv.2.1"
          className="w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-2.5 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
        />
        <Counter current={titoloLen} max={MAX_TITOLO_LENGTH} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="ente_pubblicatore">Ente pubblicatore</Label>
          <input
            id="ente_pubblicatore"
            name="ente_pubblicatore"
            type="text"
            maxLength={300}
            defaultValue={echoed?.ente_pubblicatore ?? ""}
            placeholder="Es. Regione Sicilia, Dipartimento Beni Culturali"
            className="w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-2.5 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
          />
        </div>
        <div>
          <Label htmlFor="scadenza_dichiarata">Scadenza dichiarata</Label>
          <input
            id="scadenza_dichiarata"
            name="scadenza_dichiarata"
            type="date"
            defaultValue={echoed?.scadenza_dichiarata ?? ""}
            className="w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-2.5 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none [color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="url_fonte">URL fonte originale</Label>
        <input
          id="url_fonte"
          name="url_fonte"
          type="url"
          maxLength={2000}
          defaultValue={echoed?.url_fonte ?? ""}
          placeholder="https://..."
          className="w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-2.5 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
        />
        <p className="mt-1 text-[11px] text-[#4A6A8A]">
          Dove hai trovato il bando (Gazzetta, sito ente, blog di settore).
        </p>
      </div>

      <div>
        <Label htmlFor="descrizione">Descrizione / contesto</Label>
        <textarea
          id="descrizione"
          name="descrizione"
          rows={5}
          maxLength={MAX_DESCRIZIONE_LENGTH}
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
          placeholder="Perché è rilevante per i clienti CIVIKA, sospetti su quale fonte avrebbe dovuto darcelo, eventuali deadline ravvicinate."
          className="w-full resize-y rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-3 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
        />
        <Counter current={descrLen} max={MAX_DESCRIZIONE_LENGTH} />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#1B3A5C]/20 pt-5">
        <SubmitButton disabled={titoloLen < 3} />
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  required = false,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#6B8AAD]"
    >
      <Crosshair className="h-3.5 w-3.5 text-[#D4A03C]" />
      {children}
      {required && <span className="text-[#D4A03C]">*</span>}
    </label>
  );
}

function Counter({ current, max }: { current: number; max: number }) {
  const tone =
    current > max
      ? "text-red-400"
      : current > max * 0.9
        ? "text-amber-400"
        : "text-[#4A6A8A]";
  return (
    <p className={`mt-1 text-right text-[11px] ${tone}`}>
      {current} / {max}
    </p>
  );
}

function FeedbackBanner({ state }: { state: CreateSegnalazioneState }) {
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
          {state.hint && <p className="mt-1 text-xs opacity-80">{state.hint}</p>}
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
          Invio…
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Invia segnalazione
        </>
      )}
    </button>
  );
}
