const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("Category", categorySchema);