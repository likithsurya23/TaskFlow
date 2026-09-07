"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await login(cleanEmail, password, rememberMe);
      if (res && res.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg((res && res.message) || "Invalid email or password");
      }
    } catch {
      setErrorMsg("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 transition-colors duration-200">
      {/* Login Card */}
      <div className="w-full max-w-[360px] xs:max-w-sm sm:max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 xs:p-6 sm:p-8 space-y-4 sm:space-y-6 transition-colors">
        <div className="text-center space-y-0.5 sm:space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">Welcome Back 👋</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Login to your account</p>
        </div>

        {errorMsg && (
          <div className="p-2 sm:p-3 text-[11px] sm:text-xs bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 rounded-lg text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="Enter your email"
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Enter your password"
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 pr-9 sm:pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs pt-0.5">
            <label className="flex items-center gap-1.5 sm:gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-slate-900 dark:text-sky-500 focus:ring-slate-900 dark:focus:ring-sky-500"
              />
              Remember me
            </label>
            <a href="#" className="font-semibold text-blue-600 dark:text-sky-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 px-4 bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold rounded-lg shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-blue-600 dark:text-sky-400 hover:underline">
              Register
            </Link>
          </div>
          <div>
            <Link href="/" className="font-bold text-blue-600 dark:text-sky-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
