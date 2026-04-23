"use client";

import Link from "next/link";
import { MOCK_STAFF, STAFF_ROLE_LABELS, STAFF_ROLE_COLORS } from "@/lib/staff-dashboard-config";

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

export default function StaffOverviewPage() {
  const recentActivity = [
    { action: "Submitted SS 2 Physics results", time: "10 min ago", icon: "📝" },
    { action: "Marked attendance for SS 1A", time: "1 hr ago", icon: "📋" },
    { action: "Approved JSS 3 Mathematics results", time: "2 hrs ago", icon: "✅" },
    { action: "Sent message to Mr. Richard Doe", time: "3 hrs ago", icon: "💬" },
    { action: "Updated SS 2 timetable", time: "Yesterday", icon: "📅" },
  ];

  const quickActions = [
    { label: "Enter Results", icon: "📝", href: "/staff-dashboard/results", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Take Attendance", icon: "📋", href: "/staff-dashboard/attendance", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { label: "View Timetable", icon: "📅", href: "/staff-dashboard/timetable", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { label: "Post Announcement", icon: "📢", href: "/staff-dashboard/announcements", color: "bg-purple-50 text-purple-600 border-purple-100" },
  ];

  const events = [
    { month: "Mar", day: "07", title: "Result Submission Deadline", time: "11:59 PM" },
    { month: "Mar", day: "15", title: "Staff Meeting", time: "10:00 AM" },
    { month: "Mar", day: "22", title: "Inter-House Sports", time: "8:00 AM" },
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
                {MOCK_STAFF.session} — {MOCK_STAFF.term}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                Welcome back, {MOCK_STAFF.firstName} 👋
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-white/70 text-sm">
                  {MOCK_STAFF.staffId} · {MOCK_STAFF.department}
                </p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STAFF_ROLE_COLORS[MOCK_STAFF.role]}`}>
                  {STAFF_ROLE_LABELS[MOCK_STAFF.role]}
                </span>
              </div>
            </div>
            <Link
              href="/staff-dashboard/profile"
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
        <StatCard icon="🎓" color="bg-blue-50 text-blue-500" label="Total Students" value="342" sub="Across assigned classes" />
        <StatCard icon="📝" color="bg-amber-50 text-amber-500" label="Pending Results" value="5" sub="Awaiting entry or approval" />
        <StatCard icon="📋" color="bg-green-50 text-green-500" label="Attendance Today" value="91%" sub="312 present, 30 absent" />
        <StatCard icon="💰" color="bg-emerald-50 text-emerald-500" label="Fee Collection" value="₦4.2M" sub="82% collected this term" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column — 3/5 */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  className={`flex items-center gap-3 p-4 rounded-xl border bg-white hover:shadow-md transition-all group`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 border ${a.color}`}>
                    {a.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {recentActivity.map((act, i) => (
                <div key={i} className="px-4 sm:px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{act.action}</p>
                    <p className="text-[11px] text-slate-400">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
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

          {/* Staff Notice */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Staff Notice</h2>
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">Result Submission Deadline</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">All subject teachers must submit continuous assessment and exam scores by Friday, March 7th.</p>
              </div>
            </div>
          </div>

          {/* Class Summary */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">My Classes</h2>
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {(MOCK_STAFF.assignedClasses ?? []).map((cls, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-green-50 text-brand-green flex items-center justify-center text-xs font-bold shrink-0">
                      {cls.replace(/[^A-Z0-9]/gi, "").slice(0, 3)}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{cls}</span>
                  </div>
                  <span className="text-xs text-slate-400">45 students</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
