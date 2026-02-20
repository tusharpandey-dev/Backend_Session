const express = require("express");
const mongoose = require("mongoose");
const Event = require("../models/event.model");

const router = express.Router();


// CREATE EVENT
router.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// READ ALL EVENTS OR FILTER BY TITLE
router.get("/events", async (req, res) => {
  try {
    const { title } = req.query;

    let filter = {};
    if (title) filter.title = title;

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE EVENT
router.patch("/events/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: "Invalid ID" });

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE EVENT
router.delete("/events/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: "Invalid ID" });

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
