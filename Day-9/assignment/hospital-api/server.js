require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/appointments", require("./routes/appointment.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});