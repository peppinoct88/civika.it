/**
 * Pagina /dashboard/coverage-alerts — Strato 10 ZERO MISS dashboard (ADR-011).
 *
 * Server Component che lista gli audit con esito `shortfall` o
 * `fonte_silente` via GET /coverage-alerts. La vista discrimina tre
 * meccanismi ADR-011 con precedenza:
 *
 *   1. Mecc. 4 (segnalazione manuale): `tipo_segnalazione=manual_report`.
 *      Soggetto = bando segnalato dal consulente. Card emerald/teal,
 *      titolo + ente + URL fonte estratti dalla `note`.
 *
 *   2. Mecc. 1 (cross-source gap puntuale): `bando_consolidato_id` valorizzato
 *      + `bando_titolo` via JOIN. Soggetto = bando. Card indigo, layout
 *      centrato sul bando con la fonte come contesto secondario.
 *
 *   3. Mecc. 2 (shortfall di periodo): default. Soggetto = fonte. Card
 *      amber/purple, finestra temporale, expected vs actual, delta%.
 *
 * Cross-cliente: questa vista è operativa per CIVIKA, non per il cliente
 * finale (post-RBAC super-admin si aggiungerà un check ruolo).
 */

import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  Crosshair,
  FileSearch,
  PlusCircle,
  VolumeX,
} from "lucide-react";

import {
  ApiClientError,
  coverageEsitoLabel,
  getCoverageAlerts,
  livelloLabel,
} from "@/lib/api/client";
import type { CoverageAuditAlertRead } from "@/lib/api/types";

const DEFAULT_LOOKBACK_DAYS = 30;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Preset di lookback. `30` è il default (`DEFAULT_LOOKBACK_DAYS`); il `since`
 * iniziale al primo load è calcolato a partire da qui.
 *
 * Tolleranza ±1 giorno nel detection del preset attivo: il calcolo `since`
 * usa UTC ma il `<input type=date>` è naive (locale del browser), quindi
 * tra mezzanotte locale e mezzanotte UTC il valore può scivolare di 1 giorno.
 */
const PRESET_LOOKBACK_DAYS = [7, 30, 90] as const;
type PresetDays = (typeof PRESET_LOOKBACK_DAYS)[number];
const PRESET_TOLERANCE_DAYS = 1;

function isoFromDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function detectActivePreset(since: string | null): PresetDays | "custom" {
  if (!since) return DEFAULT_LOOKBACK_DAYS as PresetDays;
  const sinceDate = new Date(`${since}T00:00:00Z`);
  if (Number.isNaN(sinceDate.getTime())) return "custom";
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (today.getTime() - sinceDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  for (const preset of PRESET_LOOKBACK_DAYS) {
    if (Math.abs(diffDays - preset) <= PRESET_TOLERANCE_DAYS) {
      return preset;
    }
  }
  return "custom";
}

type TipoFilter = "all" | "manual" | "cross" | "periodo";
const TIPO_VALUES: ReadonlySet<TipoFilter> = new Set([
  "all",
  "manual",
  "cross",
  "periodo",
]);

function parseTipo(raw: string | string[] | undefined): TipoFilter {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value && TIPO_VALUES.has(value as TipoFilter)) {
    return value as TipoFilter;
  }
  return "all";
}

interface LoadResult {
  ok: true;
  alerts: CoverageAuditAlertRead[];
}

interface LoadError {
  ok: false;
  status: number | null;
  message: string;
  hint: string;
}

function parseSince(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !ISO_DATE_RE.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return value;
}

function defaultSinceIso(): string {
  const today = new Date();
  today.setUTCDate(today.getUTCDate() - DEFAULT_LOOKBACK_DAYS);
  return today.toISOString().slice(0, 10);
}

async function loadAlerts(
  since: string | null,
): Promise<LoadResult | LoadError> {
  try {
    const alerts = await getCoverageAlerts(
      since ? { since } : undefined,
    );
    return { ok: true, alerts };
  } catch (error) {
    if (error instanceof ApiClientError) {
      const detail =
        typeof error.detail === "string"
          ? error.detail
          : JSON.stringify(error.detail);
      return {
        ok: false,
        status: error.status,
        message: detail,
        hint:
          error.status === 401 || error.status === 403
            ? "JWT mancante o non valido — fai login dalla pagina /dashboard/login"
            : "Verifica i log della FastAPI in apps/api",
      };
    }
    return {
      ok: false,
      status: null,
      message: error instanceof Error ? error.message : "Errore sconosciuto",
      hint: "Verifica che la FastAPI sia in esecuzione: cd apps/api && uv run uvicorn civika_api.main:app --reload",
    };
  }
}

function isManualReport(alert: CoverageAuditAlertRead): boolean {
  return alert.tipo_segnalazione === "manual_report";
}

function isCrossSourceGap(alert: CoverageAuditAlertRead): boolean {
  return !isManualReport(alert) && alert.bando_consolidato_id != null;
}

interface ManualReportFields {
  titolo: string | null;
  url: string | null;
  ente: string | null;
  scadenza: string | null;
  descrizione: string | null;
}

/**
 * Estrae i campi serializzati nella `note` da `_build_manual_report_note`
 * (repository Python). Il formato è ottimistico: se cambia di stack
 * fallback graceful → mostra solo il prefisso. Da riallineare quando avremo
 * uno schema dedicato in DB (post-MVP).
 */
function parseManualReportNote(
  note: string | null,
): ManualReportFields {
  const empty: ManualReportFields = {
    titolo: null,
    url: null,
    ente: null,
    scadenza: null,
    descrizione: null,
  };
  if (!note) return empty;
  const stripped = note.replace(/^\[manual_report\]\s*/, "");
  const result = { ...empty };
  // Pattern: key='value' | key="value" | key=YYYY-MM-DD | key=<uuid>
  const pairRe = /(\w+)=(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|([^\s|]+))/g;
  let match: RegExpExecArray | null;
  while ((match = pairRe.exec(stripped)) !== null) {
    const [, key, single, double, bare] = match;
    const value = single ?? double ?? bare ?? "";
    switch (key) {
      case "titolo":
        result.titolo = value;
        break;
      case "url":
        result.url = value;
        break;
      case "ente":
        result.ente = value;
        break;
      case "scadenza":
        result.scadenza = value;
        break;
      case "descrizione":
        result.descrizione = value;
        break;
    }
  }
  return result;
}

interface PageProps {
  searchParams: Promise<{
    since?: string | string[];
    tipo?: string | string[];
  }>;
}

function matchesTipo(alert: CoverageAuditAlertRead, tipo: TipoFilter): boolean {
  switch (tipo) {
    case "manual":
      return isManualReport(alert);
    case "cross":
      return isCrossSourceGap(alert);
    case "periodo":
      return !isManualReport(alert) && !isCrossSourceGap(alert);
    default:
      return true;
  }
}

export default async function CoverageAlertsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const since = parseSince(params.since);
  const tipo = parseTipo(params.tipo);
  const effectiveSince = since ?? defaultSinceIso();
  const result = await loadAlerts(since);

  const counts = result.ok
    ? {
        total: result.alerts.length,
        manual: result.alerts.filter(isManualReport).length,
        cross: result.alerts.filter(isCrossSourceGap).length,
        periodo: result.alerts.filter(
          (a) => !isManualReport(a) && !isCrossSourceGap(a),
        ).length,
      }
    : null;

  const visibleAlerts = result.ok
    ? result.alerts.filter((a) => matchesTipo(a, tipo))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">
              Coverage alerts
            </h1>
            <span className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5" />
              ZERO MISS
            </span>
          </div>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Sensori ADR-011: segnalazioni manuali (Mecc. 4), gap cross-source
            puntuali per singolo bando (Mecc. 1), shortfall e silenzi su
            finestre di periodo (Mecc. 2). Ogni alert richiede revisione umana.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/coverage-audit/segnala"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Segnala bando
            </Link>
            <SinceFilter
              value={since}
              effective={effectiveSince}
              tipo={tipo}
            />
          </div>
          {counts && counts.total > 0 && (
            <TipoFilter
              active={tipo}
              counts={counts}
              since={since}
            />
          )}
        </div>
      </div>

      {result.ok ? (
        visibleAlerts.length > 0 ? (
          <div className="space-y-3">
            {visibleAlerts.map((alert) => {
              if (isManualReport(alert)) {
                return <ManualReportCard key={alert.id} alert={alert} />;
              }
              if (isCrossSourceGap(alert)) {
                return <CrossSourceGapCard key={alert.id} alert={alert} />;
              }
              return <PeriodoAlertCard key={alert.id} alert={alert} />;
            })}
          </div>
        ) : (
          <EmptyState
            tipo={tipo}
            hasOtherAlerts={(counts?.total ?? 0) > 0}
          />
        )
      ) : (
        <ErrorState
          status={result.status}
          message={result.message}
          hint={result.hint}
        />
      )}
    </div>
  );
}

function ManualReportCard({ alert }: { alert: CoverageAuditAlertRead }) {
  const tone = {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/[0.04]",
    accent: "bg-emerald-500/15 text-emerald-300",
    icon: "text-emerald-400",
  };
  const fields = parseManualReportNote(alert.note);
  const titolo =
    fields.titolo ?? "Segnalazione senza titolo (note non parsabile)";
  const segnalatoIl = formatDate(alert.periodo_fine);
  const scadenza = fields.scadenza ? formatDate(fields.scadenza) : null;

  return (
    <div
      className={`rounded-2xl border ${tone.border} ${tone.bg} p-5 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${tone.accent}`}
        >
          <FileSearch className={`h-5 w-5 ${tone.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tone.accent}`}
            >
              Segnalazione manuale
            </span>
            <span className="rounded-md border border-[#1B3A5C]/40 bg-[#0A1628] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8AACCC]">
              ADR-011 Mecc. 4
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-white">{titolo}</h3>
          <p className="mt-1 text-xs text-[#6B8AAD]">
            Segnalata il {segnalatoIl}
            {fields.ente && (
              <>
                {" · "}
                <span className="text-[#A0BED8]">{fields.ente}</span>
              </>
            )}
            {scadenza && (
              <>
                {" · scadenza dichiarata "}
                <span className="text-[#A0BED8]">{scadenza}</span>
              </>
            )}
          </p>
          {fields.url && (
            <a
              href={fields.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block max-w-full truncate text-xs text-emerald-300 underline-offset-2 hover:underline"
            >
              {fields.url}
            </a>
          )}
          {fields.descrizione && (
            <p className="mt-3 rounded-lg bg-[#0A1628]/60 px-3 py-2 text-xs text-[#A0BED8]">
              {fields.descrizione}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PeriodoAlertCard({ alert }: { alert: CoverageAuditAlertRead }) {
  const isSilent = alert.esito === "fonte_silente";
  const Icon = isSilent ? VolumeX : AlertTriangle;
  const tone = isSilent
    ? {
        border: "border-purple-500/30",
        bg: "bg-purple-500/[0.04]",
        accent: "bg-purple-500/15 text-purple-300",
        icon: "text-purple-400",
        delta: "text-purple-300",
      }
    : {
        border: "border-amber-500/30",
        bg: "bg-amber-500/[0.04]",
        accent: "bg-amber-500/15 text-amber-300",
        icon: "text-amber-400",
        delta: "text-amber-300",
      };

  const periodo = `${formatDate(alert.periodo_inizio)} → ${formatDate(alert.periodo_fine)}`;
  const delta = formatDelta(alert.delta_pct);

  return (
    <div
      className={`rounded-2xl border ${tone.border} ${tone.bg} p-5 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${tone.accent}`}
        >
          <Icon className={`h-5 w-5 ${tone.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-[#1B3A5C]/40 bg-[#0A1628] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8AACCC]">
              Periodo
            </span>
            <h3 className="text-sm font-semibold text-white truncate">
              {alert.fonte_nome ?? "—"}
            </h3>
            {alert.fonte_livello && (
              <span className="rounded-md border border-[#1B3A5C]/40 bg-[#0A1628] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8AACCC]">
                {livelloLabel(alert.fonte_livello)}
              </span>
            )}
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tone.accent}`}
            >
              {coverageEsitoLabel(alert.esito)}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#6B8AAD]">Finestra {periodo}</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Metric label="Attesi" value={String(alert.expected_count)} />
            <Metric label="Acquisiti" value={String(alert.actual_count)} />
            <Metric label="Delta" value={delta} valueClass={tone.delta} />
          </div>
          {alert.note && (
            <p className="mt-3 rounded-lg bg-[#0A1628]/60 px-3 py-2 text-xs text-[#A0BED8]">
              {alert.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CrossSourceGapCard({ alert }: { alert: CoverageAuditAlertRead }) {
  const tone = {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/[0.04]",
    accent: "bg-indigo-500/15 text-indigo-300",
    icon: "text-indigo-400",
    delta: "text-indigo-300",
  };

  const titoloBando = alert.bando_titolo ?? "Bando senza titolo (record orfano)";
  const peerAttesi = Math.max(alert.expected_count - alert.actual_count, 0);
  const delta = formatDelta(alert.delta_pct);
  const periodo = formatDate(alert.periodo_fine);

  return (
    <div
      className={`rounded-2xl border ${tone.border} ${tone.bg} p-5 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${tone.accent}`}
        >
          <Crosshair className={`h-5 w-5 ${tone.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tone.accent}`}
            >
              Cross-source gap
            </span>
            {alert.fonte_livello && (
              <span className="rounded-md border border-[#1B3A5C]/40 bg-[#0A1628] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8AACCC]">
                {livelloLabel(alert.fonte_livello)}
              </span>
            )}
          </div>
          <h3 className="mt-2 text-sm font-semibold text-white">
            {titoloBando}
          </h3>
          <p className="mt-1 text-xs text-[#6B8AAD]">
            Intercettato solo da{" "}
            <span className="font-medium text-[#A0BED8]">
              {alert.fonte_nome ?? "fonte ignota"}
            </span>
            {" · "}rilevato {periodo}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Metric label="Fonti acquisite" value={String(alert.actual_count)} />
            <Metric
              label="Peer attese"
              value={`+${peerAttesi}`}
              valueClass={tone.delta}
            />
            <Metric label="Delta" value={delta} valueClass={tone.delta} />
          </div>
          {alert.note && (
            <p className="mt-3 rounded-lg bg-[#0A1628]/60 px-3 py-2 text-xs text-[#A0BED8]">
              {alert.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SinceFilter({
  value,
  effective,
  tipo,
}: {
  value: string | null;
  effective: string;
  tipo: TipoFilter;
}) {
  const activePreset = detectActivePreset(value);
  const buildPresetHref = (days: PresetDays): string => {
    const params = new URLSearchParams();
    params.set("since", isoFromDaysAgo(days));
    if (tipo !== "all") params.set("tipo", tipo);
    return `?${params.toString()}`;
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/40 p-1">
        {PRESET_LOOKBACK_DAYS.map((days) => {
          const isActive = activePreset === days;
          return (
            <Link
              key={days}
              href={buildPresetHref(days)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                isActive
                  ? "bg-[#1B3A5C]/60 text-white ring-1 ring-[#A0BED8]/30"
                  : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
              }`}
              aria-pressed={isActive}
            >
              {days}gg
            </Link>
          );
        })}
      </div>
      <form
        method="get"
        className={`flex items-center gap-2 rounded-xl border bg-[#0A1628]/40 px-3 py-2 transition ${
          activePreset === "custom"
            ? "border-[#A0BED8]/30 ring-1 ring-[#A0BED8]/20"
            : "border-[#1B3A5C]/30"
        }`}
      >
        <CalendarDays className="h-4 w-4 text-[#6B8AAD]" />
        <label
          htmlFor="since"
          className="text-[10px] font-semibold uppercase tracking-wider text-[#4A6A8A]"
        >
          Da
        </label>
        <input
          id="since"
          name="since"
          type="date"
          defaultValue={effective}
          max={new Date().toISOString().slice(0, 10)}
          className="bg-transparent text-xs font-medium text-[#A0BED8] outline-none [color-scheme:dark]"
        />
        {/* Hidden field per preservare il filtro tipo quando l'utente cambia data. */}
        {tipo !== "all" && (
          <input type="hidden" name="tipo" value={tipo} />
        )}
        <button
          type="submit"
          className="rounded-md bg-[#1B3A5C]/40 px-2.5 py-1 text-[11px] font-semibold text-[#A0BED8] transition hover:bg-[#1B3A5C]/60"
        >
          Applica
        </button>
        {value && activePreset !== DEFAULT_LOOKBACK_DAYS && (
          <a
            href={tipo !== "all" ? `?tipo=${tipo}` : "?"}
            className="rounded-md px-1.5 py-1 text-[11px] font-medium text-[#6B8AAD] transition hover:text-[#A0BED8]"
            title={`Ripristina ultimi ${DEFAULT_LOOKBACK_DAYS} giorni`}
          >
            Reset
          </a>
        )}
      </form>
    </div>
  );
}

/**
 * Segmented control: filtra per tipo di alert preservando `since` nel link.
 * Server-side rendering puro (link <Link>), nessun JS lato client.
 *
 * Tonalità accese solo quando il segmento è attivo: stato passivo neutro per
 * non competere con le card. La pill "Tutti" usa neutro slate sempre.
 */
function TipoFilter({
  active,
  counts,
  since,
}: {
  active: TipoFilter;
  counts: { total: number; manual: number; cross: number; periodo: number };
  since: string | null;
}) {
  const buildHref = (value: TipoFilter): string => {
    const params = new URLSearchParams();
    if (since) params.set("since", since);
    if (value !== "all") params.set("tipo", value);
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };
  const items: ReadonlyArray<{
    value: TipoFilter;
    label: string;
    count: number;
    activeStyle: string;
  }> = [
    {
      value: "all",
      label: "Tutti",
      count: counts.total,
      activeStyle: "bg-[#1B3A5C]/60 text-white ring-1 ring-[#A0BED8]/30",
    },
    {
      value: "manual",
      label: "Manuali",
      count: counts.manual,
      activeStyle: "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40",
    },
    {
      value: "cross",
      label: "Cross-source",
      count: counts.cross,
      activeStyle: "bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400/40",
    },
    {
      value: "periodo",
      label: "Periodo",
      count: counts.periodo,
      activeStyle: "bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40",
    },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/40 p-1">
      {items.map((item) => {
        const isActive = active === item.value;
        const baseStyle =
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition";
        const idleStyle = "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]";
        return (
          <Link
            key={item.value}
            href={buildHref(item.value)}
            className={`${baseStyle} ${isActive ? item.activeStyle : idleStyle}`}
            aria-pressed={isActive}
          >
            {item.label}
            <span className="font-mono">{item.count}</span>
          </Link>
        );
      })}
    </div>
  );
}

function Metric({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-lg border border-[#1B3A5C]/20 bg-[#0A1628]/40 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4A6A8A]">
        {label}
      </p>
      <p className={`mt-0.5 text-base font-semibold ${valueClass ?? "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  tipo,
  hasOtherAlerts,
}: {
  tipo: TipoFilter;
  hasOtherAlerts: boolean;
}) {
  if (tipo !== "all" && hasOtherAlerts) {
    const label =
      tipo === "manual"
        ? "segnalazioni manuali"
        : tipo === "cross"
          ? "gap cross-source"
          : "alert di periodo";
    return (
      <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-10 text-center backdrop-blur-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B3A5C]/40">
          <AlertCircle className="h-6 w-6 text-[#A0BED8]" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-white">
          Nessun risultato per &laquo;{label}&raquo;
        </h3>
        <p className="mt-1 text-xs text-[#6B8AAD]">
          Cambia il filtro o torna a Tutti per vedere gli altri alert nella
          finestra selezionata.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-10 text-center backdrop-blur-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
        <AlertCircle className="h-6 w-6 text-emerald-400" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">
        Nessun alert nelle ultime finestre
      </h3>
      <p className="mt-1 text-xs text-[#6B8AAD]">
        Tutte le fonti monitorate sono entro i parametri attesi (ADR-011).
      </p>
    </div>
  );
}

function ErrorState({
  status,
  message,
  hint,
}: {
  status: number | null;
  message: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-400">
            Coverage alerts non disponibili{status ? ` (HTTP ${status})` : ""}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
          <p className="mt-3 text-xs text-[#6B8AAD]">{hint}</p>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function formatDelta(delta: string): string {
  const num = Number(delta);
  if (Number.isNaN(num)) return delta;
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
}
