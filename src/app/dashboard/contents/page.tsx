"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Clock } from "lucide-react";

export default function ContentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contenuti</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Gestisci articoli, pagine e annunci della piattaforma.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nuovo Contenuto
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {["Tutti", "Bozze (0)", "In Revisione (0)", "Pubblicati (0)"].map(
          (tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                i === 0
                  ? "border-b-2 border-primary-500 text-primary-600"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Empty state */}
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
              <FileText className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold">Nessun contenuto</h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              Inizia creando il tuo primo articolo o pagina. I contenuti
              passeranno attraverso un workflow di revisione prima della
              pubblicazione.
            </p>
            <Button className="mt-6">
              <Plus className="h-4 w-4" />
              Crea il primo contenuto
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
