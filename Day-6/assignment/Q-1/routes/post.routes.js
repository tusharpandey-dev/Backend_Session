const express = require("express");
const Post = require("../models/post.model");
const User = require("../models/user.model");

const router = express.Router();

// POST /add-post
router.post("/add-post", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // check author exists
    const user = await User.findById(author);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const post = new Post({ title, content, author });
    await post.save();

    res.status(201).json({ msg: "Post added", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET all posts with author name
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;