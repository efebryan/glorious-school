"use client";

import { useState } from "react";
import { StaffSidebar } from "@/components/staff-dashboard/StaffSidebar";
import { StaffTopBar } from "@/components/staff-dashboard/StaffTopBar";
import { StaffRole } from "@/lib/staff-dashboard-config";

// Mock: latest staff notice
const LATEST_NOTICE = {
  title: "Term 2 Result Submission Deadline",
  body: "All subject teachers are reminded to submit their continuous assessment and exam scores by Friday, March 7th. Results not submitted by the deadline will not be included in the term report cards. Please ensure all scores are accurate before submission.",
  category: "Admin",
  date: "February 24, 2026",
};

export function StaffDashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const [activeRole, setActiveRole] = useState<StaffRole>("teacher");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <StaffSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
      />

      {/* Main content — offset by sidebar width on desktop */}
      <div
        className={`min-h-screen flex flex-col transition-[margin] duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-[84px]" : "lg:ml-[260px]"
        }`}
      >
        {/* Top Header */}
        <StaffTopBar activeRole={activeRole} onRoleChange={setActiveRole} />

        {/* Page Content */}
        <main className="flex-1 pb-10">{children}</main>

        {/* Dashboard Footer */}
        <footer className="mt-auto py-6 px-4 lg:px-8 border-t border-slate-200/60 text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Glorious Group of Schools. All rights reserved.</p>
        </footer>
      </div>

      {/* Pop-up Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setShowNotice(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-0 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-green-700 to-brand-green px-6 py-4 flex items-start justify-between">
              <div>
                <span className="inline-block text-[10px] font-bold text-white/70 bg-white/15 px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                  {LATEST_NOTICE.category}
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  {LATEST_NOTICE.title}
                </h3>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="p-1 text-white/60 hover:text-white rounded-md transition-colors shrink-0 ml-3"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-sm text-slate-600 leading-relaxed">{LATEST_NOTICE.body}</p>
              <p className="text-xs text-slate-400 mt-4">{LATEST_NOTICE.date}</p>
            </div>
            {/* Footer */}
            <div className="px-6 pb-5">
              <button
                onClick={() => setShowNotice(false)}
                className="w-full py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
