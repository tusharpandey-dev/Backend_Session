const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api",userRoutes);
app.use("/api",bookRoutes);

app.listen(3000,()=>console.log("Server running on port 3000"));