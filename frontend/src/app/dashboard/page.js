"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import StatsRow from "@/components/StatsRow/StatsRow";
import TaskList from "@/components/TaskList/TaskList";
import TaskModal from "@/components/TaskModal/TaskModal";
import { useTasks } from "@/context/TaskContext";
import { useAuth } from "@/context/AuthContext";
import { Plus, ArrowRight, CheckSquare, Calendar, BarChart3, User as UserIcon, Settings as SettingsIcon } from "lucide-react";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { openModalForCreate } = useTasks();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header */}
        <Header
          activeTab="dashboard"
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Overview Dashboard Content */}
        <main className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-8 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-sky-950 dark:via-slate-900 dark:to-slate-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6 border border-slate-700 dark:border-slate-800">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-sky-400">
                Dashboard
              </span>
              <h1 className="text-lg sm:text-3xl font-extrabold tracking-tight mt-0.5 sm:mt-1">
                Welcome back, {user?.name || "Developer"}! 👋
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={openModalForCreate}
                className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg sm:rounded-xl shadow-xs transition-all cursor-pointer text-xs sm:text-sm"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                New Task
              </button>
              <Link
                href="/tasks"
                className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm"
              >
                View Tasks
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>

          {/* Key Stats Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Workspace Summary
              </h2>
            </div>
            <StatsRow />
          </div>

          {/* Quick Navigation Cards */}
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
              Navigation Cards
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <Link
                href="/tasks"
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors">
                    Manage Tasks
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    Task queue & filters
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-sky-500">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/calendar"
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/20 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
                    Task Calendar
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    Deadlines & schedule
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-indigo-500">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/analytics"
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-400/20 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                    Analytics
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    Metrics & insights
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/profile"
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                    User Profile
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    Account details & stats
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/settings"
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between col-span-2 md:col-span-1"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 text-purple-500 dark:bg-purple-400/20 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                    <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-500 transition-colors">
                    Settings
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    Theme & preferences
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-purple-500">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Tasks Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Recent Tasks Overview
              </h2>
              <Link
                href="/tasks"
                className="text-xs font-semibold text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                View All Tasks →
              </Link>
            </div>
            <TaskList />
          </div>
        </main>
      </div>

      {/* Modal */}
      <TaskModal />
    </div>
  );
}
