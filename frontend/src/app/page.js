"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Sun,
  Moon,
  Sparkles,
  Plus
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans transition-colors duration-300 overflow-x-hidden w-full">

      {/* Navigation Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50 transition-colors duration-300 w-full">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-sky-500 dark:to-sky-400 text-white flex items-center justify-center font-bold text-sm sm:text-lg shadow-md shadow-slate-900/20 dark:shadow-sky-500/20">
              ⚡
            </div>
            <span className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
              TaskFlow
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105">
              Features
            </a>
            <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105">
              About
            </a>
            <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105">
              Contact
            </a>
          </nav>

          {/* Auth CTA & Theme Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Theme"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
              className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-md shrink-0"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-200" />
              )}
            </button>

            <Link
              href="/login"
              className="px-2.5 py-1.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105 hover:shadow-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-2.5 py-1.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-sm font-medium text-white bg-gradient-to-r from-slate-900 to-slate-700 dark:from-sky-500 dark:to-sky-400 rounded-lg sm:rounded-xl hover:from-slate-800 hover:to-slate-600 dark:hover:from-sky-400 dark:hover:to-sky-300 transition-all shadow-md shadow-slate-900/20 dark:shadow-sky-500/20 hover:scale-105 font-semibold whitespace-nowrap"
            >
              <span className="hidden sm:inline">Get Started Free</span>
              <span className="sm:hidden">Sign Up</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 xs:py-10 sm:py-16 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center w-full">
        {/* Left Copy */}
        <div className="space-y-4 sm:space-y-8">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Smart Task Management</span>
            <span className="xs:hidden">Task Management</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
            <span className="text-slate-900 dark:text-slate-100">
              Organize your work and get more done
            </span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            A clean, intuitive platform to manage your tasks, track progress, and boost productivity.
          </p>

          <div className="pt-1 grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-sm">
            <Link
              href="/register"
              className="w-full justify-center px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-700 dark:from-sky-500 dark:to-sky-400 hover:from-slate-800 hover:to-slate-600 dark:hover:from-sky-400 dark:hover:to-sky-300 rounded-lg sm:rounded-xl shadow-md shadow-slate-900/15 dark:shadow-sky-500/20 hover:shadow-lg transition-all flex items-center gap-1.5 sm:gap-2 group hover:scale-105 whitespace-nowrap"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/login"
              className="w-full justify-center px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg sm:rounded-xl transition-all flex items-center gap-1.5 sm:gap-2 hover:scale-105 hover:border-slate-400 dark:hover:border-slate-600 whitespace-nowrap"
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Right Dashboard Preview - Empty State */}
        <div className="bg-white dark:bg-slate-900 p-3 sm:p-8 rounded-xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg sm:shadow-2xl space-y-2 sm:space-y-6 transition-all hover:scale-[1.01] duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 sm:pb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 sm:w-3.5 sm:h-3.5 rounded-full bg-rose-400 shadow-md"></div>
                <div className="w-2 h-2 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-400 shadow-md"></div>
                <div className="w-2 h-2 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 shadow-md"></div>
              </div>
              <span className="text-[9px] sm:text-xs font-mono text-slate-400 dark:text-slate-500 ml-1 sm:ml-3">Your Dashboard</span>
            </div>
          </div>

          {/* Empty State Content */}
          <div className="flex flex-col items-center justify-center py-3 sm:py-12 text-center">
            <div className="w-9 h-9 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mb-2 sm:mb-6">
              <Plus className="w-4 h-4 sm:w-10 sm:h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xs sm:text-xl font-bold text-slate-800 dark:text-slate-200 mb-0.5 sm:mb-2">
              No tasks yet
            </h3>
            <p className="text-[10px] sm:text-sm text-slate-500 dark:text-slate-400 max-w-[200px] sm:max-w-xs px-1 leading-tight sm:leading-normal">
              Get started by creating your first task and organizing your workflow.
            </p>
            <Link
              href="/login"
              className="mt-2 sm:mt-6 px-3 py-1 sm:px-6 sm:py-2.5 text-[10px] sm:text-sm font-medium text-white bg-gradient-to-r from-slate-900 to-slate-700 dark:from-sky-500 dark:to-sky-400 rounded-md sm:rounded-xl hover:from-slate-800 hover:to-slate-600 dark:hover:from-sky-400 dark:hover:to-sky-300 transition-all shadow-sm hover:scale-105"
            >
              Create Task
            </Link>
          </div>

          {/* Empty State Features */}
          <div className="grid grid-cols-3 gap-1 sm:gap-3 pt-2 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <div className="text-sm sm:text-2xl font-bold text-slate-400 dark:text-slate-600">0</div>
              <div className="text-[9px] sm:text-xs text-slate-400 dark:text-slate-500 mt-0.5">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-2xl font-bold text-slate-400 dark:text-slate-600">0</div>
              <div className="text-[9px] sm:text-xs text-slate-400 dark:text-slate-500 mt-0.5">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-2xl font-bold text-slate-400 dark:text-slate-600">0</div>
              <div className="text-[9px] sm:text-xs text-slate-400 dark:text-slate-500 mt-0.5">In Progress</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-6 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 sm:mb-12">
            <h3 className="text-lg sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Everything you need to stay organized
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all flex flex-row sm:flex-col items-start gap-3 sm:gap-0">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 sm:mb-4">
                <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xs sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-0.5 sm:mb-2">
                  Create Tasks
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-400 leading-tight sm:leading-relaxed">
                  Add and organize tasks with priority levels and due dates.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all flex flex-row sm:flex-col items-start gap-3 sm:gap-0">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 sm:mb-4">
                <LayoutDashboard className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xs sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-0.5 sm:mb-2">
                  Track Progress
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-400 leading-tight sm:leading-relaxed">
                  Monitor your productivity with visual progress tracking.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all flex flex-row sm:flex-col items-start gap-3 sm:gap-0 sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 sm:mb-4">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-xs sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-0.5 sm:mb-2">
                  Stay Organized
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-400 leading-tight sm:leading-relaxed">
                  Keep everything in one place with an intuitive interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-4 sm:py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            © 2026 TaskFlow System.
          </p>
        </div>
      </footer>
    </div>
  );
}