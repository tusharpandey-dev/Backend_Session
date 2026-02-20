const { users } = require("../data/db");

// CREATE
exports.createUser = (req, res) => {
  users.push(req.body);
  res.json({ message: "User created", users });
};

// READ
exports.getUsers = (req, res) => {
  res.json(users);
};

// UPDATE (by id param)
exports.updateUser = (req, res) => {
  const id = req.params.id;

  if (!users[id])
    return res.status(404).json({ message: "User not found" });

  users[id] = req.body;

  res.json({ message: "User updated", users });
};

// DELETE (by id param)
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  if (!users[id])
    return res.status(404).json({ message: "User not found" });

  users.splice(id, 1);

  res.json({ message: "User deleted", users });
};
