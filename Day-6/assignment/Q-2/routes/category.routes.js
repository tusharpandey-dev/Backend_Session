const express = require("express");
const Category = require("../models/category.model");

const router = express.Router();

// POST /add-category
router.post("/add-category", async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ msg: "Category added", category });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ msg: "Category already exists" });

    res.status(500).json({ error: err.message });
  }
});

module.exports = router;