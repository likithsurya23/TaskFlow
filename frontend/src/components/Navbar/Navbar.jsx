"use client";

import Link from "next/link";
import { Sun, Moon, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between transition-colors duration-200 sticky top-0 z-30 w-full">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 dark:bg-sky-500 text-white flex items-center justify-center font-bold text-xs sm:text-base border border-slate-700 dark:border-sky-400 shadow-xs shrink-0">
            ⚡
          </div>
          <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight whitespace-nowrap">
            TaskFlow
          </span>
        </Link>
      </div>

      {/* Right Controls: Theme Switcher & User/Auth Actions */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium shrink-0">
        {/* Functional Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark and Light Theme"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer shrink-0"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {user.name || user.email}
            </span>
            <button
              onClick={logout}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 font-semibold transition-colors cursor-pointer text-xs shrink-0"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/login"
              className="px-2.5 py-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-sky-400 transition-colors shadow-xs text-xs whitespace-nowrap"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
