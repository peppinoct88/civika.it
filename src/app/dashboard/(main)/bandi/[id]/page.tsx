/**
 * Dettaglio bando — `/dashboard/bandi/{id}?cliente={clienteId}` (ADR-035).
 *
 * Pagina cliente-scoped: il cockpit linka qui dalle card kanban e dalle
 * sezioni inbox passando `?cliente=` (UUID del cliente attivo). Il
 * `cliente_id` è obbligatorio: il bando è globale ma vista, score
 * Sonnet e pipeline sono per coppia (cliente, bando).
 *
 * Server Component: una sola fetch a `GET /cockpit/bando/{cliente}/{id}`
 * popola header, score card, motivazioni, pipeline status e timeline
 * lifecycle events.
 */

import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Building2,
  CalendarDays,
  Coins,
  ExternalLink,
  FileText,
  Gauge,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  ApiClientError,
  formatCentesimiEur,
  formatScadenza,
  getCockpitBandoDetail,
  livelloLabel,
} from "@/lib/api/client";
import { FeedbackButtons } from "@/app/dashboard/(main)/bandi/_feedback-buttons";
import type {
  BandoDetailRead,
  BandoEventoRead,
} from "@/lib/api/types";

import { PipelineActions } from "./_pipeline-actions";

interface DetailResult {
  ok: true;
  detail: BandoDetailRead;
}

interface DetailError {
  ok: false;
  status: number | null;
  message: string;
}

async function loadDetail(
  clienteId: string,
  bandoId: string,
): Promise<DetailResult | DetailError> {
  try {
    const detail = await getCockpitBandoDetail(clienteId, bandoId);
    return { ok: true, detail };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const detail =
        typeof error.detail === "string"
          ? error.detail
          : JSON.stringify(error.detail);
      return { ok: false, status: error.status, message: detail };
    }
    return {
      ok: false,
      status: null,
      message: error instanceof Error ? error.message : "Errore sconosciuto",
    };
  }
}

export default async function BandoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cliente?: string }>;
}) {
  const { id: bandoId } = await params;
  const { cliente: clienteId } = await searchParams;

  if (!clienteId) {
    redirect("/dashboard");
  }

  const result = await loadDetail(clienteId, bandoId);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BackLink clienteId={clienteId} />

      {result.ok ? (
        <DetailContent detail={result.detail} clienteId={clienteId} />
      ) : (
        <ErrorBanner status={result.status} message={result.message} />
      )}
    </div>
  );
}

function BackLink({ clienteId }: { clienteId: string }) {
  return (
    <Link
      href={`/dashboard/clienti/${clienteId}`}
      className="inline-flex items-center gap-1 text-xs text-[#6B8AAD] hover:text-[#D4A03C]"
    >
      <ArrowLeft className="h-3 w-3" />
      Torna al workspace
    </Link>
  );
}

function DetailContent({
  detail,
  clienteId,
}: {
  detail: BandoDetailRead;
  clienteId: string;
}) {
  const { bando, cliente, match_scores, motivazioni, match_id } = detail;
  const pipeline = detail.pipeline ?? null;
  const eventi = detail.eventi ?? [];

  return (
    <article className="space-y-6">
      <Header bando={bando} clienteNome={cliente.nome} />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          {match_scores && (
            <ScoreCard scores={match_scores} motivazioni={motivazioni ?? null} />
          )}

          <MetadataCard bando={bando} />

          {eventi.length > 0 && <EventiTimeline eventi={eventi} />}

          {match_id && (
            <section className="rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-5">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#A0BED8]">
                Feedback rerank
              </h2>
              <p className="mb-3 text-xs text-[#6B8AAD]">
                Il tuo verdetto alimenta il loop di active learning Sonnet.
              </p>
              <FeedbackButtons matchId={match_id} />
            </section>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <PipelineActions
            clienteId={clienteId}
            bandoId={bando.id}
            current={pipeline}
          />
        </div>
      </div>
    </article>
  );
}

function Header({
  bando,
  clienteNome,
}: {
  bando: BandoDetailRead["bando"];
  clienteNome: string;
}) {
  return (
    <header className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-6">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4A03C]">
        Per {clienteNome}
      </p>
      <div className="mb-3 flex flex-wrap items-center gap-2">
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

      <h1 className="text-2xl font-semibold leading-snug text-white">
        {bando.titolo}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B8AAD]">
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

      {bando.page_url_canonico && (
        <div className="mt-4">
          <a
            href={bando.page_url_canonico}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1B3A5C]/40 px-3 py-1.5 text-xs font-medium text-[#A0BED8] transition-colors hover:border-[#D4A03C]/40 hover:text-[#E8C06A]"
          >
            Apri fonte
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </header>
  );
}

function ScoreCard({
  scores,
  motivazioni,
}: {
  scores: NonNullable<BandoDetailRead["match_scores"]>;
  motivazioni: BandoDetailRead["motivazioni"] | null;
}) {
  const overall = Math.round(scores.score_complessivo * 100);

  return (
    <section className="overflow-hidden rounded-2xl border border-[#D4A03C]/20 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4A03C]">
            <Sparkles className="h-3 w-3" />
            Score Sonnet
          </h2>
          <p className="mt-1 text-xs text-[#6B8AAD]">
            Rerank LLM su 4 dimensioni — ADR-035.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-[#D4A03C]/30 bg-gradient-to-br from-[#D4A03C]/15 to-[#D4A03C]/5 px-4 py-3">
          <span className="text-3xl font-bold leading-none text-[#E8C06A]">
            {overall}
          </span>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-[#D4A03C]">
            / 100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <DimensionPill
          icon={<Target className="h-3.5 w-3.5" />}
          label="Pertinenza"
          value={scores.pertinenza}
        />
        <DimensionPill
          icon={<Gauge className="h-3.5 w-3.5" />}
          label="Fattibilità"
          value={scores.fattibilita}
        />
        <DimensionPill
          icon={<Timer className="h-3.5 w-3.5" />}
          label="Urgenza"
          value={scores.urgenza}
        />
        <DimensionPill
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          label="Valore atteso"
          value={scores.valore_atteso}
        />
      </div>

      {motivazioni && (
        <div className="mt-4 rounded-xl border border-[#D4A03C]/15 bg-[#D4A03C]/5 p-4">
          <h3 className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#D4A03C]">
            <Sparkles className="h-3 w-3" />
            Perché questo score?
          </h3>
          <dl className="grid gap-3 text-xs leading-relaxed text-[#A0BED8] sm:grid-cols-2">
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
    </section>
  );
}

function DimensionPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  const percent = Math.round(value * 100);
  return (
    <div className="rounded-lg border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 py-2.5">
      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-[#6B8AAD]">
        <span className="text-[#4A6A8A]">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-base font-semibold text-white">{percent}</span>
        <span className="text-[9px] text-[#4A6A8A]">/100</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1B3A5C]/30">
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

function MetadataCard({ bando }: { bando: BandoDetailRead["bando"] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-5">
      <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A0BED8]">
        <FileText className="h-3 w-3" />
        Dettagli bando
      </h2>
      <dl className="grid gap-3 text-xs sm:grid-cols-2">
        <Field label="Ente emittente" value={bando.ente_emittente} />
        <Field label="Scadenza" value={formatScadenza(bando.scadenza)} />
        <Field
          label="Importo totale"
          value={formatCentesimiEur(bando.importo_totale_centesimi)}
        />
        <Field
          label="Stato"
          value={bando.stato}
        />
        {bando.livello && (
          <Field label="Livello" value={livelloLabel(bando.livello)} />
        )}
        {bando.data_graduatoria_attesa_il && (
          <Field
            label="Graduatoria attesa"
            value={formatScadenza(bando.data_graduatoria_attesa_il)}
          />
        )}
      </dl>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#D4A03C]/80">
        {label}
      </dt>
      <dd className="mt-0.5 text-[#E2EAF5]">{value ?? "—"}</dd>
    </div>
  );
}

const TIPO_EVENTO_LABEL: Record<string, string> = {
  proroga_scadenza: "Proroga scadenza",
  faq_aggiunta: "FAQ aggiunta",
  allegato_aggiornato: "Allegato aggiornato",
  modulistica_pubblicata: "Modulistica pubblicata",
  chiarimento_minore: "Chiarimento minore",
  revoca_o_ritiro: "Revoca o ritiro",
  graduatoria_pubblicata: "Graduatoria pubblicata",
};

const SEVERITA_TONE: Record<string, string> = {
  low: "bg-slate-500/15 text-slate-300",
  medium: "bg-sky-500/15 text-sky-300",
  high: "bg-[#D4A03C]/15 text-[#E8C06A]",
  critical: "bg-rose-500/15 text-rose-300",
};

function EventiTimeline({ eventi }: { eventi: BandoEventoRead[] }) {
  const sorted = [...eventi].sort(
    (a, b) =>
      new Date(b.rilevato_at).getTime() - new Date(a.rilevato_at).getTime(),
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-5">
      <h2 className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A0BED8]">
        <Bell className="h-3 w-3" />
        Lifecycle events ({eventi.length})
      </h2>
      <ol className="space-y-3">
        {sorted.map((evento) => (
          <li
            key={evento.id}
            className="flex gap-3 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 p-3"
          >
            <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#D4A03C]" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  {TIPO_EVENTO_LABEL[evento.tipo_evento] ?? evento.tipo_evento}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                    SEVERITA_TONE[evento.severita] ?? "bg-slate-500/15 text-slate-300"
                  }`}
                >
                  {evento.severita}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#6B8AAD]">
                {new Date(evento.rilevato_at).toLocaleString("it-IT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ErrorBanner({
  status,
  message,
}: {
  status: number | null;
  message: string;
}) {
  const isForbidden = status === 403;
  const isNotFound = status === 404;
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-400">
            {isForbidden
              ? "Non hai accesso a questo cliente"
              : isNotFound
                ? "Bando o cliente non trovato"
                : `Dettaglio non disponibile${status ? ` (HTTP ${status})` : ""}`}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
        </div>
      </div>
    </div>
  );
}
