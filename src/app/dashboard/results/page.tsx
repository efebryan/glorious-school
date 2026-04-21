"use client";

import { useState } from "react";

const TERMS = [
  { value: "2026/2027-2", label: "2026/2027 — 2nd Term (Current)" },
  { value: "2026/2027-1", label: "2026/2027 — 1st Term" },
  { value: "2025/2026-3", label: "2025/2026 — 3rd Term" },
];

const RESULTS = [
  { subject: "Mathematics", ca: 30, exam: 58, total: 88, grade: "A", remark: "Excellent" },
  { subject: "English Language", ca: 26, exam: 50, total: 76, grade: "B", remark: "Very Good" },
  { subject: "Physics", ca: 35, exam: 57, total: 92, grade: "A+", remark: "Outstanding" },
  { subject: "Chemistry", ca: 28, exam: 57, total: 85, grade: "A", remark: "Excellent" },
  { subject: "Biology", ca: 25, exam: 45, total: 70, grade: "B", remark: "Good" },
  { subject: "Further Mathematics", ca: 20, exam: 48, total: 68, grade: "C", remark: "Credit" },
  { subject: "Economics", ca: 22, exam: 55, total: 77, grade: "B", remark: "Very Good" },
  { subject: "Data Processing", ca: 38, exam: 55, total: 93, grade: "A+", remark: "Outstanding" },
];

function gradeColor(grade: string) {
  if (grade.startsWith("A")) return "bg-emerald-100 text-emerald-700";
  if (grade === "B") return "bg-blue-100 text-blue-700";
  return "bg-amber-100 text-amber-700";
}

export default function ResultsPage() {
  const [term, setTerm] = useState(TERMS[0].value);
  const avg = (RESULTS.reduce((s, r) => s + r.total, 0) / RESULTS.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Results</h1>
          <p className="text-slate-500 text-sm mt-0.5">View your academic performance across terms.</p>
        </div>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full sm:w-64 h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition"
        >
          {TERMS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Subjects", value: String(RESULTS.length), accent: false },
          { label: "Average Score", value: `${avg}%`, accent: true },
          { label: "Position", value: "4th / 45", accent: false },
          { label: "Status", value: "Passed", accent: false, badge: true },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-4 sm:p-5 text-center">
            <p className="text-xs text-slate-500 font-medium mb-1">{c.label}</p>
            {c.badge ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 mt-0.5">
                {c.value}
              </span>
            ) : (
              <p className={`text-xl sm:text-2xl font-bold ${c.accent ? "text-brand-green" : "text-slate-900"}`}>
                {c.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Results table */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        {/* Table header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800">
            Statement of Result — {TERMS.find((t) => t.value === term)?.label.split("—")[1]?.trim()}
          </h2>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white border border-slate-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download PDF
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 bg-slate-50/30 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Subject</th>
                <th className="text-center px-3 py-3 font-medium">CA (40)</th>
                <th className="text-center px-3 py-3 font-medium">Exam (60)</th>
                <th className="text-center px-3 py-3 font-medium">Total</th>
                <th className="text-center px-3 py-3 font-medium">Grade</th>
                <th className="text-left px-5 py-3 font-medium">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RESULTS.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{r.subject}</td>
                  <td className="px-3 py-3.5 text-center text-slate-600">{r.ca}</td>
                  <td className="px-3 py-3.5 text-center text-slate-600">{r.exam}</td>
                  <td className="px-3 py-3.5 text-center font-bold text-slate-800">{r.total}</td>
                  <td className="px-3 py-3.5 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-7 rounded text-xs font-bold ${gradeColor(r.grade)}`}>
                      {r.grade}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{r.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
