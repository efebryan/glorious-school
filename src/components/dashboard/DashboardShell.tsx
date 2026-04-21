"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { NoticeModal } from "@/components/dashboard/NoticeModal";

// Mock: latest unread announcement pushed from admin
// In production this would come from Supabase realtime or polling
const LATEST_NOTICE = {
  title: "Mid-Term Break Announcement",
  body: "Please be informed that the school will observe a mid-term break starting Friday, February 21st. All students are expected to vacate the premises by 12:00 PM. Classes will resume on Monday, February 26th. Please inform your parents/guardians accordingly. Enjoy your break!",
  category: "General",
  date: "February 10, 2026",
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotice, setShowNotice] = useState(true); // auto-show on load

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar — fixed position */}
      <Sidebar 
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
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 pb-10">
          {children}
        </main>

        {/* Dashboard Footer */}
        <footer className="mt-auto py-6 px-4 lg:px-8 border-t border-slate-200/60 text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Glorious Group of Schools. All rights reserved.</p>
        </footer>
      </div>

      {/* Pop-up Notice Modal — auto-shows when admin sends a new notice */}
      {showNotice && (
        <NoticeModal
          title={LATEST_NOTICE.title}
          body={LATEST_NOTICE.body}
          category={LATEST_NOTICE.category}
          date={LATEST_NOTICE.date}
          onClose={() => setShowNotice(false)}
        />
      )}
    </div>
  );
}
