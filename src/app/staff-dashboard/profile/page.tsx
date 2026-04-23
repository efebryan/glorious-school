"use client";

import { MOCK_STAFF, STAFF_ROLE_LABELS, STAFF_ROLE_COLORS } from "@/lib/staff-dashboard-config";

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <h1 className="text-xl font-bold text-slate-900">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-green-700 to-brand-green h-24 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-brand-green">
              {MOCK_STAFF.initials}
            </div>
          </div>
        </div>
        <div className="pt-14 pb-5 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{MOCK_STAFF.firstName} {MOCK_STAFF.lastName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${STAFF_ROLE_COLORS[MOCK_STAFF.role]}`}>
                  {STAFF_ROLE_LABELS[MOCK_STAFF.role]}
                </span>
                <span className="text-xs text-slate-400">{MOCK_STAFF.staffId}</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-5">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs">👤</span>
            Personal Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Full Name</span>
              <span className="text-sm font-semibold text-slate-800">{MOCK_STAFF.firstName} {MOCK_STAFF.lastName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Email</span>
              <span className="text-sm text-slate-700">{MOCK_STAFF.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Phone</span>
              <span className="text-sm text-slate-700">{MOCK_STAFF.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs font-medium text-slate-500">Status</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{MOCK_STAFF.status}</span>
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-5">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">🏫</span>
            Employment Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Staff ID</span>
              <span className="text-sm font-semibold text-slate-800">{MOCK_STAFF.staffId}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Role</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${STAFF_ROLE_COLORS[MOCK_STAFF.role]}`}>{STAFF_ROLE_LABELS[MOCK_STAFF.role]}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Department</span>
              <span className="text-sm text-slate-700">{MOCK_STAFF.department}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Date Joined</span>
              <span className="text-sm text-slate-700">{MOCK_STAFF.dateJoined}</span>
            </div>
            <div className="flex justify-between items-start py-2 border-b border-slate-100">
              <span className="text-xs font-medium text-slate-500">Assigned Classes</span>
              <div className="flex flex-wrap gap-1 justify-end">
                {MOCK_STAFF.assignedClasses.map((cls, i) => (
                  <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-green-50 text-brand-green-700">{cls}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-start py-2">
              <span className="text-xs font-medium text-slate-500">Subjects</span>
              <div className="flex flex-wrap gap-1 justify-end">
                {MOCK_STAFF.assignedSubjects.map((sub, i) => (
                  <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">{sub}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-xs">🔒</span>
          Change Password
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Current Password</label>
            <input type="password" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">New Password</label>
            <input type="password" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Confirm Password</label>
            <input type="password" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="••••••••" />
          </div>
        </div>
        <button className="mt-4 px-5 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
          Update Password
        </button>
      </div>
    </div>
  );
}
