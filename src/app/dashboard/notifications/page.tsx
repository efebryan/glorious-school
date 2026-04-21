"use client";

import { useState } from "react";

const TABS = ["All", "Unread", "Academic", "Financial", "General"] as const;
type Tab = typeof TABS[number];

const NOTIFICATIONS = [
  { id: 1, title: "Mid-Term Break Announcement", body: "Please be informed that the school will observe a mid-term break starting February 21st. Classes will resume on Monday, February 26th. Enjoy your holiday!", category: "General" as const, date: "Feb 10, 2026", read: false },
  { id: 2, title: "Continuous Assessment Test 1", body: "The first Continuous Assessment test for the term has been scheduled for next week. Please check your timetable for individual subject test slots.", category: "Academic" as const, date: "Feb 5, 2026", read: true },
  { id: 3, title: "Extracurricular Registrations Closing", body: "Reminder: Registration for the Jet/ICT Club and the Sports Academy will close this Friday. Please see the admin office if you wish to join.", category: "General" as const, date: "Feb 1, 2026", read: true },
  { id: 4, title: "School Fees Reminder", body: "Dear student/parent, please note that second term school fees is overdue. Ensure to clear all outstanding balances before the CA tests to avoid disruptions.", category: "Financial" as const, date: "Jan 15, 2026", read: true },
  { id: 5, title: "Library Hours Extended", body: "The school library will now be open until 5:00 PM on weekdays to support revision for the upcoming examinations.", category: "Academic" as const, date: "Jan 10, 2026", read: true },
];

function categoryColor(c: string) {
  if (c === "Academic") return "bg-blue-100 text-blue-700";
  if (c === "Financial") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-600";
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = NOTIFICATIONS.filter((n) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !n.read;
    return n.category === activeTab;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">Stay up to date with school announcements.</p>
        </div>
        <button className="text-xs font-semibold text-brand-green hover:underline shrink-0">
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-slate-800 text-white"
                : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
            }`}
          >
            {tab}
            {tab === "Unread" && (
              <span className="ml-1 text-[10px]">({NOTIFICATIONS.filter((n) => !n.read).length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg mb-1">📭</p>
            <p className="text-sm font-medium">No notifications in this category.</p>
          </div>
        )}
        {filtered.map((note) => (
          <div
            key={note.id}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${
              note.read
                ? "bg-white border-slate-200/60 hover:border-slate-300"
                : "bg-brand-green-50/30 border-brand-green/20 hover:border-brand-green/40"
            }`}
          >
            <div className="flex items-start gap-3">
              {!note.read && (
                <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm sm:text-base font-bold ${note.read ? "text-slate-700" : "text-slate-900"}`}>
                  {note.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1.5 line-clamp-2">
                  {note.body}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${categoryColor(note.category)}`}>
                    {note.category}
                  </span>
                  <span className="text-[11px] text-slate-400">{note.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
