"use client";

import { BarChart3, TrendingUp, Users, FileText, Eye } from "lucide-react";

const stats = [
  { label: "Visualizzazioni", value: "0", icon: Eye, gradient: "from-[#1B3A5C] to-[#2A5580]", iconColor: "text-[#6BB5FF]" },
  { label: "Utenti Attivi", value: "1", icon: Users, gradient: "from-[#2D4A30] to-[#38A169]", iconColor: "text-[#68D391]" },
  { label: "Contenuti", value: "0", icon: FileText, gradient: "from-[#5C4A1B] to-[#D4A03C]", iconColor: "text-[#E8C06A]" },
  { label: "Engagement", value: "0%", icon: TrendingUp, gradient: "from-[#1B4A5C] to-[#3182CE]", iconColor: "text-[#63B3ED]" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-[#6B8AAD]">
            Monitora le metriche e le performance della piattaforma
          </p>
        </div>
        <select className="h-10 rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-3 text-sm text-[#8AACCC] focus:border-[#D4A03C]/40 focus:outline-none">
          <option>Ultimi 7 giorni</option>
          <option>Ultimi 30 giorni</option>
          <option>Ultimi 90 giorni</option>
          <option>Anno corrente</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#1B3A5C]/40"
          >
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#6B8AAD]">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B3A5C]/20">
            <BarChart3 className="h-8 w-8 text-[#4A6A8A]" />
          </div>
          <h3 className="text-lg font-semibold text-white">Dati non ancora disponibili</h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B8AAD]">
            I grafici appariranno qui quando ci saranno dati sufficienti da analizzare.
          </p>
        </div>
      </div>
    </div>
  );
}
