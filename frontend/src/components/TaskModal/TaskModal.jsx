"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export default function TaskModal() {
  const { isModalOpen, editingTask, closeModal, addTask, updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const [prevEditingTask, setPrevEditingTask] = useState(null);
  const [prevIsModalOpen, setPrevIsModalOpen] = useState(false);

  if (editingTask !== prevEditingTask || isModalOpen !== prevIsModalOpen) {
    setPrevEditingTask(editingTask);
    setPrevIsModalOpen(isModalOpen);
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
      setStatus(editingTask.status || "Pending");
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Pending");
      setDueDate("");
    }
  }

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskPayload = {
      title,
      description,
      priority,
      status,
      dueDate: dueDate || new Date().toISOString().split("T")[0]
    };

    if (editingTask) {
      updateTask(editingTask._id, taskPayload);
    } else {
      addTask(taskPayload);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h3>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
          {/* Title Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all resize-none"
            />
          </div>

          {/* Priority & Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Priority */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-800 transition-all cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <button
              type="button"
              onClick={closeModal}
              className="px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
            >
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
