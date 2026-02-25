"use client";

import { useState } from "react";
import { User, Shield, Bell, Palette, Save, Camera } from "lucide-react";

const tabs = [
  { icon: User, label: "Profilo", id: "profile" },
  { icon: Shield, label: "Sicurezza", id: "security" },
  { icon: Bell, label: "Notifiche", id: "notifications" },
  { icon: Palette, label: "Preferenze", id: "preferences" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Impostazioni</h1>
        <p className="mt-1 text-sm text-[#6B8AAD]">
          Gestisci il tuo profilo e le preferenze
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar tabs */}
        <nav className="space-y-1">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                activeTab === item.id
                  ? "bg-[#D4A03C]/10 text-[#E8C06A]"
                  : "text-[#6B8AAD] hover:bg-white/[0.04] hover:text-[#A0BED8]"
              }`}
            >
              <item.icon className={`h-4 w-4 ${activeTab === item.id ? "text-[#D4A03C]" : ""}`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-[#1B3A5C]/20 bg-[#0F1F33]/60 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-6">Profilo</h2>

            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4A03C] to-[#E8C06A] text-2xl font-bold text-[#0A1628]">
                  GS
                </div>
                <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-lg bg-[#1B3A5C] text-white hover:bg-[#2A5580] transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Giuseppe Spalletta</p>
                <p className="text-xs text-[#6B8AAD]">Super Admin</p>
                <p className="mt-1 text-xs text-[#4A6A8A]">JPG, PNG o GIF. Max 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { label: "Nome", value: "Giuseppe", disabled: false },
                { label: "Cognome", value: "Spalletta", disabled: false },
                { label: "Email", value: "gi.spalletta1988@gmail.com", disabled: true, helper: "L'email non può essere modificata" },
                { label: "Telefono", value: "", placeholder: "+39...", disabled: false },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[#6B8AAD]">
                    {field.label}
                  </label>
                  <input
                    type={field.label === "Email" ? "email" : "text"}
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    className={`w-full rounded-xl border border-[#1B3A5C]/30 bg-[#0A1628]/60 px-4 py-2.5 text-sm text-white placeholder-[#4A6A8A] transition-all focus:border-[#D4A03C]/40 focus:ring-1 focus:ring-[#D4A03C]/20 focus:outline-none ${
                      field.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  {field.helper && (
                    <p className="mt-1 text-xs text-[#4A6A8A]">{field.helper}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-[#1B3A5C]/20 pt-5">
              <button className="rounded-xl border border-[#1B3A5C]/30 px-4 py-2.5 text-sm font-medium text-[#6B8AAD] hover:bg-white/[0.04] transition-all">
                Annulla
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A03C] to-[#E8C06A] px-4 py-2.5 text-sm font-semibold text-[#0A1628] transition-all hover:shadow-lg hover:shadow-[#D4A03C]/20">
                <Save className="h-4 w-4" />
                Salva Modifiche
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
