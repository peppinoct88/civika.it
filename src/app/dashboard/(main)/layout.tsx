import { Toaster } from "sonner";

import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import { Topbar } from "@/components/layout/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#0B1929]">
        <Sidebar />
        <div className="transition-all duration-300 lg:pl-[260px]">
          <Topbar />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#0F1F33",
              border: "1px solid rgba(212,160,60,0.3)",
              color: "#E8C06A",
            },
          }}
        />
      </div>
    </SidebarProvider>
  );
}
