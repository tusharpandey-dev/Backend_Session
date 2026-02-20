const { todos } = require("../data/db");

// CREATE
exports.createTodo = (req, res) => {
  todos.push(req.body);
  res.json({ message: "Todo created", todos });
};

// READ
exports.getTodos = (req, res) => {
  res.json(todos);
};

// UPDATE
exports.updateTodo = (req, res) => {
  const id = req.params.id;

  if (!todos[id])
    return res.status(404).json({ message: "Todo not found" });

  todos[id] = req.body;

  res.json({ message: "Todo updated", todos });
};

// DELETE
exports.deleteTodo = (req, res) => {
  const id = req.params.id;

  if (!todos[id])
    return res.status(404).json({ message: "Todo not found" });

  todos.splice(id, 1);

  res.json({ message: "Todo deleted", todos });
};
