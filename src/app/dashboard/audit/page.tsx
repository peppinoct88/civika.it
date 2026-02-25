"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Clock } from "lucide-react";

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Registro Attività</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Traccia tutte le azioni eseguite sulla piattaforma.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3">
          <select className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm">
            <option value="">Tutti gli utenti</option>
          </select>
          <select className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm">
            <option value="">Tutte le azioni</option>
            <option value="user.login">Login</option>
            <option value="user.logout">Logout</option>
            <option value="content.create">Creazione contenuto</option>
            <option value="content.update">Modifica contenuto</option>
          </select>
          <input
            type="date"
            className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm"
          />
        </CardContent>
      </Card>

      {/* Empty state */}
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-2)]">
              <ScrollText className="h-8 w-8 text-[var(--muted)]" />
            </div>
            <h3 className="text-lg font-semibold">Nessuna attività registrata</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Le attività degli utenti verranno registrate qui automaticamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
