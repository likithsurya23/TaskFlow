"use client";

import { Plus, RotateCcw } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function FilterBar() {
  const { 
    statusFilter, 
    setStatusFilter, 
    priorityFilter, 
    setPriorityFilter, 
    clearFilters,
    openModalForCreate 
  } = useTasks();

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Filters group */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 transition-all cursor-pointer w-full sm:w-auto"
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Priority Dropdown */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 transition-all cursor-pointer w-full sm:w-auto"
        >
          <option value="All Priority">All Priority</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Clear Filters button */}
        <button
          onClick={clearFilters}
          className="col-span-2 sm:col-span-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Filters
        </button>
      </div>

      {/* Add Task Button */}
      <button
        onClick={openModalForCreate}
        className="px-3.5 py-2 bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    </div>
  );
}
