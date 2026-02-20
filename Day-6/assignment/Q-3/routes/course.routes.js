const express = require("express");
const Course = require("../models/course.model");
const Student = require("../models/student.model");

const router = express.Router();


// POST add course
router.post("/add-course", async (req,res)=>{
  try{
    const course = await Course.create(req.body);
    res.status(201).json(course);
  }catch(err){
    if(err.code === 11000)
      return res.status(400).json({msg:"Course already exists"});
    res.status(500).json({error:err.message});
  }
});


// POST enroll student
router.post("/enroll-student", async (req,res)=>{
  try{
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if(!student || !course)
      return res.status(404).json({msg:"Student or Course not found"});

    // avoid duplicate enrollment
    if(!student.enrolledCourses.includes(courseId))
      student.enrolledCourses.push(courseId);

    if(!course.enrolledStudents.includes(studentId))
      course.enrolledStudents.push(studentId);

    await student.save();
    await course.save();

    res.json({msg:"Student enrolled successfully"});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});


// GET students in course
router.get("/course-students/:id", async (req,res)=>{
  try{
    const data = await Course.findById(req.params.id)
      .populate("enrolledStudents","name email");

    res.json(data);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

module.exports = router;