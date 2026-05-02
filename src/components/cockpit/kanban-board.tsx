/**
 * KanbanBoard — Client Component dnd-kit wrapper sopra le 3 KanbanColumn.
 *
 * Pattern (ADR-035):
 *   - State client `items` (3 array per colonna), inizializzato dal padre RSC.
 *   - useDroppable per ogni colonna, useDraggable per ogni card (id =
 *     bando.id).
 *   - onDragEnd:
 *       1. Calcolo new column da `over.id`. Se uguale alla source,
 *          niente da fare.
 *       2. Optimistic update locale (move card).
 *       3. Chiama Server Action `updatePipelineStatoAction`.
 *       4. Su errore: rollback + toast. Su successo: toast discreto.
 *
 * Performance: niente useEffect, niente refetch. Il revalidatePath
 * lato server invalida la prossima visita ma la tab corrente già ha
 * lo stato corretto via optimistic update.
 *
 * Accessibilità: dnd-kit espone keyboard sensors (Space/Enter per
 * attivare il drag, frecce per spostare). Il fallback manuale via
 * dropdown è gestito dal SlideOver di dettaglio (Phase 4 ext).
 */

"use client";

import { useCallback, useState, useTransition } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Inbox } from "lucide-react";
import { toast } from "sonner";

import { PipelineCard } from "@/components/cockpit/pipeline-card";
import type {
  BandoPipelineStato,
  PipelineKanbanItem,
} from "@/lib/api/types";

import { updatePipelineStatoAction } from "@/app/dashboard/(main)/clienti/[clienteId]/actions";

interface BoardState {
  nuovo: PipelineKanbanItem[];
  in_valutazione: PipelineKanbanItem[];
  scartato: PipelineKanbanItem[];
}

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

const COLUMNS: BandoPipelineStato[] = ["nuovo", "in_valutazione", "scartato"];

interface Props {
  clienteId: string;
  initial: BoardState;
}

export function KanbanBoard({ clienteId, initial }: Props) {
  const [items, setItems] = useState<BoardState>(initial);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const findColumn = useCallback(
    (bandoId: string): BandoPipelineStato | null => {
      for (const col of COLUMNS) {
        if (items[col].some((it) => it.bando.id === bandoId)) return col;
      }
      return null;
    },
    [items],
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  };

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveId(null);
      if (!e.over) return;

      const bandoId = String(e.active.id);
      const targetCol = String(e.over.id) as BandoPipelineStato;
      if (!COLUMNS.includes(targetCol)) return;

      const sourceCol = findColumn(bandoId);
      if (!sourceCol || sourceCol === targetCol) return;

      const card = items[sourceCol].find((it) => it.bando.id === bandoId);
      if (!card) return;

      const moved: PipelineKanbanItem = {
        ...card,
        stato_pipeline: targetCol,
        updated_at: new Date().toISOString(),
      };

      const previous = items;
      setItems((prev) => ({
        ...prev,
        [sourceCol]: prev[sourceCol].filter((it) => it.bando.id !== bandoId),
        [targetCol]: [moved, ...prev[targetCol]],
      }));

      startTransition(async () => {
        const result = await updatePipelineStatoAction(
          clienteId,
          bandoId,
          targetCol,
          {
            noteConsulente: card.note_consulente,
            scartatoMotivo:
              targetCol === "scartato" ? card.scartato_motivo : null,
          },
        );
        if (!result.ok) {
          setItems(previous);
          toast.error(`Spostamento fallito: ${result.error ?? "errore"}`);
          return;
        }
        toast.success(
          `${card.bando.titolo.slice(0, 60)}${card.bando.titolo.length > 60 ? "…" : ""} → ${COLUMN_META[targetCol].label}`,
        );
      });
    },
    [items, clienteId, findColumn],
  );

  const activeCard = activeId
    ? Object.values(items)
        .flat()
        .find((it) => it.bando.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {COLUMNS.map((col) => (
          <DroppableColumn
            key={col}
            stato={col}
            items={items[col]}
            clienteId={clienteId}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeCard ? (
          <div className="rotate-2 opacity-90 shadow-2xl shadow-[#D4A03C]/20">
            <PipelineCard
              bando={activeCard.bando}
              density="compact"
              scoreComplessivo={activeCard.match_score_complessivo}
              alertLevel={activeCard.match_alert_level}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function DroppableColumn({
  stato,
  items,
  clienteId,
}: {
  stato: BandoPipelineStato;
  items: PipelineKanbanItem[];
  clienteId: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stato });
  const meta = COLUMN_META[stato];
  return (
    <section
      ref={setNodeRef}
      className={`flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl border ${meta.ring} transition-all ${
        isOver ? "ring-2 ring-[#D4A03C]/40 ring-offset-2 ring-offset-[#0B1929]" : ""
      }`}
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
            <p className="text-xs text-[#6B8AAD]">
              {isOver ? "Rilascia qui" : "Trascina un bando qui"}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <DraggableCard
              key={item.bando.id}
              item={item}
              clienteId={clienteId}
              isExpanded={stato === "scartato"}
            />
          ))
        )}
      </div>
    </section>
  );
}

function DraggableCard({
  item,
  clienteId,
  isExpanded,
}: {
  item: PipelineKanbanItem;
  clienteId: string;
  isExpanded: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.bando.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab transition-opacity ${isDragging ? "opacity-30" : ""}`}
    >
      <PipelineCard
        bando={item.bando}
        density={isExpanded ? "expanded" : "compact"}
        scoreComplessivo={item.match_score_complessivo}
        alertLevel={item.match_alert_level}
        noteConsulente={item.note_consulente}
        scartatoMotivo={isExpanded ? item.scartato_motivo : null}
        onOpenHref={`/dashboard/bandi/${item.bando.id}?cliente=${clienteId}`}
      />
    </div>
  );
}
