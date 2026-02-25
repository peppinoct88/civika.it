"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, Settings, User } from "lucide-react";

export function Topbar() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    document.cookie = "access_token=; path=/; max-age=0";
    document.cookie = "refresh_token=; path=/; max-age=0";
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#1B3A5C]/20 bg-[#0F1F33]/80 px-6 backdrop-blur-xl">
      {/* ── Search ── */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
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

      {/* ── Right section ── */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8] transition-all">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A03C] text-[9px] font-bold text-[#0A1628]">
            3
          </span>
        </button>

        {/* Separator */}
        <div className="mx-2 h-6 w-px bg-[#1B3A5C]/30" />

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-[13px] font-bold text-[#0A1628]">
              GS
            </div>
            <div className="hidden text-left md:block">
              <p className="text-[13px] font-medium text-white">Giuseppe</p>
              <p className="text-[11px] text-[#4A6A8A]">Super Admin</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-60 rounded-xl border border-[#1B3A5C]/30 bg-[#0F1F33] p-1.5 shadow-2xl shadow-black/40">
              <div className="border-b border-[#1B3A5C]/20 px-3 py-2.5 mb-1">
                <p className="text-sm font-medium text-white">Giuseppe Spalletta</p>
                <p className="text-xs text-[#6B8AAD]">gi.spalletta1988@gmail.com</p>
              </div>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#8AACCC] hover:bg-white/[0.04] hover:text-white transition-all"
              >
                <Settings className="h-4 w-4" />
                Impostazioni
              </a>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#8AACCC] hover:bg-white/[0.04] hover:text-white transition-all"
              >
                <User className="h-4 w-4" />
                Profilo
              </a>
              <div className="my-1 h-px bg-[#1B3A5C]/20" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
