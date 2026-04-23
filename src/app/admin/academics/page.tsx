"use client";

import { useState } from "react";

const CLASSES = [
  { section: "Nursery", classes: [{ name: "Nursery 1", capacity: 30, enrolled: 25, teacher: "Mrs. Abiola", subjects: 6 }, { name: "Nursery 2", capacity: 30, enrolled: 28, teacher: "Mrs. Dayo", subjects: 6 }] },
  { section: "Primary", classes: [{ name: "Primary 1", capacity: 35, enrolled: 32, teacher: "Mrs. Ojo", subjects: 8 }, { name: "Primary 2", capacity: 35, enrolled: 30, teacher: "Mrs. Kalu", subjects: 8 }, { name: "Primary 3", capacity: 35, enrolled: 33, teacher: "Mr. Bello", subjects: 8 }, { name: "Primary 4", capacity: 35, enrolled: 34, teacher: "Mrs. Ada", subjects: 10 }, { name: "Primary 5", capacity: 40, enrolled: 36, teacher: "Mr. Uche", subjects: 10 }, { name: "Primary 6", capacity: 40, enrolled: 38, teacher: "Mrs. Ngozi", subjects: 10 }] },
  { section: "Junior Secondary", classes: [{ name: "JSS 1", capacity: 45, enrolled: 42, teacher: "Mr. Eze", subjects: 12 }, { name: "JSS 2", capacity: 45, enrolled: 40, teacher: "Mrs. Peters", subjects: 12 }, { name: "JSS 3", capacity: 45, enrolled: 38, teacher: "Mr. Sule", subjects: 12 }] },
  { section: "Senior Secondary", classes: [{ name: "SS 1", capacity: 45, enrolled: 44, teacher: "Mr. James", subjects: 14 }, { name: "SS 2", capacity: 45, enrolled: 40, teacher: "Mrs. Okonkwo", subjects: 14 }, { name: "SS 3", capacity: 45, enrolled: 35, teacher: "Mr. David", subjects: 14 }] },
];

const SUBJECTS = [
  { name: "Mathematics", levels: "Primary 1 – SS 3", teachers: 3, status: "Active" },
  { name: "English Language", levels: "Primary 1 – SS 3", teachers: 3, status: "Active" },
  { name: "Physics", levels: "SS 1 – SS 3", teachers: 1, status: "Active" },
  { name: "Chemistry", levels: "SS 1 – SS 3", teachers: 1, status: "Active" },
  { name: "Biology", levels: "SS 1 – SS 3", teachers: 1, status: "Active" },
  { name: "Economics", levels: "SS 1 – SS 3", teachers: 1, status: "Active" },
  { name: "Government", levels: "SS 1 – SS 3", teachers: 1, status: "Active" },
  { name: "Civic Education", levels: "JSS 1 – SS 3", teachers: 2, status: "Active" },
  { name: "Computer Studies", levels: "JSS 1 – SS 3", teachers: 1, status: "Active" },
  { name: "Basic Science", levels: "JSS 1 – JSS 3", teachers: 2, status: "Active" },
  { name: "Creative Arts", levels: "Nursery 1 – Primary 6", teachers: 1, status: "Active" },
  { name: "Social Studies", levels: "Primary 1 – JSS 3", teachers: 2, status: "Active" },
];

export default function AcademicsPage() {
  const [openSection, setOpenSection] = useState<string | null>("Senior Secondary");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Classes & Subjects</h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure school structure and curriculum</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">+ Add Class</button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition-colors">+ Add Subject</button>
        </div>
      </div>

      {/* Class Structure Accordion */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Class Structure</h2>
        <div className="space-y-2">
          {CLASSES.map((section) => (
            <div key={section.section} className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
              <button onClick={() => setOpenSection(openSection === section.section ? null : section.section)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-800">{section.section}</span>
                  <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{section.classes.length} classes</span>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${openSection === section.section ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openSection === section.section && (
                <div className="border-t border-slate-100">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50/60 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-2.5 font-medium">Class</th>
                      <th className="text-center px-4 py-2.5 font-medium hidden sm:table-cell">Capacity</th>
                      <th className="text-center px-4 py-2.5 font-medium">Enrolled</th>
                      <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Class Teacher</th>
                      <th className="text-center px-4 py-2.5 font-medium hidden sm:table-cell">Subjects</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.classes.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-5 py-3 font-semibold text-slate-800">{c.name}</td>
                          <td className="px-4 py-3 text-center text-slate-600 hidden sm:table-cell">{c.capacity}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-semibold ${c.enrolled >= c.capacity ? "text-red-600" : "text-slate-700"}`}>{c.enrolled}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{c.teacher}</td>
                          <td className="px-4 py-3 text-center text-slate-600 hidden sm:table-cell">{c.subjects}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Subject Table */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Subjects</h2>
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Subject</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Levels</th>
                <th className="text-center px-4 py-3.5 font-medium">Teachers</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {SUBJECTS.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{s.levels}</td>
                    <td className="px-4 py-3 text-center text-slate-600">{s.teachers}</td>
                    <td className="px-4 py-3 text-center"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
