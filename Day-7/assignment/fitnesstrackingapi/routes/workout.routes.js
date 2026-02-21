const express = require("express");
const Workout = require("../models/workout.model");
const router = express.Router();
router.post("/workouts", async (req, res) => {
  try {
    const data = await Workout.insertMany(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;