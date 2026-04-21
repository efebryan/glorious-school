"use client";

import { MOCK_PARENT } from "@/lib/parent-dashboard-config";

export default function ParentFeesPage() {
  const totalOutstanding = MOCK_PARENT.children.reduce((acc, child) => acc + child.outstandingFees, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Fees & Payments</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage financial obligations for your wards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1 bg-white rounded-xl border border-slate-200/60 p-6 flex flex-col justify-center text-center">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Outstanding</p>
          <p className={`text-3xl font-bold ${totalOutstanding > 0 ? "text-red-500" : "text-brand-green"}`}>
            ₦{totalOutstanding.toLocaleString()}
          </p>
          {totalOutstanding > 0 && (
            <button className="mt-4 w-full py-2 bg-brand-green hover:bg-brand-green-700 text-white font-semibold rounded-lg shadow-sm transition-colors">
              Make Payment
            </button>
          )}
        </div>
        
        <div className="sm:col-span-2 bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Fee Breakdown by Ward</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/30 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Ward Name</th>
                <th className="text-left px-5 py-3 font-medium">Class</th>
                <th className="text-right px-5 py-3 font-medium">Balance</th>
                <th className="text-center px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PARENT.children.map((child) => (
                <tr key={child.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-800">{child.firstName} {child.lastName}</td>
                  <td className="px-5 py-4 text-slate-600">{child.class}</td>
                  <td className="px-5 py-4 text-right font-bold text-slate-900">₦{child.outstandingFees.toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    {child.outstandingFees > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Unpaid</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
