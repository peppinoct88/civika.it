/**
 * MobileNavToggle — hamburger Client Component reso nella topbar.
 *
 * Visibile solo sotto `lg`. Sopra `lg` la sidebar è sempre visibile e il
 * toggle è inutile. Apre il drawer via SidebarContext.
 */

"use client";

import { Menu } from "lucide-react";

import { useSidebar } from "./sidebar-context";

export function MobileNavToggle() {
  const { toggleMobile } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggleMobile}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-[#A0BED8] hover:bg-white/[0.04] hover:text-white lg:hidden"
      aria-label="Apri menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
