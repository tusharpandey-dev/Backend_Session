const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const watchRoutes = require("./routes/watch.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const advancedRoutes = require("./routes/advanced.routes");


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", watchRoutes);
app.use("/api", analyticsRoutes);
app.use("/api", advancedRoutes);

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);