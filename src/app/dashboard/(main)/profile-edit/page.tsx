/**
 * Pagina /dashboard/profile-edit — Strato 9 A4.1 wired al frontend.
 *
 * Server Component che:
 * 1. Risolve il cliente attivo via `resolveActiveCliente()` (cookie
 *    `active_cliente_id` con fallback al primo da `GET /clienti/me`,
 *    pattern post-ADR-025).
 * 2. Mostra `<ProfileEditForm>` (client) con i `needs` correnti.
 * 3. Il form invoca la Server Action `updateNeedsAction` che POSTa a
 *    /clienti/{id}/profile.
 *
 * Nota: il re-embedding NON è inline. Il flag `needs_dirty` (gestito
 * lato repository con `update_needs`) viene letto dal runner batch
 * `embed_pending_clienti` (Strato 8 A3.3) al prossimo tick.
 */

import { AlertCircle, FileEdit, Inbox } from "lucide-react";

import { resolveActiveCliente } from "@/lib/active-cliente";
import type { ClienteRead } from "@/lib/api/types";

import { ProfileEditForm } from "./_form";

export default async function ProfileEditPage() {
  const state = await resolveActiveCliente();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">
              Profilo cliente
            </h1>
            <span className="flex items-center gap-1.5 rounded-lg bg-[#D4A03C]/15 px-2.5 py-1 text-xs font-semibold text-[#D4A03C]">
              <FileEdit className="h-3.5 w-3.5" />
              Editor `needs`
            </span>
          </div>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Aggiorna la descrizione narrativa che alimenta il matching semantico
            (BGE-M3 + Sonnet 4.6).
          </p>
        </div>
      </div>

      {state.ok ? (
        <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-6 backdrop-blur-sm">
          <ClienteHeader cliente={state.active} />
          <div className="mt-6">
            <ProfileEditForm
              clienteId={state.active.id}
              clienteNome={state.active.nome}
              initialNeeds={state.active.needs ?? ""}
            />
          </div>
        </div>
      ) : state.reason === "no_clienti" ? (
        <NoClientiState />
      ) : (
        <ErrorState
          status={state.status}
          message={state.message}
          hint="Verifica che la FastAPI sia raggiungibile e il JWT sia valido."
        />
      )}
    </div>
  );
}

function ClienteHeader({ cliente }: { cliente: ClienteRead }) {
  const lastUpdated = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(cliente.updated_at));

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-[#1B3A5C]/20 pb-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-lg font-bold text-[#0A1628]">
        {cliente.nome.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{cliente.nome}</p>
        <p className="text-xs text-[#6B8AAD]">
          {labelTipoEnte(cliente.tipo_ente)}
          {cliente.codice_istat && ` · ISTAT ${cliente.codice_istat}`}
        </p>
        <p className="mt-0.5 text-[11px] text-[#4A6A8A]">
          Ultimo aggiornamento: {lastUpdated}
        </p>
      </div>
    </div>
  );
}

function labelTipoEnte(tipo: ClienteRead["tipo_ente"]): string {
  switch (tipo) {
    case "comune":
      return "Comune";
    case "unione_comuni":
      return "Unione di Comuni";
    case "gal":
      return "GAL";
    case "provincia":
      return "Provincia";
    case "pmi":
      return "PMI";
    case "grande_impresa":
      return "Grande impresa";
    case "ets":
      return "ETS";
    case "cooperativa_sociale":
      return "Cooperativa sociale";
    default:
      return "Altro";
  }
}

function NoClientiState() {
  return (
    <div className="rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-8 text-center">
      <Inbox className="mx-auto h-10 w-10 text-[#4A6A8A]" />
      <h2 className="mt-3 text-base font-semibold text-white">
        Nessun cliente associato al tuo account
      </h2>
      <p className="mt-1 text-xs text-[#6B8AAD]">
        Non sei ancora mappato in `user_clienti`. Contatta il super-admin per
        ottenere l&apos;accesso a uno o più clienti CIVIKA.
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
            Profilo cliente non disponibile{status ? ` (HTTP ${status})` : ""}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
          <p className="mt-3 text-xs text-[#6B8AAD]">{hint}</p>
        </div>
      </div>
    </div>
  );
}
