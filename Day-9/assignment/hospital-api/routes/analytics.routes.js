const express = require("express");
const mongoose = require("mongoose");

const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

const router = express.Router();


router.get("/doctors-with-appointments", async (req, res) => {
  try {
    const data = await Appointment.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor"
        }
      },
      { $unwind: "$doctor" },
      {
        $group: {
          _id: "$doctor._id",
          name: { $first: "$doctor.name" },
          specialty: { $first: "$doctor.specialty" },
          totalAppointments: { $sum: 1 }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/patient-medical-history/:id", async (req, res) => {
  try {
    const data = await Patient.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "patientId",
          as: "appointments"
        }
      },
      {
        $unwind: {
          path: "$appointments",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          age: 1,
          gender: 1,
          medicalHistory: 1,
          appointmentDate: "$appointments.appointmentDate",
          status: "$appointments.status"
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/top-specialties", async (req, res) => {
  try {
    const data = await Appointment.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor"
        }
      },
      { $unwind: "$doctor" },
      {
        $group: {
          _id: "$doctor.specialty",
          totalBookings: { $sum: 1 }
        }
      },
      { $sort: { totalBookings: -1 } },
      { $limit: 3 }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/cancelled-appointments", async (req, res) => {
  try {
    const data = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctorId",
          totalAppointments: { $sum: 1 },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          doctorId: "$_id",
          percentageCancelled: {
            $multiply: [
              { $divide: ["$cancelled", "$totalAppointments"] },
              100
            ]
          }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/monthly-appointments", async (req, res) => {
  try {
    const data = await Appointment.aggregate([
      {
        $group: {
          _id: { month: { $month: "$appointmentDate" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/active-patients", async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const data = await Appointment.aggregate([
      { $match: { appointmentDate: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: "$patientId",
          visits: { $sum: 1 }
        }
      },
      { $match: { visits: { $gt: 3 } } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/doctor-availability/:day", async (req, res) => {
  try {
    const day = req.params.day;

    const data = await Doctor.aggregate([
      { $unwind: "$availability" },
      { $match: { availability: day } },
      {
        $project: {
          name: 1,
          specialty: 1,
          availability: 1
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;