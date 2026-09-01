"use client";

import { Edit3, Trash2, CheckCircle2, Calendar as CalendarIcon } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function TaskList() {
  const { 
    tasks, 
    loading, 
    toggleTaskCompleted, 
    openModalForEdit, 
    deleteTask,
    currentPage,
    itemsPerPage
  } = useTasks();

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40 font-semibold";
      case "medium":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40 font-semibold";
      case "low":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40 font-semibold";
      default:
        return "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-semibold";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold";
      case "completed":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold";
      case "pending":
      default:
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-semibold";
    }
  };

  // Paginated list calculation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

  if (loading && tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 text-xs sm:text-sm transition-colors">
        Loading tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2 transition-colors">
        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 dark:text-slate-600 mx-auto" />
        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">No tasks found</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Try adjusting your search or filters, or add a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-200 w-full">
      {/* Mobile Card List View (< sm screens) */}
      <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {paginatedTasks.map((task) => {
          const isDone = task.completed || task.status === "Completed";
          return (
            <div key={task._id} className="p-3.5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleTaskCompleted(task)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-600 text-slate-900 dark:text-sky-500 shrink-0 cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`text-xs font-bold text-slate-900 dark:text-slate-100 truncate ${
                        isDone ? "line-through text-slate-400 dark:text-slate-500" : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openModalForEdit(task)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    title="Edit Task"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                    title="Delete Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded border ${getPriorityBadgeClass(task.priority)}`}>
                    {task.priority || "Medium"}
                  </span>
                  <span className={`px-2 py-0.5 rounded ${getStatusBadgeClass(task.status)}`}>
                    {task.status || "Pending"}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{task.dueDate || "No date"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop & Tablet Table View (>= sm screens) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-10"></th>
              <th className="py-3.5 px-4">Task</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Due Date ↕</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm text-slate-700 dark:text-slate-300">
            {paginatedTasks.map((task) => {
              const isDone = task.completed || task.status === "Completed";

              return (
                <tr
                  key={task._id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleTaskCompleted(task)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-slate-900 dark:text-sky-500 focus:ring-slate-900 dark:focus:ring-sky-500 cursor-pointer"
                    />
                  </td>

                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      <div
                        className={`font-semibold text-slate-900 dark:text-slate-100 ${
                          isDone ? "line-through text-slate-400 dark:text-slate-500" : ""
                        }`}
                      >
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 max-w-md truncate">
                          {task.description}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs border ${getPriorityBadgeClass(
                        task.priority
                      )}`}
                    >
                      {task.priority || "Medium"}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs ${getStatusBadgeClass(
                        task.status
                      )}`}
                    >
                      {task.status || "Pending"}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-xs font-medium text-slate-600 dark:text-slate-400">
                    {task.dueDate || "No due date"}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => openModalForEdit(task)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                      title="Edit Task"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-all cursor-pointer"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
