const express = require("express");
const Watch = require("../models/watch.model");

const router = express.Router();

/* POST /watch-history */
router.post("/watch-history", async (req, res) => {
  try {
    const data = await Watch.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;