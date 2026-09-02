"use client";

import { Menu, Search, Bell, ChevronDown, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header({ onToggleSidebar, activeTab }) {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery } = useTasks();
  const { theme, toggleTheme, mounted } = useTheme();

  const formattedTabTitle = activeTab
    ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    : "Dashboard";

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-2.5 sm:px-6 lg:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-1.5 sm:gap-4 transition-colors duration-200 w-full overflow-hidden">
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-1 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none cursor-pointer shrink-0"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <h1 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
          {formattedTabTitle}
        </h1>
      </div>

      {/* Right side: Search bar, Theme Switcher, Notification bell, User avatar */}
      <div className="flex items-center gap-1 sm:gap-3 md:gap-4 shrink-0">
        {/* Search Input (Hidden on ultra-small <360px, compact on sm) */}
        <div className="relative hidden xs:block w-20 sm:w-64 md:w-80">
          <Search className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-6 pr-1.5 py-1 sm:pl-9 sm:pr-4 sm:py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
          />
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark and Light Theme"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          className="p-1 sm:p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer shrink-0"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>

        {/* Notification Bell */}
        <button className="relative p-1 sm:p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer shrink-0">
          <Bell className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        {/* User Profile Avatar */}
        <button
          type="button"
          aria-label="User profile menu"
          className="flex items-center gap-2 sm:gap-3 border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-4 shrink-0 group relative cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg transition-all"
        >
          {/* Avatar with status indicator */}
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 dark:from-sky-500 dark:to-sky-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center shadow-md shadow-slate-900/20 dark:shadow-sky-500/20 ring-2 ring-white dark:ring-slate-800 hover:scale-105 transition-transform duration-200">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {/* Online status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></span>
          </div>

          {/* User info */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {user?.email || "user@example.com"}
            </span>
          </div>
          {/* Chevron with hover animation */}
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all group-hover:rotate-180 duration-300 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
