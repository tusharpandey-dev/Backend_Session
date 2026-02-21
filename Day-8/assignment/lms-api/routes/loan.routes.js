const express = require("express");
const Loan = require("../models/loan.model");
const router = express.Router();
router.post("/loans", async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;