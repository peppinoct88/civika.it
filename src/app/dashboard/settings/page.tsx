"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Shield, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Impostazioni</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Gestisci il tuo profilo e le preferenze.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar tabs */}
        <nav className="space-y-1">
          {[
            { icon: User, label: "Profilo", active: true },
            { icon: Shield, label: "Sicurezza", active: false },
            { icon: Bell, label: "Notifiche", active: false },
            { icon: Palette, label: "Preferenze", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary-50 text-primary-700"
                  : "text-[var(--muted)] hover:bg-[var(--surface-2)]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="space-y-6">
              <h2 className="text-lg font-semibold">Profilo</h2>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
                  GS
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Cambia avatar
                  </Button>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    JPG, PNG o GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Nome" defaultValue="Giuseppe" />
                <Input label="Cognome" defaultValue="Spalletta" />
                <Input
                  label="Email"
                  type="email"
                  defaultValue="gi.spalletta1988@gmail.com"
                  disabled
                  helperText="L'email non può essere modificata"
                />
                <Input label="Telefono" type="tel" placeholder="+39..." />
              </div>

              <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-4">
                <Button variant="outline">Annulla</Button>
                <Button>Salva Modifiche</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
