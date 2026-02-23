const express = require("express");
const Appointment = require("../models/appointment.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;