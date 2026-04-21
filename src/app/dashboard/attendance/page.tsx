"use client";

const STATS = [
  { label: "Days Present", value: 85, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Days Absent", value: 2, color: "text-red-600", bg: "bg-red-50" },
  { label: "Days Late", value: 3, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Total School Days", value: 90, color: "text-slate-900", bg: "bg-slate-50" },
];

const RECORDS = [
  { date: "Feb 13, 2026", day: "Thursday", status: "Present" as const, remark: "—" },
  { date: "Feb 12, 2026", day: "Wednesday", status: "Present" as const, remark: "—" },
  { date: "Feb 11, 2026", day: "Tuesday", status: "Late" as const, remark: "Arrived at 8:15 AM" },
  { date: "Feb 10, 2026", day: "Monday", status: "Present" as const, remark: "—" },
  { date: "Feb 9, 2026", day: "Sunday", status: "Absent" as const, remark: "Sick leave (excused)" },
  { date: "Feb 7, 2026", day: "Friday", status: "Present" as const, remark: "—" },
  { date: "Feb 6, 2026", day: "Thursday", status: "Present" as const, remark: "—" },
];

function statusColor(s: string) {
  if (s === "Present") return "bg-emerald-100 text-emerald-700";
  if (s === "Absent") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

export default function AttendancePage() {
  const pct = Math.round((85 / 90) * 100);
  const strokeDash = `${pct}, 100`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Attendance Record</h1>
        <p className="text-slate-500 text-sm mt-0.5">Track your daily school attendance for the 2nd Term.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STATS.map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl border border-slate-200/60 p-4 sm:p-5 text-center`}>
            <p className="text-xs text-slate-500 font-medium mb-1">{s.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Donut chart — 2/5 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200/60 p-6 sm:p-8 flex flex-col items-center justify-center h-full">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                <circle
                  cx="18" cy="18" r="15.9155"
                  fill="none"
                  stroke="#1b9d4e"
                  strokeWidth="3.5"
                  strokeDasharray={strokeDash}
                  strokeLinecap="round"
                  className="drop-shadow-sm"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">{pct}%</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Attendance</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-5 text-center max-w-[200px]">
              {pct >= 90 ? "Excellent! Keep up the great attendance." : "Your attendance could be improved."}
            </p>
          </div>
        </div>

        {/* Logs table — 3/5 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden h-full flex flex-col">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
              <h2 className="font-bold text-slate-800">Recent Logs</h2>
              <span className="text-xs text-brand-green font-semibold cursor-pointer hover:underline">View all</span>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                    <th className="text-center px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECORDS.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-800">{r.date}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${statusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs">{r.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="sm:hidden divide-y divide-slate-100 flex-1">
              {RECORDS.map((r, i) => (
                <div key={i} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">{r.date}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{r.remark}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${statusColor(r.status)}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
