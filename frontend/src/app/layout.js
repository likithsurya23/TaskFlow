import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "TaskFlow - Task Management System",
  description: "Organize your work and get more done with TaskFlow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('taskflow_theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            <TaskProvider>
              {children}
            </TaskProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
