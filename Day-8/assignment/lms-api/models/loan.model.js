const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower" },
  loanDate: Date,
  returnDate: Date,
  status: String
});

module.exports = mongoose.model("Loan", schema);