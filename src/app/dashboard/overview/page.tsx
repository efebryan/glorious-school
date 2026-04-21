"use client";

import Link from "next/link";
import { MOCK_STUDENT } from "@/lib/dashboard-config";

// --- Reusable sub-components scoped to this page ---

function StatCard({ icon, color, label, value, sub }: { icon: string; color: string; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-4 sm:p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium truncate">{label}</p>
        <p className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{value}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{sub}</p>
      </div>
    </div>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const cls = grade === "A" ? "bg-emerald-100 text-emerald-700" : grade === "B" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600";
  return <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold ${cls}`}>{grade}</span>;
}

// --- Page ---

export default function OverviewPage() {
  const recentScores = [
    { subject: "Mathematics", score: 88, grade: "A" },
    { subject: "English Language", score: 76, grade: "B" },
    { subject: "Physics", score: 92, grade: "A" },
    { subject: "Chemistry", score: 85, grade: "A" },
  ];

  const events = [
    { month: "Feb", day: "14", title: "Cultural Day Celebration", time: "10:00 AM" },
    { month: "Feb", day: "21", title: "Mid-Term Break Begins", time: "All Day" },
    { month: "Mar", day: "15", title: "PTA Meeting", time: "9:00 AM" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">

      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-brand-green-700 via-brand-green to-brand-green-600 text-white rounded-2xl p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-yellow/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-brand-green-500/30 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                {MOCK_STUDENT.session} — {MOCK_STUDENT.term}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                Welcome back, {MOCK_STUDENT.firstName} 👋
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {MOCK_STUDENT.admissionNo} · {MOCK_STUDENT.class} {MOCK_STUDENT.department}
              </p>
            </div>
            <Link
              href="/dashboard/profile"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur text-sm font-semibold rounded-lg transition-colors border border-white/20"
            >
              View Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon="🏫" color="bg-blue-50 text-blue-500" label="Current Term" value={MOCK_STUDENT.term} sub={`${MOCK_STUDENT.session} Session`} />
        <StatCard icon="📈" color="bg-green-50 text-green-500" label="Attendance" value="94%" sub="2 days absent" />
        <StatCard icon="🏆" color="bg-amber-50 text-amber-500" label="Last Term Avg." value="85.4%" sub="Position: 4th" />
        <StatCard icon="💰" color="bg-emerald-50 text-emerald-500" label="Fees Balance" value="₦150k" sub="1 pending invoice" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Recent results — 3/5 */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Recent Assessment</h2>
            <Link href="/dashboard/results" className="text-xs font-semibold text-brand-green hover:underline">
              View all →
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Subject</th>
                  <th className="text-center px-4 py-3 font-medium">Score</th>
                  <th className="text-center px-4 py-3 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentScores.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-700">{r.subject}</td>
                    <td className="px-4 py-3.5 text-center text-slate-600">{r.score}%</td>
                    <td className="px-4 py-3.5 text-center"><GradeBadge grade={r.grade} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column — 2/5 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Upcoming Events</h2>
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {events.map((e, i) => (
                <div key={i} className="p-4 flex gap-3 items-start hover:bg-slate-50/50 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-brand-green-50 text-brand-green flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase leading-none">{e.month}</span>
                    <span className="text-base font-bold leading-tight">{e.day}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{e.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification preview */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Latest Notice</h2>
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">PTA Meeting Rescheduled</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">Please inform your parents that the upcoming PTA meeting has been moved to next week Friday.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
