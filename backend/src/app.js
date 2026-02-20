const express = require("express");
const cors = require("cors");
const routes = require("./routes/user.routes");
const logger = require("./middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());

// morgan logger middleware
app.use(logger);

app.use("/", routes);

app.listen(3000, () =>
  console.log("Server running on port 3000")
);
