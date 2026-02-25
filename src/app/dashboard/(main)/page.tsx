"use client";

import {
  Users,
  FileText,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Zap,
  Search,
} from "lucide-react";

const stats = [
  {
    label: "Utenti Totali",
    value: "1",
    change: "+1 oggi",
    icon: Users,
    gradient: "from-[#1B3A5C] to-[#2A5580]",
    iconColor: "text-[#6BB5FF]",
  },
  {
    label: "Contenuti",
    value: "0",
    change: "—",
    icon: FileText,
    gradient: "from-[#2D4A30] to-[#38A169]",
    iconColor: "text-[#68D391]",
  },
  {
    label: "In Revisione",
    value: "0",
    change: "Nessuno",
    icon: Clock,
    gradient: "from-[#5C4A1B] to-[#D4A03C]",
    iconColor: "text-[#E8C06A]",
  },
  {
    label: "Login Oggi",
    value: "1",
    change: "Attivo ora",
    icon: TrendingUp,
    gradient: "from-[#1B4A5C] to-[#3182CE]",
    iconColor: "text-[#63B3ED]",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Benvenuto, Giuseppe
          </h1>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Ecco la panoramica della piattaforma Civika
          </p>
        </div>
        <p className="text-xs text-[#4A6A8A]">
          {new Date().toLocaleDateString("it-IT", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#1B3A5C]/40 hover:bg-[#0F1F33]/80"
          >
            {/* Background glow */}
            <div
              className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#6B8AAD]">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-[#4A6A8A]">{stat.change}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Content area ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Attività recenti */}
        <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#D4A03C]" />
              Attività Recenti
            </h2>
            <button className="text-xs text-[#6B8AAD] hover:text-[#D4A03C] transition-colors flex items-center gap-1">
              Vedi tutte <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B3A5C]/20">
              <Clock className="h-6 w-6 text-[#4A6A8A]" />
            </div>
            <p className="text-sm font-medium text-[#8AACCC]">
              Nessuna attività recente
            </p>
            <p className="mt-1 max-w-xs text-xs text-[#4A6A8A]">
              Le attività appariranno qui man mano che utilizzi la piattaforma
            </p>
          </div>
        </div>

        {/* Azioni rapide */}
        <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#D4A03C]" />
              Azioni Rapide
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                href: "/dashboard/contents",
                icon: FileText,
                label: "Nuovo Contenuto",
                desc: "Crea un articolo, pagina o annuncio",
                color: "text-[#6BB5FF]",
              },
              {
                href: "/dashboard/users",
                icon: Users,
                label: "Invita Utente",
                desc: "Aggiungi un nuovo membro al team",
                color: "text-[#68D391]",
              },
              {
                href: "/dashboard/bandi",
                icon: Search,
                label: "Cerca Bandi",
                desc: "Scopri nuove opportunità con AI",
                color: "text-[#E8C06A]",
              },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="group flex items-center gap-4 rounded-xl border border-[#1B3A5C]/15 bg-[#0A1628]/40 p-4 transition-all duration-200 hover:border-[#D4A03C]/20 hover:bg-[#0A1628]/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B3A5C]/20">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{action.label}</p>
                  <p className="text-xs text-[#4A6A8A]">{action.desc}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#4A6A8A] transition-all group-hover:text-[#D4A03C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
