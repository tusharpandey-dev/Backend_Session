const express = require("express");
const Order = require("../models/order.model");

const router = express.Router();
router.get("/analytics/top-products", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$productName", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 3 }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/analytics/revenue-by-category", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$category", revenue: { $sum: "$totalPrice" } } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/analytics/average-order-value", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, avgOrderValue: { $avg: "$totalPrice" } } }
    ]);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/analytics/orders-per-month", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/analytics/cancellation-rate", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          cancelled: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          cancellationRate: {
            $multiply: [{ $divide: ["$cancelled", "$totalOrders"] }, 100]
          }
        }
      }
    ]);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;