const express = require("express");
const Task = require("../models/task.model");

const router = express.Router();


// CREATE TASK
router.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL TASKS
router.get("/tasks", async (req, res) => {
  try {
    const { status, dueDate } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (dueDate) filter.dueDate = dueDate;

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE TASK
router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE TASK
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
