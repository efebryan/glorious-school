"use client";

import { MOCK_PARENT } from "@/lib/parent-dashboard-config";

export default function ParentChildrenPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Wards</h1>
          <p className="text-slate-500 text-sm mt-0.5">Detailed academic progress and records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_PARENT.children.map((child) => (
          <div key={child.id} className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-green-100 text-brand-green-700 font-bold text-xl flex items-center justify-center rounded-xl shadow-sm">
                  {child.firstName[0]}{child.lastName[0]}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{child.firstName} {child.lastName}</h2>
                  <p className="text-sm text-slate-500">{child.admissionNo} · {child.class} {child.department}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                View Full Results
              </button>
            </div>
            
            <div className="p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium">Term Average</p>
                <p className="text-xl font-bold text-slate-900">{child.lastTermAvg}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium">Class Position</p>
                <p className="text-xl font-bold text-slate-900">{child.position}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium">Attendance</p>
                <p className="text-xl font-bold text-slate-900">{child.attendance}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium">Outstanding Fees</p>
                <p className={`text-xl font-bold ${child.outstandingFees > 0 ? "text-red-600" : "text-brand-green"}`}>
                  ₦{child.outstandingFees.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
