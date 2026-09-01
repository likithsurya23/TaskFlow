const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        completed: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            enum: ["High", "Medium", "Low", "high", "medium", "low"],
            default: "Medium"
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "pending", "in progress", "completed"],
            default: "Pending"
        },
        dueDate: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;