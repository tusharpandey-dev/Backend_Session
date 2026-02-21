const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  membershipDate: Date
});

module.exports = mongoose.model("Borrower", schema);