"use client";

import { useState, useRef, useEffect } from "react";
import { ADMIN_UNREAD_COUNT } from "@/lib/admin-config";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "results",
    title: "Pending Approval: JSS3 Results",
    body: "The Vice Principal has submitted the JSS3 mock results for your final approval.",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "users",
    title: "New Registration Alert",
    body: "A new parent account has been created via the admissions portal.",
    time: "30 min ago",
    read: false,
  },
  {
    id: 3,
    type: "finance",
    title: "Large Payment Received",
    body: "₦1,500,000 has been verified for the upcoming school trip.",
    time: "2 hrs ago",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "Weekly Backup Failed",
    body: "The automated cloud backup encountered an error at 3:00 AM.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 5,
    type: "cms",
    title: "Holiday Settings Updated",
    body: "The academic calendar has been synced with the latest public holidays.",
    time: "2 days ago",
    read: true,
  },
];

const TYPE_ICONS: Record<string, string> = {
  results: "📝",
  users: "👤",
  finance: "💰",
  system: "⚠️",
  cms: "🌐",
};

export function AdminNotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {ADMIN_UNREAD_COUNT > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            {ADMIN_UNREAD_COUNT}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl border border-slate-200/80 shadow-xl z-50 overflow-hidden animate-fade-in-up">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Alerts & Notifications</h3>
            <span className="text-[11px] font-semibold text-brand-green cursor-pointer hover:underline">
              Mark all read
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className={`px-4 py-3 flex gap-3 items-start hover:bg-slate-50/60 transition-colors cursor-pointer ${
                  !n.read ? "bg-brand-green-50/30" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0 shadow-sm border border-slate-200/50">
                  {TYPE_ICONS[n.type] ?? "🔔"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm truncate ${!n.read ? "font-semibold text-slate-800" : "font-medium text-slate-600"}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.body}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 mt-1.5" />
                )}
              </div>
            ))}
          </div>

          <div className="px-4 py-2.5 border-t border-slate-100 text-center bg-slate-50">
            <span className="text-xs font-semibold text-brand-green cursor-pointer hover:underline">
              View all notifications →
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
