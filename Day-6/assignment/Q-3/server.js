const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);
app.use("/api", courseRoutes);

app.listen(3000, ()=>console.log("Server running on port 3000"));