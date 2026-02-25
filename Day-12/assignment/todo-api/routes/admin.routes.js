const express = require("express");
const Todo = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();
router.get("/todos", authMiddleware, adminMiddleware, async (req, res) => {
  const todos = await Todo.find().populate("createdBy", "name email role");
  res.json(todos);
});
router.delete("/todos/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo)
    return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo deleted by Admin" });
});

module.exports = router;