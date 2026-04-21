"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARENT_NAV_ITEMS, MOCK_PARENT, PARENT_UNREAD_COUNT } from "@/lib/parent-dashboard-config";
import { ParentNotificationDropdown } from "@/components/parent-dashboard/ParentNotificationDropdown";

export function ParentTopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Derive current page title from path
  const currentPage =
    PARENT_NAV_ITEMS.find((i) => pathname.startsWith(i.href))?.name ?? "Parent Dashboard";

  return (
    <>
      {/* Responsive header bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between h-14 lg:h-16 px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-slate-800 truncate">{currentPage}</span>
          </div>

          <div className="flex items-center gap-2">
            <ParentNotificationDropdown />
            <Link href="/parent-dashboard/profile" className="w-8 h-8 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-bold text-brand-green flex items-center justify-center">
              {MOCK_PARENT.initials}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-[#0f2316] text-white flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-white/[.08] shrink-0">
            <span className="font-bold text-sm tracking-wide">Glorious Portal</span>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 text-white/50 hover:text-white rounded-md"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
            {PARENT_NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/parent-dashboard/overview"
                  ? pathname === "/parent-dashboard/overview" || pathname === "/parent-dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors relative ${
                    isActive
                      ? "bg-brand-green/15 text-white font-semibold"
                      : "text-white/60 hover:bg-white/[.06] hover:text-white/90"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-yellow rounded-r-full" />
                  )}
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  {item.name === "Messages" && PARENT_UNREAD_COUNT > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {PARENT_UNREAD_COUNT}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Drawer footer */}
          <div className="p-4 border-t border-white/[.08] mt-auto">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full gap-2 text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
