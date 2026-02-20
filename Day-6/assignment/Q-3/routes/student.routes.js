const express = require("express");
const Student = require("../models/student.model");

const router = express.Router();

// POST add student
router.post("/add-student", async (req,res)=>{
  try{
    const student = await Student.create(req.body);
    res.status(201).json(student);
  }catch(err){
    if(err.code === 11000)
      return res.status(400).json({msg:"Email already exists"});
    res.status(500).json({error:err.message});
  }
});


// GET courses of student
router.get("/student-courses/:id", async (req,res)=>{
  try{
    const data = await Student.findById(req.params.id)
      .populate("enrolledCourses","name description");

    res.json(data);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

module.exports = router;