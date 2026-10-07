"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SidebarContext = createContext({
  isCollapsed: false,
  setIsCollapsed: () => {},
  toggleCollapse: () => {},
  isMobileOpen: false,
  setIsMobileOpen: () => {},
  toggleMobile: () => {},
});

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsedState] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("taskflow_sidebar_collapsed");
      if (stored !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsCollapsedState(stored === "true");
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const setIsCollapsed = useCallback((value) => {
    setIsCollapsedState(value);
    try {
      localStorage.setItem("taskflow_sidebar_collapsed", String(value));
    } catch {
      // ignore
    }
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("taskflow_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapse,
        isMobileOpen,
        setIsMobileOpen,
        toggleMobile,
        mounted,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
