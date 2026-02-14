require("dotenv").config();
const express = require("express");

const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");

const app = express();

app.use(cors());
app.use(express.json());

// serve HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// routes
app.use("/", uploadRoutes);

// server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
