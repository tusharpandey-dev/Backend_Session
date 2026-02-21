const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema({
  username: String,
  movie: String,
  genre: String,
  watchTime: Number,
  subscriptionType: String,
  watchedDate: Date,
  rating: Number
});

module.exports = mongoose.model("WatchHistory", watchHistorySchema);