"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";

export default function TaskForm({ onClose }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      status: "Pending",
      dueDate: dueDate || new Date().toISOString().split("T")[0]
    });

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900">Add New Task</h3>
      <div>
        <label className="text-xs font-semibold text-slate-700">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-lg"
      >
        Create Task
      </button>
    </form>
  );
}
