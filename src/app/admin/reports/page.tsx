"use client";

import { useState } from "react";

const REPORTS = [
  { name: "Student Demographics", icon: "👤", desc: "Enrollment breakdown by class, gender, and department", color: "bg-blue-50 border-blue-200" },
  { name: "Academic Performance", icon: "📊", desc: "Average scores, top performers, pass rates by subject", color: "bg-green-50 border-green-200" },
  { name: "Attendance Summary", icon: "📋", desc: "Monthly attendance rates by class and overall trends", color: "bg-purple-50 border-purple-200" },
  { name: "Financial Statement", icon: "💰", desc: "Income vs expenditure, collection rates, outstanding fees", color: "bg-emerald-50 border-emerald-200" },
  { name: "Staff Workload", icon: "👨‍🏫", desc: "Teaching load per staff — classes and subjects assigned", color: "bg-amber-50 border-amber-200" },
  { name: "Result Completion", icon: "📝", desc: "Submission status percentage across all classes and subjects", color: "bg-red-50 border-red-200" },
];

const ENROLLMENT_DATA = [
  { level: "Nursery", male: 32, female: 21, total: 53 },
  { level: "Primary", male: 108, female: 95, total: 203 },
  { level: "Junior Secondary", male: 65, female: 55, total: 120 },
  { level: "Senior Secondary", male: 62, female: 57, total: 119 },
];

const PERFORMANCE_DATA = [
  { subject: "Mathematics", avgScore: 68, passRate: "85%", topStudent: "Blessing Eze" },
  { subject: "English", avgScore: 72, passRate: "92%", topStudent: "Jane Doe" },
  { subject: "Physics", avgScore: 65, passRate: "80%", topStudent: "John Doe" },
  { subject: "Biology", avgScore: 70, passRate: "88%", topStudent: "Grace Akpan" },
  { subject: "Economics", avgScore: 74, passRate: "91%", topStudent: "Emeka Obi" },
];

export default function ReportsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate and export data reports across all modules</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">Export All as PDF</button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {REPORTS.map((r) => (
          <button
            key={r.name}
            onClick={() => setExpanded(expanded === r.name ? null : r.name)}
            className={`text-left rounded-xl border p-5 hover:shadow-md transition-all ${r.color} ${expanded === r.name ? "ring-2 ring-indigo-200" : ""}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{r.icon}</span>
              <h3 className="text-sm font-bold text-slate-800">{r.name}</h3>
            </div>
            <p className="text-[11px] text-slate-600">{r.desc}</p>
            <p className="text-[10px] text-indigo-600 font-semibold mt-3">Click to preview →</p>
          </button>
        ))}
      </div>

      {/* Expanded Report Previews */}
      {expanded === "Student Demographics" && (
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden animate-fade-in-up">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Student Demographics — Enrollment by Level</h2>
            <button className="text-xs text-indigo-600 font-semibold hover:underline">Export CSV</button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">Level</th>
              <th className="text-center px-4 py-3 font-medium">Male</th>
              <th className="text-center px-4 py-3 font-medium">Female</th>
              <th className="text-center px-4 py-3 font-medium">Total</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {ENROLLMENT_DATA.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-semibold text-slate-800">{d.level}</td>
                  <td className="px-4 py-3 text-center text-blue-600 font-semibold">{d.male}</td>
                  <td className="px-4 py-3 text-center text-pink-600 font-semibold">{d.female}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-900">{d.total}</td>
                </tr>
              ))}
              <tr className="bg-slate-50/60 font-bold">
                <td className="px-5 py-3 text-slate-800">Total</td>
                <td className="px-4 py-3 text-center text-blue-700">{ENROLLMENT_DATA.reduce((a, d) => a + d.male, 0)}</td>
                <td className="px-4 py-3 text-center text-pink-700">{ENROLLMENT_DATA.reduce((a, d) => a + d.female, 0)}</td>
                <td className="px-4 py-3 text-center text-slate-900">{ENROLLMENT_DATA.reduce((a, d) => a + d.total, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {expanded === "Academic Performance" && (
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden animate-fade-in-up">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Academic Performance — Subject Averages</h2>
            <button className="text-xs text-indigo-600 font-semibold hover:underline">Export CSV</button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">Subject</th>
              <th className="text-center px-4 py-3 font-medium">Avg Score</th>
              <th className="text-center px-4 py-3 font-medium">Pass Rate</th>
              <th className="text-left px-4 py-3 font-medium">Top Student</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {PERFORMANCE_DATA.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-semibold text-slate-800">{d.subject}</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700">{d.avgScore}</td>
                  <td className="px-4 py-3 text-center"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{d.passRate}</span></td>
                  <td className="px-4 py-3 text-slate-600">{d.topStudent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {expanded && !["Student Demographics", "Academic Performance"].includes(expanded) && (
        <div className="bg-white rounded-xl border border-slate-200/60 p-8 text-center animate-fade-in-up">
          <span className="text-4xl mb-3 block">{REPORTS.find((r) => r.name === expanded)?.icon}</span>
          <p className="text-sm font-semibold text-slate-700 mb-1">{expanded}</p>
          <p className="text-xs text-slate-500">Detailed report data will load from the database in the backend phase.</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors">Export as PDF</button>
        </div>
      )}
    </div>
  );
}
