"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AdminRole,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_COLORS,
  MOCK_ADMIN,
  getAllNavItems,
} from "@/lib/admin-config";

interface AdminTopBarProps {
  activeRole: AdminRole;
  onRoleChange: (role: AdminRole) => void;
}

export function AdminTopBar({ activeRole, onRoleChange }: AdminTopBarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = getAllNavItems(activeRole);

  // Derive page title from path
  const currentItem = navItems.find((item) => pathname === item.href || (item.href !== "/admin/overview" && pathname.startsWith(item.href)));
  const pageTitle = currentItem?.name ?? "Admin";

  return (
    <>
      {/* Top bar — visible on all screens */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <p className="text-sm font-bold text-slate-900">{pageTitle}</p>
              <span className={`lg:hidden inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full ${ADMIN_ROLE_COLORS[activeRole]}`}>
                {ADMIN_ROLE_LABELS[activeRole]}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">
            {MOCK_ADMIN.initials}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] flex flex-col animate-fade-in-up" style={{ background: "#020617" }}>
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">G</div>
                <div>
                  <p className="text-sm font-bold text-white">Glorious Schools</p>
                  <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Admin Panel</p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Role switcher */}
            <div className="px-4 py-3 border-b border-slate-800/40">
              <select
                value={activeRole}
                onChange={(e) => onRoleChange(e.target.value as AdminRole)}
                className="w-full text-xs px-2 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg focus:outline-none"
              >
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600/15 text-indigo-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <span className="text-base w-6 text-center">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Profile */}
            <div className="border-t border-slate-800/60 px-4 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                {MOCK_ADMIN.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{MOCK_ADMIN.firstName} {MOCK_ADMIN.lastName}</p>
                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full ${ADMIN_ROLE_COLORS[activeRole]}`}>
                  {ADMIN_ROLE_LABELS[activeRole]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
