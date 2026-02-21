const express = require("express");
const Workout = require("../models/workout.model");
const router = express.Router();
router.get("/analytics/top-workouts", async (req, res) => {
  const data = await Workout.aggregate([
    { $group: { _id: "$workoutType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 3 }
  ]);
  res.json(data);
});

router.get("/analytics/average-calories", async (req, res) => {
  const data = await Workout.aggregate([
    {
      $group: {
        _id: "$workoutType",
        avgCalories: { $avg: "$caloriesBurned" }
      }
    }
  ]);
  res.json(data);
});
router.get("/analytics/intensity-distribution", async (req, res) => {
  const data = await Workout.aggregate([
    { $group: { _id: "$intensity", total: { $sum: 1 } } }
  ]);
  res.json(data);
});
router.get("/analytics/weekly-activity", async (req, res) => {
  const data = await Workout.aggregate([
    {
      $group: {
        _id: { $week: "$workoutDate" },
        totalWorkouts: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);
  res.json(data);
});
router.get("/analytics/top-performing-users", async (req, res) => {
  const data = await Workout.aggregate([
    {
      $group: {
        _id: "$username",
        totalDuration: { $sum: "$duration" }
      }
    },
    { $sort: { totalDuration: -1 } },
    { $limit: 5 }
  ]);
  res.json(data);
});

module.exports = router;