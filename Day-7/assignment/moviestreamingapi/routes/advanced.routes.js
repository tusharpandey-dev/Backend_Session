const express = require("express");
const Watch = require("../models/watch.model");
const router = express.Router();

/* 1️⃣ Monthly Watch Trends */
router.get("/analytics/monthly-trends", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: { month: { $month: "$watchedDate" } },
        totalWatchTime: { $sum: "$watchTime" }
      }
    },
    { $sort: { "_id.month": 1 } }
  ]);
  res.json(data);
});


/* 2️⃣ Most Active Users */
router.get("/analytics/most-active-users", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: "$username",
        totalWatchTime: { $sum: "$watchTime" }
      }
    },
    { $sort: { totalWatchTime: -1 } },
    { $limit: 5 }
  ]);
  res.json(data);
});


/* 3️⃣ Binge Watchers (>3 movies per day) */
router.get("/analytics/binge-watchers", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: {
          user: "$username",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$watchedDate" } }
        },
        count: { $sum: 1 }
      }
    },
    { $match: { count: { $gt: 3 } } }
  ]);
  res.json(data);
});


/* 4️⃣ Top Genre per Subscription */
router.get("/analytics/top-genre-per-subscription", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: { sub: "$subscriptionType", genre: "$genre" },
        watchTime: { $sum: "$watchTime" }
      }
    },
    { $sort: { watchTime: -1 } },
    {
      $group: {
        _id: "$_id.sub",
        topGenre: { $first: "$_id.genre" },
        watchTime: { $first: "$watchTime" }
      }
    }
  ]);
  res.json(data);
});


/* 5️⃣ User Retention (Repeat Viewers) */
router.get("/analytics/user-retention", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: "$username",
        watchCount: { $sum: 1 }
      }
    },
    { $match: { watchCount: { $gt: 1 } } },
    { $sort: { watchCount: -1 } }
  ]);
  res.json(data);
});


/* 6️⃣ Peak Streaming Days */
router.get("/analytics/peak-days", async (req, res) => {
  const data = await Watch.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: "$watchedDate" },
        totalStreams: { $sum: 1 }
      }
    },
    { $sort: { totalStreams: -1 } }
  ]);
  res.json(data);
});

module.exports = router;