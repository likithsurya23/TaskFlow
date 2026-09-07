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

export default function Header({ onToggleSidebar, activeTab }) {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery, allTasks, tasks, openModalForEdit, toggleTaskCompleted } = useTasks();
  const { theme, toggleTheme, mounted } = useTheme();

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
              dueLabel = "Due Today!";
            } else if (diffDays === 1) {
              isDueSoon = true;
              dueLabel = "Due Tomorrow";
            } else if (diffDays <= 3) {
              isDueSoon = true;
              dueLabel = `Due in ${diffDays} days`;
            } else {
              dueLabel = `Due in ${diffDays} days`;
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
        if (a.isOverdue && !b.isOverdue) return -1;
        if (!a.isOverdue && b.isOverdue) return 1;
        if (a.isDueSoon && !b.isDueSoon) return -1;
        if (!a.isDueSoon && b.isDueSoon) return 1;
        if (a.diffDays !== null && b.diffDays !== null) return a.diffDays - b.diffDays;
        if (a.diffDays !== null) return -1;
        if (b.diffDays !== null) return 1;
        return 0;
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

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-2.5 sm:px-6 lg:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-1.5 sm:gap-4 transition-colors duration-200 w-full relative">
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
        {/* Search Input */}
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

        {/* Interactive Notification Bell with Dropdown */}
        <div className="relative shrink-0" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="Task reminders"
            title="View pending task reminders"
            className={`relative p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${
              isNotifOpen
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ring-2 ring-sky-500/30"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />

            {/* Notification Badge */}
            {totalAlertsCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 min-w-4 h-4 sm:min-w-4.5 sm:h-4.5 px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-xs ring-2 ring-white dark:ring-slate-900 ${
                  dueSoonTasks.length > 0
                    ? "bg-rose-500 animate-pulse"
                    : "bg-amber-500"
                }`}
              >
                {totalAlertsCount > 9 ? "9+" : totalAlertsCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-88 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      Task Reminders
                    </h3>
                    {dueSoonTasks.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-500" />
                        {dueSoonTasks.length} Urgent
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
                  {pendingTasks.length} Pending
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-1 gap-1">
                <button
                  onClick={() => setActiveFilter("dueSoon")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeFilter === "dueSoon"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Due Soon / Overdue ({dueSoonTasks.length})
                </button>
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeFilter === "all"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  All Pending ({pendingTasks.length})
                </button>
              </div>

              {/* Task Items List */}
              <div className="max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {displayedTasks.length === 0 ? (
                  <div className="p-6 text-center space-y-2">
                    <CheckCircle2 className="w-9 h-9 mx-auto text-emerald-500" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {activeFilter === "dueSoon"
                        ? "No tasks due! 🎉"
                        : "All tasks completed! 🎉"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      {activeFilter === "dueSoon"
                        ? "You have no upcoming deadlines."
                        : "Great job! You have cleared all your pending tasks."}
                    </p>
                  </div>
                ) : (
                  displayedTasks.map((t) => {
                    const taskId = t._id || t.id;

                    return (
                      <div
                        key={taskId}
                        className={`p-3 sm:p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2.5 sm:gap-3 group ${
                          t.isOverdue
                            ? "bg-rose-50/40 dark:bg-rose-950/20"
                            : t.isDueSoon
                            ? "bg-amber-50/30 dark:bg-amber-950/10"
                            : ""
                        }`}
                      >
                        {/* Quick Check Complete Button */}
                        <button
                          onClick={() => toggleTaskCompleted && toggleTaskCompleted(t)}
                          title="Mark as completed"
                          className="mt-0.5 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded border border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center justify-center text-transparent hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shrink-0 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                        </button>

                        {/* Task Details */}
                        <div
                          onClick={() => {
                            if (openModalForEdit) openModalForEdit(t);
                            setIsNotifOpen(false);
                          }}
                          className="flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-1.5">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                              {t.title}
                            </h4>
                            {/* Priority Badge */}
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded capitalize shrink-0 ${
                                t.priority?.toLowerCase() === "high"
                                  ? "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                                  : t.priority?.toLowerCase() === "medium"
                                  ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
                                  : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                              }`}
                            >
                              {t.priority || "Medium"}
                            </span>
                          </div>

                          {t.description && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {t.description}
                            </p>
                          )}

                          {/* Due Date Indicator */}
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] sm:text-[11px]">
                            <span
                              className={`flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded ${
                                t.isOverdue
                                  ? "text-rose-600 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/60"
                                  : t.isDueSoon
                                  ? "text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/60"
                                  : "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
                              }`}
                            >
                              <Calendar className="w-3 h-3" />
                              {t.dueLabel}
                            </span>

                            {t.dueDate && (
                              <span className="text-slate-400 dark:text-slate-500">
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

        {/* User Profile Avatar */}
        <Link
          href="/profile"
          aria-label="User profile menu"
          title="View profile"
          className="flex items-center gap-2 sm:gap-3 border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-4 shrink-0 group relative cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg transition-all"
        >
          {/* Avatar with status indicator */}
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 dark:from-sky-500 dark:to-sky-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center shadow-md shadow-slate-900/20 dark:shadow-sky-500/20 ring-2 ring-white dark:ring-slate-800 group-hover:scale-105 transition-transform duration-200">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {/* Online status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></span>
          </div>
        </Link>
      </div>
    </header>
  );
}
