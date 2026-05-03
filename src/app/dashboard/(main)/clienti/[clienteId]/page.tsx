/**
 * Workspace cliente — `/dashboard/clienti/{clienteId}` (ADR-035 Wireframe C).
 *
 * Pannello centrale del cockpit per un singolo cliente: kanban
 * pre-candidatura (3 colonne nuovo/in_valutazione/scartato) + lista
 * `Esiti attesi`.
 *
 * Server Component: chiama `GET /cockpit/workspace/{clienteId}`. Auth:
 * il backend rifiuta con 403 se l'utente non ha access row in
 * `user_clienti` per il cliente — qui mostriamo un banner inline.
 *
 * Convenzione: la home (`/dashboard`) ospita l'inbox cross-cliente; le
 * pagine `/dashboard/clienti/[id]` ospitano il workspace per cliente.
 * Cliccare un cliente nel ClientiRail della home naviga qui.
 */

import { AlertCircle, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

import { ApiClientError, getCockpitWorkspace } from "@/lib/api/client";
import { resolveActiveCliente } from "@/lib/active-cliente";
import { ClientiRail } from "@/components/cockpit/clienti-rail";
import { EsitiAttesiList } from "@/components/cockpit/esiti-attesi-list";
import { KanbanBoard } from "@/components/cockpit/kanban-board";
import type { WorkspaceClienteRead } from "@/lib/api/types";

interface WorkspaceResult {
  ok: true;
  workspace: WorkspaceClienteRead;
}

interface WorkspaceError {
  ok: false;
  status: number | null;
  message: string;
}

async function loadWorkspace(
  clienteId: string,
): Promise<WorkspaceResult | WorkspaceError> {
  try {
    const workspace = await getCockpitWorkspace(clienteId);
    return { ok: true, workspace };
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

export default async function WorkspaceClientePage({
  params,
}: {
  params: Promise<{ clienteId: string }>;
}) {
  const { clienteId } = await params;
  const [active, result] = await Promise.all([
    resolveActiveCliente(),
    loadWorkspace(clienteId),
  ]);

  const clienti = active.ok ? active.clienti : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-6">
        <Header
          title={result.ok ? result.workspace.cliente.nome : "Workspace"}
          tipoEnte={result.ok ? result.workspace.cliente.tipo_ente : null}
        />

        {result.ok ? (
          <WorkspaceContent
            workspace={result.workspace}
            clienteId={clienteId}
          />
        ) : (
          <ErrorBanner status={result.status} message={result.message} />
        )}
      </div>

      <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-7rem)]">
        <div className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 backdrop-blur-sm">
          <ClientiRail
            clienti={clienti}
            activeClienteId={clienteId}
          />
        </div>
      </div>
    </div>
  );
}

function Header({
  title,
  tipoEnte,
}: {
  title: string;
  tipoEnte: string | null;
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <Link
          href="/dashboard"
          className="mb-2 inline-flex items-center gap-1 text-xs text-[#6B8AAD] hover:text-[#D4A03C]"
        >
          <ArrowLeft className="h-3 w-3" />
          Torna all&apos;Inbox
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A03C]/15 text-[#E8C06A]">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            {tipoEnte && (
              <p className="mt-0.5 text-xs uppercase tracking-wider text-[#6B8AAD]">
                {tipoEnte}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceContent({
  workspace,
  clienteId,
}: {
  workspace: WorkspaceClienteRead;
  clienteId: string;
}) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#A0BED8]">
          Kanban pre-candidatura
        </h2>
        <KanbanBoard
          clienteId={clienteId}
          initial={{
            nuovo: workspace.nuovo,
            in_valutazione: workspace.in_valutazione,
            scartato: workspace.scartato,
          }}
        />
      </section>

      <EsitiAttesiList
        esiti={workspace.esiti_attesi ?? []}
        clienteId={clienteId}
      />
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
  const isForbidden = status === 403;
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-400">
            {isForbidden
              ? "Non hai accesso a questo cliente"
              : `Workspace non disponibile${status ? ` (HTTP ${status})` : ""}`}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
          {isForbidden && (
            <p className="mt-2 text-[11px] text-[#6B8AAD]">
              Chiedi all&apos;amministratore di aggiungere una access row in{" "}
              <code>user_clienti</code> per questo cliente.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
