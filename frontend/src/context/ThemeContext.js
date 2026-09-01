"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("taskflow_theme");
    const isDark = storedTheme
      ? storedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    const activeTheme = isDark ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(activeTheme);
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("taskflow_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
