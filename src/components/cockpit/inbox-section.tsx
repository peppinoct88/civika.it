/**
 * InboxSection — wrapper per ognuna delle 4 sezioni dell'inbox giornaliera.
 *
 * Server Component generico: header + counter + slot children. Le 4 varianti
 * di InboxItem sotto sono Server Component anche loro, ognuna mappata su un
 * tipo InboxBandoNuovo / InboxScadenzaImminente / InboxGraduatoriaAttesa /
 * InboxEventoRecente.
 *
 * Convenzione visiva (ADR-035):
 *   - nuovi_top         → accent oro (alert positivo, opportunità)
 *   - scadenze          → accent rosso (urgenza)
 *   - graduatorie       → accent blu (esito atteso)
 *   - eventi            → accent viola (lifecycle)
 */

import {
  AlertTriangle,
  Award,
  Bell,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { formatScadenza } from "@/lib/api/formatters";
import type {
  InboxBandoNuovo,
  InboxEventoRecente,
  InboxGraduatoriaAttesa,
  InboxScadenzaImminente,
} from "@/lib/api/types";

import { PipelineCard } from "./pipeline-card";

type Tone = "gold" | "red" | "blue" | "violet";

const TONE_STYLES: Record<Tone, { ring: string; bg: string; text: string }> = {
  gold: { ring: "border-[#D4A03C]/30", bg: "bg-[#D4A03C]/10", text: "text-[#E8C06A]" },
  red: { ring: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-300" },
  blue: { ring: "border-sky-400/30", bg: "bg-sky-400/10", text: "text-sky-300" },
  violet: { ring: "border-violet-400/30", bg: "bg-violet-400/10", text: "text-violet-300" },
};

interface SectionProps {
  title: string;
  subtitle: string;
  count: number;
  tone: Tone;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function InboxSection({
  title,
  subtitle,
  count,
  tone,
  icon,
  children,
}: SectionProps) {
  const t = TONE_STYLES[tone];
  return (
    <section
      className={`overflow-hidden rounded-2xl border ${t.ring} bg-[#0F1F33]/60 backdrop-blur-sm`}
    >
      <header className={`flex items-center justify-between border-b ${t.ring} ${t.bg} px-4 py-3`}>
        <div className="flex items-center gap-2">
          <span className={t.text}>{icon}</span>
          <div>
            <h3 className={`text-sm font-semibold ${t.text}`}>{title}</h3>
            <p className="text-[10px] text-[#6B8AAD]">{subtitle}</p>
          </div>
        </div>
        <span
          className={`flex h-6 min-w-[24px] items-center justify-center rounded-full ${t.bg} px-1.5 text-xs font-bold ${t.text}`}
        >
          {count}
        </span>
      </header>
      <div className="p-3">
        {count === 0 ? (
          <p className="py-6 text-center text-xs text-[#4A6A8A]">
            Nessun alert in questa sezione
          </p>
        ) : (
          <div className="space-y-2">{children}</div>
        )}
      </div>
    </section>
  );
}

// ─── Item renderers (4 variants) ──────────────────────────────────────────────

export function NuovoTopItem({ item }: { item: InboxBandoNuovo }) {
  return (
    <div className="space-y-1">
      <ClienteLine nome={item.cliente_nome} />
      <PipelineCard
        bando={item.bando}
        density="comfort"
        scoreComplessivo={item.score_complessivo}
        alertLevel={item.alert_level}
        onOpenHref={`/dashboard/bandi/${item.bando.id}?cliente=${item.cliente_id}&match=${item.match_id}`}
      />
    </div>
  );
}

export function ScadenzaItem({ item }: { item: InboxScadenzaImminente }) {
  const giorni = item.giorni_residui;
  const urgent = giorni <= 2;
  return (
    <div className="space-y-1">
      <ClienteLine nome={item.cliente_nome} />
      <PipelineCard
        bando={item.bando}
        density="comfort"
        onOpenHref={`/dashboard/bandi/${item.bando.id}?cliente=${item.cliente_id}`}
        trailing={
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
              urgent
                ? "bg-rose-500/20 text-rose-300"
                : "bg-amber-500/20 text-amber-300"
            }`}
          >
            <AlertTriangle className="h-2.5 w-2.5" />
            {giorni === 0 ? "Scade oggi" : `${giorni}gg residui`}
          </span>
        }
      />
    </div>
  );
}

export function GraduatoriaItem({ item }: { item: InboxGraduatoriaAttesa }) {
  return (
    <div className="space-y-1">
      <ClienteLine nome={item.cliente_nome} />
      <PipelineCard
        bando={item.bando}
        density="comfort"
        onOpenHref={`/dashboard/bandi/${item.bando.id}?cliente=${item.cliente_id}`}
        trailing={
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
            <Award className="h-2.5 w-2.5" />
            Esito atteso il {formatScadenza(item.data_graduatoria_attesa_il)}
          </span>
        }
      />
    </div>
  );
}

export function EventoItem({ item }: { item: InboxEventoRecente }) {
  return (
    <div className="space-y-1">
      <ClienteLine nome={item.cliente_nome} />
      <PipelineCard
        bando={item.bando}
        density="comfort"
        onOpenHref={`/dashboard/bandi/${item.bando.id}?cliente=${item.cliente_id}`}
        trailing={
          <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
            <Bell className="h-2.5 w-2.5" />
            {item.tipo_evento.replace(/_/g, " ")} — {item.severita}
          </span>
        }
      />
    </div>
  );
}

function ClienteLine({ nome }: { nome: string }) {
  return (
    <p className="flex items-center gap-1 px-1 text-[10px] font-semibold uppercase tracking-wider text-[#6B8AAD]">
      <Sparkles className="h-2.5 w-2.5 text-[#D4A03C]" />
      {nome}
      <ChevronRight className="ml-auto h-3 w-3 text-[#4A6A8A]" />
    </p>
  );
}
