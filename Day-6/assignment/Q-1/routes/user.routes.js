const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

// POST /add-user
router.post("/add-user", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = new User({ name, email, age });
    await user.save();

    res.status(201).json({ msg: "User added", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;