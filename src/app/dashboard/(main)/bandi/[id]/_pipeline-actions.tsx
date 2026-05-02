/**
 * PipelineActions — sidebar client cardo per cambiare lo stato pipeline
 * dal dettaglio bando (ADR-035).
 *
 * Tre pulsanti corrispondenti alle 3 colonne kanban (Nuovo / In valutazione
 * / Scartato), più un campo note inline. Lo stato corrente è evidenziato.
 *
 * Quando l'operatore clicca "Scarta", appare un piccolo input motivo:
 * niente scarto silenzioso — l'archivio motivato è il valore di lungo
 * termine (ADR-035 §6).
 *
 * La server action vive già in
 * `apps/dashboard/src/app/dashboard/(main)/clienti/[clienteId]/actions.ts`
 * (`updatePipelineStatoAction`) — la riusiamo qui per coerenza.
 */

"use client";

import { useState, useTransition } from "react";
import { Inbox, Layers, ListChecks, X } from "lucide-react";
import { toast } from "sonner";

import { updatePipelineStatoAction } from "@/app/dashboard/(main)/clienti/[clienteId]/actions";
import type {
  BandoClientePipelineRead,
  BandoPipelineStato,
} from "@/lib/api/types";

const STATI: {
  value: BandoPipelineStato;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  tone: string;
  activeTone: string;
}[] = [
  {
    value: "nuovo",
    label: "Nuovo",
    sublabel: "Da triare",
    icon: <Inbox className="h-3.5 w-3.5" />,
    tone: "border-[#1B3A5C]/40 text-[#A0BED8]",
    activeTone: "border-sky-400/40 bg-sky-500/10 text-sky-200",
  },
  {
    value: "in_valutazione",
    label: "In valutazione",
    sublabel: "Decisione attiva",
    icon: <Layers className="h-3.5 w-3.5" />,
    tone: "border-[#1B3A5C]/40 text-[#A0BED8]",
    activeTone: "border-[#D4A03C]/40 bg-[#D4A03C]/10 text-[#E8C06A]",
  },
  {
    value: "scartato",
    label: "Scarta",
    sublabel: "Archivio motivato",
    icon: <X className="h-3.5 w-3.5" />,
    tone: "border-[#1B3A5C]/40 text-[#A0BED8]",
    activeTone: "border-rose-400/40 bg-rose-500/10 text-rose-200",
  },
];

interface Props {
  clienteId: string;
  bandoId: string;
  current: BandoClientePipelineRead | null;
}

export function PipelineActions({ clienteId, bandoId, current }: Props) {
  const [stato, setStato] = useState<BandoPipelineStato | null>(
    current?.stato_pipeline ?? null,
  );
  const [note, setNote] = useState(current?.note_consulente ?? "");
  const [scartoMotivo, setScartoMotivo] = useState(
    current?.scartato_motivo ?? "",
  );
  const [pending, startTransition] = useTransition();

  function commit(next: BandoPipelineStato) {
    startTransition(async () => {
      const result = await updatePipelineStatoAction(clienteId, bandoId, next, {
        noteConsulente: note.trim() || null,
        scartatoMotivo:
          next === "scartato" ? scartoMotivo.trim() || null : null,
      });
      if (result.ok) {
        setStato(next);
        toast.success(`Stato aggiornato → ${next}`);
      } else {
        toast.error(result.error ?? "Errore aggiornamento");
      }
    });
  }

  return (
    <section className="space-y-4 rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-5">
      <header>
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A0BED8]">
          <ListChecks className="h-3 w-3" />
          Pipeline
        </h2>
        <p className="mt-1 text-[11px] text-[#6B8AAD]">
          Cambia stato e aggiungi una nota — tracciato in audit log.
        </p>
      </header>

      <div className="space-y-2">
        {STATI.map((opt) => {
          const isActive = stato === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={pending || isActive}
              onClick={() => commit(opt.value)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors disabled:opacity-60 ${
                isActive ? opt.activeTone : `${opt.tone} hover:bg-white/[0.03]`
              }`}
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                {opt.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold">
                  {opt.label}
                </span>
                <span className="block text-[10px] opacity-70">
                  {opt.sublabel}
                </span>
              </span>
              {isActive && (
                <span className="text-[9px] font-bold uppercase tracking-wide opacity-80">
                  attivo
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div>
        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[#D4A03C]/80">
          Note consulente
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Annotazioni interne sul bando…"
          className="w-full resize-none rounded-lg border border-[#1B3A5C]/40 bg-[#0A1628]/60 px-3 py-2 text-xs text-[#E2EAF5] placeholder:text-[#4A6A8A] focus:border-[#D4A03C]/40 focus:outline-none"
        />
      </div>

      {stato === "scartato" && (
        <div>
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-rose-300/80">
            Motivo scarto
          </label>
          <input
            value={scartoMotivo}
            onChange={(e) => setScartoMotivo(e.target.value)}
            onBlur={() => commit("scartato")}
            placeholder="Es. fuori scope, ente non eligibile…"
            className="w-full rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-xs text-rose-100 placeholder:text-rose-300/40 focus:border-rose-400/50 focus:outline-none"
          />
        </div>
      )}

      {note !== (current?.note_consulente ?? "") && stato && (
        <button
          type="button"
          onClick={() => commit(stato)}
          disabled={pending}
          className="w-full rounded-lg border border-[#D4A03C]/40 bg-[#D4A03C]/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#E8C06A] transition-colors hover:bg-[#D4A03C]/15 disabled:opacity-60"
        >
          {pending ? "Salvataggio…" : "Salva nota"}
        </button>
      )}
    </section>
  );
}
