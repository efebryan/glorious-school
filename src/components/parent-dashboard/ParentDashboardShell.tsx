"use client";

import { useState } from "react";
import { ParentSidebar } from "@/components/parent-dashboard/ParentSidebar";
import { ParentTopBar } from "@/components/parent-dashboard/ParentTopBar";

export function ParentDashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar — fixed position */}
      <ParentSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Main content — offset by sidebar width on desktop */}
      <div 
        className={`min-h-screen flex flex-col transition-[margin] duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-[84px]" : "lg:ml-[260px]"
        }`}
      >
        {/* Top Header */}
        <ParentTopBar />

        {/* Page Content */}
        <main className="flex-1 pb-10">
          {children}
        </main>

        {/* Dashboard Footer */}
        <footer className="mt-auto py-6 px-4 lg:px-8 border-t border-slate-200/60 text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Glorious Group of Schools. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
