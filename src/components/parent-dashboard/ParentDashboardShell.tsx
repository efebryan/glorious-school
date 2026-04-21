"use client";

import { useState } from "react";
import { ParentSidebar } from "@/components/parent-dashboard/ParentSidebar";
import { ParentTopBar } from "@/components/parent-dashboard/ParentTopBar";
import { NoticeModal } from "@/components/dashboard/NoticeModal";

// Mock: latest unread announcement pushed from admin
const LATEST_NOTICE = {
  title: "PTA Meeting Rescheduled",
  body: "Please be informed that the upcoming PTA meeting has been moved to next week Friday, March 22nd. Attendance is mandatory for all parents/guardians. The meeting will take place at the school assembly hall starting at 9:00 AM. Thank you for your cooperation.",
  category: "General",
  date: "March 15, 2026",
};

export function ParentDashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100">
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
