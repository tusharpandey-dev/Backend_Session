const Task = require("../models/task.model");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const { priority, status } = req.query;

    let filter = {};
    if (priority) filter.priority = priority;
    if (status) filter.isCompleted = status === "true";

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    if (req.body.isCompleted === true)
      req.body.completionDate = new Date();

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE TASKS BY PRIORITY
exports.deleteTasks = async (req, res) => {
  try {
    const { priority } = req.query;

    if (!priority)
      return res.status(400).json({ msg: "Priority required" });

    await Task.deleteMany({ priority });

    res.json({ msg: "Tasks deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
