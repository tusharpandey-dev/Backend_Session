const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);