"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getNavForRole,
  MOCK_STAFF,
  STAFF_ROLE_LABELS,
  StaffRole,
} from "@/lib/staff-dashboard-config";
import { StaffNotificationDropdown } from "@/components/staff-dashboard/StaffNotificationDropdown";
import { NavIcon } from "@/components/ui/NavIcon";

interface StaffTopBarProps {
  activeRole: StaffRole;
  onRoleChange: (role: StaffRole) => void;
}

export function StaffTopBar({ activeRole, onRoleChange }: StaffTopBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavForRole(activeRole);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Derive current page name
  const currentItem = navItems.find((i) => pathname.startsWith(i.href));
  const currentPage = currentItem?.name ?? "Overview";

  return (
    <>
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200/70 shadow-xs">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8 gap-4">
          {/* Left: Breadcrumbs + Session Pill */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb: Overview > Teacher */}
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span className="truncate">{currentPage}</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                {STAFF_ROLE_LABELS[activeRole]}
              </span>
            </div>

            <div className="hidden md:block h-4 w-px bg-slate-200 mx-1" />

            {/* Session Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                <strong className="text-slate-800 font-semibold">{MOCK_STAFF.session} Academic Session</strong> — {MOCK_STAFF.term}
              </span>
            </div>
          </div>

          {/* Right: Search + Quick Tools + User Profile Info */}
          <div className="flex items-center gap-3">
            {/* Search Input with Ctrl K */}
            <div className="relative hidden xl:block w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search students, classes, results..."
                className="w-full pl-9 pr-14 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
                  Ctrl K
                </kbd>
              </div>
            </div>

            {/* Help / FAQ */}
            <button
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Help & Guidelines"
              aria-label="Help"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Notification Dropdown with badge */}
            <StaffNotificationDropdown />

            {/* Profile Avatar & Details */}
            <Link
              href="/staff-dashboard/profile"
              className="flex items-center gap-2.5 pl-2 hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-[#0d5228] text-[#34d399] font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-emerald-500/20">
                {MOCK_STAFF.initials}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-900">{MOCK_STAFF.displayName}</span>
                <span className="text-[10px] font-semibold text-emerald-700">{MOCK_STAFF.designation}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-[#07361e] text-white flex flex-col transition-transform duration-300 ease-out shadow-2xl ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 border border-[#10b981]/30 text-[#34d399] flex items-center justify-center font-bold text-sm">
                G
              </div>
              <span className="font-bold text-sm text-white">Glorious Portal</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 text-emerald-200/70 hover:text-white rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Role selector */}
          <div className="p-4 border-b border-white/5">
            <p className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-wider mb-2">
              Workspace Role
            </p>
            <select
              value={activeRole}
              onChange={(e) => onRoleChange(e.target.value as StaffRole)}
              className="w-full text-xs font-semibold bg-[#0d4728] border border-emerald-600/40 text-emerald-100 rounded-lg px-3 py-2"
            >
              <option value="teacher">Teacher</option>
              <option value="principal">Principal</option>
              <option value="vice_principal">Vice Principal</option>
              <option value="bursar">Bursar</option>
            </select>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/staff-dashboard/overview"
                  ? pathname === "/staff-dashboard/overview" || pathname === "/staff-dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? "bg-[#10b981] text-white shadow-sm"
                      : "text-emerald-100/80 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <NavIcon name={item.name} className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.name === "Results & Grading" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      5 Due
                    </span>
                  )}
                  {item.name === "Messages" && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white min-w-[18px] text-center">
                      4
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
