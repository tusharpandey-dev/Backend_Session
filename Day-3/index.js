const express = require("express");
const usersRoutes = require("./routes/users.routes");
const todosRoutes = require("./routes/todos.routes");

const app = express();

app.use(express.json());

// route middleware
app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);

// server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
