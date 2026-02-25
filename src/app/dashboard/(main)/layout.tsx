import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="pl-60 transition-all duration-300">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
