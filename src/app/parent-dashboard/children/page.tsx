"use client";

import { MOCK_PARENT } from "@/lib/parent-dashboard-config";

function ProgressBar({ value, max = 100, color = "bg-brand-green", label }: { value: number; max?: number; color?: string; label: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className="font-bold text-slate-800">{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ease-out ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatBlock({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="space-y-1 text-center sm:text-left">
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className={`text-xl font-bold ${valueClass || "text-slate-900"}`}>{value}</p>
    </div>
  );
}

export default function ParentChildrenPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Wards</h1>
          <p className="text-slate-500 text-sm mt-0.5">Detailed academic progress and records for all your wards.</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1.5 bg-brand-green/10 text-brand-green font-bold rounded-lg text-xs">
            {MOCK_PARENT.children.length} Ward{MOCK_PARENT.children.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 stagger-children">
        {MOCK_PARENT.children.map((child) => (
          <div key={child.id} className="bg-white rounded-xl border border-slate-200/60 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-green/10 text-brand-green font-bold text-xl flex items-center justify-center rounded-xl shadow-sm border border-brand-green/10">
                  {child.firstName[0]}{child.lastName[0]}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{child.firstName} {child.lastName}</h2>
                  <p className="text-sm text-slate-500">{child.admissionNo} · {child.class} · {child.department}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
                View Full Results
              </button>
            </div>
            
            {/* Stats row */}
            <div className="p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-slate-100">
              <StatBlock label="Term Average" value={`${child.lastTermAvg}%`} />
              <StatBlock label="Class Position" value={child.position} />
              <StatBlock label="Attendance" value={`${child.attendance}%`} />
              <StatBlock
                label="Outstanding Fees"
                value={`₦${child.outstandingFees.toLocaleString()}`}
                valueClass={child.outstandingFees > 0 ? "text-red-600" : "text-brand-green"}
              />
            </div>

            {/* Progress bars */}
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProgressBar
                label="Attendance Rate"
                value={child.attendance}
                color={child.attendance >= 90 ? "bg-brand-green" : child.attendance >= 75 ? "bg-amber-400" : "bg-red-400"}
              />
              <ProgressBar
                label="Academic Average"
                value={child.lastTermAvg}
                color={child.lastTermAvg >= 80 ? "bg-blue-500" : child.lastTermAvg >= 60 ? "bg-amber-400" : "bg-red-400"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
