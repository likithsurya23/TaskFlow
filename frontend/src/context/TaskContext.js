"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const defaultTaskContext = {
    tasks: [],
    allTasks: [],
    loading: false,
    stats: { total: 0, completed: 0, pending: 0, overdue: 0 },
    searchQuery: "",
    setSearchQuery: () => {},
    statusFilter: "All Status",
    setStatusFilter: () => {},
    priorityFilter: "All Priority",
    setPriorityFilter: () => {},
    clearFilters: () => {},
    isModalOpen: false,
    editingTask: null,
    openModalForCreate: () => {},
    openModalForEdit: () => {},
    closeModal: () => {},
    addTask: async () => {},
    updateTask: async () => {},
    deleteTask: async () => {},
    toggleTaskCompleted: async () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    itemsPerPage: 5
};

const TaskContext = createContext(defaultTaskContext);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";



export function TaskProvider({ children }) {
    const { user, token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [priorityFilter, setPriorityFilter] = useState("All Priority");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchTasks = useCallback(async () => {
        if (!user || !token) {
            setTasks([]);
            return;
        }

        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (searchQuery) queryParams.append("search", searchQuery);
            if (statusFilter && statusFilter !== "All Status") queryParams.append("status", statusFilter);
            if (priorityFilter && priorityFilter !== "All Priority") queryParams.append("priority", priorityFilter);

            const res = await fetch(`${API_BASE_URL}/tasks?${queryParams.toString()}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTasks(data);
                }
            } else {
                // User-scoped offline fallback
                const userId = user._id || user.id || user.email;
                const cached = localStorage.getItem(`taskflow_tasks_${userId}`);
                if (cached) {
                    setTasks(JSON.parse(cached));
                } else {
                    setTasks([]);
                }
            }
        } catch (error) {
            console.warn("API fetch error, using user-isolated local state:", error);
            const userId = user?._id || user?.id || user?.email;
            if (userId) {
                const cached = localStorage.getItem(`taskflow_tasks_${userId}`);
                if (cached) {
                    setTasks(JSON.parse(cached));
                }
            }
        } finally {
            setLoading(false);
        }
    }, [searchQuery, statusFilter, priorityFilter, token, user]);

    useEffect(() => {
        let isMounted = true;

        const loadTasks = async () => {
            await Promise.resolve();
            if (isMounted) {
                if (user && token) {
                    fetchTasks();
                } else {
                    setTasks([]);
                }
            }
        };

        loadTasks();

        return () => {
            isMounted = false;
        };
    }, [fetchTasks, user, token]);

    // Computed filtered tasks for instant responsive local UI
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = !searchQuery || 
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStatus = statusFilter === "All Status" || 
            task.status.toLowerCase() === statusFilter.toLowerCase();
        
        const matchesPriority = priorityFilter === "All Priority" || 
            task.priority.toLowerCase() === priorityFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Dynamic accurate stats calculations
    const today = new Date().toISOString().split("T")[0];
    const completedTasksCount = tasks.filter(t => t.status?.toLowerCase() === "completed" || t.completed).length;
    const pendingTasksCount = tasks.filter(t => t.status?.toLowerCase() === "pending" || t.status?.toLowerCase() === "in progress").length;
    const overdueTasksCount = tasks.filter(t => {
        if (t.status?.toLowerCase() === "completed" || t.completed) return false;
        if (!t.dueDate) return false;
        return t.dueDate < today;
    }).length;

    const stats = {
        total: tasks.length,
        completed: completedTasksCount,
        pending: pendingTasksCount,
        overdue: overdueTasksCount
    };

    const saveUserCache = (newTasks) => {
        if (user) {
            const userId = user._id || user.id || user.email;
            localStorage.setItem(`taskflow_tasks_${userId}`, JSON.stringify(newTasks));
        }
    };

    const getTaskId = (t) => t._id || t.id;

    const addTask = async (newTaskData) => {
        const tempId = Date.now().toString();
        const tempTask = {
            _id: tempId,
            id: tempId,
            title: newTaskData.title,
            description: newTaskData.description || "",
            priority: newTaskData.priority || "Medium",
            status: newTaskData.status || "Pending",
            dueDate: newTaskData.dueDate || new Date().toISOString().split("T")[0],
            completed: newTaskData.status === "Completed"
        };

        setTasks(prev => {
            const updated = [tempTask, ...prev];
            saveUserCache(updated);
            return updated;
        });

        try {
            const res = await fetch(`${API_BASE_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                body: JSON.stringify(newTaskData)
            });
            if (res.ok) {
                const savedTask = await res.json();
                setTasks(prev => {
                    const updated = prev.map(t => (getTaskId(t) === tempId ? savedTask : t));
                    saveUserCache(updated);
                    return updated;
                });
            }
        } catch (error) {
            console.warn("API Add Error:", error);
        }
    };

    const updateTask = async (id, updatedData) => {
        setTasks(prev => {
            const updated = prev.map(t => (getTaskId(t) === id ? { ...t, ...updatedData } : t));
            saveUserCache(updated);
            return updated;
        });

        try {
            await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                body: JSON.stringify(updatedData)
            });
        } catch (error) {
            console.warn("API Update Error:", error);
        }
    };

    const toggleTaskCompleted = async (task) => {
        const targetId = typeof task === "object" ? getTaskId(task) : task;
        const currentTask = tasks.find(t => getTaskId(t) === targetId);
        if (currentTask) {
            const newCompleted = !currentTask.completed;
            const newStatus = newCompleted ? "Completed" : "Pending";
            updateTask(targetId, { completed: newCompleted, status: newStatus });
        }
    };

    const deleteTask = async (id) => {
        setTasks(prev => {
            const updated = prev.filter(t => getTaskId(t) !== id);
            saveUserCache(updated);
            return updated;
        });

        try {
            await fetch(`${API_BASE_URL}/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
        } catch (error) {
            console.warn("API Delete Error:", error);
        }
    };

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("All Status");
        setPriorityFilter("All Priority");
    };

    const openModalForCreate = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: filteredTasks,
                allTasks: tasks,
                loading,
                stats,
                searchQuery,
                setSearchQuery,
                statusFilter,
                setStatusFilter,
                priorityFilter,
                setPriorityFilter,
                clearFilters,
                isModalOpen,
                editingTask,
                openModalForCreate,
                openModalForEdit,
                closeModal,
                addTask,
                updateTask,
                deleteTask,
                toggleTaskCompleted,
                currentPage,
                setCurrentPage,
                itemsPerPage
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    return context || defaultTaskContext;
}
