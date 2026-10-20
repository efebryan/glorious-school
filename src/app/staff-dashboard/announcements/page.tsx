"use client";

import { useState } from "react";

const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: "Mid-Term Break Announcement", body: "The school will observe a mid-term break starting Friday, February 21st. All students are expected to vacate by 12:00 PM.", category: "General", audience: "All", status: "Published", date: "Feb 10, 2026" },
  { id: 2, title: "PTA Meeting Rescheduled", body: "The PTA meeting originally scheduled for Friday has been moved to next week. All parents should be informed.", category: "Academic", audience: "Parents", status: "Published", date: "Feb 8, 2026" },
  { id: 3, title: "Inter-House Sports Registration", body: "Registration for inter-house sports is now open. Students should register through their class teachers by March 1st.", category: "Events", audience: "Students", status: "Published", date: "Feb 5, 2026" },
  { id: 4, title: "Staff Meeting Reminder", body: "All staff are expected to attend the general meeting scheduled for Friday at 10:00 AM.", category: "Admin", audience: "Staff", status: "Draft", date: "Feb 24, 2026" },
  { id: 5, title: "End of Term Exam Schedule", body: "The exam timetable for second term will be published next week. Teachers should finalize their syllabi.", category: "Academic", audience: "All", status: "Draft", date: "Feb 22, 2026" },
];

const CATEGORY_COLORS: Record<string, string> = {
  General: "bg-blue-100 text-blue-700",
  Academic: "bg-green-100 text-green-700",
  Events: "bg-purple-100 text-purple-700",
  Admin: "bg-amber-100 text-amber-700",
};

const AUDIENCE_ICONS: Record<string, React.ReactNode> = {
  All: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Students: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Parents: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Staff: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<"published" | "draft">("published");
  const [showCompose, setShowCompose] = useState(false);

  const items = MOCK_ANNOUNCEMENTS.filter(a =>
    activeTab === "published" ? a.status === "Published" : a.status === "Draft"
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Announcements</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create and manage school announcements</p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          New Announcement
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("published")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
            activeTab === "published" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Published ({MOCK_ANNOUNCEMENTS.filter(a => a.status === "Published").length})
        </button>
        <button
          onClick={() => setActiveTab("draft")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
            activeTab === "draft" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Drafts ({MOCK_ANNOUNCEMENTS.filter(a => a.status === "Draft").length})
        </button>
      </div>

      {/* Announcement Feed */}
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-slate-200/60 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[a.category] ?? "bg-slate-100 text-slate-600"}`}>
                    {a.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    {AUDIENCE_ICONS[a.audience]} {a.audience}
                  </span>
                  <span className="text-[10px] text-slate-400">· {a.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">{a.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{a.body}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button className="text-xs text-brand-green font-semibold hover:underline">Edit</button>
                <span className="text-slate-300">·</span>
                <button className="text-xs text-red-500 font-semibold hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-400">No {activeTab} announcements.</div>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCompose(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Create Announcement</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Title</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="Announcement title" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Body</label><textarea className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none h-28 resize-none" placeholder="Write your announcement..." /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Category</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-green/30 focus:outline-none"><option>General</option><option>Academic</option><option>Events</option><option>Admin</option></select></div>
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Target Audience</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-green/30 focus:outline-none"><option>All</option><option>Students</option><option>Parents</option><option>Staff</option></select></div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Publish</button>
                <button className="px-4 py-2.5 border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Save Draft</button>
                <button onClick={() => setShowCompose(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
