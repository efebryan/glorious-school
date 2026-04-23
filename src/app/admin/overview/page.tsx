"use client";

import Link from "next/link";
import { MOCK_ADMIN, MOCK_AUDIT_LOG, MOCK_SYSTEM_STATS, ADMIN_ROLE_LABELS, ADMIN_ROLE_COLORS } from "@/lib/admin-config";

const AUDIT_ICONS: Record<string, string> = { results: "📝", finance: "💰", cms: "🌐", system: "⚙️", users: "👤", discipline: "⚖️" };
const PORTAL_STATUS = [
  { name: "Public Website", status: "Live", color: "bg-green-500", lastActivity: "—" },
  { name: "Student Portal", status: "Active", color: "bg-green-500", lastActivity: "2 min ago" },
  { name: "Parent Portal", status: "Active", color: "bg-green-500", lastActivity: "15 min ago" },
  { name: "Staff Portal", status: "Active", color: "bg-green-500", lastActivity: "5 min ago" },
];

const QUICK_ACTIONS = [
  { label: "Add New Student", href: "/admin/users", icon: "👤", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Approve Results", href: "/admin/results", icon: "✅", color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Create Event", href: "/admin/cms/events", icon: "📰", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Post Announcement", href: "/admin/communications", icon: "📢", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "View Finance", href: "/admin/finance", icon: "💰", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { label: "System Settings", href: "/admin/settings", icon: "⚙️", color: "bg-slate-100 text-slate-700 border-slate-200" },
];

export default function AdminOverviewPage() {
  const s = MOCK_SYSTEM_STATS;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-green-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-brand-yellow rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ADMIN_ROLE_COLORS[MOCK_ADMIN.role]}`}>
              {ADMIN_ROLE_LABELS[MOCK_ADMIN.role]}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">Welcome, {MOCK_ADMIN.firstName} {MOCK_ADMIN.lastName}</h1>
          <p className="text-sm text-white/60 mt-1">{s.activeSession} — {s.activeTerm} | Last login: {MOCK_ADMIN.lastLogin}</p>
        </div>
      </div>

      {/* System Health Banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-700 font-medium">All systems operational</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Students", value: s.totalStudents.toLocaleString(), color: "text-blue-700", bg: "bg-blue-50" },
          { label: "Total Staff", value: s.totalStaff.toString(), color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "Total Parents", value: s.totalParents.toLocaleString(), color: "text-purple-700", bg: "bg-purple-50" },
          { label: "Pending Results", value: s.pendingResults.toString(), color: "text-amber-700", bg: "bg-amber-50" },
          { label: "Fee Collection", value: `${s.feeCollectionRate}%`, color: "text-green-700", bg: "bg-green-50" },
          { label: "Contact Queries", value: s.contactQueries.toString(), color: "text-red-700", bg: "bg-red-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-4">
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Log */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
            {MOCK_AUDIT_LOG.map((log) => (
              <div key={log.id} className="px-5 py-3.5 flex items-start gap-3">
                <span className="text-base mt-0.5">{AUDIT_ICONS[log.type] ?? "📋"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">{log.actor}</span> {log.action}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  className={`flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl border text-center hover:shadow-md transition-all hover:-translate-y-0.5 ${a.color}`}
                >
                  <span className="text-xl">{a.icon}</span>
                  <span className="text-[11px] font-semibold leading-tight">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Portal Status */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-800">Portal Status</h2>
            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
              {PORTAL_STATUS.map((p, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${p.color}`} />
                    <span className="text-sm font-medium text-slate-700">{p.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{p.lastActivity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
