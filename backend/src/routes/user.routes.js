const express = require("express");
const router = express.Router();

const {
  home,
  getUsers,
  addUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

// GET
router.get("/", home);
router.get("/get-users", getUsers);

// POST
router.post("/add-user", addUser);

// PUT
router.put("/user/:id", updateUser);

// DELETE
router.delete("/user/:id", deleteUser);

module.exports = router;
