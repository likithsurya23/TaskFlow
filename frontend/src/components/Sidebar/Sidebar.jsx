"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  BarChart3, 
  User as UserIcon, 
  Settings as SettingsIcon, 
  LogOut,
  X
} from "lucide-react";

export default function Sidebar({ 
  isOpen = false, 
  setIsOpen = () => {}
}) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/calendar", label: "Calendar", icon: CalendarIcon },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/profile", label: "Profile", icon: UserIcon },
    { href: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header Brand */}
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-sky-500 text-white flex items-center justify-center font-bold text-lg border border-slate-700 dark:border-sky-400 shadow-sm">
                ⚡
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">TaskFlow</span>
            </Link>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-l-4 border-slate-900 dark:border-sky-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-900 dark:text-sky-400" : "text-slate-400 dark:text-slate-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

