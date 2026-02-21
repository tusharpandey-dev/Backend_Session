const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const loanRoutes = require("./routes/loan.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", loanRoutes);
app.use("/api", analyticsRoutes);

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);