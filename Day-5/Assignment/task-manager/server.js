const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
