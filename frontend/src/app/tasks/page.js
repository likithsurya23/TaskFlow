"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import StatsRow from "@/components/StatsRow/StatsRow";
import FilterBar from "@/components/FilterBar/FilterBar";
import TaskList from "@/components/TaskList/TaskList";
import Pagination from "@/components/Pagination/Pagination";
import TaskModal from "@/components/TaskModal/TaskModal";
import { CheckSquare } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export default function TasksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Layout */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        {/* Top Header */}
        <Header
          activeTab="tasks"
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Task Management View */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 w-full">
          {/* Header Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 shrink-0">
              <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Tasks & Workflow</h1>
            </div>
          </div>

          {/* Stats Row */}
          <StatsRow />

          {/* Search, Filter & Add Task Bar */}
          <FilterBar />

          {/* Task List */}
          <TaskList />

          {/* Pagination Controls */}
          <Pagination />
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal />
    </div>
  );
}
