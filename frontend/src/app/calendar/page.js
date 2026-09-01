"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import TaskModal from "@/components/TaskModal/TaskModal";
import { useTasks } from "@/context/TaskContext";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function CalendarPage() {
  const { allTasks, openModalForEdit } = useTasks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
    const totalDays = lastDayOfMonth.getDate();

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        dateStr: null
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      const monthStr = String(month + 1).padStart(2, "0");
      const dayStr = String(i).padStart(2, "0");
      const dateStr = `${year}-${monthStr}-${dayStr}`;

      days.push({
        day: i,
        isCurrentMonth: true,
        dateStr
      });
    }

    const remaining = 35 - days.length;
    if (remaining > 0) {
      for (let i = 1; i <= remaining; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
          dateStr: null
        });
      }
    }

    return days;
  }, [year, month]);

  const tasksByDate = useMemo(() => {
    const map = {};
    allTasks.forEach((task) => {
      if (task.dueDate) {
        const dateKey = task.dueDate.split("T")[0];
        if (!map[dateKey]) {
          map[dateKey] = [];
        }
        map[dateKey].push(task);
      }
    });
    return map;
  }, [allTasks]);

  const todayStr = new Date().toISOString().split("T")[0];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800";
      case "Low":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header activeTab="calendar" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Task Calendar</h1>
              </div>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-2.5 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <h2 className="text-base sm:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                  {monthName} {year}
                </h2>
                <button
                  onClick={handleToday}
                  className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Today
                </button>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  onClick={handlePrevMonth}
                  aria-label="Previous Month"
                  className="p-1 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  aria-label="Next Month"
                  className="p-1 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden w-full">
            <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-[9px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center py-1.5 sm:py-3">
              <div><span className="hidden sm:inline">Mon</span><span className="sm:hidden">M</span></div>
              <div><span className="hidden sm:inline">Tue</span><span className="sm:hidden">T</span></div>
              <div><span className="hidden sm:inline">Wed</span><span className="sm:hidden">W</span></div>
              <div><span className="hidden sm:inline">Thu</span><span className="sm:hidden">T</span></div>
              <div><span className="hidden sm:inline">Fri</span><span className="sm:hidden">F</span></div>
              <div><span className="hidden sm:inline">Sat</span><span className="sm:hidden">S</span></div>
              <div><span className="hidden sm:inline">Sun</span><span className="sm:hidden">S</span></div>
            </div>

            <div className="grid grid-cols-7 divide-x divide-y divide-slate-200 dark:divide-slate-800">
              {calendarDays.map((cell, idx) => {
                const dayTasks = cell.dateStr ? tasksByDate[cell.dateStr] || [] : [];
                const isToday = cell.dateStr === todayStr;

                return (
                  <div
                    key={idx}
                    className={`min-h-[48px] sm:min-h-[120px] p-0.5 sm:p-2 transition-colors flex flex-col justify-between overflow-hidden ${
                      cell.isCurrentMonth
                        ? "bg-white dark:bg-slate-900"
                        : "bg-slate-50/50 dark:bg-slate-950/40 text-slate-400 dark:text-slate-600"
                    } ${isToday ? "ring-2 ring-sky-500 ring-inset" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`text-[9px] sm:text-xs font-semibold w-3.5 h-3.5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full ${
                          isToday
                            ? "bg-sky-500 text-white"
                            : cell.isCurrentMonth
                            ? "text-slate-700 dark:text-slate-300"
                            : "text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        {cell.day}
                      </span>
                      {dayTasks.length > 0 && (
                        <span className="text-[8px] sm:text-[10px] font-bold px-1 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {dayTasks.length}<span className="hidden sm:inline"> task{dayTasks.length > 1 ? "s" : ""}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-0.5 sm:space-y-1 overflow-y-auto max-h-[28px] sm:max-h-[85px] custom-scrollbar">
                      {dayTasks.map((task) => (
                        <div
                          key={task._id}
                          onClick={() => openModalForEdit(task)}
                          className={`p-0.5 sm:p-1.5 rounded text-[8px] sm:text-xs border cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-between gap-0.5 sm:gap-1 shadow-2xs ${getPriorityStyle(
                            task.priority
                          )} ${task.completed ? "opacity-60 line-through" : ""}`}
                        >
                          <span className="truncate font-medium flex-1">
                            {task.title}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTaskCompleted(task._id);
                            }}
                            className="shrink-0 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors hidden sm:block"
                            title={task.completed ? "Mark pending" : "Mark completed"}
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${
                                task.completed ? "text-emerald-500 fill-emerald-500/20" : ""
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
      <TaskModal />
    </div>
  );
}
