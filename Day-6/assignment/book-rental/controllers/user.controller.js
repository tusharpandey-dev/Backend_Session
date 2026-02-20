const User = require("../models/user.model");

// add user
exports.addUser = async(req,res)=>{
 try{
  const user = await User.create(req.body);
  res.status(201).json(user);
 }
 catch(err){
  if(err.code===11000)
   return res.status(400).json({msg:"Email already exists"});
  res.status(500).json({error:err.message});
 }
};

// get rented books
exports.getUserRentals = async(req,res)=>{
 try{
  const data = await User.findById(req.params.userId)
    .populate("rentedBooks","title author genre");

  res.json(data);
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};