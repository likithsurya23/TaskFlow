const mongoose = require("mongoose");
const Task = require("../models/Task");

// User-scoped in-memory task fallback store
const inMemoryTasksByUser = {};

const getTasks = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { search, status, priority } = req.query;

        if (mongoose.connection.readyState === 1) {
            const query = { user: userId };

            if (status && status !== "All Status" && status !== "all") {
                query.status = { $regex: new RegExp(`^${status}$`, "i") };
            }
            if (priority && priority !== "All Priority" && priority !== "all") {
                query.priority = { $regex: new RegExp(`^${priority}$`, "i") };
            }
            if (search) {
                const searchRegex = { $regex: search, $options: "i" };
                query.$or = [
                    { title: searchRegex },
                    { description: searchRegex }
                ];
            }

            const tasks = await Task.find(query).sort({ createdAt: -1 });
            return res.json(tasks);
        } else {
            // User-isolated in-memory fallback
            if (!inMemoryTasksByUser[userId]) {
                inMemoryTasksByUser[userId] = [];
            }

            let tasks = [...inMemoryTasksByUser[userId]];

            if (status && status !== "All Status" && status !== "all") {
                tasks = tasks.filter(t => t.status.toLowerCase() === status.toLowerCase());
            }
            if (priority && priority !== "All Priority" && priority !== "all") {
                tasks = tasks.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
            }
            if (search) {
                const s = search.toLowerCase();
                tasks = tasks.filter(t => t.title.toLowerCase().includes(s) || (t.description && t.description.toLowerCase().includes(s)));
            }
            return res.json(tasks);
        }
    } catch (error) {
        console.error("Get Tasks Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { title, description, priority, status, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Task title is required" });
        }

        const taskData = {
            title,
            description: description || "",
            priority: priority || "Medium",
            status: status || "Pending",
            dueDate: dueDate || new Date().toISOString().split("T")[0],
            completed: status === "Completed",
            user: userId
        };

        if (mongoose.connection.readyState === 1) {
            const task = await Task.create(taskData);
            return res.status(201).json(task);
        } else {
            if (!inMemoryTasksByUser[userId]) {
                inMemoryTasksByUser[userId] = [];
            }
            const newTask = {
                _id: Date.now().toString(),
                ...taskData,
                createdAt: new Date().toISOString()
            };
            inMemoryTasksByUser[userId].unshift(newTask);
            return res.status(201).json(newTask);
        }
    } catch (error) {
        console.error("Create Task Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { id } = req.params;
        const { title, description, priority, status, dueDate, completed } = req.body;

        if (mongoose.connection.readyState === 1) {
            // Strict query checking _id AND user id
            const task = await Task.findOne({ _id: id, user: userId });
            if (!task) {
                return res.status(404).json({ message: "Task not found or access denied" });
            }

            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (priority !== undefined) task.priority = priority;
            if (status !== undefined) {
                task.status = status;
                if (status === "Completed") task.completed = true;
            }
            if (dueDate !== undefined) task.dueDate = dueDate;
            if (completed !== undefined) {
                task.completed = completed;
                if (completed) task.status = "Completed";
            }

            const updatedTask = await task.save();
            return res.json(updatedTask);
        } else {
            const userTasks = inMemoryTasksByUser[userId] || [];
            const index = userTasks.findIndex(t => t._id === id);
            if (index === -1) {
                return res.status(404).json({ message: "Task not found or access denied" });
            }

            const existing = userTasks[index];
            const updated = {
                ...existing,
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(priority !== undefined && { priority }),
                ...(status !== undefined && { status }),
                ...(dueDate !== undefined && { dueDate }),
                ...(completed !== undefined && { completed })
            };
            if (status === "Completed" || completed) {
                updated.completed = true;
                updated.status = "Completed";
            }
            userTasks[index] = updated;
            return res.json(updated);
        }
    } catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { id } = req.params;

        if (mongoose.connection.readyState === 1) {
            const task = await Task.findOneAndDelete({ _id: id, user: userId });
            if (!task) {
                return res.status(404).json({ message: "Task not found or access denied" });
            }
            return res.json({ message: "Task deleted successfully", id });
        } else {
            const userTasks = inMemoryTasksByUser[userId] || [];
            const index = userTasks.findIndex(t => t._id === id);
            if (index === -1) {
                return res.status(404).json({ message: "Task not found or access denied" });
            }
            userTasks.splice(index, 1);
            return res.json({ message: "Task deleted successfully", id });
        }
    } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};

