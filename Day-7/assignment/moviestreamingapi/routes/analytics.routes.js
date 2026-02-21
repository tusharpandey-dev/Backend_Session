const express = require("express");
const Watch = require("../models/watch.model");

const router = express.Router();

/* 1. Top 5 Most Watched Movies */
router.get("/analytics/top-movies", async (req, res) => {
  const data = await Watch.aggregate([
    { $group: { _id: "$movie", totalWatchTime: { $sum: "$watchTime" } } },
    { $sort: { totalWatchTime: -1 } },
    { $limit: 5 }
  ]);
  res.json(data);
});

/* 2. Genre Popularity */
router.get("/analytics/genre-popularity", async (req, res) => {
  const data = await Watch.aggregate([
    { $group: { _id: "$genre", totalWatchTime: { $sum: "$watchTime" } } },
    { $sort: { totalWatchTime: -1 } }
  ]);
  res.json(data);
});

/* 3. User Engagement */
router.get("/analytics/user-engagement", async (req, res) => {
  const data = await Watch.aggregate([
    { $group: { _id: "$username", avgWatchTime: { $avg: "$watchTime" } } }
  ]);
  res.json(data);
});

/* 4. Subscription Comparison */
router.get("/analytics/subscription-watchtime", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: "$subscriptionType",
        totalWatchTime: { $sum: "$watchTime" }
      }
    }
  ]);
  res.json(data);
});

/* 5. Highest Rated Movies */
router.get("/analytics/highest-rated-movies", async (req, res) => {
  const data = await Watch.aggregate([
    { $group: { _id: "$movie", avgRating: { $avg: "$rating" } } },
    { $sort: { avgRating: -1 } },
    { $limit: 3 }
  ]);
  res.json(data);
});

module.exports = router;