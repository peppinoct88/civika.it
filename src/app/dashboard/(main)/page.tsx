"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Utenti Totali",
    value: "0",
    trend: null,
    icon: Users,
    color: "text-primary-500 bg-primary-50",
  },
  {
    label: "Contenuti",
    value: "0",
    trend: null,
    icon: FileText,
    color: "text-secondary-500 bg-secondary-50",
  },
  {
    label: "In Revisione",
    value: "0",
    trend: null,
    icon: Clock,
    color: "text-amber-500 bg-amber-50",
  },
  {
    label: "Login Oggi",
    value: "1",
    trend: null,
    icon: TrendingUp,
    color: "text-blue-500 bg-blue-50",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Benvenuto, Giuseppe
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Ecco una panoramica della piattaforma Civika.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="default">
            <CardContent className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
              >
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

      {/* Content area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Attività recenti */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-lg font-semibold">Attività Recenti</h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-2)]">
                <Clock className="h-6 w-6 text-[var(--muted)]" />
              </div>
              <p className="text-sm font-medium text-[var(--muted)]">
                Nessuna attività recente
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Le attività appariranno qui man mano che utilizzi la piattaforma.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Azioni rapide */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-lg font-semibold">Azioni Rapide</h2>
            <div className="space-y-3">
              <a
                href="/dashboard/contents"
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 transition-colors hover:bg-[var(--surface-2)]"
              >
                <FileText className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="text-sm font-medium">Nuovo Contenuto</p>
                  <p className="text-xs text-[var(--muted)]">
                    Crea un articolo, pagina o annuncio
                  </p>
                </div>
              </a>
              <a
                href="/dashboard/users"
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 transition-colors hover:bg-[var(--surface-2)]"
              >
                <Users className="h-5 w-5 text-secondary-500" />
                <div>
                  <p className="text-sm font-medium">Invita Utente</p>
                  <p className="text-xs text-[var(--muted)]">
                    Aggiungi un nuovo membro al team
                  </p>
                </div>
              </a>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 transition-colors hover:bg-[var(--surface-2)]"
              >
                <TrendingUp className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Configura Piattaforma</p>
                  <p className="text-xs text-[var(--muted)]">
                    Personalizza le impostazioni
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
