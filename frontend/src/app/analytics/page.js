"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { useTasks } from "@/context/TaskContext";
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  PieChart,
  ListTodo,
  ShieldAlert
} from "lucide-react";

export default function AnalyticsPage() {
  const { allTasks } = useTasks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const metrics = useMemo(() => {
    const total = allTasks.length;
    let completed = 0;
    let inProgress = 0;
    let pending = 0;
    let highPriority = 0;
    let mediumPriority = 0;
    let lowPriority = 0;
    let overdue = 0;

    const todayStr = new Date().toISOString().split("T")[0];

    allTasks.forEach((task) => {
      if (task.completed) {
        completed++;
      } else {
        if (task.status === "In Progress") inProgress++;
        else pending++;

        if (task.dueDate && task.dueDate.split("T")[0] < todayStr) {
          overdue++;
        }
      }

      if (task.priority === "High") highPriority++;
      else if (task.priority === "Medium") mediumPriority++;
      else if (task.priority === "Low") lowPriority++;
    });

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      pending,
      overdue,
      highPriority,
      mediumPriority,
      lowPriority,
      completionRate
    };
  }, [allTasks]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header activeTab="analytics" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-8 max-w-7xl w-full mx-auto">
          {/* Header Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 shrink-0">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Task Analytics</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hidden xs:block">
                Track completion metrics and productivity insights
              </p>
            </div>
          </div>

          {/* Top Summary KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Tasks
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5 sm:mt-1 text-slate-900 dark:text-slate-100">
                  {metrics.total}
                </h2>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                <ListTodo className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Completion
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5 sm:mt-1 text-emerald-600 dark:text-emerald-400">
                  {metrics.completionRate}%
                </h2>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Completed
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5 sm:mt-1 text-sky-600 dark:text-sky-400">
                  {metrics.completed}
                </h2>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Overdue
                </p>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-0.5 sm:mt-1 text-rose-600 dark:text-rose-400">
                  {metrics.overdue}
                </h2>
              </div>
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-rose-500/10 text-rose-500 dark:bg-rose-400/20 shrink-0">
                <ShieldAlert className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          {/* Detailed Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-lg font-bold tracking-tight flex items-center gap-2">
                  <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
                  Status Breakdown
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {metrics.total} Total
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {metrics.completed} ({metrics.total > 0 ? Math.round((metrics.completed / metrics.total) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                      style={{ width: `${metrics.total > 0 ? (metrics.completed / metrics.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                    <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> In Progress
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {metrics.inProgress} ({metrics.total > 0 ? Math.round((metrics.inProgress / metrics.total) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-sky-500 transition-all duration-500 rounded-full"
                      style={{ width: `${metrics.total > 0 ? (metrics.inProgress / metrics.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Pending
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {metrics.pending} ({metrics.total > 0 ? Math.round((metrics.pending / metrics.total) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                      style={{ width: `${metrics.total > 0 ? (metrics.pending / metrics.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-lg font-bold tracking-tight flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  Priority Breakdown
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                    <span className="text-rose-600 dark:text-rose-400 font-semibold">High Priority</span>
                    <span className="text-slate-700 dark:text-slate-300">{metrics.highPriority} Tasks</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-rose-500 transition-all duration-500 rounded-full"
                      style={{ width: `${metrics.total > 0 ? (metrics.highPriority / metrics.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">Medium Priority</span>
                    <span className="text-slate-700 dark:text-slate-300">{metrics.mediumPriority} Tasks</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                      style={{ width: `${metrics.total > 0 ? (metrics.mediumPriority / metrics.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Low Priority</span>
                    <span className="text-slate-700 dark:text-slate-300">{metrics.lowPriority} Tasks</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                      style={{ width: `${metrics.total > 0 ? (metrics.lowPriority / metrics.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
