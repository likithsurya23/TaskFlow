"use client";

import { ClipboardList, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function StatsRow() {
  const { stats } = useTasks();

  const cards = [
    {
      title: "Total Tasks",
      count: stats.total,
      icon: ClipboardList,
      bgIcon: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
    },
    {
      title: "Completed",
      count: stats.completed,
      icon: CheckCircle2,
      bgIcon: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-transparent dark:border-emerald-900/40"
    },
    {
      title: "Pending",
      count: stats.pending,
      icon: Clock,
      bgIcon: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-transparent dark:border-amber-900/40"
    },
    {
      title: "Overdue",
      count: stats.overdue,
      icon: AlertCircle,
      bgIcon: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-transparent dark:border-rose-900/40"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-3 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors duration-200"
          >
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {card.count}
              </div>
            </div>

            <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${card.bgIcon}`}>
              <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
