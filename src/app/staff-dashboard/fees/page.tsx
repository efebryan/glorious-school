"use client";

import { useState } from "react";

const FEE_TYPES = [
  { type: "Tuition Fee", amount: "₦120,000", level: "Senior (SS 1-3)", status: "Active" },
  { type: "Tuition Fee", amount: "₦90,000", level: "Junior (JSS 1-3)", status: "Active" },
  { type: "Development Levy", amount: "₦15,000", level: "All Classes", status: "Active" },
  { type: "Exam Fee", amount: "₦10,000", level: "SS 3 Only", status: "Active" },
  { type: "Lab Fee", amount: "₦8,000", level: "Science Students", status: "Active" },
];

const STUDENT_PAYMENTS = [
  { student: "John Doe", class: "SS 2", due: 135000, paid: 135000, balance: 0, status: "Paid" },
  { student: "Jane Doe", class: "JSS 1", due: 105000, paid: 105000, balance: 0, status: "Paid" },
  { student: "Emeka Obi", class: "SS 1", due: 135000, paid: 85000, balance: 50000, status: "Partial" },
  { student: "Blessing Eze", class: "SS 3", due: 145000, paid: 145000, balance: 0, status: "Paid" },
  { student: "Ahmed Musa", class: "SS 2", due: 135000, paid: 0, balance: 135000, status: "Unpaid" },
  { student: "Grace Akpan", class: "JSS 2", due: 105000, paid: 60000, balance: 45000, status: "Partial" },
  { student: "Chinedu Nwankwo", class: "SS 1", due: 135000, paid: 135000, balance: 0, status: "Paid" },
  { student: "Fatima Bello", class: "SS 3", due: 145000, paid: 100000, balance: 45000, status: "Partial" },
];

function formatNaira(n: number) {
  return "₦" + n.toLocaleString();
}

export default function FeesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const totalExpected = STUDENT_PAYMENTS.reduce((a, b) => a + b.due, 0);
  const totalCollected = STUDENT_PAYMENTS.reduce((a, b) => a + b.paid, 0);
  const totalOutstanding = STUDENT_PAYMENTS.reduce((a, b) => a + b.balance, 0);

  const filtered = STUDENT_PAYMENTS.filter((s) => {
    const matchSearch = s.student.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Fees & Finance</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage school fees, payments, and invoices</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Generate Invoice
        </button>
      </div>

      {/* Revenue overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-slate-200/60 p-5">
          <p className="text-xs text-slate-500 font-medium">Total Expected</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{formatNaira(totalExpected)}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">This term (2nd Term)</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-5">
          <p className="text-xs text-slate-500 font-medium">Total Collected</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{formatNaira(totalCollected)}</p>
          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(totalCollected / totalExpected * 100).toFixed(0)}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{(totalCollected / totalExpected * 100).toFixed(0)}% collected</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-5">
          <p className="text-xs text-slate-500 font-medium">Outstanding Balance</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{formatNaira(totalOutstanding)}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{STUDENT_PAYMENTS.filter(s => s.balance > 0).length} students owing</p>
        </div>
      </div>

      {/* Fee Configuration */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Fee Structure</h2>
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Fee Type</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Applicable To</th>
                  <th className="text-center px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEE_TYPES.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-700">{f.type}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{f.amount}</td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{f.level}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{f.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Payment Tracking */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Student Payment Tracking</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 bg-white"
          >
            <option>All</option><option>Paid</option><option>Partial</option><option>Unpaid</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3.5 font-medium">Student</th>
                  <th className="text-left px-4 py-3.5 font-medium">Class</th>
                  <th className="text-right px-4 py-3.5 font-medium">Amount Due</th>
                  <th className="text-right px-4 py-3.5 font-medium hidden sm:table-cell">Amount Paid</th>
                  <th className="text-right px-4 py-3.5 font-medium">Balance</th>
                  <th className="text-center px-4 py-3.5 font-medium">Status</th>
                  <th className="text-center px-4 py-3.5 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{s.student}</td>
                    <td className="px-4 py-3.5 text-slate-600">{s.class}</td>
                    <td className="px-4 py-3.5 text-right text-slate-700">{formatNaira(s.due)}</td>
                    <td className="px-4 py-3.5 text-right text-slate-600 hidden sm:table-cell">{formatNaira(s.paid)}</td>
                    <td className="px-4 py-3.5 text-right font-semibold">
                      <span className={s.balance > 0 ? "text-red-600" : "text-green-600"}>{formatNaira(s.balance)}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        s.status === "Paid" ? "bg-green-100 text-green-700" :
                        s.status === "Partial" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button className="text-brand-green hover:text-brand-green-700 text-xs font-semibold hover:underline">
                        🖨️ Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-slate-400">No students match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
