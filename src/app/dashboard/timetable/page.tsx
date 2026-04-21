"use client";

import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

type SlotRow = { time: string; subjects: Record<typeof DAYS[number], string> };
type BreakRow = { time: string; type: "break"; title: string };
type ScheduleRow = SlotRow | BreakRow;

const SCHEDULE: ScheduleRow[] = [
  { time: "08:00 – 08:40", subjects: { Monday: "Mathematics", Tuesday: "Physics", Wednesday: "English", Thursday: "Chemistry", Friday: "Mathematics" } },
  { time: "08:40 – 09:20", subjects: { Monday: "Mathematics", Tuesday: "Physics", Wednesday: "English", Thursday: "Chemistry", Friday: "Mathematics" } },
  { time: "09:20 – 10:00", subjects: { Monday: "Biology", Tuesday: "Economics", Wednesday: "Further Math", Thursday: "Data Processing", Friday: "Geography" } },
  { time: "10:00 – 10:40", subjects: { Monday: "Biology", Tuesday: "Economics", Wednesday: "Further Math", Thursday: "Data Processing", Friday: "Geography" } },
  { time: "10:40 – 11:20", type: "break", title: "SHORT BREAK" },
  { time: "11:20 – 12:00", subjects: { Monday: "English", Tuesday: "Chemistry", Wednesday: "Physics", Thursday: "Mathematics", Friday: "Civic Edu." } },
  { time: "12:00 – 12:40", subjects: { Monday: "English", Tuesday: "Chemistry", Wednesday: "Physics", Thursday: "Mathematics", Friday: "Civic Edu." } },
  { time: "12:40 – 01:20", type: "break", title: "LONG BREAK" },
  { time: "01:20 – 02:00", subjects: { Monday: "Further Math", Tuesday: "Data Proc.", Wednesday: "Biology", Thursday: "Economics", Friday: "Club Activities" } },
  { time: "02:00 – 02:40", subjects: { Monday: "Further Math", Tuesday: "Data Proc.", Wednesday: "Biology", Thursday: "Economics", Friday: "Club Activities" } },
];

function isBreak(row: ScheduleRow): row is BreakRow {
  return "type" in row && row.type === "break";
}

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>("Monday");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Class Timetable</h1>
        <p className="text-slate-500 text-sm mt-0.5">Weekly lecture schedule for SS 2 Science.</p>
      </div>

      {/* === Desktop table (hidden on mobile) === */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-brand-green text-white">
                <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider w-[130px] border-r border-white/10">Time</th>
                {DAYS.map((d) => (
                  <th key={d} className="px-4 py-3.5 text-center font-semibold text-xs uppercase tracking-wider border-r last:border-r-0 border-white/10">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SCHEDULE.map((row, i) => {
                if (isBreak(row)) {
                  return (
                    <tr key={i} className="bg-slate-50">
                      <td className="px-4 py-2.5 text-xs font-medium text-slate-400 border-r border-slate-200">{row.time}</td>
                      <td colSpan={5} className="px-4 py-2.5 text-center text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                        ☕ {row.title}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 text-xs font-medium text-slate-500 border-r border-slate-200 whitespace-nowrap">{row.time}</td>
                    {DAYS.map((d) => (
                      <td key={d} className="px-4 py-3.5 text-center font-medium text-slate-700 border-r last:border-r-0 border-slate-100">
                        {row.subjects[d]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Mobile: Day-by-day accordion (visible on mobile only) === */}
      <div className="md:hidden space-y-3">
        {/* Day tabs — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedDay === d
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Periods for selected day */}
        <div className="space-y-2">
          {SCHEDULE.map((row, i) => {
            if (isBreak(row)) {
              return (
                <div key={i} className="flex items-center gap-3 py-2 px-3 bg-slate-100/80 rounded-lg">
                  <span className="text-xs text-slate-400 font-medium w-24 shrink-0">{row.time}</span>
                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">☕ {row.title}</span>
                </div>
              );
            }
            return (
              <div key={i} className="flex items-center gap-3 py-3 px-4 bg-white border border-slate-200/60 rounded-xl">
                <span className="text-xs text-slate-400 font-medium w-24 shrink-0">{row.time}</span>
                <span className="text-sm font-semibold text-slate-800">{row.subjects[selectedDay]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info note */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">Notice</p>
          <p className="text-xs text-slate-500 mt-0.5">The timetable is subject to change. Modifications will be communicated via the Notifications page.</p>
        </div>
      </div>
    </div>
  );
}
