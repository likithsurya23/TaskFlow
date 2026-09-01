"use client";

import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, LayoutDashboard, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans transition-colors duration-200">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-sky-500 text-white flex items-center justify-center font-bold text-lg border border-slate-700 dark:border-sky-400">
              ⚡
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">TaskFlow</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</a>
            <a href="#about" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">About</a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Contact</a>
          </nav>

          {/* Auth CTA & Theme Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Theme"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
              )}
            </button>

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-sky-500 dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-sky-400 transition-all shadow-sm font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
            ✨ Task Management Made Simple
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
            Organize your work and get more done
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            TaskFlow helps you manage your tasks, stay organized, track progress, and boost productivity effortlessly with an intuitive dashboard.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 text-base font-semibold text-white bg-slate-900 dark:bg-sky-500 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-sky-400 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Live Demo Dashboard
            </Link>
          </div>

          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to use
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Secure JWT Auth
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Instant Task Sync
            </div>
          </div>
        </div>

        {/* Right Wireframe Illustration Placeholder */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 ml-2">TaskFlow Dashboard Preview</span>
            </div>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-medium">React + Node + Mongo</span>
          </div>

          {/* Wireframe Mock Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-100 dark:border-slate-700/60">
              <div className="text-xs text-slate-400 dark:text-slate-400 font-medium">Total Tasks</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">24</div>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Completed</div>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">12</div>
            </div>
          </div>

          {/* Wireframe Mock Table Rows */}
          <div className="space-y-2 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Design wireframes for the project</div>
              <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-semibold rounded text-[10px]">High</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Setup backend with Express</div>
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-semibold rounded text-[10px]">Medium</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Implement authentication</div>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold rounded text-[10px]">Completed</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        © 2026 TaskFlow System. All rights reserved. Built with React, Next.js, Express & MongoDB.
      </footer>
    </div>
  );
}