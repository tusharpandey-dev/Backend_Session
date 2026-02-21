const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedYear: Number
});

module.exports = mongoose.model("Book", schema);