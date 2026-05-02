/**
 * Card per un singolo MatchProposalRead.
 *
 * Server Component: rendering puro a partire dai dati passati dalla pagina
 * /dashboard/bandi. Mostra metadati bando + score cosine; se è presente il
 * blocco rerank (Sonnet 4.6), espone anche le 4 dimensioni + score complessivo
 * + le 4 motivazioni (una per dimensione, ADR-035).
 */

import {
  Building2,
  CalendarDays,
  Coins,
  ExternalLink,
  Gauge,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";

import {
  formatCentesimiEur,
  formatScadenza,
  livelloLabel,
} from "@/lib/api/client";
import type { MatchProposalRead, MatchScoresRead } from "@/lib/api/types";

import { FeedbackButtons } from "./_feedback-buttons";

interface Props {
  proposal: MatchProposalRead;
}

export function BandoCard({ proposal }: Props) {
  const { bando, score, rerank, motivazioni, match_id } = proposal;
  const cosinePercent = Math.round(score * 100);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-6 transition-all hover:border-[#D4A03C]/30">
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#D4A03C]/5 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {bando.livello && (
              <span className="rounded-md bg-[#1B3A5C]/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8AACCC]">
                {livelloLabel(bando.livello)}
              </span>
            )}
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                bando.stato === "aperto"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-slate-500/15 text-slate-300"
              }`}
            >
              {bando.stato}
            </span>
          </div>

          <h3 className="text-base font-semibold text-white leading-snug">
            {bando.titolo}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B8AAD]">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#4A6A8A]" />
              {bando.ente_emittente}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#4A6A8A]" />
              {formatScadenza(bando.scadenza)}
            </span>
            <span className="flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5 text-[#4A6A8A]" />
              {formatCentesimiEur(bando.importo_totale_centesimi)}
            </span>
          </div>
        </div>

        <ScoreBadge cosinePercent={cosinePercent} rerank={rerank} />
      </div>

      {rerank && (
        <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <DimensionPill
            icon={<Target className="h-3.5 w-3.5" />}
            label="Pertinenza"
            value={rerank.pertinenza}
            motivazione={motivazioni?.pertinenza}
          />
          <DimensionPill
            icon={<Gauge className="h-3.5 w-3.5" />}
            label="Fattibilità"
            value={rerank.fattibilita}
            motivazione={motivazioni?.fattibilita}
          />
          <DimensionPill
            icon={<Timer className="h-3.5 w-3.5" />}
            label="Urgenza"
            value={rerank.urgenza}
            motivazione={motivazioni?.urgenza}
          />
          <DimensionPill
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            label="Valore atteso"
            value={rerank.valore_atteso}
            motivazione={motivazioni?.valore_atteso}
          />
        </div>
      )}

      {motivazioni && (
        <div className="relative mt-4 rounded-xl border border-[#D4A03C]/15 bg-[#D4A03C]/5 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#D4A03C]">
            <Sparkles className="h-3 w-3" />
            Perché questo score? — Sonnet 4.6
          </div>
          <dl className="grid gap-1.5 text-xs leading-relaxed text-[#A0BED8] sm:grid-cols-2">
            <MotivazioneRow label="Pertinenza" text={motivazioni.pertinenza} />
            <MotivazioneRow label="Fattibilità" text={motivazioni.fattibilita} />
            <MotivazioneRow label="Urgenza" text={motivazioni.urgenza} />
            <MotivazioneRow
              label="Valore atteso"
              text={motivazioni.valore_atteso}
            />
          </dl>
        </div>
      )}

      {bando.page_url_canonico && (
        <div className="relative mt-4 flex items-center justify-end">
          <a
            href={bando.page_url_canonico}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8AACCC] hover:text-[#D4A03C] transition-colors"
          >
            Apri fonte
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {match_id && (
        <div className="relative">
          <FeedbackButtons matchId={match_id} />
        </div>
      )}
    </article>
  );
}

function ScoreBadge({
  cosinePercent,
  rerank,
}: {
  cosinePercent: number;
  rerank: MatchScoresRead | null | undefined;
}) {
  const overallPercent = rerank
    ? Math.round(rerank.score_complessivo * 100)
    : null;

  return (
    <div className="flex flex-shrink-0 flex-col items-end gap-1">
      {overallPercent !== null ? (
        <div className="flex flex-col items-center rounded-xl border border-[#D4A03C]/30 bg-gradient-to-br from-[#D4A03C]/15 to-[#D4A03C]/5 px-3 py-2">
          <span className="text-lg font-bold leading-none text-[#E8C06A]">
            {overallPercent}
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#D4A03C]">
            Score Sonnet
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-xl border border-[#1B3A5C]/40 bg-[#1B3A5C]/15 px-3 py-2">
          <span className="text-lg font-bold leading-none text-[#A0BED8]">
            {cosinePercent}
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#6B8AAD]">
            Cosine
          </span>
        </div>
      )}
      {overallPercent !== null && (
        <span className="text-[10px] text-[#4A6A8A]">
          cosine {cosinePercent}
        </span>
      )}
    </div>
  );
}

function DimensionPill({
  icon,
  label,
  value,
  motivazione,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  motivazione?: string;
}) {
  const percent = Math.round(value * 100);
  return (
    <div
      className="rounded-lg border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-2.5 py-2"
      title={motivazione}
    >
      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-[#6B8AAD]">
        <span className="text-[#4A6A8A]">{icon}</span>
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-sm font-semibold text-white">{percent}</span>
        <span className="text-[9px] text-[#4A6A8A]">/100</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#1B3A5C]/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D4A03C] to-[#E8C06A]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function MotivazioneRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#D4A03C]/80">
        {label}
      </dt>
      <dd className="mt-0.5">{text}</dd>
    </div>
  );
}
