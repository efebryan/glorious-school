"use client";

import { MOCK_STUDENT } from "@/lib/dashboard-config";

function InfoField({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className={`text-sm font-medium ${accent ? "text-emerald-600" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const student = MOCK_STUDENT;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">View your personal and academic information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Avatar card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden text-center">
            {/* Banner */}
            <div className="h-20 bg-gradient-to-br from-brand-green-600 to-brand-green relative">
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-brand-green-50 border-[3px] border-white flex items-center justify-center text-xl font-bold text-brand-green shadow-md">
                  {student.initials}
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="pt-12 pb-6 px-5">
              <h2 className="text-lg font-bold text-slate-900">{student.firstName} {student.lastName}</h2>
              <p className="text-xs font-semibold text-brand-green mt-0.5">{student.admissionNo}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="px-2.5 py-1 bg-slate-100 rounded-full text-[11px] font-semibold text-slate-600">
                  Student
                </span>
                <span className="px-2.5 py-1 bg-emerald-100 rounded-full text-[11px] font-semibold text-emerald-700">
                  {student.status}
                </span>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100">
                <button className="w-full text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg py-2.5 transition-colors">
                  Request Photo Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Detail cards */}
        <div className="lg:col-span-2 space-y-5">
          {/* Academic Details */}
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-slate-800 text-sm">Academic Details</h2>
            </div>
            <div className="p-5 sm:p-6 grid grid-cols-2 gap-5">
              <InfoField label="Current Class" value={`${student.class}`} />
              <InfoField label="Department" value={student.department} />
              <InfoField label="Enrollment Date" value={student.enrollmentDate} />
              <InfoField label="Status" value={student.status} accent />
            </div>
          </div>

          {/* Guardian Info */}
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-slate-800 text-sm">Parent / Guardian</h2>
            </div>
            <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoField label="Guardian Name" value={student.guardian.name} />
              <InfoField label="Relationship" value={student.guardian.relationship} />
              <InfoField label="Phone Number" value={student.guardian.phone} />
              <InfoField label="Email Address" value={student.guardian.email} />
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-slate-800 text-sm">Change Password</h2>
            </div>
            <div className="p-5 sm:p-6">
              <form className="space-y-4 max-w-sm">
                {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="h-10 px-5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
