/**
 * Dashboard home — Inbox Giornaliera (ADR-035 Wireframe C, pannello sinistro).
 *
 * Server Component che apre la giornata operativa: 4 sezioni cross-cliente
 * (`nuovi top`, `scadenze imminenti`, `graduatorie attese`, `eventi
 * recenti`) caricate da `GET /cockpit/inbox-giornaliera`. Il pannello
 * destro è il "ClientiRail" con il portafoglio dell'operatore: cliccare
 * un cliente porta al suo workspace `/dashboard/clienti/{id}`.
 *
 * Pattern dual-pane: 2 colonne sopra `lg`, stack verticale su mobile.
 * I conteggi sezione + i badge cliente sono server-rendered (SSR fino a
 * `<ClientePicker>` topbar che gestisce lo switch via Server Action).
 *
 * Errore API → banner inline (non page-blocking): l'inbox può essere
 * vuoto per molti motivi (zero clienti, FastAPI down, JWT scaduto) e
 * vogliamo che l'operatore possa comunque navigare al workspace.
 */

import { AlertCircle, Calendar, Flame, Sparkles, Bell, Award } from "lucide-react";

import { ApiClientError, getCockpitInbox } from "@/lib/api/client";
import { resolveActiveCliente } from "@/lib/active-cliente";
import { ClientiRail } from "@/components/cockpit/clienti-rail";
import {
  EventoItem,
  GraduatoriaItem,
  InboxSection,
  NuovoTopItem,
  ScadenzaItem,
} from "@/components/cockpit/inbox-section";
import { OnboardingTour } from "@/components/cockpit/onboarding-tour";
import type { InboxGiornalieraRead } from "@/lib/api/types";

interface InboxResult {
  ok: true;
  inbox: InboxGiornalieraRead;
}

interface InboxError {
  ok: false;
  status: number | null;
  message: string;
}

async function loadInbox(): Promise<InboxResult | InboxError> {
  try {
    const inbox = await getCockpitInbox();
    return { ok: true, inbox };
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

export default async function DashboardHome() {
  const [active, inboxResult] = await Promise.all([
    resolveActiveCliente(),
    loadInbox(),
  ]);
  const inboxState = active.ok ? inboxResult : null;

  const clienti = active.ok ? active.clienti : [];
  const activeId = active.ok ? active.active.id : null;

  const badges: Record<string, number> = {};
  if (inboxState?.ok) {
    const tally = (cid: string) => {
      badges[cid] = (badges[cid] ?? 0) + 1;
    };
    inboxState.inbox.nuovi_top.forEach((i) => tally(i.cliente_id));
    inboxState.inbox.scadenze_imminenti.forEach((i) => tally(i.cliente_id));
  }

  return (
    <>
      <OnboardingTour />
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <PageHeader nClienti={clienti.length} />

          {!active.ok && active.reason === "no_clienti" && <NoClientiBanner />}
          {!active.ok && active.reason === "api_error" && (
            <ApiErrorBanner status={active.status} message={active.message} />
          )}

          {inboxState && !inboxState.ok && (
            <ApiErrorBanner
              status={inboxState.status}
              message={inboxState.message}
            />
          )}

          {inboxState?.ok && <InboxGrid inbox={inboxState.inbox} />}
        </div>

        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-7rem)]">
          <div className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 backdrop-blur-sm">
            <ClientiRail
              clienti={clienti}
              activeClienteId={activeId}
              badges={badges}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function PageHeader({ nClienti }: { nClienti: number }) {
  const giorno = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Inbox del giorno
        </h1>
        <p className="mt-1 text-sm text-[#6B8AAD]">
          Cosa serve guardare ora — su tutti i {nClienti} clienti del tuo
          portafoglio.
        </p>
      </div>
      <span className="text-xs text-[#4A6A8A]">{giorno}</span>
    </div>
  );
}

function InboxGrid({ inbox }: { inbox: InboxGiornalieraRead }) {
  const totals = {
    nuovi: inbox.nuovi_top.length,
    scadenze: inbox.scadenze_imminenti.length,
    graduatorie: inbox.graduatorie_attese.length,
    eventi: inbox.eventi_recenti.length,
  };
  const totalAlerts =
    totals.nuovi + totals.scadenze + totals.graduatorie + totals.eventi;

  if (totalAlerts === 0) {
    return <InboxEmpty />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <InboxSection
        title="Nuovi top match"
        subtitle="Score Sonnet ≥ 70 nelle ultime 24h"
        count={totals.nuovi}
        tone="gold"
        icon={<Sparkles className="h-4 w-4" />}
      >
        {inbox.nuovi_top.map((item) => (
          <NuovoTopItem key={item.match_id} item={item} />
        ))}
      </InboxSection>

      <InboxSection
        title="Scadenze imminenti"
        subtitle="In valutazione, scadenza ≤ 7 giorni"
        count={totals.scadenze}
        tone="red"
        icon={<Flame className="h-4 w-4" />}
      >
        {inbox.scadenze_imminenti.map((item) => (
          <ScadenzaItem
            key={`${item.cliente_id}-${item.bando.id}`}
            item={item}
          />
        ))}
      </InboxSection>

      <InboxSection
        title="Graduatorie attese"
        subtitle="Esiti previsti nei prossimi 7 giorni"
        count={totals.graduatorie}
        tone="blue"
        icon={<Award className="h-4 w-4" />}
      >
        {inbox.graduatorie_attese.map((item) => (
          <GraduatoriaItem
            key={`${item.cliente_id}-${item.bando.id}`}
            item={item}
          />
        ))}
      </InboxSection>

      <InboxSection
        title="Eventi recenti"
        subtitle="Lifecycle (proroghe, FAQ, modulistica) — 48h"
        count={totals.eventi}
        tone="violet"
        icon={<Bell className="h-4 w-4" />}
      >
        {inbox.eventi_recenti.map((item, idx) => (
          <EventoItem key={`${item.cliente_id}-${item.bando.id}-${idx}`} item={item} />
        ))}
      </InboxSection>
    </div>
  );
}

function InboxEmpty() {
  return (
    <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-10 text-center">
      <Calendar className="mx-auto h-10 w-10 text-[#4A6A8A]" />
      <h2 className="mt-3 text-base font-semibold text-white">
        Nessun alert oggi
      </h2>
      <p className="mt-1 text-xs text-[#6B8AAD]">
        Tutto sotto controllo: nessun nuovo top match, nessuna scadenza
        imminente, nessuna graduatoria attesa, nessun evento lifecycle.
      </p>
      <p className="mt-3 text-[11px] text-[#4A6A8A]">
        Apri un workspace cliente dal pannello a destra per esplorare il
        kanban pre-candidatura.
      </p>
    </div>
  );
}

function NoClientiBanner() {
  return (
    <div className="rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-6 text-center">
      <Sparkles className="mx-auto h-8 w-8 text-[#D4A03C]" />
      <h2 className="mt-3 text-base font-semibold text-white">
        Nessun cliente nel tuo portafoglio
      </h2>
      <p className="mt-1 text-xs text-[#6B8AAD]">
        Chiedi all&apos;amministratore di assegnarti almeno un cliente CIVIKA
        via mapping <code>user_clienti</code> (ADR-025).
      </p>
    </div>
  );
}

function ApiErrorBanner({
  status,
  message,
}: {
  status: number | null;
  message: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-400" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-400">
            Cockpit non disponibile{status ? ` (HTTP ${status})` : ""}
          </h3>
          <p className="mt-1 text-xs text-[#A0BED8]">{message}</p>
          <p className="mt-2 text-[11px] text-[#6B8AAD]">
            Verifica che la FastAPI sia raggiungibile e che il JWT sia valido.
          </p>
        </div>
      </div>
    </div>
  );
}
