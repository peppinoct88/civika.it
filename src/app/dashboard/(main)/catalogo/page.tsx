/**
 * Pagina /dashboard/catalogo — catalogo globale bandi (super_admin).
 *
 * Cross-cliente: mostra l'intero corpus consolidato, filtri per stato/livello,
 * ricerca testuale su titolo+ente. Ogni riga linka al dettaglio bando
 * cliente-scoped tramite il dropdown "Match per cliente X".
 *
 * Gating: lato Server Component verifichiamo `super_admin`. Lato API
 * `GET /bandi` ha lo stesso check (require_super_admin) — defense in depth.
 */

import {
  AlertCircle,
  Building2,
  CalendarDays,
  Coins,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

import { isSuperAdmin } from "@/lib/auth/session";
import {
  ApiClientError,
  formatCentesimiEur,
  formatScadenza,
  getBandiCatalogo,
  getClientiMe,
  livelloLabel,
} from "@/lib/api/client";
import type {
  BandiListItem,
  BandiListPage,
  BandoStato,
  ClienteRead,
  FonteLivello,
} from "@/lib/api/types";

import { ClientePicker } from "./_cliente-picker";

interface LoadOk {
  ok: true;
  page: BandiListPage;
  clienti: ClienteRead[];
}
interface LoadErr {
  ok: false;
  status: number | null;
  message: string;
}

const PAGE_SIZE = 25;

async function loadCatalogo(params: {
  q?: string;
  stato?: BandoStato;
  livello?: FonteLivello;
  page: number;
}): Promise<LoadOk | LoadErr> {
  try {
    const [page, clienti] = await Promise.all([
      getBandiCatalogo({
        q: params.q,
        stato: params.stato,
        livello: params.livello,
        page: params.page,
        pageSize: PAGE_SIZE,
      }),
      getClientiMe(),
    ]);
    return { ok: true, page, clienti };
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

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    stato?: BandoStato;
    livello?: FonteLivello;
    page?: string;
  }>;
}) {
  if (!(await isSuperAdmin())) {
    return <ForbiddenBanner />;
  }

  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const result = await loadCatalogo({
    q: sp.q,
    stato: sp.stato,
    livello: sp.livello,
    page,
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Catalogo bandi</h1>
        <p className="mt-1 text-xs text-[#6B8AAD]">
          Vista cross-cliente del corpus CIVIKA Scout. Filtra, esplora e apri il
          dettaglio scegliendo un cliente con cui fare match.
        </p>
      </header>

      <FiltersBar
        q={sp.q ?? ""}
        stato={sp.stato}
        livello={sp.livello}
      />

      {result.ok ? (
        <CatalogoContent
          page={result.page}
          clienti={result.clienti}
          currentPage={page}
          q={sp.q}
          stato={sp.stato}
          livello={sp.livello}
        />
      ) : (
        <ErrorBanner status={result.status} message={result.message} />
      )}
    </div>
  );
}

function FiltersBar({
  q,
  stato,
  livello,
}: {
  q: string;
  stato?: BandoStato;
  livello?: FonteLivello;
}) {
  return (
    <form
      method="GET"
      className="grid gap-3 rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33] p-4 sm:grid-cols-[1fr_180px_180px_auto]"
    >
      <label className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B8AAD]" />
        <input
          name="q"
          defaultValue={q}
          placeholder="Cerca titolo o ente emittente"
          className="w-full rounded-lg border border-[#1B3A5C]/40 bg-[#0A1628] px-9 py-2 text-sm text-white placeholder:text-[#4A6A8A] focus:border-[#D4A03C]/50 focus:outline-none"
        />
      </label>
      <select
        name="stato"
        defaultValue={stato ?? ""}
        className="rounded-lg border border-[#1B3A5C]/40 bg-[#0A1628] px-3 py-2 text-sm text-white focus:border-[#D4A03C]/50 focus:outline-none"
      >
        <option value="">Tutti gli stati</option>
        <option value="aperto">Aperto</option>
        <option value="in_proroga">In proroga</option>
        <option value="chiuso">Chiuso</option>
        <option value="missed_opportunity">Missed opportunity</option>
        <option value="ritirato">Ritirato</option>
      </select>
      <select
        name="livello"
        defaultValue={livello ?? ""}
        className="rounded-lg border border-[#1B3A5C]/40 bg-[#0A1628] px-3 py-2 text-sm text-white focus:border-[#D4A03C]/50 focus:outline-none"
      >
        <option value="">Tutti i livelli</option>
        <option value="regionale">Regionale</option>
        <option value="nazionale">Nazionale</option>
        <option value="europeo">Europeo</option>
      </select>
      <button
        type="submit"
        className="rounded-lg bg-[#D4A03C] px-4 py-2 text-sm font-semibold text-[#0A1628] transition-colors hover:bg-[#E8C06A]"
      >
        Applica
      </button>
    </form>
  );
}

function CatalogoContent({
  page,
  clienti,
  currentPage,
  q,
  stato,
  livello,
}: {
  page: BandiListPage;
  clienti: ClienteRead[];
  currentPage: number;
  q?: string;
  stato?: BandoStato;
  livello?: FonteLivello;
}) {
  if (page.items.length === 0) {
    return (
      <div className="rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33] p-8 text-center text-sm text-[#6B8AAD]">
        Nessun bando trovato con i filtri selezionati.
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(page.total / page.page_size));

  return (
    <>
      <div className="flex items-center justify-between text-xs text-[#6B8AAD]">
        <span>
          {page.total} bandi totali · pagina {page.page} di {totalPages}
        </span>
      </div>
      <ul className="space-y-2">
        {page.items.map((item) => (
          <BandoRow key={item.bando.id} item={item} clienti={clienti} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        q={q}
        stato={stato}
        livello={livello}
      />
    </>
  );
}

function BandoRow({
  item,
  clienti,
}: {
  item: BandiListItem;
  clienti: ClienteRead[];
}) {
  const { bando } = item;
  return (
    <li className="rounded-2xl border border-[#1B3A5C]/30 bg-gradient-to-br from-[#0F1F33] to-[#0A1628] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {bando.livello && (
              <span className="rounded-md bg-[#1B3A5C]/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8AACCC]">
                {livelloLabel(bando.livello)}
              </span>
            )}
            <span
              className={`rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                bando.stato === "aperto"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-slate-500/15 text-slate-300"
              }`}
            >
              {bando.stato}
            </span>
            {item.n_clienti_match > 0 && (
              <span className="flex items-center gap-1 rounded-md bg-[#D4A03C]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#E8C06A]">
                <Users className="h-2.5 w-2.5" />
                {item.n_clienti_match}{" "}
                {item.n_clienti_match === 1 ? "cliente" : "clienti"}
              </span>
            )}
          </div>
          <h3 className="truncate text-sm font-semibold leading-snug text-white">
            {bando.titolo}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#6B8AAD]">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3 w-3 text-[#4A6A8A]" />
              {bando.ente_emittente}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3 text-[#4A6A8A]" />
              {formatScadenza(bando.scadenza)}
            </span>
            <span className="flex items-center gap-1.5">
              <Coins className="h-3 w-3 text-[#4A6A8A]" />
              {formatCentesimiEur(bando.importo_totale_centesimi)}
            </span>
          </div>
        </div>

        <ClientePicker bandoId={bando.id} clienti={clienti} />
      </div>
    </li>
  );
}

function Pagination({
  currentPage,
  totalPages,
  q,
  stato,
  livello,
}: {
  currentPage: number;
  totalPages: number;
  q?: string;
  stato?: BandoStato;
  livello?: FonteLivello;
}) {
  if (totalPages <= 1) return null;

  function buildHref(p: number): string {
    const qs = new URLSearchParams();
    if (q) qs.set("q", q);
    if (stato) qs.set("stato", stato);
    if (livello) qs.set("livello", livello);
    qs.set("page", String(p));
    return `/dashboard/catalogo?${qs.toString()}`;
  }

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      {prevDisabled ? (
        <span className="cursor-not-allowed rounded-lg border border-[#1B3A5C]/30 px-3 py-1.5 text-xs text-[#4A6A8A]">
          Precedente
        </span>
      ) : (
        <Link
          href={buildHref(currentPage - 1)}
          className="rounded-lg border border-[#1B3A5C]/40 px-3 py-1.5 text-xs text-[#A0BED8] hover:border-[#D4A03C]/40"
        >
          Precedente
        </Link>
      )}
      <span className="text-xs text-[#6B8AAD]">
        {currentPage} / {totalPages}
      </span>
      {nextDisabled ? (
        <span className="cursor-not-allowed rounded-lg border border-[#1B3A5C]/30 px-3 py-1.5 text-xs text-[#4A6A8A]">
          Successiva
        </span>
      ) : (
        <Link
          href={buildHref(currentPage + 1)}
          className="rounded-lg border border-[#1B3A5C]/40 px-3 py-1.5 text-xs text-[#A0BED8] hover:border-[#D4A03C]/40"
        >
          Successiva
        </Link>
      )}
    </div>
  );
}

function ForbiddenBanner() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div>
          <h3 className="text-sm font-semibold text-amber-400">
            Accesso riservato
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">
            Il catalogo globale è accessibile solo agli utenti con ruolo
            super_admin.
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorBanner({
  status,
  message,
}: {
  status: number | null;
  message: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div>
          <h3 className="text-sm font-semibold text-amber-400">
            Catalogo non disponibile
            {status ? ` (HTTP ${status})` : ""}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
        </div>
      </div>
    </div>
  );
}
