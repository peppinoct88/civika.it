import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B1929]">
      <Sidebar />
      <div className="pl-[260px] transition-all duration-300">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
