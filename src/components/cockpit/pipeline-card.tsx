/**
 * PipelineCard — card compatta riutilizzabile per kanban e inbox alert.
 *
 * Server Component: rendering puro a partire dai dati passati.
 *
 * Tre densità:
 *   - "compact"  : solo titolo + ente + scadenza, score badge piccolo. Usata
 *                  nelle colonne kanban dove lo spazio è premium.
 *   - "comfort"  : aggiunge importo + livello pill. Default per inbox.
 *   - "expanded" : aggiunge una riga di metadata aggiuntiva. Usata nei list
 *                  view del workspace.
 *
 * Il bando cliccato apre il SlideOver (gestito dal padre via `onOpen`); il
 * componente non sa nulla del routing — sta a chi lo monta decidere se è
 * un Link, un button, o un drawer trigger.
 */

import {
  Building2,
  CalendarDays,
  Coins,
  ExternalLink,
  Flame,
} from "lucide-react";

import {
  formatCentesimiEur,
  formatScadenza,
  livelloLabel,
} from "@/lib/api/formatters";
import type { BandoConsolidatoRead } from "@/lib/api/types";

export type CardDensity = "compact" | "comfort" | "expanded";

interface Props {
  bando: BandoConsolidatoRead;
  density?: CardDensity;
  scoreComplessivo?: number | null;
  alertLevel?: string | null;
  noteConsulente?: string | null;
  scartatoMotivo?: string | null;
  trailing?: React.ReactNode;
  onOpenHref?: string;
}

export function PipelineCard({
  bando,
  density = "comfort",
  scoreComplessivo,
  alertLevel,
  noteConsulente,
  scartatoMotivo,
  trailing,
  onOpenHref,
}: Props) {
  const isCompact = density === "compact";
  const isExpanded = density === "expanded";

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    onOpenHref ? (
      <a
        href={onOpenHref}
        className="block rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 p-3 transition-all hover:border-[#D4A03C]/30 hover:bg-[#0A1628]/80"
      >
        {children}
      </a>
    ) : (
      <div className="rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 p-3">
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          {!isCompact && (
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              {bando.livello && (
                <span className="rounded-md bg-[#1B3A5C]/40 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8AACCC]">
                  {livelloLabel(bando.livello)}
                </span>
              )}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                  bando.stato === "aperto"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-slate-500/15 text-slate-300"
                }`}
              >
                {bando.stato}
              </span>
              {alertLevel && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-[#D4A03C]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#E8C06A]">
                  <Flame className="h-2.5 w-2.5" />
                  {alertLevel}
                </span>
              )}
            </div>
          )}
          <h3
            className={`font-semibold text-white leading-snug ${
              isCompact ? "text-xs" : "text-sm"
            }`}
          >
            {bando.titolo}
          </h3>
          <div
            className={`mt-1.5 flex flex-wrap items-center text-[#6B8AAD] ${
              isCompact
                ? "gap-x-2 gap-y-0.5 text-[10px]"
                : "gap-x-3 gap-y-1 text-[11px]"
            }`}
          >
            <span className="flex items-center gap-1">
              <Building2 className="h-3 w-3 text-[#4A6A8A]" />
              <span className="truncate">{bando.ente_emittente}</span>
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 text-[#4A6A8A]" />
              {formatScadenza(bando.scadenza)}
            </span>
            {!isCompact && (
              <span className="flex items-center gap-1">
                <Coins className="h-3 w-3 text-[#4A6A8A]" />
                {formatCentesimiEur(bando.importo_totale_centesimi)}
              </span>
            )}
          </div>
          {isExpanded && noteConsulente && (
            <p className="mt-2 line-clamp-2 rounded-md bg-[#1B3A5C]/20 px-2 py-1 text-[11px] italic text-[#A0BED8]">
              {noteConsulente}
            </p>
          )}
          {isExpanded && scartatoMotivo && (
            <p className="mt-1.5 line-clamp-2 rounded-md bg-rose-500/10 px-2 py-1 text-[11px] text-rose-300">
              Scarto: {scartatoMotivo}
            </p>
          )}
        </div>
        {scoreComplessivo !== undefined && scoreComplessivo !== null && (
          <ScorePill value={scoreComplessivo} compact={isCompact} />
        )}
      </div>

      {trailing && <div className="mt-2">{trailing}</div>}

      {!isCompact && bando.page_url_canonico && (
        <div className="mt-2 flex justify-end">
          <a
            href={bando.page_url_canonico}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[10px] font-medium text-[#6B8AAD] hover:text-[#D4A03C]"
          >
            Apri fonte
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      )}
    </Wrapper>
  );
}

function ScorePill({ value, compact }: { value: number; compact: boolean }) {
  const tone =
    value >= 80
      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
      : value >= 60
        ? "border-[#D4A03C]/40 bg-[#D4A03C]/10 text-[#E8C06A]"
        : "border-[#1B3A5C]/40 bg-[#1B3A5C]/15 text-[#A0BED8]";
  return (
    <div
      className={`flex flex-shrink-0 flex-col items-center rounded-lg border px-2 py-1 ${tone} ${
        compact ? "" : "px-2.5 py-1.5"
      }`}
    >
      <span className={`font-bold leading-none ${compact ? "text-sm" : "text-base"}`}>
        {value}
      </span>
      <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide opacity-80">
        Score
      </span>
    </div>
  );
}
