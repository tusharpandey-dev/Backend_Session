const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});