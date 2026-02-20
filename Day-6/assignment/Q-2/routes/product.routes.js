const express = require("express");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

const router = express.Router();

// POST /add-product
router.post("/add-product", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // verify category exists
    const exists = await Category.findById(category);
    if (!exists)
      return res.status(404).json({ msg: "Category not found" });

    const product = new Product({ name, price, category });
    await product.save();

    res.status(201).json({ msg: "Product added", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all products with category name
router.get("/products", async (req, res) => {
  try {
    const data = await Product.find()
      .populate("category", "name");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;