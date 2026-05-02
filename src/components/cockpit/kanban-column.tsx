/**
 * KanbanColumn — colonna del kanban pre-candidatura del workspace cliente.
 *
 * Server Component a oggi: rendering puro statico delle 3 colonne (`nuovo`,
 * `in_valutazione`, `scartato`). Il drag&drop sarà aggiunto in Fase 5
 * wrappando l'intero board in un Client Component dnd-kit, ma le card
 * stesse continueranno a essere generate da questo componente per non
 * duplicare il rendering.
 *
 * Header colorato per stato:
 *   - nuovo         → blu freddo (in entrata, non ancora valutato)
 *   - in_valutazione → oro (focus operatore)
 *   - scartato      → grigio scuro (archiviato, non si butta nulla)
 */

import { Inbox } from "lucide-react";

import type { BandoPipelineStato, PipelineKanbanItem } from "@/lib/api/types";

import { PipelineCard } from "./pipeline-card";

const COLUMN_META: Record<
  BandoPipelineStato,
  { label: string; sublabel: string; tone: string; ring: string }
> = {
  nuovo: {
    label: "Nuovi",
    sublabel: "Da triare",
    tone: "text-sky-300",
    ring: "border-sky-500/30 bg-sky-500/5",
  },
  in_valutazione: {
    label: "In valutazione",
    sublabel: "Decisione attiva",
    tone: "text-[#E8C06A]",
    ring: "border-[#D4A03C]/40 bg-[#D4A03C]/8",
  },
  scartato: {
    label: "Scartati",
    sublabel: "Archivio motivato",
    tone: "text-slate-400",
    ring: "border-slate-500/30 bg-slate-500/5",
  },
};

interface Props {
  stato: BandoPipelineStato;
  items: PipelineKanbanItem[];
  clienteId: string;
}

export function KanbanColumn({ stato, items, clienteId }: Props) {
  const meta = COLUMN_META[stato];
  return (
    <section
      className={`flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl border ${meta.ring}`}
      data-kanban-column={stato}
    >
      <header className="flex items-center justify-between border-b border-current/20 px-4 py-3">
        <div>
          <h3 className={`text-sm font-semibold ${meta.tone}`}>{meta.label}</h3>
          <p className="text-[10px] text-[#6B8AAD]">{meta.sublabel}</p>
        </div>
        <span
          className={`flex h-6 min-w-[28px] items-center justify-center rounded-full bg-[#0A1628]/60 px-2 text-xs font-bold ${meta.tone}`}
        >
          {items.length}
        </span>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <Inbox className="mb-2 h-6 w-6 text-[#4A6A8A]" />
            <p className="text-xs text-[#6B8AAD]">Nessun bando in questa colonna</p>
          </div>
        ) : (
          items.map((item) => (
            <PipelineCard
              key={item.bando.id}
              bando={item.bando}
              density={stato === "scartato" ? "expanded" : "compact"}
              scoreComplessivo={item.match_score_complessivo}
              alertLevel={item.match_alert_level}
              noteConsulente={item.note_consulente}
              scartatoMotivo={
                stato === "scartato" ? item.scartato_motivo : null
              }
              onOpenHref={`/dashboard/bandi/${item.bando.id}?cliente=${clienteId}`}
            />
          ))
        )}
      </div>
    </section>
  );
}
