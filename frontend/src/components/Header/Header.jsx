"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Menu, Search, Bell, Sun, Moon,
  Clock, AlertTriangle, CheckCircle2, Calendar, Check, Flame
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";

export default function Header({ activeTab, onToggleSidebar }) {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery, allTasks, tasks, openModalForEdit, toggleTaskCompleted } = useTasks();
  const { theme, toggleTheme, mounted } = useTheme();
  const sidebarContext = useSidebar();

  const handleMobileMenuClick = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    } else if (sidebarContext?.setIsMobileOpen) {
      sidebarContext.setIsMobileOpen(true);
    }
  };

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("dueSoon"); // "dueSoon" or "all"
  const notifRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedTabTitle = activeTab
    ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
    : "Dashboard";

  // Calculate pending tasks and classify deadlines (near to 3 days or overdue)
  const { pendingTasks, dueSoonTasks } = useMemo(() => {
    const list = (allTasks && allTasks.length > 0 ? allTasks : tasks) || [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formattedPending = list
      .filter((t) => !t.completed && t.status?.toLowerCase() !== "completed")
      .map((t) => {
        let diffDays = null;
        let dueLabel = "No due date";
        let isDueSoon = false; // <= 3 days
        let isOverdue = false;

        if (t.dueDate) {
          const due = new Date(t.dueDate);
          if (!isNaN(due.getTime())) {
            due.setHours(0, 0, 0, 0);
            diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

            if (diffDays < 0) {
              isOverdue = true;
              dueLabel = `Overdue by ${Math.abs(diffDays)}d`;
            } else if (diffDays === 0) {
              isDueSoon = true;
              dueLabel = "Due today";
            } else if (diffDays === 1) {
              isDueSoon = true;
              dueLabel = "Due tomorrow";
            } else if (diffDays <= 3) {
              isDueSoon = true;
              dueLabel = `Due in ${diffDays}d`;
            } else {
              dueLabel = `Due in ${diffDays}d`;
            }
          }
        }

        return {
          ...t,
          diffDays,
          dueLabel,
          isDueSoon,
          isOverdue
        };
      })
      .sort((a, b) => {
        // Overdue first, then soonest deadline
        if (a.isOverdue && !b.isOverdue) return -1;
        if (!a.isOverdue && b.isOverdue) return 1;
        if (a.diffDays !== null && b.diffDays !== null) return a.diffDays - b.diffDays;
        if (a.diffDays !== null) return -1;
        return 1;
      });

    const dueSoon = formattedPending.filter((t) => t.isDueSoon || t.isOverdue);
    const overdueCount = formattedPending.filter((t) => t.isOverdue).length;

    return {
      pendingTasks: formattedPending,
      dueSoonTasks: dueSoon,
      overdueCount
    };
  }, [allTasks, tasks]);

  const displayedTasks = activeFilter === "dueSoon" ? dueSoonTasks : pendingTasks;
  const totalAlertsCount = dueSoonTasks.length > 0 ? dueSoonTasks.length : pendingTasks.length;

  const userInitial = (user?.name?.trim()?.charAt(0) || user?.email?.trim()?.charAt(0) || "U").toUpperCase();

  return (
    <header className="bg-white/80 dark:bg-[#0c0a15]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] sticky top-0 z-30 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 transition-colors duration-200 w-full select-none">
      {/* Left side: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
        {/* Hamburger Menu - Present ONLY for Mobile View */}
        <button
          onClick={handleMobileMenuClick}
          aria-label="Toggle navigation menu"
          title="Open menu"
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#141022] border border-slate-200 dark:border-white/[0.08] focus:outline-none cursor-pointer shrink-0 transition-colors flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight truncate">
          {formattedTabTitle}
        </h1>
      </div>

      {/* Right side: Search bar, Theme Switcher, Notifications, User profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Input (Hidden on mobile, visible from sm up) */}
        <div className="relative hidden sm:block w-48 md:w-64 lg:w-80">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-slate-100/80 dark:bg-[#141022] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 dark:focus:bg-[#181329] transition-all"
          />
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark and Light Theme"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          className="p-2 rounded-xl bg-slate-100/80 dark:bg-[#141022] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1d1730] transition-all flex items-center justify-center cursor-pointer shrink-0"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
          )}
        </button>

        {/* Interactive Notification Bell with Dropdown */}
        <div className="relative shrink-0" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="Task reminders"
            title="View pending task reminders"
            className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isNotifOpen
                ? "bg-purple-50 dark:bg-[#1e1535] border-purple-300 dark:border-purple-500/50 text-purple-600 dark:text-purple-300 shadow-sm"
                : "bg-slate-100/80 dark:bg-[#141022] border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1d1730]"
            }`}
          >
            <Bell className="w-4 h-4" />

            {/* Notification Badge */}
            {totalAlertsCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white dark:ring-[#0c0a15] ${
                  dueSoonTasks.length > 0 ? "bg-rose-500 animate-pulse" : "bg-amber-500"
                }`}
              >
                {totalAlertsCount > 9 ? "9+" : totalAlertsCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Dropdown - Perfectly bounded on Mobile */}
          {isNotifOpen && (
            <div className="fixed left-3 right-3 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-84 md:w-92 max-w-[calc(100vw-24px)] bg-white dark:bg-[#0f0c1b] border border-slate-200 dark:border-white/[0.08] rounded-xl sm:rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header */}
              <div className="p-2.5 sm:p-3.5 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Task Reminders
                  </h3>
                  {dueSoonTasks.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 text-rose-500" />
                      {dueSoonTasks.length} Urgent
                    </span>
                  )}
                </div>

                <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-zinc-300 rounded-md sm:rounded-lg">
                  {pendingTasks.length} Pending
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex border-b border-slate-100 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] p-1 gap-1">
                <button
                  onClick={() => setActiveFilter("dueSoon")}
                  className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeFilter === "dueSoon"
                      ? "bg-white dark:bg-[#1c142e] text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  Due Soon ({dueSoonTasks.length})
                </button>
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeFilter === "all"
                      ? "bg-white dark:bg-[#1c142e] text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  <Clock className="w-3 h-3 text-purple-400" />
                  All ({pendingTasks.length})
                </button>
              </div>

              {/* Task Items List - Constrained max-height for mobile */}
              <div className="max-h-52 sm:max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.06]">
                {displayedTasks.length === 0 ? (
                  <div className="p-4 sm:p-5 text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-emerald-500" />
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200">
                      All Caught Up!
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400">
                      {activeFilter === "dueSoon"
                        ? "No tasks due in next 3 days or overdue."
                        : "No active pending tasks right now."}
                    </p>
                  </div>
                ) : (
                  displayedTasks.map((t) => {
                    return (
                      <div
                        key={t.id || t._id}
                        className="p-2 sm:p-3 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors flex items-start gap-2 sm:gap-2.5 group"
                      >
                        {/* Quick Check Action */}
                        <button
                          onClick={() => toggleTaskCompleted(t.id || t._id)}
                          aria-label="Complete task"
                          title="Mark completed"
                          className="mt-0.5 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded border border-slate-300 dark:border-zinc-600 hover:border-emerald-500 dark:hover:border-emerald-400 flex items-center justify-center text-transparent hover:text-emerald-500 shrink-0 transition-colors cursor-pointer"
                        >
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>

                        {/* Task Title & Details */}
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => {
                            setIsNotifOpen(false);
                            openModalForEdit(t);
                          }}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                              {t.title}
                            </h4>
                            <span
                              className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1 sm:px-1.5 py-0.5 rounded shrink-0 ${
                                t.priority?.toLowerCase() === "high"
                                  ? "bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400"
                                  : t.priority?.toLowerCase() === "medium"
                                  ? "bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400"
                                  : "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400"
                              }`}
                            >
                              {t.priority || "Medium"}
                            </span>
                          </div>

                          {t.description && (
                            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {t.description}
                            </p>
                          )}

                          {/* Due Date Indicator */}
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5 text-[9px] sm:text-[11px]">
                            <span
                              className={`flex items-center gap-1 font-semibold px-1 sm:px-1.5 py-0.5 rounded ${
                                t.isOverdue
                                  ? "text-rose-600 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/60"
                                  : t.isDueSoon
                                  ? "text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/60"
                                  : "text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/[0.06]"
                              }`}
                            >
                              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              {t.dueLabel}
                            </span>

                            {t.dueDate && (
                              <span className="text-slate-400 dark:text-zinc-500">
                                {t.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Link */}
        <Link
          href="/profile"
          aria-label="User profile"
          title="View profile"
          className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200 dark:border-white/[0.08] shrink-0 group cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#14121d] border border-zinc-700/80 text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center shadow-md ring-2 ring-white dark:ring-[#141022] group-hover:scale-105 transition-transform duration-200">
              {userInitial}
            </div>
            {/* Online status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c0a15] shadow-xs" />
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-slate-700 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {user?.name || "User"}
          </span>
        </Link>
      </div>
    </header>
  );
}
