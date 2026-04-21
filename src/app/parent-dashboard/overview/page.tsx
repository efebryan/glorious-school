"use client";

import Link from "next/link";
import { MOCK_PARENT } from "@/lib/parent-dashboard-config";

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

export default function ParentOverviewPage() {
  const events = [
    { month: "Mar", day: "15", title: "PTA Meeting", time: "9:00 AM" },
    { month: "Apr", day: "02", title: "Open Day", time: "10:00 AM" },
  ];

  const totalOutstanding = MOCK_PARENT.children.reduce((acc, child) => acc + child.outstandingFees, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">

      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-yellow/15 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-brand-yellow text-xs font-bold tracking-wider uppercase mb-1.5">
                Parent Portal
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                Welcome, {MOCK_PARENT.lastName} {MOCK_PARENT.firstName}
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {MOCK_PARENT.children.length} Wards Registered
              </p>
            </div>
            <Link
              href="/parent-dashboard/profile"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-sm font-semibold rounded-lg transition-colors border border-white/20"
            >
              Manage Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon="👨‍👩‍👧‍👦" color="bg-blue-50 text-blue-500" label="My Wards" value={String(MOCK_PARENT.children.length)} sub="Active Students" />
        <StatCard icon="💰" color="bg-red-50 text-red-500" label="Total Outstanding" value={`₦${totalOutstanding.toLocaleString()}`} sub="Action Required" />
        <StatCard icon="🔔" color="bg-amber-50 text-amber-500" label="Unread Messages" value="3" sub="From Administration" />
        <StatCard icon="📅" color="bg-emerald-50 text-emerald-500" label="Next Event" value="PTA Meeting" sub="Mar 15, 9:00 AM" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Wards Overview - 3/5 */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">My Wards Focus</h2>
            <Link href="/parent-dashboard/children" className="text-xs font-semibold text-brand-green hover:underline">
              View details →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_PARENT.children.map((child) => (
              <div key={child.id} className="bg-white border border-slate-200/60 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-green-100 text-brand-green-700 font-bold flex items-center justify-center rounded-lg">
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{child.firstName} {child.lastName}</p>
                    <p className="text-xs text-slate-500">{child.class} ({child.department})</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Attendance</span>
                    <span className="font-semibold text-slate-800">{child.attendance}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Last Term Avg</span>
                    <span className="font-semibold text-slate-800">{child.lastTermAvg}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
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

        {/* Right column - 2/5 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">School Calendar</h2>
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {events.map((e, i) => (
                <div key={i} className="p-4 flex gap-3 items-start hover:bg-slate-50/50 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-700 flex flex-col items-center justify-center shrink-0">
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
        </div>
      </div>
    </div>
  );
}
