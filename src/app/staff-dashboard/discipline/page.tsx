"use client";

import { useState } from "react";

const MOCK_CASES = [
  { id: 1, student: "Ahmed Musa", class: "SS 2", offence: "Persistent lateness to school", date: "Feb 20, 2026", severity: "Minor", status: "Open", action: "Verbal warning issued" },
  { id: 2, student: "David Okon", class: "JSS 1", offence: "Fighting during break time", date: "Feb 18, 2026", severity: "Major", status: "Open", action: "Parents invited for meeting" },
  { id: 3, student: "Emeka Obi", class: "SS 1", offence: "Phone usage during classes", date: "Feb 15, 2026", severity: "Minor", status: "Resolved", action: "Phone confiscated, returned after 1 week" },
  { id: 4, student: "Grace Akpan", class: "JSS 2", offence: "Skipping afternoon lessons", date: "Feb 12, 2026", severity: "Moderate", status: "Resolved", action: "Counselling session completed" },
  { id: 5, student: "Chinedu Nwankwo", class: "SS 1", offence: "Vandalism of lab equipment", date: "Feb 10, 2026", severity: "Major", status: "Open", action: "Under investigation" },
];

const SEVERITY_COLORS: Record<string, string> = {
  Minor: "bg-blue-100 text-blue-700",
  Moderate: "bg-amber-100 text-amber-700",
  Major: "bg-red-100 text-red-700",
};

export default function DisciplinePage() {
  const [showModal, setShowModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = MOCK_CASES.filter((c) => {
    const matchSeverity = filterSeverity === "All" || c.severity === filterSeverity;
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSeverity && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Discipline Records</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track and manage student disciplinary cases</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add Record
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{MOCK_CASES.length}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Total Cases</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{MOCK_CASES.filter(c => c.status === "Open").length}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Open Cases</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{MOCK_CASES.filter(c => c.status === "Resolved").length}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
        >
          <option>All</option><option>Minor</option><option>Moderate</option><option>Major</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
        >
          <option>All</option><option>Open</option><option>Resolved</option>
        </select>
      </div>

      {/* Cases table */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Student</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Class</th>
                <th className="text-left px-4 py-3.5 font-medium">Offence</th>
                <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Date</th>
                <th className="text-center px-4 py-3.5 font-medium">Severity</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{c.student}</td>
                  <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{c.class}</td>
                  <td className="px-4 py-3.5 text-slate-700 max-w-[200px] truncate">{c.offence}</td>
                  <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{c.date}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${SEVERITY_COLORS[c.severity]}`}>
                      {c.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      c.status === "Open" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-slate-400">No cases match your filters.</div>
        )}
      </div>

      {/* Add Record Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">New Discipline Record</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Student Name</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="Search student..." /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Offence Description</label><textarea className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none h-20 resize-none" placeholder="Describe the offence..." /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Severity</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-green/30 focus:outline-none"><option>Minor</option><option>Moderate</option><option>Major</option></select></div>
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Action Taken</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-green/30 focus:outline-none"><option>Verbal Warning</option><option>Written Warning</option><option>Suspension</option><option>Parent Meeting</option><option>Counselling</option></select></div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Save Record</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
