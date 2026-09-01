"use client";

import { Edit3, Trash2 } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function TaskCard({ task }) {
  const { toggleTaskCompleted, openModalForEdit, deleteTask } = useTasks();

  if (!task) return null;

  const isDone = task.completed || task.status === "Completed";

  const priorityBadgeClass =
    task.priority === "High"
      ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40"
      : task.priority === "Low"
      ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40"
      : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40";

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleTaskCompleted(task)}
          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-slate-900 dark:text-sky-500 focus:ring-slate-900 dark:focus:ring-sky-500 cursor-pointer"
        />
        <div>
          <h4 className={`text-sm font-bold text-slate-900 dark:text-slate-100 ${isDone ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-sm truncate">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${priorityBadgeClass}`}>
          {task.priority || "Medium"}
        </span>
        <button
          onClick={() => openModalForEdit(task)}
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => deleteTask(task._id || task.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
