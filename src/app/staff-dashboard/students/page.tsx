"use client";

import { useState } from "react";

const MOCK_STUDENTS = [
  { id: "S001", name: "John Doe", admNo: "GGS/2024/0014", class: "SS 2", dept: "Science", status: "Active", gender: "M" },
  { id: "S002", name: "Jane Doe", admNo: "GGS/2025/0089", class: "JSS 1", dept: "General", status: "Active", gender: "F" },
  { id: "S003", name: "Emeka Obi", admNo: "GGS/2024/0032", class: "SS 1", dept: "Commercial", status: "Active", gender: "M" },
  { id: "S004", name: "Blessing Eze", admNo: "GGS/2023/0008", class: "SS 3", dept: "Science", status: "Active", gender: "F" },
  { id: "S005", name: "Ahmed Musa", admNo: "GGS/2024/0045", class: "SS 2", dept: "Arts", status: "Suspended", gender: "M" },
  { id: "S006", name: "Grace Akpan", admNo: "GGS/2025/0101", class: "JSS 2", dept: "General", status: "Active", gender: "F" },
  { id: "S007", name: "Chinedu Nwankwo", admNo: "GGS/2024/0058", class: "SS 1", dept: "Science", status: "Active", gender: "M" },
  { id: "S008", name: "Fatima Bello", admNo: "GGS/2023/0022", class: "SS 3", dept: "Commercial", status: "Active", gender: "F" },
  { id: "S009", name: "David Okon", admNo: "GGS/2025/0113", class: "JSS 1", dept: "General", status: "Active", gender: "M" },
  { id: "S010", name: "Mary Johnson", admNo: "GGS/2024/0067", class: "SS 2", dept: "Science", status: "Active", gender: "F" },
];

const CLASSES = ["All", "JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"];
const STATUSES = ["All", "Active", "Suspended", "Expelled"];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = MOCK_STUDENTS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.admNo.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || s.class === classFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchClass && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">View and manage student profiles</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search by name or admission number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
        >
          {CLASSES.map((c) => <option key={c} value={c}>{c === "All" ? "All Classes" : c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>)}
        </select>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Student</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Admission No.</th>
                <th className="text-left px-4 py-3.5 font-medium">Class</th>
                <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Department</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
                <th className="text-center px-4 py-3.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-bold text-brand-green flex items-center justify-center shrink-0">
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{s.name}</p>
                        <p className="text-[11px] text-slate-400 sm:hidden">{s.admNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{s.admNo}</td>
                  <td className="px-4 py-3.5 text-slate-700 font-medium">{s.class}</td>
                  <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{s.dept}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      s.status === "Active" ? "bg-green-100 text-green-700" :
                      s.status === "Suspended" ? "bg-red-100 text-red-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button className="text-brand-green hover:text-brand-green-700 text-xs font-semibold hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-slate-400">No students match your filters.</div>
        )}
      </div>

      {/* Summary bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filtered.length} of {MOCK_STUDENTS.length} students</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors font-medium" disabled>Previous</button>
          <button className="px-3 py-1.5 bg-brand-green text-white rounded-md font-medium">1</button>
          <button className="px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors font-medium" disabled>Next</button>
        </div>
      </div>

      {/* Add Student Modal (UI Mock) */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Student</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Full Name</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="e.g. John Doe" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Class</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none bg-white"><option>JSS 1</option><option>JSS 2</option><option>JSS 3</option><option>SS 1</option><option>SS 2</option><option>SS 3</option></select></div>
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Department</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none bg-white"><option>General</option><option>Science</option><option>Commercial</option><option>Arts</option></select></div>
                </div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Parent/Guardian Email</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="parent@example.com" /></div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Save Student</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
