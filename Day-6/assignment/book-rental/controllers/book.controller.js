const Book = require("../models/book.model");
const User = require("../models/user.model");

// add book
exports.addBook = async(req,res)=>{
 try{
  const book = await Book.create(req.body);
  res.status(201).json(book);
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};


// rent book
exports.rentBook = async(req,res)=>{
 try{
  const {userId,bookId} = req.body;

  const user = await User.findById(userId);
  const book = await Book.findById(bookId);

  if(!user || !book)
   return res.status(404).json({msg:"User or Book not found"});

  if(!user.rentedBooks.includes(bookId))
   user.rentedBooks.push(bookId);

  if(!book.rentedBy.includes(userId))
   book.rentedBy.push(userId);

  await user.save();
  await book.save();

  res.json({msg:"Book rented successfully"});
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};


// return book
exports.returnBook = async(req,res)=>{
 try{
  const {userId,bookId} = req.body;

  await User.findByIdAndUpdate(userId,{
    $pull:{ rentedBooks:bookId }
  });

  await Book.findByIdAndUpdate(bookId,{
    $pull:{ rentedBy:userId }
  });

  res.json({msg:"Book returned"});
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};


// get book renters
exports.getBookRenters = async(req,res)=>{
 try{
  const data = await Book.findById(req.params.bookId)
    .populate("rentedBy","name email");

  res.json(data);
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};


// update book
exports.updateBook = async(req,res)=>{
 try{
  const book = await Book.findByIdAndUpdate(
   req.params.bookId,
   req.body,
   {new:true}
  );

  res.json(book);
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};


// delete book
exports.deleteBook = async(req,res)=>{
 try{
  const bookId = req.params.bookId;

  await User.updateMany(
    {},
    {$pull:{rentedBooks:bookId}}
  );

  await Book.findByIdAndDelete(bookId);

  res.json({msg:"Book deleted"});
 }
 catch(err){
  res.status(500).json({error:err.message});
 }
};