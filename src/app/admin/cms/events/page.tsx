"use client";

import { useState } from "react";

const MOCK_EVENTS = [
  { id: 1, title: "Inter-House Sports Competition", date: "May 15, 2026", time: "9:00 AM", location: "Main Field", status: "Published", desc: "Annual sports festival featuring track and field events." },
  { id: 2, title: "PTA General Meeting", date: "May 28, 2026", time: "10:00 AM", location: "Auditorium", status: "Published", desc: "Open discussion with parents and teachers." },
  { id: 3, title: "Science & Arts Exhibition", date: "Jun 5, 2026", time: "11:00 AM", location: "Exhibition Hall", status: "Draft", desc: "Students showcase innovative projects." },
  { id: 4, title: "Mid-Term Break Begins", date: "Jun 20, 2026", time: "2:00 PM", location: "School Wide", status: "Published", desc: "Commencement of mid-term holiday." },
  { id: 5, title: "Cultural Day", date: "Jul 1, 2026", time: "9:00 AM", location: "Auditorium", status: "Published", desc: "Celebrating diversity with cultural performances." },
  { id: 6, title: "Graduation & Prize Giving", date: "Jul 22, 2026", time: "10:00 AM", location: "Auditorium", status: "Draft", desc: "Ceremony honoring graduating classes." },
];

export default function EventsManagerPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState<"all" | "Published" | "Draft">("all");

  const filtered = filter === "all" ? MOCK_EVENTS : MOCK_EVENTS.filter((e) => e.status === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Events Manager</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create and manage events shown on the public website</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Create Event
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {["all", "Published", "Draft"].map((f) => (
          <button key={f} onClick={() => setFilter(f as typeof filter)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all capitalize ${filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3.5 font-medium">Event</th>
              <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Date</th>
              <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Time</th>
              <th className="text-left px-4 py-3.5 font-medium hidden lg:table-cell">Location</th>
              <th className="text-center px-4 py-3.5 font-medium">Status</th>
              <th className="text-center px-4 py-3.5 font-medium">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-800">{e.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:hidden">{e.date}</p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{e.date}</td>
                  <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{e.time}</td>
                  <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell">{e.location}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${e.status === "Published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-xs text-brand-green font-semibold hover:underline">Edit</button>
                      <button className="text-xs text-red-500 font-semibold hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-brand-green-500 to-purple-500" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Create New Event</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Event Title</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" placeholder="e.g. Science Fair" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Date</label><input type="date" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" /></div>
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Time</label><input type="time" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" /></div>
                </div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Location</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" placeholder="e.g. School Auditorium" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Description</label><textarea rows={3} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none resize-none" placeholder="Brief description of the event..." /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Status</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none"><option>Draft</option><option>Published</option></select></div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Create Event</button>
                <button onClick={() => setShowCreate(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
