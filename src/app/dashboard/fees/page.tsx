"use client";

const INVOICES = [
  { id: "INV-2026-0089", date: "Jan 5, 2026", desc: "2nd Term Tuition Fee", amount: 150000, status: "Pending" as const },
  { id: "INV-2025-1042", date: "Sep 2, 2025", desc: "1st Term Tuition & Books", amount: 185000, status: "Paid" as const },
  { id: "INV-2025-0451", date: "Apr 20, 2025", desc: "3rd Term Tuition Fee", amount: 150000, status: "Paid" as const },
];

export default function FeesPage() {
  const outstanding = INVOICES.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const totalPaid = INVOICES.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Fees & Payments</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your tuition and view payment history.</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-r" />
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Outstanding</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">₦{outstanding.toLocaleString()}</p>
          <p className="text-xs text-red-500 font-medium mt-1">Due by Jan 12, 2026</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-r" />
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Paid</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">₦{totalPaid.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">2 invoices cleared</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Quick Action</p>
          <button className="w-full h-11 bg-brand-green hover:bg-brand-green-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm">
            Pay Now Securely
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-2">Powered by Paystack / Flutterwave</p>
        </div>
      </div>

      {/* Invoice history */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800">Invoice History</h2>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium">Invoice #</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-right px-4 py-3 font-medium">Amount</th>
                <th className="text-center px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVOICES.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{inv.id}</td>
                  <td className="px-4 py-3.5 text-slate-500">{inv.date}</td>
                  <td className="px-4 py-3.5 text-slate-700">{inv.desc}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-slate-800">₦{inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-slate-100">
          {INVOICES.map((inv, i) => (
            <div key={i} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">{inv.id}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}>
                  {inv.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{inv.desc}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{inv.date}</span>
                <span className="font-bold text-sm text-slate-900">₦{inv.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment instructions */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5">
        <h3 className="font-bold text-sm text-slate-800 mb-3">Payment Instructions</h3>
        <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside marker:text-brand-green marker:font-bold">
          <li>Click &quot;Pay Now&quot; to make payment via card, bank transfer, or USSD.</li>
          <li>Payments reflect instantly on your portal.</li>
          <li>For manual bank deposits, bring your teller to the Bursary to update your account.</li>
        </ol>
      </div>
    </div>
  );
}
