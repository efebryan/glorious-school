"use client";

const PIPELINE = [
  { stage: "Awaiting Entry", count: 12, color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  { stage: "Draft", count: 8, color: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  { stage: "Pending Approval", count: 5, color: "bg-orange-100 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  { stage: "Approved", count: 25, color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
];

const SUBJECTS_LIST = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "Economics", "Government", "Civic Ed"];
const CLASSES_LIST = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"];

// Status: A=Approved, P=Pending, D=Draft, N=Not started, X=N/A
const STATUS_MAP: Record<string, string[]> = {
  Mathematics:  ["A", "A", "D", "A", "P", "A"],
  English:      ["A", "A", "A", "A", "A", "D"],
  Physics:      ["X", "X", "X", "A", "P", "A"],
  Chemistry:    ["X", "X", "X", "A", "A", "D"],
  Biology:      ["X", "X", "X", "A", "A", "A"],
  Economics:    ["X", "X", "X", "P", "A", "A"],
  Government:   ["X", "X", "X", "D", "D", "A"],
  "Civic Ed":   ["A", "A", "A", "A", "P", "N"],
};

const STATUS_DISPLAY: Record<string, { icon: string; bg: string }> = {
  A: { icon: "✅", bg: "bg-green-50" },
  P: { icon: "🟠", bg: "bg-orange-50" },
  D: { icon: "🟡", bg: "bg-yellow-50" },
  N: { icon: "🔴", bg: "bg-red-50" },
  X: { icon: "—", bg: "bg-slate-50" },
};

const GRADING_SCALE = [
  { grade: "A", range: "70 – 100", remark: "Excellent" },
  { grade: "B", range: "60 – 69", remark: "Very Good" },
  { grade: "C", range: "50 – 59", remark: "Good" },
  { grade: "D", range: "40 – 49", remark: "Fair" },
  { grade: "E", range: "30 – 39", remark: "Poor" },
  { grade: "F", range: "0 – 29", remark: "Fail" },
];

export default function ResultsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Results Oversight</h1>
          <p className="text-sm text-slate-500 mt-0.5">Monitor result submissions and approvals across all classes</p>
        </div>
        <button className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">Bulk Approve All Pending</button>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PIPELINE.map((p, i) => (
          <div key={i} className={`rounded-xl border p-4 ${p.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
              <span className="text-xs font-bold">{p.stage}</span>
            </div>
            <p className="text-2xl font-bold">{p.count} <span className="text-sm font-normal opacity-70">subjects</span></p>
          </div>
        ))}
      </div>

      {/* Results Matrix */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Completion Matrix</h2>
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3.5 font-medium">Subject</th>
                  {CLASSES_LIST.map((c) => (
                    <th key={c} className="text-center px-3 py-3.5 font-medium">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SUBJECTS_LIST.map((sub) => (
                  <tr key={sub} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-semibold text-slate-800">{sub}</td>
                    {STATUS_MAP[sub].map((st, j) => {
                      const d = STATUS_DISPLAY[st];
                      return (
                        <td key={j} className={`px-3 py-3 text-center ${d.bg}`}>
                          <span className="text-base">{d.icon}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">✅ Approved</span>
          <span className="flex items-center gap-1">🟠 Pending Review</span>
          <span className="flex items-center gap-1">🟡 Draft</span>
          <span className="flex items-center gap-1">🔴 Not Started</span>
          <span className="flex items-center gap-1">— N/A</span>
        </div>
      </div>

      {/* Grading Scale */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Grading Scale</h2>
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-center px-5 py-3 font-medium">Grade</th>
              <th className="text-center px-4 py-3 font-medium">Score Range</th>
              <th className="text-left px-4 py-3 font-medium">Remark</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {GRADING_SCALE.map((g, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3 text-center font-bold text-slate-800">{g.grade}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{g.range}</td>
                  <td className="px-4 py-3 text-slate-600">{g.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
