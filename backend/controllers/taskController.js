const Task = require("../models/Task");

const getTasks = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { search, status, priority } = req.query;
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
    } catch (error) {
        console.error("Get Tasks Error:", error);
        res.status(500).json({ message: error.message || "Failed to fetch tasks" });
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

        const task = await Task.create({
            title,
            description: description || "",
            priority: priority || "Medium",
            status: status || "Pending",
            dueDate: dueDate || new Date().toISOString().split("T")[0],
            completed: status === "Completed",
            user: userId
        });

        return res.status(201).json(task);
    } catch (error) {
        console.error("Create Task Error:", error);
        res.status(500).json({ message: error.message || "Failed to create task" });
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
    } catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ message: error.message || "Failed to update task" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, user: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or access denied" });
        }
        return res.json({ message: "Task deleted successfully", id });
    } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ message: error.message || "Failed to delete task" });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};

