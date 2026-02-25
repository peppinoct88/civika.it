"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Utenti", href: "/dashboard/users", icon: Users },
  { label: "Contenuti", href: "/dashboard/contents", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Audit Log", href: "/dashboard/audit", icon: ScrollText },
  { label: "Impostazioni", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-[#0A1628] transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* ── Logo ── */}
      <div className="flex h-[72px] items-center px-5">
        <Link href="/dashboard" className="flex items-center gap-3">
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
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={item.href}
              href={item.href}
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
      </nav>

      {/* ── Collapse toggle ── */}
      <div className="px-3 pb-4">
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
  );
}
