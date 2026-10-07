import "./globals.css";
import { Orbitron } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import PulseWaveLoader from "@/components/PulseWaveLoader/PulseWaveLoader";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

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
      <body className={`bg-white dark:bg-black text-black dark:text-purple-50 transition-colors duration-200 min-h-screen ${orbitron.variable}`}>
        <PulseWaveLoader isSplash={true} minDuration={4500} />
        <ThemeProvider>
          <AuthProvider>
            <TaskProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </TaskProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

