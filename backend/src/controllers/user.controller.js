let users = [];

// GET /
exports.home = (req, res) => {
  res.status(200).send("Welcome to server");
};

// GET users
exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

// POST add user
exports.addUser = (req, res) => {
  users.push(req.body);

  res.status(201).json({
    message: "User added successfully"
  });
};

// PUT update user
exports.updateUser = (req, res) => {
  const id = req.params.id;

  users[id] = req.body;

  res.status(201).json({
    message: "User updated successfully"
  });
};

// DELETE user
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  users.splice(id, 1);

  res.json({
    message: "User deleted successfully"
  });
};
