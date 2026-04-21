"use client";

import Link from "next/link";
import { MOCK_PARENT } from "@/lib/parent-dashboard-config";

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

function MiniProgressBar({ value, max = 100, color = "bg-brand-green" }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// --- Page ---

export default function ParentOverviewPage() {
  const events = [
    { month: "Mar", day: "15", title: "PTA Meeting", time: "9:00 AM" },
    { month: "Apr", day: "02", title: "Open Day", time: "10:00 AM" },
    { month: "Apr", day: "18", title: "Inter-House Sports", time: "8:00 AM" },
  ];

  const totalOutstanding = MOCK_PARENT.children.reduce((acc, child) => acc + child.outstandingFees, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">

      {/* Welcome banner — matches student dashboard brand-green style */}
      <div className="bg-gradient-to-br from-brand-green-700 via-brand-green to-brand-green-600 text-white rounded-2xl p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-yellow/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-brand-green-500/30 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                Parent Portal
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                Welcome, {MOCK_PARENT.firstName} {MOCK_PARENT.lastName} 👋
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {MOCK_PARENT.children.length} Ward{(MOCK_PARENT.children.length as number) !== 1 ? "s" : ""} Registered · {MOCK_PARENT.phone}
              </p>
            </div>
            <Link
              href="/parent-dashboard/profile"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur text-sm font-semibold rounded-lg transition-colors border border-white/20"
            >
              Manage Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger-children">
        <StatCard icon="👨‍👩‍👧‍👦" color="bg-blue-50 text-blue-500" label="My Wards" value={String(MOCK_PARENT.children.length)} sub="Active Students" />
        <StatCard icon="💰" color="bg-red-50 text-red-500" label="Total Outstanding" value={`₦${totalOutstanding.toLocaleString()}`} sub="Action Required" />
        <StatCard icon="🔔" color="bg-amber-50 text-amber-500" label="Unread Messages" value="3" sub="From Administration" />
        <StatCard icon="📅" color="bg-emerald-50 text-emerald-500" label="Next Event" value="PTA Meeting" sub="Mar 15, 9:00 AM" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Wards Overview — 3/5 */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">My Wards Overview</h2>
            <Link href="/parent-dashboard/children" className="text-xs font-semibold text-brand-green hover:underline">
              View details →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_PARENT.children.map((child) => (
              <div key={child.id} className="bg-white border border-slate-200/60 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-green/10 text-brand-green font-bold flex items-center justify-center rounded-lg">
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{child.firstName} {child.lastName}</p>
                    <p className="text-xs text-slate-500">{child.class} · {child.department}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Attendance</span>
                      <span className="font-semibold text-slate-800">{child.attendance}%</span>
                    </div>
                    <MiniProgressBar value={child.attendance} color={child.attendance >= 90 ? "bg-brand-green" : "bg-amber-400"} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Last Term Avg</span>
                      <span className="font-semibold text-slate-800">{child.lastTermAvg}%</span>
                    </div>
                    <MiniProgressBar value={child.lastTermAvg} color={child.lastTermAvg >= 70 ? "bg-blue-500" : "bg-red-400"} />
                  </div>
                  <div className="flex justify-between text-sm pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Fees Balance</span>
                    <span className={`font-semibold ${child.outstandingFees > 0 ? "text-red-600" : "text-emerald-600"}`}>
                      ₦{child.outstandingFees.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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

          {/* Latest Notice — matches student dashboard pattern */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Latest Notice</h2>
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">PTA Meeting Rescheduled</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">The upcoming PTA meeting has been moved to next week Friday, March 22nd. Attendance is mandatory for all parents.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/parent-dashboard/fees"
                className="bg-white border border-slate-200/60 rounded-xl p-4 text-center hover:shadow-md hover:border-brand-green/30 transition-all group"
              >
                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  💳
                </div>
                <p className="text-xs font-semibold text-slate-700">Pay Fees</p>
              </Link>
              <Link
                href="/parent-dashboard/children"
                className="bg-white border border-slate-200/60 rounded-xl p-4 text-center hover:shadow-md hover:border-brand-green/30 transition-all group"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <p className="text-xs font-semibold text-slate-700">View Results</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
