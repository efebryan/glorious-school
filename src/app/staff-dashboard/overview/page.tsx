"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_STAFF } from "@/lib/staff-dashboard-config";

export default function StaffOverviewPage() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto space-y-6">
      {/* =========================================================================
          1. HERO BANNER
          Rich dark-green with subtle vertical pinstripes pattern, avatar AO,
          pill tags, greeting, schedule and view profile buttons
         ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#06331c] via-[#094326] to-[#07361e] text-white p-5 sm:p-6 shadow-md border border-emerald-900/40">
        {/* Subtle patterned overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 40px)",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left Info: Avatar + Details */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Square Rounded Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-[#5eead4] text-[#06331c] font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
              {MOCK_STAFF.initials}
            </div>

            <div className="space-y-1">
              {/* Pills above name */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-emerald-300">
                <span>{MOCK_STAFF.session} — {MOCK_STAFF.term.toUpperCase()}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-emerald-100 text-[10px] border border-white/10">
                  {MOCK_STAFF.specialization}
                </span>
              </div>

              {/* Greeting text with waving hand */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Welcome back, {MOCK_STAFF.displayName}</span>
                <span className="inline-block text-2xl sm:text-3xl">👋</span>
              </h1>

              {/* Staff metadata row */}
              <div className="flex items-center gap-3 text-xs text-emerald-200/80 flex-wrap pt-0.5">
                <span>Staff ID: <strong className="text-white font-semibold">{MOCK_STAFF.staffId}</strong></span>
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>{MOCK_STAFF.department}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="px-2 py-0.5 rounded-full bg-[#0d5228] text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Teacher
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <Link
              href="/staff-dashboard/timetable"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-colors backdrop-blur-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              My Schedule
            </Link>
            <Link
              href="/staff-dashboard/profile"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-xs font-bold text-slate-900 transition-colors shadow-sm"
            >
              View Profile
              <svg className="w-3.5 h-3.5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. METRIC CARDS ROW (4 Cards)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Students
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">342</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Across assigned classes:</span>
              <span className="font-bold text-slate-700">SS 1 &amp; SS 2</span>
            </div>
          </div>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }} />
          </div>
        </div>

        {/* Pending Results */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pending Results
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">5</span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 line-clamp-1">
              Awaiting score entry or HOD verification
            </p>
          </div>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: "35%" }} />
          </div>
        </div>

        {/* Attendance Today */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Attendance Today
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">91%</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200/60">
                ↑ +2.4%
              </span>
            </div>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              <strong className="text-emerald-700 font-semibold">312</strong> present, <strong className="text-rose-600 font-semibold">30</strong> absent
            </div>
          </div>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "91%" }} />
          </div>
        </div>

        {/* Fee Clearance */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Fee Clearance
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-sm">
              ₦
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">₦4.2M</span>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                82% Clear
              </span>
            </div>
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 line-clamp-1">
              Term 2 collection target on track
            </p>
          </div>
          <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width: "82%" }} />
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN 2-COLUMN SPLIT (Left 65% / Right 35%)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Actions Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
                <p className="text-xs text-slate-500">Frequently used teacher workflows and tools</p>
              </div>
              <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                Customize
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Action 1: Enter Results */}
              <Link
                href="/staff-dashboard/results"
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      Enter Results
                    </h3>
                    <p className="text-xs text-slate-500 truncate">Submit exam &amp; CA test scores</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Action 2: Take Attendance */}
              <Link
                href="/staff-dashboard/attendance"
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Take Attendance
                    </h3>
                    <p className="text-xs text-slate-500 truncate">Mark daily or period roll call</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Action 3: View Timetable */}
              <Link
                href="/staff-dashboard/timetable"
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      View Timetable
                    </h3>
                    <p className="text-xs text-slate-500 truncate">Weekly teaching &amp; lab periods</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Action 4: Post Announcement */}
              <Link
                href="/staff-dashboard/announcements"
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/20 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      Post Announcement
                    </h3>
                    <p className="text-xs text-slate-500 truncate">Broadcast notice to classes</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
                <p className="text-xs text-slate-500">Audit log of your academic operations</p>
              </div>
              <Link
                href="/staff-dashboard/overview"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
              >
                <span>View Full Log</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Activity 1 */}
              <div className="py-3.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Submitted SS 2 Physics continuous assessment
                    </p>
                    <p className="text-[11px] text-slate-500">
                      42 student test sheets processed and sent for HOD verification.
                    </p>
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                        Verified Entry
                      </span>
                      <span className="text-[10px] text-slate-400">· Subject: PHY 201</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium shrink-0">10 min ago</span>
              </div>

              {/* Activity 2 */}
              <div className="py-3.5 flex items-start justify-between gap-3 last:pb-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Marked morning attendance for SS 1A
                    </p>
                    <p className="text-[11px] text-slate-500">
                      34 present, 2 absent recorded for period 1 homeroom.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium shrink-0">1 hr ago</span>
              </div>

              {/* Activity 3 */}
              <div className="py-3.5 flex items-start justify-between gap-3 last:pb-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      Parent consultation reply sent to Mr. Richard Doe
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Concerning academic progress feedback for Second Term physics.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium shrink-0">3 hrs ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Staff Notice Card */}
          <div className="bg-white rounded-2xl border-2 border-amber-200/80 p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Staff Notice</span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300/60 tracking-wider">
                    URGENT
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-800 mt-1">Result Submission Deadline</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              All subject teachers must submit continuous assessment (CA2) and term exam scores before{" "}
              <strong className="text-slate-900 font-semibold">Friday, March 7th</strong>.
            </p>

            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-amber-800/80 font-medium">From: Academic Office</span>
              <button
                onClick={() => setAcknowledged(!acknowledged)}
                className={`inline-flex items-center gap-1 font-bold text-xs transition-colors ${
                  acknowledged
                    ? "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md"
                    : "text-amber-800 hover:text-amber-950 underline"
                }`}
              >
                <span>{acknowledged ? "Acknowledged" : "Acknowledge"}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Upcoming Events</h2>
              <Link
                href="/staff-dashboard/timetable"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
              >
                <span>Calendar</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            <div className="space-y-3.5">
              {/* Event 1: Result Submission */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-wider leading-none">MAR</span>
                    <span className="text-base font-black leading-tight">07</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">Result Submission Dea...</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>11:59 PM (Portal Lock)</span>
                    </div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              </div>

              {/* Event 2: Staff General Meeting */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-wider leading-none">MAR</span>
                    <span className="text-base font-black leading-tight">15</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">Staff General Meeting</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10:00 AM
                      </span>
                      <span>·</span>
                      <span className="truncate">Main Auditorium</span>
                    </div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              </div>

              {/* Event 3: Inter-House Sports */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-wider leading-none">MAR</span>
                    <span className="text-base font-black leading-tight">22</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">Inter-House Sports Co...</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        08:00 AM
                      </span>
                      <span>·</span>
                      <span className="truncate">Sports Complex</span>
                    </div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
