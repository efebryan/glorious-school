"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const MINI_NOTIFICATIONS = [
  { id: 1, title: "Fee Receipt Sent", body: "Receipt for John Doe's 2nd term fee.", time: "1h ago", read: false },
  { id: 2, title: "PTA Meeting Update", body: "The upcoming PTA meeting has been moved to next Friday.", time: "2h ago", read: false },
  { id: 3, title: "Jane's Absence", body: "Jane Doe missed the first period today.", time: "1d ago", read: true },
];

export function ParentNotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = MINI_NOTIFICATIONS.filter((n) => !n.read).length;

  // Close on outside click/touch
  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("touchstart", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        )}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-200 origin-top-right z-50 ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-sm text-slate-800">Messages</h3>
          {unreadCount > 0 && (
            <span className="text-[11px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        {/* List */}
        <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100">
          {MINI_NOTIFICATIONS.map((n) => (
            <button
              key={n.id}
              onClick={() => setOpen(false)}
              className={`w-full text-left px-4 py-3.5 flex gap-3 items-start hover:bg-slate-50 transition-colors ${
                !n.read ? "bg-brand-green-50/20" : ""
              }`}
            >
              {/* Unread dot */}
              <div className="mt-1.5 shrink-0">
                {!n.read ? (
                  <span className="block w-2 h-2 rounded-full bg-brand-green" />
                ) : (
                  <span className="block w-2 h-2 rounded-full bg-transparent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-tight truncate ${!n.read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                  {n.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.body}</p>
                <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2.5 bg-slate-50/50">
          <Link
            href="/parent-dashboard/messages"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold text-brand-green hover:underline flex items-center justify-center gap-1"
          >
            View all messages
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
