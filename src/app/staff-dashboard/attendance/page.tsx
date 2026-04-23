"use client";

import { useState } from "react";

const STUDENTS_LIST = [
  { name: "John Doe", admNo: "GGS/2024/0014" },
  { name: "Jane Doe", admNo: "GGS/2025/0089" },
  { name: "Emeka Obi", admNo: "GGS/2024/0032" },
  { name: "Blessing Eze", admNo: "GGS/2023/0008" },
  { name: "Mary Johnson", admNo: "GGS/2024/0067" },
  { name: "Chinedu Nwankwo", admNo: "GGS/2024/0058" },
  { name: "Grace Akpan", admNo: "GGS/2025/0101" },
  { name: "Ahmed Musa", admNo: "GGS/2024/0045" },
];

type AttendanceStatus = "present" | "absent" | "late";

// Calendar heatmap days (past 30 days)
const HEATMAP_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: 30 - i,
  rate: Math.floor(Math.random() * 30 + 70),
}));

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("SS 1");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    STUDENTS_LIST.forEach((s) => { initial[s.admNo] = "present"; });
    return initial;
  });

  const counts = {
    present: Object.values(attendance).filter(v => v === "present").length,
    absent: Object.values(attendance).filter(v => v === "absent").length,
    late: Object.values(attendance).filter(v => v === "late").length,
  };

  function cycleStatus(admNo: string) {
    setAttendance(prev => {
      const current = prev[admNo];
      const next: AttendanceStatus = current === "present" ? "absent" : current === "absent" ? "late" : "present";
      return { ...prev, [admNo]: next };
    });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Attendance</h1>
        <p className="text-sm text-slate-500 mt-0.5">Mark and review daily attendance</p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
        >
          <option>SS 1</option><option>SS 2</option><option>SS 3</option>
          <option>JSS 1</option><option>JSS 2</option><option>JSS 3</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
        />
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{counts.present}</p>
          <p className="text-xs font-medium text-green-600 mt-0.5">Present</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{counts.absent}</p>
          <p className="text-xs font-medium text-red-600 mt-0.5">Absent</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{counts.late}</p>
          <p className="text-xs font-medium text-amber-600 mt-0.5">Late</p>
        </div>
      </div>

      {/* Attendance marking */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Student</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
                <th className="text-center px-4 py-3.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STUDENTS_LIST.map((s) => {
                const status = attendance[s.admNo];
                return (
                  <tr key={s.admNo} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-bold text-brand-green flex items-center justify-center shrink-0">
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{s.name}</p>
                          <p className="text-[11px] text-slate-400">{s.admNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        status === "present" ? "bg-green-100 text-green-700" :
                        status === "absent" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex gap-1.5 justify-center">
                        <button
                          onClick={() => setAttendance(prev => ({ ...prev, [s.admNo]: "present" }))}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${status === "present" ? "bg-green-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-green-100"}`}
                          title="Present"
                        >✓</button>
                        <button
                          onClick={() => setAttendance(prev => ({ ...prev, [s.admNo]: "absent" }))}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${status === "absent" ? "bg-red-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-red-100"}`}
                          title="Absent"
                        >✗</button>
                        <button
                          onClick={() => setAttendance(prev => ({ ...prev, [s.admNo]: "late" }))}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${status === "late" ? "bg-amber-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-amber-100"}`}
                          title="Late"
                        >L</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
          Save Attendance
        </button>
      </div>

      {/* Historical Heatmap */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">30-Day Attendance History</h2>
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 sm:p-5">
          <div className="flex flex-wrap gap-1.5">
            {HEATMAP_DATA.map((d, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-md text-[9px] font-bold flex items-center justify-center ${
                  d.rate >= 90 ? "bg-green-200 text-green-800" :
                  d.rate >= 80 ? "bg-green-100 text-green-700" :
                  d.rate >= 70 ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}
                title={`Day ${d.day}: ${d.rate}%`}
              >
                {d.rate}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200" /> 90%+</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100" /> 80-89%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100" /> 70-79%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100" /> &lt;70%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
