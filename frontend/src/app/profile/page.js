"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TaskContext";
import { 
  User as UserIcon, 
  Mail, 
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { stats } = useTasks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header activeTab="profile" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-4xl w-full mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 shrink-0">
              <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight">User Profile</h1>
            </div>
          </div>

          {/* User Details Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {user?.name || "TaskFlow User"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user?.email || "user@taskflow.dev"}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full mt-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Active Account
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="p-2.5 sm:p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 mt-1">
                  {user?.name || "TaskFlow User"}
                </div>
              </div>

              <div>
                <label className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="p-2.5 sm:p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 mt-1">
                  {user?.email || "user@taskflow.dev"}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
