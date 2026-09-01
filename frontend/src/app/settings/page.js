"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { Settings as SettingsIcon, Bell, Moon, Layout } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-200 font-sans transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header activeTab="settings" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-4xl w-full mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-400/20 shrink-0">
              <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Application Settings</h1>
            </div>
          </div>

          {/* Preferences Settings Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Theme Selector */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      Dark Mode Theme
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                      Mode: <span className="capitalize font-semibold">{theme}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 font-bold rounded-lg text-xs hover:bg-slate-800 dark:hover:bg-sky-400 transition-colors cursor-pointer shrink-0"
                >
                  Toggle Theme
                </button>
              </div>

              {/* Deadline Notifications Toggle */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      Deadline Notifications
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      Alerts for approaching or overdue tasks
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 rounded border-slate-300 dark:border-slate-600 focus:ring-sky-500 cursor-pointer shrink-0"
                />
              </div>

              {/* Compact Layout Toggle */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      Compact View
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      Denser layout for tables
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={compactMode}
                  onChange={(e) => setCompactMode(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 rounded border-slate-300 dark:border-slate-600 focus:ring-sky-500 cursor-pointer shrink-0"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
