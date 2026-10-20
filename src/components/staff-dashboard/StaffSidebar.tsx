"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getNavForRole,
  MOCK_STAFF,
  STAFF_ROLE_LABELS,
  StaffRole,
} from "@/lib/staff-dashboard-config";
import { NavIcon } from "@/components/ui/NavIcon";
import { ProfilePhotoUpload } from "@/components/ui/ProfilePhotoUpload";

interface StaffSidebarProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
  activeRole: StaffRole;
  onRoleChange: (role: StaffRole) => void;
}

export function StaffSidebar({
  isCollapsed = false,
  toggleSidebar,
  activeRole,
  onRoleChange,
}: StaffSidebarProps) {
  const pathname = usePathname();
  const navItems = getNavForRole(activeRole);

  return (
    <aside
      className={`hidden lg:flex flex-col bg-[#07361e] text-slate-100 fixed inset-y-0 left-0 z-30 transition-[width] duration-300 ease-in-out border-r border-[#0c492a] ${
        isCollapsed ? "w-[84px]" : "w-[260px]"
      }`}
    >
      {/* Header / Brand */}
      <div
        className={`h-16 flex items-center justify-between border-b border-white/5 shrink-0 px-4 ${
          isCollapsed ? "justify-center px-0" : ""
        }`}
      >
        <Link href="/staff-dashboard/overview" className="flex items-center gap-2.5 min-w-0">
          {/* Flat Cap Brand Icon in Rounded Teal/Green Box */}
          <div className="w-9 h-9 rounded-xl bg-[#10b981]/20 border border-[#10b981]/30 text-[#34d399] flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-bold text-[15px] text-white tracking-tight">Glorious Portal</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                  Staff Portal
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              </div>
            </div>
          )}
        </Link>

        {/* Sidebar collapse chevron toggle */}
        {!isCollapsed && toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-emerald-200/60 hover:text-white hover:bg-white/5 transition-colors"
            title="Collapse Sidebar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Workspace Role Selector */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-[0.15em] mb-2">
            Workspace Role
          </p>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400" />
            <select
              value={activeRole}
              onChange={(e) => onRoleChange(e.target.value as StaffRole)}
              className="w-full text-xs font-semibold bg-[#0d4728] border border-emerald-600/40 text-emerald-100 rounded-xl pl-7 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer appearance-none shadow-inner"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(110,231,183,0.8)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "14px",
              }}
            >
              <option value="teacher" className="bg-[#07361e] text-white">Teacher</option>
              <option value="principal" className="bg-[#07361e] text-white">Principal</option>
              <option value="vice_principal" className="bg-[#07361e] text-white">Vice Principal</option>
              <option value="bursar" className="bg-[#07361e] text-white">Bursar</option>
            </select>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav
        className={`flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-1 ${
          isCollapsed ? "px-2 text-center" : "px-3"
        }`}
      >
        {!isCollapsed && (
          <p className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-[0.15em] px-3 mb-2">
            Main Navigation
          </p>
        )}

        {navItems.map((item) => {
          const isActive =
            item.href === "/staff-dashboard/overview"
              ? pathname === "/staff-dashboard/overview" || pathname === "/staff-dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`group flex items-center justify-between rounded-xl transition-all duration-200 relative ${
                isCollapsed
                  ? "justify-center h-11 w-11 mx-auto my-1"
                  : "px-3.5 py-2.5 text-[13.5px] font-semibold"
              } ${
                isActive
                  ? "bg-[#10b981] text-white shadow-md shadow-emerald-950/40"
                  : "text-emerald-100/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <NavIcon
                  name={item.name}
                  className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4"} shrink-0 ${
                    isActive ? "text-white" : "text-emerald-300/80 group-hover:text-white"
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </div>

              {/* Status Pills / Badges / Active Dot */}
              {!isCollapsed && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
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
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Staff footer Profile Card + Sign Out */}
      <div
        className={`border-t border-white/5 shrink-0 mt-auto transition-all ${
          isCollapsed ? "p-2" : "p-3 space-y-2"
        }`}
      >
        {!isCollapsed && (
          <div className="bg-[#0b4224] rounded-xl p-2.5 border border-emerald-600/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-lg bg-[#34d399] text-[#07361e] font-bold flex items-center justify-center text-xs shadow-sm">
                  {MOCK_STAFF.initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0b4224]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{MOCK_STAFF.fullName}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-200/60 truncate">
                  <span className="bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded font-medium">
                    Science
                  </span>
                  <span>{MOCK_STAFF.staffId}</span>
                </div>
              </div>
            </div>
            <Link
              href="/staff-dashboard/profile"
              className="p-1 text-emerald-300/60 hover:text-white transition-colors"
              title="Profile Settings"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        )}

        <Link
          href="/"
          title={isCollapsed ? "Sign Out" : undefined}
          className={`flex items-center justify-center gap-2 font-medium text-emerald-200/70 hover:text-white hover:bg-white/5 rounded-lg transition-all ${
            isCollapsed
              ? "w-10 h-10 mx-auto"
              : "w-full text-xs px-3 py-2"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
