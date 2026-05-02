/**
 * Pagina /dashboard/coverage-audit/segnala — Strato 10 ZERO MISS Mecc. 4.
 *
 * Server Component che renderizza il form di segnalazione manuale di un
 * bando rilevante che il sistema non ha intercettato (ADR-011 Mecc. 4).
 *
 * Pattern (CLAUDE.md sez. 5 + ADR-024):
 *   - Pagina = layout + intro statica + Client Component `<SegnalaForm>`.
 *   - Nessuna data fetch lato server (il form posta a una Server Action
 *     che chiama l'API).
 *
 * Cross-link: link "Vai alla dashboard alerts" per chiudere il loop
 * (post-segnalazione il consulente vuole verificare che la card sia
 * apparsa).
 */

import Link from "next/link";
import { ArrowRight, FileSearch, Lightbulb } from "lucide-react";

import { SegnalaForm } from "./_form";

export default function SegnalaPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-white">
            Segnala bando mancante
          </h1>
          <span className="flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <FileSearch className="h-3.5 w-3.5" />
            ADR-011 Mecc. 4
          </span>
        </div>
        <p className="mt-1 text-sm text-[#6B8AAD]">
          Hai trovato un bando rilevante che il sistema non aveva intercettato?
          Compila il form: la segnalazione apre un alert ZERO MISS che alimenta
          la diagnostica downstream (perché non l'abbiamo? quale fonte avrebbe
          dovuto darcelo?).
        </p>
      </div>

      <div className="rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 flex-shrink-0 text-[#D4A03C]" />
          <div className="flex-1 text-xs leading-relaxed text-[#A0BED8]">
            <p>
              <strong className="text-white">Quando segnalare:</strong>{" "}
              tutto ciò che hai visto altrove (Gazzetta Ufficiale, blog di
              settore, segnalazione cliente, newsletter di un ente) e che
              <em> avresti voluto trovare nella dashboard bandi</em> ma non
              c'era. Anche un sospetto vale: la diagnostica decide a valle.
            </p>
            <p className="mt-2">
              <strong className="text-white">Il titolo basta:</strong>{" "}
              gli altri campi sono opzionali. Compilali se li hai sotto mano —
              più contesto = diagnostica più rapida.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-6 backdrop-blur-sm">
        <SegnalaForm />
      </div>

      <div className="flex justify-end">
        <Link
          href="/dashboard/coverage-alerts"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#A0BED8] transition hover:text-white"
        >
          Vai alla dashboard alerts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
