"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredPermission?: string;
}

const navigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Utenti", href: "/dashboard/users", icon: Users, requiredPermission: "users.read" },
  { label: "Contenuti", href: "/dashboard/contents", icon: FileText, requiredPermission: "contents.read" },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, requiredPermission: "analytics.read" },
  { label: "Audit Log", href: "/dashboard/audit", icon: ScrollText, requiredPermission: "audit_logs.read" },
  { label: "Impostazioni", href: "/dashboard/settings", icon: Settings },
];

const futureNavigation: NavItem[] = [
  { label: "Scouting Bandi", href: "/dashboard/bandi", icon: Search, requiredPermission: "bandi.search" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[var(--border)] px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">
            C
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-primary-700">Civika</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary-500")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Separatore futuro */}
        <div className="my-4 border-t border-[var(--border)]" />
        {!collapsed && (
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Prossimamente
          </p>
        )}
        {futureNavigation.map((item) => (
          <div
            key={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] opacity-50 cursor-not-allowed",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? `${item.label} (prossimamente)` : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[var(--border)] p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] transition-colors"
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
