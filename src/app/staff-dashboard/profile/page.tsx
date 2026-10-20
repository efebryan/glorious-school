"use client";

import { useState } from "react";
import { MOCK_STAFF } from "@/lib/staff-dashboard-config";
import { ProfilePhotoUpload } from "@/components/ui/ProfilePhotoUpload";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "employment" | "credentials" | "security" | "activity"
  >("overview");
  const [copiedId, setCopiedId] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form states for Personal Info
  const [phone, setPhone] = useState("+234 812 345 6789");
  const [address, setAddress] = useState("Plot 14, Admiralty Way, Lekki Phase 1, Lagos State");

  const copyStaffId = () => {
    navigator.clipboard?.writeText(MOCK_STAFF.staffId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto space-y-6">
      {/* =========================================================================
          1. PROFILE HEADER HERO CARD
          Banner with School & Wing Badge, Active Status, Floating AO Avatar,
          Name, Tags, Contact Info, and Action Buttons (Print Dossier, ID, Edit)
         ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Banner Area */}
        <div className="relative bg-gradient-to-r from-[#06331c] via-[#094326] to-[#0b4d2c] h-36 sm:h-44 px-6 pt-5 pb-4 flex flex-col justify-between overflow-hidden">
          {/* Subtle watermark / background illustration */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 40px)",
            }}
          />
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
            <svg className="w-56 h-56" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18V17c0 3.31 3.13 6 7 6s7-2.69 7-6v-5.18L12 15z" />
            </svg>
          </div>

          {/* Top Banner Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
              <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Glorious College of Excellence • Senior Faculty Wing</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042413]/70 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Academic Staff Status</span>
            </div>
          </div>
        </div>

        {/* Profile Details Row */}
        <div className="px-6 pt-0 pb-6 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 -mt-12 sm:-mt-14">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Avatar Box with camera upload icon */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#06331c] text-white border-4 border-white shadow-xl flex items-center justify-center font-black text-3xl tracking-tight">
                  {MOCK_STAFF.initials}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <ProfilePhotoUpload
                    initials={MOCK_STAFF.initials}
                    name={MOCK_STAFF.fullName}
                    size="sm"
                    className="[&>div:first-child]:hidden"
                    showUploadButton={true}
                  />
                </div>
              </div>

              {/* Names & Metadata */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Mrs. Adaeze Ngozi Okonkwo
                  </h1>
                  <span className="px-2 py-0.5 rounded-md bg-[#0d5228] text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                    Teacher
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active Staff
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span>Senior Science Department • Physics &amp; Chemistry Specialist</span>
                </p>

                {/* Sub row with ID, email, phone */}
                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-1">
                  <button
                    onClick={copyStaffId}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold transition-colors"
                    title="Click to copy Staff ID"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <span>{MOCK_STAFF.staffId}</span>
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copiedId && <span className="text-[10px] text-emerald-600 font-sans">Copied!</span>}
                  </button>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {MOCK_STAFF.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Dossier</span>
              </button>

              <button
                onClick={() => {
                  const card = document.getElementById("digital-id-card");
                  card?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-700 hover:bg-emerald-100/60 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Digital ID</span>
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06331c] text-white hover:bg-[#094326] text-xs font-bold transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>{isEditing ? "Close Editor" : "Edit Profile"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. METRIC STATS ROW (4 Cards)
          Assigned Classes, Total Students, TRCN Certified, Service Length
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Assigned Classes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned Classes</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <p className="text-base font-extrabold text-slate-900">SS 1, SS 2</p>
              <span className="text-xs font-semibold text-emerald-700">(3 Arms)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Students */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Students</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <p className="text-base font-extrabold text-slate-900">342 Pupils</p>
              <span className="text-xs font-semibold text-teal-700">Enrolled</span>
            </div>
          </div>
        </div>

        {/* Card 3: TRCN Certified */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">TRCN Certified</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">
              #TRCN/2021/9842
            </p>
          </div>
        </div>

        {/* Card 4: Service Length */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Service Length</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <p className="text-base font-extrabold text-slate-900">4.5 Years</p>
              <span className="text-xs text-slate-400">(Since 2021)</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. NAVIGATION TABS ROW
         ========================================================================= */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-hide text-sm font-semibold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "overview"
              ? "border-[#06331c] text-[#06331c] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile &amp; Overview
        </button>

        <button
          onClick={() => setActiveTab("employment")}
          className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "employment"
              ? "border-[#06331c] text-[#06331c] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          Employment &amp; Subjects
        </button>

        <button
          onClick={() => setActiveTab("credentials")}
          className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "credentials"
              ? "border-[#06331c] text-[#06331c] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Academic Credentials
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "security"
              ? "border-[#06331c] text-[#06331c] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Security &amp; Password
        </button>

        <button
          onClick={() => setActiveTab("activity")}
          className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "activity"
              ? "border-[#06331c] text-[#06331c] font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Activity Log
        </button>
      </div>

      {/* =========================================================================
          4. TAB CONTENT + DIGITAL ID CARD SPLIT
          Left: Personal details, employment, credentials, password forms
          Right: Digital NFC Staff ID Badge Card preview
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Main Form & Details (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Personal & Contact Information */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Personal &amp; Contact Information</h2>
                  <p className="text-xs text-slate-500">
                    Official verified biographical records and emergency telephone lines
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>{isEditing ? "Done" : "Update Details"}</span>
              </button>
            </div>

            {/* Grid of Data Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
              {/* Full Name */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Full Name</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Mrs. Adaeze Ngozi Okonkwo</p>
              </div>

              {/* Gender & Title */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gender &amp; Title</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Female • Mrs.</p>
              </div>

              {/* Date of Birth */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date of Birth</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-sm font-bold text-slate-900">14 May 1986</p>
                  <span className="text-xs text-slate-400">(39 yrs)</span>
                </div>
              </div>

              {/* Institutional Email */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Institutional Email</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-bold text-slate-900 truncate">{MOCK_STAFF.email}</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                    Verified
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone Number</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="text-sm font-bold text-slate-900 mt-1 font-mono">{phone}</p>
                )}
              </div>

              {/* Nationality & State of Origin */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nationality &amp; State</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Nigerian • Delta State</p>
              </div>

              {/* Residential Address */}
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Residential Address</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="text-sm font-bold text-slate-900 mt-1">{address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Employment & Academic Assignment */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Employment &amp; Academic Responsibilities</h2>
                <p className="text-xs text-slate-500">Current faculty assignments, subjects taught, and schedule</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Department</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{MOCK_STAFF.department}</p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Faculty Designation</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Senior Subject Master II (Physics)</p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date of Appointment</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{MOCK_STAFF.dateJoined}</p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Term Load</p>
                <p className="text-sm font-bold text-slate-900 mt-1">18 Teaching Periods / Week</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Assigned Subjects &amp; Classes
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
                    SS 1 • Physics (General)
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
                    SS 2 • Advanced Physics (Science)
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                    SS 2 • Organic Chemistry (Elective)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Security & Password */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Portal Security &amp; Credentials</h2>
                <p className="text-xs text-slate-500">Manage password and active login sessions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Must be at least 8 characters with numbers &amp; symbols.</span>
              <button className="px-4 py-2 rounded-xl bg-[#06331c] hover:bg-[#094326] text-white text-xs font-bold transition-colors">
                Save New Password
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Digital Staff ID Card Widget (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <h2 className="text-base font-bold text-slate-900">Digital Staff ID Card</h2>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                OFFICIAL NFC
              </span>
            </div>

            {/* Realistic NFC Staff ID Card */}
            <div
              id="digital-id-card"
              className="relative w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-[#06331c] via-[#094326] to-[#042413] text-white p-5 shadow-xl border border-emerald-500/20 flex flex-col justify-between overflow-hidden"
            >
              {/* Card texture overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 20px)",
                }}
              />

              {/* ID Card Top Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-400 text-[#06331c] font-black text-xs flex items-center justify-center">
                    GP
                  </div>
                  <div>
                    <p className="text-[11px] font-black tracking-wider uppercase leading-none">GLORIOUS COLLEGE</p>
                    <p className="text-[9px] text-emerald-300 font-semibold tracking-wide">Staff Credentials</p>
                  </div>
                </div>

                {/* NFC Symbol */}
                <svg className="w-5 h-5 text-emerald-300/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.393 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>

              {/* ID Card Middle Row: Avatar + Details */}
              <div className="relative z-10 flex items-center gap-3.5 my-2">
                <div className="w-14 h-14 rounded-xl bg-white/10 border-2 border-emerald-400/40 text-emerald-300 font-black text-lg flex items-center justify-center shrink-0">
                  {MOCK_STAFF.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black truncate">{MOCK_STAFF.fullName}</p>
                  <p className="text-[10px] text-emerald-200/90 truncate font-semibold">
                    Senior Subject Master (Physics)
                  </p>
                  <p className="text-[9px] font-mono text-emerald-400 font-bold mt-0.5">
                    {MOCK_STAFF.staffId}
                  </p>
                </div>
              </div>

              {/* ID Card Bottom Footer: QR Code + Validity */}
              <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/10">
                <div>
                  <p className="text-[8px] uppercase tracking-wider text-emerald-300 font-bold">
                    CAMPUS ACCESS VALID THROUGH
                  </p>
                  <p className="text-[10px] font-bold text-white">August 31, 2027</p>
                </div>

                {/* QR Code graphic mockup */}
                <div className="w-8 h-8 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v4h-4v-4zm-4-4h4v4h-4v-4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Download / Export Button */}
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF ID Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
