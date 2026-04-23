"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AdminRole,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_COLORS,
  MOCK_ADMIN,
  getNavGroupsForRole,
} from "@/lib/admin-config";

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
}

export function AdminSidebar({ isCollapsed, toggleSidebar, activeRole, onRoleChange }: AdminSidebarProps) {
  const pathname = usePathname();
  const navGroups = getNavGroupsForRole(activeRole);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-[84px]" : "w-[270px]"
      }`}
      style={{ background: "#0f2316" }}
    >
      {/* Logo / Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
          G
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white leading-tight truncate">Glorious Schools</p>
            <p className="text-[10px] font-semibold text-brand-yellow uppercase tracking-widest">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Role Switcher (Dev tool) */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-slate-800/40">
          <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest block mb-1.5">
            Role Preview
          </label>
          <select
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as AdminRole)}
            className="w-full text-xs px-2 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green-500"
          >
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {!isCollapsed && (
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-3 pt-3 pb-1.5">
                {group.label}
              </p>
            )}
            {isCollapsed && <div className="h-px bg-slate-800 mx-2 my-2" />}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                    isActive
                      ? "bg-brand-green-600/15 text-brand-yellow"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-yellow rounded-r-full" />
                  )}
                  <span className="text-base shrink-0 w-6 text-center">{item.icon}</span>
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Admin Profile */}
      <div className="border-t border-slate-800/60 px-4 py-4">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-green-600/20 border border-brand-green-500/30 text-brand-yellow text-xs font-bold flex items-center justify-center shrink-0">
              {MOCK_ADMIN.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{MOCK_ADMIN.firstName} {MOCK_ADMIN.lastName}</p>
              <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${ADMIN_ROLE_COLORS[activeRole]}`}>
                {ADMIN_ROLE_LABELS[activeRole]}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-full bg-brand-green-600/20 border border-brand-green-500/30 text-brand-yellow text-xs font-bold flex items-center justify-center">
              {MOCK_ADMIN.initials}
            </div>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 hover:bg-brand-green text-white rounded-full flex items-center justify-center shadow-md transition-colors border border-slate-600"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg className={`w-3 h-3 transition-transform ${isCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
}
