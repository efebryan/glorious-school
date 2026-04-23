"use client";

const TERMS = [
  { name: "1st Term", start: "Sep 8, 2025", end: "Dec 12, 2025", weeks: 14, status: "Completed" },
  { name: "2nd Term", start: "Jan 6, 2026", end: "Mar 28, 2026", weeks: 12, status: "Active" },
  { name: "3rd Term", start: "Apr 21, 2026", end: "Jul 18, 2026", weeks: 13, status: "Upcoming" },
];

const HOLIDAYS = [
  { name: "Independence Day", date: "Oct 1, 2025", type: "National" },
  { name: "Christmas Break", date: "Dec 15–Jan 5", type: "School" },
  { name: "New Year", date: "Jan 1, 2026", type: "National" },
  { name: "Easter Break", date: "Apr 3–6, 2026", type: "School" },
  { name: "Workers' Day", date: "May 1, 2026", type: "National" },
  { name: "Children's Day", date: "May 27, 2026", type: "National" },
  { name: "Mid-Term Break", date: "Jun 20–28, 2026", type: "School" },
];

const STATUS_COLORS: Record<string, string> = {
  Completed: "bg-slate-100 text-slate-600",
  Active: "bg-green-100 text-green-700",
  Upcoming: "bg-blue-100 text-blue-700",
};

export default function CalendarPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Calendar & Sessions</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage academic sessions, terms, and holidays</p>
        </div>
        <button className="px-4 py-2 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">Edit Session</button>
      </div>

      {/* Active Session Banner */}
      <div className="bg-gradient-to-r from-brand-green to-purple-600 rounded-xl p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Active Session</p>
        <h2 className="text-xl font-bold">2025/2026 Academic Session — 2nd Term</h2>
        <p className="text-sm text-white/70 mt-1">Current term ends Mar 28, 2026 • 4 weeks remaining</p>
      </div>

      {/* Term Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TERMS.map((t, i) => (
          <div key={i} className={`bg-white rounded-xl border p-5 ${t.status === "Active" ? "border-green-300 ring-2 ring-green-100" : "border-slate-200/60"}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800">{t.name}</h3>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[t.status]}`}>{t.status}</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Start Date</span><span className="font-medium text-slate-800">{t.start}</span></div>
              <div className="flex justify-between"><span>End Date</span><span className="font-medium text-slate-800">{t.end}</span></div>
              <div className="flex justify-between"><span>Duration</span><span className="font-medium text-slate-800">{t.weeks} weeks</span></div>
            </div>
            {t.status === "Active" && (
              <div className="mt-4">
                <div className="h-2 bg-green-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: "67%" }} /></div>
                <p className="text-[11px] text-green-600 font-medium mt-1">67% complete</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Holidays */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Declared Holidays</h2>
          <button className="text-sm text-brand-green font-semibold hover:underline">+ Add Holiday</button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
          {HOLIDAYS.map((h, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">{h.name}</p>
                <p className="text-xs text-slate-500">{h.date}</p>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${h.type === "National" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{h.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
