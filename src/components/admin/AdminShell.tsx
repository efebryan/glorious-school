"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { AdminRole } from "@/lib/admin-config";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState<AdminRole>("super_admin");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
      />

      {/* Main content — offset by sidebar width on desktop */}
      <div
        className={`min-h-screen flex flex-col transition-[margin] duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-[84px]" : "lg:ml-[270px]"
        }`}
      >
        {/* Page Content */}
        <main className="flex-1 pb-10">{children}</main>

        {/* Dashboard Footer */}
        <footer className="mt-auto py-6 px-4 lg:px-8 border-t border-slate-200/60 text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Glorious Group of Schools — Admin Panel</p>
        </footer>
      </div>
    </div>
  );
}
