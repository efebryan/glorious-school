"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARENT_NAV_ITEMS, PARENT_UNREAD_COUNT } from "@/lib/parent-dashboard-config";

export function ParentSidebar({ 
  isCollapsed = false, 
  toggleSidebar 
}: { 
  isCollapsed?: boolean; 
  toggleSidebar?: () => void 
}) {
  const pathname = usePathname();

  return (
    <aside 
      className={`hidden lg:flex flex-col bg-[#0f2316] text-slate-300 fixed inset-y-0 left-0 z-30 transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-[84px]" : "w-[260px]"
      }`}
    >
      {/* Collapse Toggle Button */}
      {toggleSidebar && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3.5 top-6 w-7 h-7 bg-brand-green border-[3px] border-slate-100 text-white rounded-full flex items-center justify-center shadow-sm z-40 transition-transform duration-300 hover:bg-brand-green-700 hover:scale-110"
          style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Logo */}
      <div className={`h-16 flex items-center border-b border-white/[.08] shrink-0 overflow-hidden ${isCollapsed ? "justify-center px-0" : "px-5"}`}>
        <Link href="/parent-dashboard/overview" className="flex items-center gap-2.5 w-full">
          <div className="w-9 h-9 bg-brand-green rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg shrink-0 mx-auto lg:mx-0">
            G
          </div>
          <div className={`flex flex-col leading-tight whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}>
            <span className="font-bold text-[15px] text-white">Glorious Portal</span>
            <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Parent</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-5 space-y-1 ${isCollapsed ? "px-2 text-center" : "px-3"}`}>
        <p className={`text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4 transition-all duration-300 ${isCollapsed ? "opacity-0 h-0 overflow-hidden m-0" : "px-3 opacity-100"}`}>
          Menu
        </p>
        
        {PARENT_NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/parent-dashboard/overview"
              ? pathname === "/parent-dashboard/overview" || pathname === "/parent-dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`group flex items-center rounded-lg transition-all duration-200 relative ${
                isCollapsed ? "justify-center h-12 w-12 mx-auto" : "gap-3 px-3 py-2.5 text-[13px]"
              } ${
                isActive
                  ? "bg-brand-green/15 text-white font-semibold"
                  : "text-white/60 hover:bg-white/[.06] hover:text-white/90"
              }`}
            >
              {isActive && (
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-yellow rounded-r-full ${isCollapsed ? "left-[-8px]" : ""}`} />
              )}
              
              <div className="relative shrink-0 flex items-center justify-center">
                <span className={isCollapsed ? "text-xl" : "text-base"}>{item.icon}</span>
                {item.name === "Messages" && PARENT_UNREAD_COUNT > 0 && (
                  <span className={`absolute bg-red-500 text-white font-bold rounded-full flex items-center justify-center ring-2 ring-[#0f2316] ${
                    isCollapsed 
                      ? "-top-1 -right-1 w-3 h-3 text-[0px]" 
                      : "-top-1.5 -right-2.5 w-4 h-4 text-[9px]"
                  }`}>
                    {!isCollapsed && PARENT_UNREAD_COUNT}
                  </span>
                )}
              </div>

              <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className={`p-4 border-t border-white/[.08] shrink-0 mt-auto transition-all ${isCollapsed ? "px-2" : "px-4"}`}>
        <Link
          href="/"
          title={isCollapsed ? "Sign Out" : undefined}
          className={`flex items-center justify-center gap-2 font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all ${
            isCollapsed ? "w-12 h-12 mx-auto text-lg" : "w-full text-sm px-4 py-2.5"
          }`}
        >
          <svg className={isCollapsed ? "w-5 h-5 ml-1" : "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className={`transition-all duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
            Sign Out
          </span>
        </Link>
      </div>
    </aside>
  );
}
