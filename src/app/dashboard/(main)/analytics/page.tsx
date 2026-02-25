"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Visualizzazioni", value: "0", icon: BarChart3, color: "text-primary-500 bg-primary-50" },
    { label: "Utenti Attivi", value: "0", icon: Users, color: "text-secondary-500 bg-secondary-50" },
    { label: "Contenuti", value: "0", icon: FileText, color: "text-amber-500 bg-amber-50" },
    { label: "Engagement", value: "0%", icon: TrendingUp, color: "text-blue-500 bg-blue-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Monitora le metriche e le performance della piattaforma.
          </p>
        </div>
        <select className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm">
          <option>Ultimi 7 giorni</option>
          <option>Ultimi 30 giorni</option>
          <option>Ultimi 90 giorni</option>
          <option>Anno corrente</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BarChart3 className="mb-4 h-12 w-12 text-[var(--muted-foreground)]" />
            <h3 className="text-lg font-semibold">Dati non ancora disponibili</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              I grafici appariranno qui quando ci saranno dati sufficienti da analizzare.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
