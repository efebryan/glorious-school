"use client";

import { useState } from "react";

const MOCK_BROADCASTS = [
  { id: 1, title: "Mid-Term Break Notice", target: "All", channel: "Portal + SMS", published: "Feb 10, 2026", reach: 1200, status: "Active" },
  { id: 2, title: "PTA Meeting Reminder", target: "Parents", channel: "Portal", published: "Feb 8, 2026", reach: 420, status: "Active" },
  { id: 3, title: "Exam Timetable Published", target: "Students + Staff", channel: "Portal", published: "Feb 5, 2026", reach: 1050, status: "Active" },
  { id: 4, title: "Fee Payment Deadline", target: "Parents", channel: "Portal + SMS", published: "Jan 25, 2026", reach: 412, status: "Expired" },
  { id: 5, title: "Christmas Break", target: "All", channel: "Portal", published: "Dec 12, 2025", reach: 1450, status: "Expired" },
];

export default function CommunicationsPage() {
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Announcements & Broadcasts</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create and manage system-wide announcements</p>
        </div>
        <button onClick={() => setShowCompose(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          New Broadcast
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200/60 p-4">
          <p className="text-xs text-slate-500">Active Broadcasts</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">3</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4">
          <p className="text-xs text-slate-500">Total Reach</p>
          <p className="text-2xl font-bold text-green-700 mt-1">2,670</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4">
          <p className="text-xs text-slate-500">All-Time Sent</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">5</p>
        </div>
      </div>

      {/* Broadcasts Table */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3.5 font-medium">Announcement</th>
              <th className="text-center px-4 py-3.5 font-medium hidden sm:table-cell">Target</th>
              <th className="text-center px-4 py-3.5 font-medium hidden md:table-cell">Channel</th>
              <th className="text-center px-4 py-3.5 font-medium hidden lg:table-cell">Reach</th>
              <th className="text-center px-4 py-3.5 font-medium">Status</th>
              <th className="text-center px-4 py-3.5 font-medium">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_BROADCASTS.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-800">{b.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{b.published}</p>
                  </td>
                  <td className="px-4 py-3.5 text-center hidden sm:table-cell"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{b.target}</span></td>
                  <td className="px-4 py-3.5 text-center text-slate-600 hidden md:table-cell">{b.channel}</td>
                  <td className="px-4 py-3.5 text-center text-slate-600 font-semibold hidden lg:table-cell">{b.reach.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-center"><span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${b.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{b.status}</span></td>
                  <td className="px-4 py-3.5 text-center">
                    <button className="text-xs text-indigo-600 font-semibold hover:underline">{b.status === "Active" ? "Expire" : "Re-send"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCompose(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">New Broadcast</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Title</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/30 focus:outline-none" placeholder="Announcement title" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Message</label><textarea rows={4} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/30 focus:outline-none resize-none" placeholder="Write your announcement..." /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Target Audience</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"><option>All</option><option>Students Only</option><option>Parents Only</option><option>Staff Only</option></select></div>
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Channel</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"><option>Portal Only</option><option>Portal + SMS</option><option>Portal + Email</option></select></div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors">Send Broadcast</button>
                <button onClick={() => setShowCompose(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
