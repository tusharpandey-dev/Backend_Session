const Task = require("../models/task.model");


// CREATE VALIDATION
exports.validateTask = async (req, res, next) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority)
    return res.status(400).json({ msg: "Incomplete Data Received" });

  const valid = ["low","medium","high"];
  if (!valid.includes(priority))
    return res.status(400).json({ msg: "Priority must be low, medium or high" });

  const exists = await Task.findOne({ title });
  if (exists)
    return res.status(400).json({ msg: "Title must be unique" });

  next();
};


// UPDATE VALIDATION
exports.validateUpdate = (req, res, next) => {
  const { priority } = req.body;

  if (priority) {
    const valid = ["low","medium","high"];
    if (!valid.includes(priority))
      return res.status(400).json({ msg: "Invalid priority value" });
  }

  next();
};
