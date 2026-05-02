"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  LayoutDashboard,
  Settings,
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileEdit,
  AlertTriangle,
  PlusCircle,
  X,
} from "lucide-react";

import { useSidebar } from "./sidebar-context";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const navigation: NavItem[] = [
  { label: "Inbox del giorno", href: "/dashboard", icon: Inbox, exact: true },
  { label: "Workspace", href: "/dashboard/clienti", icon: LayoutDashboard },
  { label: "Audit Log", href: "/dashboard/audit", icon: ScrollText },
  { label: "Impostazioni", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useSidebar();

  const closeOnMobile = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-[#0A1628] transition-all duration-300 ${
          collapsed ? "lg:w-[72px]" : "lg:w-[260px]"
        } ${
          mobileOpen
            ? "w-[280px] translate-x-0"
            : "w-[260px] -translate-x-full lg:translate-x-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-[#6B8AAD] hover:bg-white/[0.04] hover:text-white lg:hidden"
          aria-label="Chiudi menu"
        >
          <X className="h-4 w-4" />
        </button>
      {/* ── Logo ── */}
      <div className="flex h-[72px] items-center px-5">
        <Link href="/dashboard" onClick={closeOnMobile} className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-civika-white.svg"
            alt="CIVIKA"
            className={`transition-all duration-300 ${collapsed ? "h-7" : "h-8"}`}
          />
        </Link>
      </div>

      {/* ── Separator ── */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[#1B3A5C]/40 to-transparent" />

      {/* ── Navigation ── */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A] ${collapsed ? "hidden" : ""}`}>
          Gestione
        </p>
        {navigation.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeOnMobile}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-[#D4A03C]/10 text-[#E8C06A]"
                  : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
              }`}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#D4A03C]" />
              )}
              <item.icon
                className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                  isActive ? "text-[#D4A03C]" : "text-[#4A6A8A] group-hover:text-[#8AACCC]"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* ── Bandi section ── */}
        <div className="mx-1 my-4 h-px bg-gradient-to-r from-transparent via-[#1B3A5C]/30 to-transparent" />
        <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A6A8A] ${collapsed ? "hidden" : ""}`}>
          Scouting
        </p>
        <Link
          href="/dashboard/bandi"
          onClick={closeOnMobile}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          } ${
            pathname.startsWith("/dashboard/bandi")
              ? "bg-[#D4A03C]/10 text-[#E8C06A]"
              : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
          }`}
          title={collapsed ? "Scouting Bandi" : undefined}
        >
          {pathname.startsWith("/dashboard/bandi") && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#D4A03C]" />
          )}
          <Search
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              pathname.startsWith("/dashboard/bandi") ? "text-[#D4A03C]" : "text-[#4A6A8A] group-hover:text-[#8AACCC]"
            }`}
          />
          {!collapsed && (
            <>
              <span>Scouting Bandi</span>
              <span className="ml-auto flex items-center gap-1 rounded-md bg-[#D4A03C]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#D4A03C]">
                <Sparkles className="h-2.5 w-2.5" />
                AI
              </span>
            </>
          )}
        </Link>
        <Link
          href="/dashboard/profile-edit"
          onClick={closeOnMobile}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          } ${
            pathname.startsWith("/dashboard/profile-edit")
              ? "bg-[#D4A03C]/10 text-[#E8C06A]"
              : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
          }`}
          title={collapsed ? "Profilo cliente" : undefined}
        >
          {pathname.startsWith("/dashboard/profile-edit") && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#D4A03C]" />
          )}
          <FileEdit
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              pathname.startsWith("/dashboard/profile-edit") ? "text-[#D4A03C]" : "text-[#4A6A8A] group-hover:text-[#8AACCC]"
            }`}
          />
          {!collapsed && <span>Profilo cliente</span>}
        </Link>
        <Link
          href="/dashboard/coverage-alerts"
          onClick={closeOnMobile}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          } ${
            pathname.startsWith("/dashboard/coverage-alerts")
              ? "bg-[#D4A03C]/10 text-[#E8C06A]"
              : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
          }`}
          title={collapsed ? "Coverage alerts" : undefined}
        >
          {pathname.startsWith("/dashboard/coverage-alerts") && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#D4A03C]" />
          )}
          <AlertTriangle
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              pathname.startsWith("/dashboard/coverage-alerts") ? "text-[#D4A03C]" : "text-[#4A6A8A] group-hover:text-[#8AACCC]"
            }`}
          />
          {!collapsed && <span>Coverage alerts</span>}
        </Link>
        <Link
          href="/dashboard/coverage-audit/segnala"
          onClick={closeOnMobile}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          } ${
            pathname.startsWith("/dashboard/coverage-audit/segnala")
              ? "bg-[#D4A03C]/10 text-[#E8C06A]"
              : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
          }`}
          title={collapsed ? "Segnala bando" : undefined}
        >
          {pathname.startsWith("/dashboard/coverage-audit/segnala") && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#D4A03C]" />
          )}
          <PlusCircle
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              pathname.startsWith("/dashboard/coverage-audit/segnala") ? "text-[#D4A03C]" : "text-[#4A6A8A] group-hover:text-[#8AACCC]"
            }`}
          />
          {!collapsed && <span>Segnala bando</span>}
        </Link>
      </nav>

      {/* ── Collapse toggle (desktop only) ── */}
      <div className="hidden px-3 pb-4 lg:block">
        <div className="mx-1 mb-3 h-px bg-gradient-to-r from-transparent via-[#1B3A5C]/30 to-transparent" />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-[13px] text-[#4A6A8A] hover:bg-white/[0.04] hover:text-[#8AACCC] transition-all"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Comprimi</span>
            </>
          )}
        </button>
      </div>
      </aside>
    </>
  );
}
