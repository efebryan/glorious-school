"use client";

const ROLES = [
  { name: "Super Admin", users: 1, color: "bg-red-100 text-red-700 border-red-200", perms: "Full system access — all modules, all actions, system settings" },
  { name: "Admin", users: 2, color: "bg-blue-100 text-blue-700 border-blue-200", perms: "Manage users, academics, CMS, finance oversight" },
  { name: "Principal", users: 1, color: "bg-amber-100 text-amber-700 border-amber-200", perms: "Approve results, post announcements, view reports" },
  { name: "Vice Principal", users: 1, color: "bg-purple-100 text-purple-700 border-purple-200", perms: "Manage attendance, handle discipline records" },
  { name: "Bursar", users: 1, color: "bg-emerald-100 text-emerald-700 border-emerald-200", perms: "Fee configuration, invoices, payment tracking" },
  { name: "Teacher", users: 8, color: "bg-sky-100 text-sky-700 border-sky-200", perms: "Enter results, take attendance, view timetable" },
  { name: "Student", users: 1042, color: "bg-slate-100 text-slate-700 border-slate-200", perms: "View results, timetable, fees, attendance" },
  { name: "Parent", users: 412, color: "bg-pink-100 text-pink-700 border-pink-200", perms: "View children data, fees, messages" },
];

const MODULES = ["User Mgmt", "Results", "Attendance", "Finance", "CMS", "Announcements", "Reports", "Settings"];
const PERMISSION_MATRIX: Record<string, boolean[]> = {
  "Super Admin": [true, true, true, true, true, true, true, true],
  Admin:         [true, true, true, true, true, true, true, false],
  Principal:     [false, true, false, false, false, true, true, false],
  "Vice Principal": [false, false, true, false, false, true, false, false],
  Bursar:        [false, false, false, true, false, false, true, false],
  Teacher:       [false, true, true, false, false, false, false, false],
};

export default function RolesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Roles & Permissions</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage access levels across the system</p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ROLES.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200/60 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${r.color}`}>{r.name}</span>
              <span className="text-lg font-bold text-slate-800">{r.users}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">{r.perms}</p>
          </div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Permission Matrix</h2>
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3.5 font-medium">Role</th>
                  {MODULES.map((m) => (
                    <th key={m} className="text-center px-3 py-3.5 font-medium">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(PERMISSION_MATRIX).map(([role, perms]) => (
                  <tr key={role} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{role}</td>
                    {perms.map((p, j) => (
                      <td key={j} className="px-3 py-3.5 text-center">
                        {p ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-green-100 text-green-700 text-xs font-bold">✓</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    ))}
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
