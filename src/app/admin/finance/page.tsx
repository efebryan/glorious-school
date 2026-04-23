"use client";

const REVENUE = [
  { label: "Total Expected", value: "₦48,500,000", color: "text-slate-800", sub: "Based on enrollment × fee structure" },
  { label: "Total Collected", value: "₦37,200,000", color: "text-green-700", sub: "77% collection rate" },
  { label: "Outstanding", value: "₦11,300,000", color: "text-red-700", sub: "156 students owing" },
  { label: "Total Expenses", value: "₦8,400,000", color: "text-amber-700", sub: "Salaries, utilities, maintenance" },
];

const MONTHLY_COLLECTION = [
  { month: "Oct", amount: 8200000, percent: 85 },
  { month: "Nov", amount: 5600000, percent: 58 },
  { month: "Dec", amount: 4100000, percent: 42 },
  { month: "Jan", amount: 9800000, percent: 92 },
  { month: "Feb", amount: 6800000, percent: 70 },
  { month: "Mar", amount: 2700000, percent: 45 },
];

const TOP_DEFAULTERS = [
  { student: "Ahmed Musa", class: "SS 2", outstanding: "₦285,000", lastPayment: "Nov 15, 2025" },
  { student: "Chidi Okoro", class: "SS 3", outstanding: "₦230,000", lastPayment: "Oct 8, 2025" },
  { student: "Fatima Yusuf", class: "SS 1", outstanding: "₦195,000", lastPayment: "Dec 2, 2025" },
  { student: "Obinna Nwosu", class: "JSS 3", outstanding: "₦150,000", lastPayment: "Jan 10, 2026" },
  { student: "Blessing Eze", class: "SS 3", outstanding: "₦120,000", lastPayment: "Feb 1, 2026" },
];

const FEE_STRUCTURE = [
  { type: "Tuition", nursery: "₦45,000", primary: "₦55,000", jss: "₦75,000", ss: "₦95,000" },
  { type: "Development Levy", nursery: "₦10,000", primary: "₦12,000", jss: "₦15,000", ss: "₦18,000" },
  { type: "Lab Fee", nursery: "—", primary: "—", jss: "₦5,000", ss: "₦8,000" },
  { type: "Sports Fee", nursery: "₦3,000", primary: "₦3,000", jss: "₦5,000", ss: "₦5,000" },
  { type: "ICT Fee", nursery: "—", primary: "₦5,000", jss: "₦8,000", ss: "₦10,000" },
  { type: "Exam Fee", nursery: "₦2,000", primary: "₦3,000", jss: "₦5,000", ss: "₦10,000" },
];

export default function FinancePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Finance Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Executive financial dashboard — 2nd Term, 2025/2026</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">Export Report</button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {REVENUE.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-4">
            <p className="text-xs text-slate-500 font-medium">{r.label}</p>
            <p className={`text-lg sm:text-xl font-bold mt-1 ${r.color}`}>{r.value}</p>
            <p className="text-[11px] text-slate-400 mt-1">{r.sub}</p>
          </div>
        ))}
      </div>

      {/* Collection Rate Bar */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-5">
        <h2 className="text-sm font-bold text-slate-800 mb-1">Overall Collection Rate</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all" style={{ width: "77%" }} />
          </div>
          <span className="text-lg font-bold text-green-700 shrink-0">77%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Collection Chart (mock) */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">Monthly Collection Trend</h2>
          <div className="bg-white rounded-xl border border-slate-200/60 p-5">
            <div className="flex items-end gap-2 h-40">
              {MONTHLY_COLLECTION.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-700">{m.percent}%</span>
                  <div className="w-full bg-slate-100 rounded-t-md overflow-hidden" style={{ height: "100%" }}>
                    <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md transition-all" style={{ height: `${m.percent}%`, marginTop: `${100 - m.percent}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Defaulters */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">Top Defaulters</h2>
          <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100">
            {TOP_DEFAULTERS.map((d, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{d.student}</p>
                  <p className="text-[11px] text-slate-500">{d.class} • Last Payment: {d.lastPayment}</p>
                </div>
                <span className="text-sm font-bold text-red-600">{d.outstanding}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Fee Structure (Per Term)</h2>
          <button className="text-sm text-indigo-600 font-semibold hover:underline">Edit Fees</button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Fee Type</th>
                <th className="text-center px-4 py-3.5 font-medium">Nursery</th>
                <th className="text-center px-4 py-3.5 font-medium">Primary</th>
                <th className="text-center px-4 py-3.5 font-medium">JSS</th>
                <th className="text-center px-4 py-3.5 font-medium">SS</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {FEE_STRUCTURE.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-semibold text-slate-800">{f.type}</td>
                    <td className="px-4 py-3 text-center text-slate-600">{f.nursery}</td>
                    <td className="px-4 py-3 text-center text-slate-600">{f.primary}</td>
                    <td className="px-4 py-3 text-center text-slate-600">{f.jss}</td>
                    <td className="px-4 py-3 text-center text-slate-600">{f.ss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
