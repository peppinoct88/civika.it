/**
 * SidebarContext — Client Component condiviso fra Sidebar (drawer mobile)
 * e topbar (hamburger toggle).
 *
 * Su `lg` la sidebar è sempre visibile (translate-x-0); sotto è hidden
 * di default (`-translate-x-full`) e l'hamburger nella topbar la apre.
 * Cliccare l'overlay o un link la richiude.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface SidebarContextValue {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = useCallback(
    () => setMobileOpen((v) => !v),
    [],
  );
  return (
    <SidebarContext.Provider
      value={{ mobileOpen, setMobileOpen, toggleMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }
  return ctx;
}
