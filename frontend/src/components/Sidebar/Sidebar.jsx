"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import {
  Settings as SettingsIcon,
  LogOut,
  X,
  ChevronLeft
} from "lucide-react";

export default function Sidebar({
  isOpen: propIsOpen,
  setIsOpen: propSetIsOpen,
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const sidebarContext = useSidebar();

  // Support both context state and direct props for backward compatibility
  const isMobileOpen = propIsOpen !== undefined ? propIsOpen : sidebarContext?.isMobileOpen ?? false;
  const setMobileOpen = propSetIsOpen || sidebarContext?.setIsMobileOpen || (() => {});
  const isCollapsed = sidebarContext?.isCollapsed ?? false;
  const toggleCollapse = sidebarContext?.toggleCollapse || (() => {});

  const userInitial = (user?.name?.trim()?.charAt(0) || user?.email?.trim()?.charAt(0) || "N").toUpperCase();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: (isActive) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-purple-600 dark:text-[#e9d5ff]"
              : "text-slate-400 group-hover:text-slate-700 dark:text-[#8e8c9f] dark:group-hover:text-white"
          }`}
        >
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
        </svg>
      ),
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: (isActive) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-purple-600 dark:text-[#e9d5ff]"
              : "text-slate-400 group-hover:text-slate-700 dark:text-[#8e8c9f] dark:group-hover:text-white"
          }`}
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: (isActive) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-purple-600 dark:text-[#e9d5ff]"
              : "text-slate-400 group-hover:text-slate-700 dark:text-[#8e8c9f] dark:group-hover:text-white"
          }`}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: (isActive) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-purple-600 dark:text-[#e9d5ff]"
              : "text-slate-400 group-hover:text-slate-700 dark:text-[#8e8c9f] dark:group-hover:text-white"
          }`}
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      href: "/settings",
      label: "Settings",
      icon: (isActive) => (
        <SettingsIcon
          className={`w-5 h-5 shrink-0 transition-colors ${
            isActive
              ? "text-purple-600 dark:text-[#e9d5ff]"
              : "text-slate-400 group-hover:text-slate-700 dark:text-[#8e8c9f] dark:group-hover:text-white"
          }`}
        />
      ),
    },
  ];

  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ========================================================== */}
      {/* 1 & 2. DESKTOP SIDEBAR (Theme Adaptable) - lg:flex         */}
      {/* ========================================================== */}
      <aside
        className={`hidden lg:flex fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-[#0c0a15] border-r border-slate-200 dark:border-white/[0.08] shadow-xs dark:shadow-2xl flex-col justify-between transition-all duration-300 ease-in-out select-none ${
          isCollapsed ? "w-20 py-6 px-3 items-center" : "w-64 p-6"
        }`}
      >
        {/* Top Header & Navigation Links */}
        <div className="w-full">
          {/* Header Brand */}
          {isCollapsed ? (
            /* Collapsed Brand: Centered Logo with Expand Tooltip/Action */
            <div className="flex flex-col items-center">
              <button
                onClick={toggleCollapse}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                className="group relative cursor-pointer focus:outline-none"
              >
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(168,85,247,0.35)] transition-transform group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #6d28d9 100%)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="#ffcb05"
                    className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                {/* Tooltip */}
                <span className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-[#181226] dark:border dark:border-white/10 dark:text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-xl">
                  Expand sidebar
                </span>
              </button>
            </div>
          ) : (
            /* Expanded Brand: Logo + "TaskFlow" + Collapse Toggle */
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(168,85,247,0.35)] transition-transform group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #6d28d9 100%)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="#ffcb05"
                    className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">
                  TaskFlow
                </span>
              </Link>

              {/* Desktop Collapse Trigger */}
              <button
                onClick={toggleCollapse}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
                className="text-slate-400 hover:text-slate-700 dark:text-[#8e8c9f] dark:hover:text-white p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className={`mt-8 w-full ${isCollapsed ? "space-y-3.5 flex flex-col items-center" : "space-y-2"}`}>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              if (isCollapsed) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer group ${
                      isActive
                        ? "bg-purple-50 text-purple-600 dark:bg-[#1c142e] dark:text-[#e9d5ff] dark:shadow-[inset_0_0_12px_rgba(168,85,247,0.15)]"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-[#8e8c9f] dark:hover:text-white dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Active Left Vertical Highlight Indicator */}
                    {isActive && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-[3.5px] h-6 rounded-full bg-purple-600 dark:bg-[#c084fc] shadow-[0_0_8px_rgba(147,51,234,0.5)] dark:shadow-[0_0_8px_rgba(192,132,252,0.85)]" />
                    )}

                    {item.icon(isActive)}

                    {/* Tooltip on Hover in Collapsed Mode */}
                    <span className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-[#181226] dark:border dark:border-white/10 dark:text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-xl">
                      {item.label}
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all cursor-pointer group ${
                    isActive
                      ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200/60 dark:border-transparent dark:bg-[#1c142e] dark:text-white dark:shadow-[inset_0_0_12px_rgba(168,85,247,0.15)]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-[#8e8c9f] dark:hover:text-white dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Active Left Vertical Highlight Indicator */}
                  {isActive && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[3.5px] h-7 rounded-full bg-purple-600 dark:bg-[#c084fc] shadow-[0_0_8px_rgba(147,51,234,0.5)] dark:shadow-[0_0_8px_rgba(192,132,252,0.85)]" />
                  )}

                  {item.icon(isActive)}

                  <span
                    className={`text-[15px] ${
                      isActive
                        ? "font-semibold text-purple-900 dark:text-white"
                        : "font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Footer (Logout & Avatar) */}
        <div className="w-full">
          {isCollapsed ? (
            /* Collapsed Bottom: Avatar circle + Logout icon button */
            <div className="flex flex-col items-center gap-3 w-full">
              <div
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 text-slate-800 dark:bg-[#14121d] dark:border-zinc-700/80 dark:text-zinc-200 font-semibold text-base shadow-xs dark:shadow-inner flex items-center justify-center cursor-default"
                title={user?.name || user?.email || "User"}
              >
                {userInitial}
              </div>

              <button
                onClick={logout}
                title="Logout"
                aria-label="Logout"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:text-[#f87171] dark:hover:text-[#fb7185] dark:hover:bg-rose-500/10 transition-colors cursor-pointer relative group"
              >
                <LogOut className="w-5 h-5 text-rose-500 dark:text-[#f87171]" />
                <span className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-[#181226] dark:border dark:border-white/10 dark:text-[#f87171] text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-xl">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            /* Expanded Bottom: Avatar circle + "Logout" in coral red */
            <div className="flex items-center gap-3.5 px-1 py-1">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 text-slate-800 dark:bg-[#14121d] dark:border-zinc-700/80 dark:text-zinc-200 font-semibold text-base shrink-0 shadow-xs dark:shadow-inner flex items-center justify-center">
                {userInitial}
              </div>
              <button
                onClick={logout}
                className="text-rose-500 hover:text-rose-600 dark:text-[#f87171] dark:hover:text-[#fb7185] font-medium text-[15px] transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================== */}
      {/* 3. MOBILE SLIDE-IN DRAWER (Theme Adaptable) - lg:hidden    */}
      {/* ========================================================== */}
      {/* Backdrop Overlay */}
      <div
        onClick={handleCloseDrawer}
        aria-hidden="true"
        className={`fixed inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[240px] max-w-[75vw] bg-white dark:bg-[#0c0a15] border-r border-slate-200 dark:border-white/[0.08] shadow-2xl flex flex-col justify-between p-4 sm:p-5 transition-transform duration-300 ease-in-out select-none lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header & Navigation Links */}
        <div className="w-full">
          {/* Header Brand + Close Button */}
          <div className="flex items-center justify-between pb-1">
            <Link
              href="/dashboard"
              onClick={handleCloseDrawer}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(168,85,247,0.35)]"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #6d28d9 100%)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#ffcb05"
                  className="w-4.5 h-4.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                TaskFlow
              </span>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={handleCloseDrawer}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5 w-full">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleCloseDrawer}
                  className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer group ${
                    isActive
                      ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200/60 dark:border-transparent dark:bg-[#1c142e] dark:text-white dark:shadow-[inset_0_0_12px_rgba(168,85,247,0.15)]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-[#8e8c9f] dark:hover:text-white dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Active Left Vertical Highlight Indicator */}
                  {isActive && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-purple-600 dark:bg-[#c084fc] shadow-[0_0_8px_rgba(147,51,234,0.5)] dark:shadow-[0_0_8px_rgba(192,132,252,0.85)]" />
                  )}

                  {item.icon(isActive)}

                  <span
                    className={`text-sm ${
                      isActive
                        ? "font-semibold text-purple-900 dark:text-white"
                        : "font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Footer (Logout & Avatar) */}
        <div className="w-full pt-3 border-t border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-800 dark:bg-[#14121d] dark:border-zinc-700/80 dark:text-zinc-200 font-semibold text-xs shrink-0 shadow-xs dark:shadow-inner flex items-center justify-center">
              {userInitial}
            </div>
            <button
              onClick={() => {
                handleCloseDrawer();
                logout();
              }}
              className="text-rose-500 hover:text-rose-600 dark:text-[#f87171] dark:hover:text-[#fb7185] font-medium text-sm transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
