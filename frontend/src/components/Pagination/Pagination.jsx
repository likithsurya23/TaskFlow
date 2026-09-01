"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function Pagination() {
  const { tasks, currentPage, setCurrentPage, itemsPerPage } = useTasks();

  const totalPages = Math.ceil(tasks.length / itemsPerPage) || 1;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentPage === page
                ? "bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
      >
        Next
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
