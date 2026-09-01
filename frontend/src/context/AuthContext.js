"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const defaultAuthContext = {
    user: null,
    token: null,
    loading: true,
    login: async () => ({ success: false }),
    register: async () => ({ success: false }),
    logout: () => { }
};

const AuthContext = createContext(defaultAuthContext);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("taskflow_token");
            localStorage.removeItem("taskflow_user");
            sessionStorage.removeItem("taskflow_token");
            sessionStorage.removeItem("taskflow_user");
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = typeof window !== "undefined" ? (localStorage.getItem("taskflow_token") || sessionStorage.getItem("taskflow_token")) : null;
            const storedUser = typeof window !== "undefined" ? (localStorage.getItem("taskflow_user") || sessionStorage.getItem("taskflow_user")) : null;

            if (storedToken && storedUser) {
                setToken(storedToken);
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    // Optional verify token with backend if server is online
                    if (!storedToken.startsWith("demo_token_")) {
                        try {
                            const res = await fetch(`${API_BASE_URL}/auth/me`, {
                                headers: { Authorization: `Bearer ${storedToken}` }
                            });
                            if (res.ok) {
                                const data = await res.json();
                                if (data.user) {
                                    setUser(data.user);
                                }
                            } else if (res.status === 401) {
                                // Token expired or invalid
                                logout();
                            }
                        } catch {
                            console.warn("Backend check offline, keeping local user session");
                        }
                    }
                } catch {
                    setUser(null);
                    setToken(null);
                }
            } else {
                setUser(null);
                setToken(null);
            }
            setLoading(false);
        };

        initAuth();
    }, [logout]);

    const login = async (email, password, rememberMe = true) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password })
            });

            const data = await res.json();
            if (!res.ok) {
                return { success: false, message: data.message || "Login failed" };
            }

            setUser(data.user);
            setToken(data.token);
            if (typeof window !== "undefined") {
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem("taskflow_token", data.token);
                storage.setItem("taskflow_user", JSON.stringify(data.user));
            }
            return { success: true };
        } catch (error) {
            console.warn("API Connection Error on Login, falling back to Demo Mode:", error.message);
            // Fallback for offline demo mode
            const demoUser = { name: email.split("@")[0] || "User", email: email.trim() };
            const demoToken = "demo_token_" + Date.now();
            setUser(demoUser);
            setToken(demoToken);
            if (typeof window !== "undefined") {
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem("taskflow_token", demoToken);
                storage.setItem("taskflow_user", JSON.stringify(demoUser));
            }
            return { success: true };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), password })
            });

            const data = await res.json();
            if (!res.ok) {
                return { success: false, message: data.message || "Registration failed" };
            }

            setUser(data.user);
            setToken(data.token);
            if (typeof window !== "undefined") {
                localStorage.setItem("taskflow_token", data.token);
                localStorage.setItem("taskflow_user", JSON.stringify(data.user));
            }
            return { success: true };
        } catch (error) {
            console.warn("API Connection Error on Register, falling back to Demo Mode:", error.message);
            // Fallback offline demo mode
            const demoUser = { name: name.trim(), email: email.trim() };
            const demoToken = "demo_token_" + Date.now();
            setUser(demoUser);
            setToken(demoToken);
            if (typeof window !== "undefined") {
                localStorage.setItem("taskflow_token", demoToken);
                localStorage.setItem("taskflow_user", JSON.stringify(demoUser));
            }
            return { success: true };
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context || defaultAuthContext;
}
