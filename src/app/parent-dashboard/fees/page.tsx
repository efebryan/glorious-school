"use client";

import { MOCK_PARENT } from "@/lib/parent-dashboard-config";

const PAYMENT_HISTORY = [
  { id: "PAY-001", date: "Jan 15, 2026", amount: 250000, ward: "John Doe", method: "Bank Transfer", status: "Confirmed" },
  { id: "PAY-002", date: "Jan 15, 2026", amount: 200000, ward: "Jane Doe", method: "Card Payment", status: "Confirmed" },
  { id: "PAY-003", date: "Sep 05, 2025", amount: 250000, ward: "John Doe", method: "Bank Transfer", status: "Confirmed" },
];

export default function ParentFeesPage() {
  const totalOutstanding = MOCK_PARENT.children.reduce((acc, child) => acc + child.outstandingFees, 0);
  const totalPaid = PAYMENT_HISTORY.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Fees & Payments</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage financial obligations for your wards.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/60 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl mb-3">
            💰
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Outstanding</p>
          <p className={`text-3xl font-bold ${totalOutstanding > 0 ? "text-red-500" : "text-brand-green"}`}>
            ₦{totalOutstanding.toLocaleString()}
          </p>
          {totalOutstanding > 0 && (
            <button className="mt-4 w-full py-2.5 bg-brand-green hover:bg-brand-green-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              Make Payment
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200/60 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl mb-3">
            ✅
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Paid (This Session)</p>
          <p className="text-3xl font-bold text-brand-green">
            ₦{totalPaid.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">{PAYMENT_HISTORY.length} payment{(PAYMENT_HISTORY.length as number) !== 1 ? "s" : ""} made</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/60 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-3">
            👨‍👩‍👧‍👦
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Wards Enrolled</p>
          <p className="text-3xl font-bold text-slate-900">
            {MOCK_PARENT.children.length}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {MOCK_PARENT.children.filter(c => c.outstandingFees === 0).length} fully cleared
          </p>
        </div>
      </div>

      {/* Fee Breakdown by Ward */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Fee Breakdown by Ward</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/30 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Ward Name</th>
                <th className="text-left px-5 py-3 font-medium">Class</th>
                <th className="text-right px-5 py-3 font-medium">Balance</th>
                <th className="text-center px-5 py-3 font-medium">Status</th>
                <th className="text-center px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PARENT.children.map((child) => (
                <tr key={child.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-green/10 text-brand-green text-xs font-bold flex items-center justify-center rounded-lg">
                        {child.firstName[0]}{child.lastName[0]}
                      </div>
                      <span className="font-medium text-slate-800">{child.firstName} {child.lastName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{child.class}</td>
                  <td className="px-5 py-4 text-right font-bold text-slate-900">₦{child.outstandingFees.toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    {child.outstandingFees > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Unpaid</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Cleared</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {child.outstandingFees > 0 ? (
                      <button className="text-xs font-semibold text-brand-green hover:text-brand-green-700 hover:underline transition-colors">
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Payment History</h2>
          <span className="text-[11px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
            {PAYMENT_HISTORY.length} records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/30 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Reference</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Ward</th>
                <th className="text-left px-5 py-3 font-medium">Method</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
                <th className="text-center px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAYMENT_HISTORY.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-600">{p.id}</td>
                  <td className="px-5 py-4 text-slate-600">{p.date}</td>
                  <td className="px-5 py-4 font-medium text-slate-800">{p.ward}</td>
                  <td className="px-5 py-4 text-slate-600">{p.method}</td>
                  <td className="px-5 py-4 text-right font-bold text-slate-900">₦{p.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      {p.status}
                    </span>
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
