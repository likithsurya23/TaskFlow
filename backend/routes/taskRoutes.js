const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;