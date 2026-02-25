const express = require("express");
const Todo = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  const todo = await Todo.create({
    ...req.body,
    createdBy: req.user.userId
  });

  res.status(201).json(todo);
});
router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({
    createdBy: req.user.userId
  });

  res.json(todos);
});
router.put("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    req.body,
    { new: true }
  );

  if (!todo)
    return res.status(403).json({ message: "Unauthorized action" });

  res.json(todo);
});
router.delete("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId
  });

  if (!todo)
    return res.status(403).json({ message: "Unauthorized action" });

  res.json({ message: "Todo deleted" });
});

module.exports = router;