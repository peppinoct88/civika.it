/**
 * Topbar Server Component — barra superiore dashboard.
 *
 * Fetcha lato server la lista clienti dell'utente loggato (ADR-025) e
 * il cliente attivo (cookie `active_cliente_id`), passa al
 * `<ClientePicker>`. Le parti interattive (notifiche, profilo) sono
 * delegate al Client Component `<TopbarUserMenu>`. Se l'utente non ha
 * clienti associati il picker non viene reso — gli empty state sono
 * gestiti dalle singole pagine.
 */

import { Search } from "lucide-react";

import { resolveActiveCliente } from "@/lib/active-cliente";

import { ClientePicker } from "./cliente-picker";
import { MobileNavToggle } from "./mobile-nav-toggle";
import { TopbarUserMenu } from "./topbar-user-menu";

export async function Topbar() {
  const state = await resolveActiveCliente();

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-2 border-b border-[#1B3A5C]/20 bg-[#0F1F33]/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex flex-1 items-center gap-2">
        <MobileNavToggle />
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A6A8A]" />
          <input
            type="text"
            placeholder="Cerca nella piattaforma..."
            className="h-10 w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 pl-10 pr-4 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:bg-[#0A1628]/80 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#1B3A5C]/30 bg-[#0A1628]/40 px-1.5 py-0.5 text-[10px] font-medium text-[#4A6A8A]">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {state.ok && (
          <ClientePicker active={state.active} clienti={state.clienti} />
        )}
        <TopbarUserMenu />
      </div>
    </header>
  );
}
