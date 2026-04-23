"use client";

import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = [
  { num: 1, time: "8:00 - 8:40" },
  { num: 2, time: "8:40 - 9:20" },
  { num: 3, time: "9:20 - 10:00" },
  { num: 4, time: "10:20 - 11:00" },
  { num: 5, time: "11:00 - 11:40" },
  { num: 6, time: "11:40 - 12:20" },
  { num: 7, time: "1:00 - 1:40" },
  { num: 8, time: "1:40 - 2:20" },
];

const SUBJECT_COLORS: Record<string, string> = {
  "Mathematics": "bg-blue-100 text-blue-800 border-blue-200",
  "English": "bg-purple-100 text-purple-800 border-purple-200",
  "Physics": "bg-amber-100 text-amber-800 border-amber-200",
  "Chemistry": "bg-green-100 text-green-800 border-green-200",
  "Biology": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Civic Education": "bg-rose-100 text-rose-800 border-rose-200",
  "Economics": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Literature": "bg-pink-100 text-pink-800 border-pink-200",
  "Break": "bg-slate-50 text-slate-400 border-slate-100",
  "Assembly": "bg-brand-green-50 text-brand-green-700 border-brand-green-100",
  "Free Period": "bg-slate-50 text-slate-400 border-slate-100",
};

// Mock timetable data [day][period] => subject
const TIMETABLE: Record<string, Record<number, { subject: string; teacher: string }>> = {
  Monday: {
    1: { subject: "Assembly", teacher: "" },
    2: { subject: "Mathematics", teacher: "Mr. James" },
    3: { subject: "English", teacher: "Mrs. Ngozi" },
    4: { subject: "Physics", teacher: "Mrs. Adaeze" },
    5: { subject: "Chemistry", teacher: "Dr. Uche" },
    6: { subject: "Break", teacher: "" },
    7: { subject: "Biology", teacher: "Mrs. Amara" },
    8: { subject: "Civic Education", teacher: "Mr. Peter" },
  },
  Tuesday: {
    1: { subject: "Mathematics", teacher: "Mr. James" },
    2: { subject: "Physics", teacher: "Mrs. Adaeze" },
    3: { subject: "English", teacher: "Mrs. Ngozi" },
    4: { subject: "Economics", teacher: "Mr. Femi" },
    5: { subject: "Break", teacher: "" },
    6: { subject: "Literature", teacher: "Mrs. Ngozi" },
    7: { subject: "Chemistry", teacher: "Dr. Uche" },
    8: { subject: "Free Period", teacher: "" },
  },
  Wednesday: {
    1: { subject: "Assembly", teacher: "" },
    2: { subject: "Biology", teacher: "Mrs. Amara" },
    3: { subject: "Mathematics", teacher: "Mr. James" },
    4: { subject: "Physics", teacher: "Mrs. Adaeze" },
    5: { subject: "English", teacher: "Mrs. Ngozi" },
    6: { subject: "Break", teacher: "" },
    7: { subject: "Economics", teacher: "Mr. Femi" },
    8: { subject: "Civic Education", teacher: "Mr. Peter" },
  },
  Thursday: {
    1: { subject: "Chemistry", teacher: "Dr. Uche" },
    2: { subject: "English", teacher: "Mrs. Ngozi" },
    3: { subject: "Mathematics", teacher: "Mr. James" },
    4: { subject: "Literature", teacher: "Mrs. Ngozi" },
    5: { subject: "Break", teacher: "" },
    6: { subject: "Physics", teacher: "Mrs. Adaeze" },
    7: { subject: "Biology", teacher: "Mrs. Amara" },
    8: { subject: "Free Period", teacher: "" },
  },
  Friday: {
    1: { subject: "Assembly", teacher: "" },
    2: { subject: "Economics", teacher: "Mr. Femi" },
    3: { subject: "Chemistry", teacher: "Dr. Uche" },
    4: { subject: "Mathematics", teacher: "Mr. James" },
    5: { subject: "English", teacher: "Mrs. Ngozi" },
    6: { subject: "Break", teacher: "" },
    7: { subject: "Civic Education", teacher: "Mr. Peter" },
    8: { subject: "Free Period", teacher: "" },
  },
};

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("SS 2");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Timetable</h1>
          <p className="text-sm text-slate-500 mt-0.5">Weekly class schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
          >
            <option>SS 1</option><option>SS 2</option><option>SS 3</option>
            <option>JSS 1</option><option>JSS 2</option><option>JSS 3</option>
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider w-24">Period</th>
                {DAYS.map(day => (
                  <th key={day} className="text-center px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PERIODS.map((period) => (
                <tr key={period.num} className="hover:bg-slate-50/30">
                  <td className="px-4 py-2 border-r border-slate-100">
                    <p className="text-xs font-bold text-slate-700">Period {period.num}</p>
                    <p className="text-[10px] text-slate-400">{period.time}</p>
                  </td>
                  {DAYS.map(day => {
                    const cell = TIMETABLE[day]?.[period.num];
                    const colorClass = cell ? (SUBJECT_COLORS[cell.subject] ?? "bg-slate-50 text-slate-600 border-slate-100") : "";
                    return (
                      <td key={day} className="px-2 py-2 text-center">
                        {cell ? (
                          <div className={`rounded-lg border px-2 py-2 ${colorClass}`}>
                            <p className="text-xs font-bold leading-tight">{cell.subject}</p>
                            {cell.teacher && <p className="text-[10px] mt-0.5 opacity-70">{cell.teacher}</p>}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-300">—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Subject Colors</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SUBJECT_COLORS).filter(([k]) => !["Break", "Free Period", "Assembly"].includes(k)).map(([subject, cls]) => (
            <span key={subject} className={`text-[11px] font-semibold px-2 py-1 rounded-md border ${cls}`}>
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
