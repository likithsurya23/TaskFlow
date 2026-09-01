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
        <div className="flex items-center gap-1 sm:gap-2 border-l border-slate-200 dark:border-slate-800 pl-1.5 sm:pl-3 shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 font-bold text-[10px] sm:text-xs flex items-center justify-center border border-slate-700 dark:border-sky-400 shadow-xs shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="hidden sm:block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {user?.name || "User"}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
