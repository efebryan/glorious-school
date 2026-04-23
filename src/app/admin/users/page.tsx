"use client";

import { useState } from "react";

const MOCK_STUDENTS = [
  { name: "John Doe", id: "GGS/2024/0014", class: "SS 2", dept: "Science", guardian: "Mr. Richard Doe", status: "Active" },
  { name: "Jane Doe", id: "GGS/2025/0089", class: "JSS 1", dept: "General", guardian: "Mr. Richard Doe", status: "Active" },
  { name: "Emeka Obi", id: "GGS/2024/0032", class: "SS 1", dept: "Science", guardian: "Mrs. Obi", status: "Active" },
  { name: "Blessing Eze", id: "GGS/2023/0008", class: "SS 3", dept: "Arts", guardian: "Mr. Eze", status: "Active" },
  { name: "Ahmed Musa", id: "GGS/2024/0045", class: "SS 2", dept: "Commercial", guardian: "Alhaji Musa", status: "Suspended" },
  { name: "Grace Akpan", id: "GGS/2025/0101", class: "JSS 2", dept: "General", guardian: "Mrs. Akpan", status: "Active" },
];
const MOCK_STAFF = [
  { name: "Mrs. Adaeze Okonkwo", id: "GGS/STF/2021/003", role: "Teacher", dept: "Science", classes: "SS 1, SS 2", status: "Active" },
  { name: "Mr. James Okafor", id: "GGS/STF/2019/001", role: "Teacher", dept: "Mathematics", classes: "SS 1, SS 3", status: "Active" },
  { name: "Mrs. Sarah Johnson", id: "GGS/STF/2018/002", role: "Principal", dept: "Admin", classes: "—", status: "Active" },
  { name: "Mr. Chukwu", id: "GGS/STF/2020/005", role: "Vice Principal", dept: "Admin", classes: "—", status: "Active" },
  { name: "Mrs. Funke Balogun", id: "GGS/STF/2022/008", role: "Bursar", dept: "Finance", classes: "—", status: "Active" },
];
const MOCK_PARENTS = [
  { name: "Mr. Richard Doe", phone: "+234 800 123 4567", email: "richard@example.com", children: "John Doe, Jane Doe", status: "Active" },
  { name: "Mrs. Obi", phone: "+234 801 234 5678", email: "obi@example.com", children: "Emeka Obi", status: "Active" },
  { name: "Mrs. Akpan", phone: "+234 802 345 6789", email: "akpan@example.com", children: "Grace Akpan", status: "Active" },
];
const MOCK_ADMINS = [
  { name: "Dr. O. Emmanuel", email: "admin@gloriousschools.edu.ng", role: "Super Admin", lastLogin: "Today, 8:15 AM" },
  { name: "Mr. Femi Adeyemi", email: "femi@gloriousschools.edu.ng", role: "Admin", lastLogin: "Yesterday, 3:00 PM" },
  { name: "Mrs. Ifeoma Nwosu", email: "ifeoma@gloriousschools.edu.ng", role: "Admin", lastLogin: "2 days ago" },
];

type Tab = "students" | "staff" | "parents" | "admins";

export default function UsersPage() {
  const [tab, setTab] = useState<Tab>("students");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const TABS: { id: Tab; label: string; count: number }[] = [
    { id: "students", label: "Students", count: MOCK_STUDENTS.length },
    { id: "staff", label: "Staff", count: MOCK_STAFF.length },
    { id: "parents", label: "Parents", count: MOCK_PARENTS.length },
    { id: "admins", label: "Admins", count: MOCK_ADMINS.length },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">All Users</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage students, staff, parents, and admins</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add User
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${tab === t.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-500/30 bg-white" />
      </div>

      {/* Tables */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          {tab === "students" && (
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Student</th>
                <th className="text-left px-4 py-3.5 font-medium">Adm No</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Class</th>
                <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3.5 font-medium hidden lg:table-cell">Guardian</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
                <th className="text-center px-4 py-3.5 font-medium">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-4 py-3.5 text-slate-600 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{s.class}</td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{s.dept}</td>
                    <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell">{s.guardian}</td>
                    <td className="px-4 py-3.5 text-center"><span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.status}</span></td>
                    <td className="px-4 py-3.5 text-center"><button className="text-xs text-brand-green font-semibold hover:underline">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "staff" && (
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Name</th>
                <th className="text-left px-4 py-3.5 font-medium">Staff ID</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Role</th>
                <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Department</th>
                <th className="text-left px-4 py-3.5 font-medium hidden lg:table-cell">Classes</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
                <th className="text-center px-4 py-3.5 font-medium">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_STAFF.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-4 py-3.5 text-slate-600 font-mono text-xs">{s.id}</td>
                    <td className="px-4 py-3.5 hidden sm:table-cell"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-green-100 text-brand-green-700">{s.role}</span></td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{s.dept}</td>
                    <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell">{s.classes}</td>
                    <td className="px-4 py-3.5 text-center"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{s.status}</span></td>
                    <td className="px-4 py-3.5 text-center"><button className="text-xs text-brand-green font-semibold hover:underline">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "parents" && (
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Name</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Phone</th>
                <th className="text-left px-4 py-3.5 font-medium hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3.5 font-medium">Linked Students</th>
                <th className="text-center px-4 py-3.5 font-medium">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_PARENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{p.name}</td>
                    <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">{p.phone}</td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">{p.email}</td>
                    <td className="px-4 py-3.5 text-slate-600">{p.children}</td>
                    <td className="px-4 py-3.5 text-center"><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "admins" && (
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3.5 font-medium">Name</th>
                <th className="text-left px-4 py-3.5 font-medium">Email</th>
                <th className="text-center px-4 py-3.5 font-medium">Role</th>
                <th className="text-left px-4 py-3.5 font-medium hidden sm:table-cell">Last Login</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_ADMINS.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{a.name}</td>
                    <td className="px-4 py-3.5 text-slate-600">{a.email}</td>
                    <td className="px-4 py-3.5 text-center"><span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${a.role === "Super Admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{a.role}</span></td>
                    <td className="px-4 py-3.5 text-slate-500 hidden sm:table-cell">{a.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-brand-green-500 to-purple-500" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Add New User</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">User Type</label><select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none"><option>Student</option><option>Staff</option><option>Parent</option><option>Admin</option></select></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">First Name</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" /></div>
                  <div><label className="text-xs font-medium text-slate-600 mb-1 block">Last Name</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" /></div>
                </div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Email</label><input type="email" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" /></div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Create User</button>
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
