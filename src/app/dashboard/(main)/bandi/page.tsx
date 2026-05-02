/**
 * Pagina /dashboard/bandi — Strato 9 A4.2 + A4.3 wired al frontend.
 *
 * Server Component che chiama POST /match della FastAPI civika-scout per
 * il cliente attivo dell'utente (post ADR-025: cookie `active_cliente_id`
 * con fallback al primo cliente di `GET /clienti/me`). Mostra
 * titolo/ente/scadenza/importo/score cosine, + se rerank=true:
 * pertinenza/fattibilità/urgenza/valore_atteso + le 4 motivazioni Sonnet
 * 4.6 (una per dimensione, ADR-035).
 */

import { Sparkles, Globe, Clock, AlertCircle, Inbox } from "lucide-react";

import { ApiClientError, postMatch } from "@/lib/api/client";
import { resolveActiveCliente } from "@/lib/active-cliente";
import type { ClienteRead, MatchProposalRead } from "@/lib/api/types";

import { BandiSearchBar } from "./_search-bar";
import { BandoCard } from "./_bando-card";

const RERANK_DEFAULT = process.env.NEXT_PUBLIC_RERANK_DEFAULT !== "false";

interface MatchResult {
  ok: true;
  cliente: ClienteRead;
  proposals: MatchProposalRead[];
  reranked: boolean;
}

interface MatchError {
  ok: false;
  status: number | null;
  message: string;
  hint: string;
}

async function loadMatches(
  cliente: ClienteRead,
): Promise<MatchResult | MatchError> {
  try {
    const proposals = await postMatch({
      cliente_id: cliente.id,
      top_k: 10,
      rerank: RERANK_DEFAULT,
    });
    return { ok: true, cliente, proposals, reranked: RERANK_DEFAULT };
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
        hint: hintForStatus(error.status),
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

function hintForStatus(status: number): string {
  switch (status) {
    case 404:
      return "Il cliente non esiste lato API — disallineamento user_clienti vs clienti?";
    case 409:
      return "Il cliente non ha embedding_profilo: aggiungi `needs` da /dashboard/profile-edit e attendi il run di embed_pending_clienti";
    case 401:
    case 403:
      return "JWT mancante o non valido — fai login dalla pagina /dashboard/login";
    default:
      return "Verifica i log della FastAPI in apps/api";
  }
}

export default async function BandiPage() {
  const active = await resolveActiveCliente();

  if (!active.ok && active.reason === "api_error") {
    return (
      <PageShell title="Scouting Bandi" subtitle="">
        <ErrorState
          status={active.status}
          message={active.message}
          hint="Verifica che la FastAPI sia raggiungibile e che il JWT sia valido."
        />
      </PageShell>
    );
  }

  if (!active.ok) {
    return (
      <PageShell title="Scouting Bandi" subtitle="Nessun cliente associato">
        <NoClientiState />
      </PageShell>
    );
  }

  const result = await loadMatches(active.active);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">Scouting Bandi</h1>
            <span className="flex items-center gap-1.5 rounded-lg bg-[#D4A03C]/15 px-2.5 py-1 text-xs font-semibold text-[#D4A03C]">
              <Sparkles className="h-3.5 w-3.5" />
              {result.ok && result.reranked ? "Sonnet 4.6 ranking" : "Cosine BGE-M3"}
            </span>
          </div>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Top-{result.ok ? result.proposals.length : 10} bandi consolidati per{" "}
            <span className="text-[#A0BED8]">{active.active.nome}</span>
          </p>
        </div>
      </div>

      <BandiSearchBar />

      {result.ok ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#D4A03C]" />
              {result.proposals.length} match trovati
            </h2>
            <span className="text-xs text-[#4A6A8A] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {result.reranked
                ? "Rerank multi-dimensionale Sonnet 4.6"
                : "Solo cosine similarity (rerank disabilitato)"}
            </span>
          </div>

          {result.proposals.length === 0 ? (
            <EmptyState />
          ) : (
            result.proposals.map((proposal) => (
              <BandoCard key={proposal.bando.id} proposal={proposal} />
            ))
          )}
        </div>
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

function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[#6B8AAD]">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-8 text-center">
      <p className="text-sm text-[#6B8AAD]">
        Nessun bando consolidato disponibile per questo cliente.
      </p>
      <p className="mt-2 text-xs text-[#4A6A8A]">
        Verifica che ci siano bandi con embedding_combinato valorizzato (run
        embed_pending_bandi) e che lo stato sia `aperto`.
      </p>
    </div>
  );
}

function NoClientiState() {
  return (
    <div className="rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-8 text-center">
      <Inbox className="mx-auto h-10 w-10 text-[#4A6A8A]" />
      <h2 className="mt-3 text-base font-semibold text-white">
        Nessun cliente associato al tuo account
      </h2>
      <p className="mt-1 text-xs text-[#6B8AAD]">
        Per accedere allo scouting bandi devi essere assegnato come consulente o
        operatore di almeno un cliente CIVIKA.
      </p>
      <p className="mt-3 text-[11px] text-[#4A6A8A]">
        Contatta il super-admin per ricevere un mapping in `user_clienti` (vedi
        ADR-025).
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
            Match non disponibile{status ? ` (HTTP ${status})` : ""}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
          <p className="mt-3 text-xs text-[#6B8AAD]">{hint}</p>
        </div>
      </div>
    </div>
  );
}
