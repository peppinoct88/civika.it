"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestione Utenti</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Gestisci gli utenti e i loro ruoli sulla piattaforma.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Invita Utente
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Cerca per nome o email..."
              className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] pl-9 pr-4 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm">
            <option value="">Tutti i ruoli</option>
            <option value="admin">Amministratore</option>
            <option value="editor">Editor</option>
            <option value="moderator">Moderatore</option>
            <option value="analyst">Analista</option>
          </select>
          <select className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm">
            <option value="">Tutti gli stati</option>
            <option value="active">Attivo</option>
            <option value="inactive">Disattivato</option>
          </select>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Utente
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Email
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Ruolo
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Stato
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)] last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                        GS
                      </div>
                      <span className="text-sm font-medium">
                        Giuseppe Spalletta
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-[var(--muted)]">
                    gi.spalletta1988@gmail.com
                  </td>
                  <td className="py-4">
                    <Badge variant="info">Super Admin</Badge>
                  </td>
                  <td className="py-4">
                    <Badge variant="success">Attivo</Badge>
                  </td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm">
                      •••
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
