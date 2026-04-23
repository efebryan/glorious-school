"use client";

import { useState } from "react";
import { MOCK_STAFF } from "@/lib/staff-dashboard-config";

// Mock data for results
const MOCK_CLASS_RESULTS = [
  { student: "John Doe", admNo: "GGS/2024/0014", ca1: 18, ca2: 15, exam: 55, total: 88, grade: "A" },
  { student: "Jane Doe", admNo: "GGS/2025/0089", ca1: 14, ca2: 12, exam: 50, total: 76, grade: "B" },
  { student: "Emeka Obi", admNo: "GGS/2024/0032", ca1: 20, ca2: 18, exam: 54, total: 92, grade: "A" },
  { student: "Blessing Eze", admNo: "GGS/2023/0008", ca1: 16, ca2: 14, exam: 55, total: 85, grade: "A" },
  { student: "Mary Johnson", admNo: "GGS/2024/0067", ca1: 10, ca2: 12, exam: 40, total: 62, grade: "C" },
  { student: "Chinedu Nwankwo", admNo: "GGS/2024/0058", ca1: 12, ca2: 10, exam: 35, total: 57, grade: "C" },
];

const PENDING_APPROVALS = [
  { id: 1, subject: "Physics", class: "SS 2", teacher: "Mrs. Adaeze Okonkwo", submitted: "Feb 25, 2026", students: 45, status: "Pending" },
  { id: 2, subject: "Mathematics", class: "SS 1", teacher: "Mr. James Okafor", submitted: "Feb 24, 2026", students: 52, status: "Pending" },
  { id: 3, subject: "English Language", class: "SS 2", teacher: "Mrs. Ngozi Eze", submitted: "Feb 23, 2026", students: 45, status: "Pending" },
  { id: 4, subject: "Chemistry", class: "SS 3", teacher: "Dr. Uche Nwosu", submitted: "Feb 22, 2026", students: 38, status: "Approved" },
  { id: 5, subject: "Biology", class: "SS 1", teacher: "Mrs. Amara Ibe", submitted: "Feb 21, 2026", students: 52, status: "Approved" },
];

function GradeBadge({ grade }: { grade: string }) {
  const cls = grade === "A" ? "bg-emerald-100 text-emerald-700" : grade === "B" ? "bg-blue-100 text-blue-700" : grade === "C" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
  return <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold ${cls}`}>{grade}</span>;
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<"entry" | "approval">(
    MOCK_STAFF.role === "principal" ? "approval" : "entry"
  );
  const [selectedClass, setSelectedClass] = useState("SS 2");
  const [selectedSubject, setSelectedSubject] = useState("Physics");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Results</h1>
        <p className="text-sm text-slate-500 mt-0.5">Enter scores and manage result approvals</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("entry")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
            activeTab === "entry" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          📝 Score Entry
        </button>
        <button
          onClick={() => setActiveTab("approval")}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
            activeTab === "approval" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          ✅ Approval Queue
        </button>
      </div>

      {activeTab === "entry" ? (
        /* ----- Score Entry Tab ----- */
        <div className="space-y-4">
          {/* Class & Subject selectors */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
            >
              <option>SS 1</option><option>SS 2</option><option>SS 3</option>
              <option>JSS 1</option><option>JSS 2</option><option>JSS 3</option>
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
            >
              <option>Physics</option><option>Mathematics</option><option>English Language</option>
              <option>Chemistry</option><option>Biology</option>
            </select>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-medium text-slate-400">Status:</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>
            </div>
          </div>

          {/* Score entry table */}
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3.5 font-medium">Student</th>
                    <th className="text-center px-3 py-3.5 font-medium">CA 1 (20)</th>
                    <th className="text-center px-3 py-3.5 font-medium">CA 2 (20)</th>
                    <th className="text-center px-3 py-3.5 font-medium">Exam (60)</th>
                    <th className="text-center px-3 py-3.5 font-medium">Total</th>
                    <th className="text-center px-3 py-3.5 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_CLASS_RESULTS.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium text-slate-700">{r.student}</p>
                        <p className="text-[11px] text-slate-400">{r.admNo}</p>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          defaultValue={r.ca1}
                          min={0}
                          max={20}
                          className="w-14 text-center text-sm border border-slate-200 rounded-md py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          defaultValue={r.ca2}
                          min={0}
                          max={20}
                          className="w-14 text-center text-sm border border-slate-200 rounded-md py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          defaultValue={r.exam}
                          min={0}
                          max={60}
                          className="w-14 text-center text-sm border border-slate-200 rounded-md py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                        />
                      </td>
                      <td className="px-3 py-3 text-center font-bold text-slate-700">{r.total}</td>
                      <td className="px-3 py-3 text-center"><GradeBadge grade={r.grade} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button className="px-5 py-2.5 border border-slate-200 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
              Save as Draft
            </button>
            <button className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              Submit for Review
            </button>
          </div>
        </div>
      ) : (
        /* ----- Approval Queue Tab ----- */
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">{PENDING_APPROVALS.filter(p => p.status === "Pending").length} results pending approval</span>
            <button className="ml-auto px-4 py-2 bg-brand-green hover:bg-brand-green-700 text-white text-xs font-semibold rounded-lg transition-colors">
              Approve All Pending
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3.5 font-medium">Subject</th>
                    <th className="text-left px-4 py-3.5 font-medium">Class</th>
                    <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Teacher</th>
                    <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Submitted</th>
                    <th className="text-center px-4 py-3.5 font-medium">Students</th>
                    <th className="text-center px-4 py-3.5 font-medium">Status</th>
                    <th className="text-center px-4 py-3.5 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PENDING_APPROVALS.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-slate-800">{p.subject}</td>
                      <td className="px-4 py-3.5 text-slate-600">{p.class}</td>
                      <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{p.teacher}</td>
                      <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">{p.submitted}</td>
                      <td className="px-4 py-3.5 text-center text-slate-600">{p.students}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {p.status === "Pending" ? (
                          <div className="flex gap-1.5 justify-center">
                            <button className="text-[11px] font-semibold text-green-600 hover:underline">Approve</button>
                            <span className="text-slate-300">|</span>
                            <button className="text-[11px] font-semibold text-red-500 hover:underline">Reject</button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
