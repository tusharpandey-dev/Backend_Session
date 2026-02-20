const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");
const middleware = require("../middleware/task.middleware");

router.post("/tasks", middleware.validateTask, controller.createTask);

router.get("/tasks", controller.getTasks);

router.patch("/tasks/:id", middleware.validateUpdate, controller.updateTask);

router.delete("/tasks", controller.deleteTasks);

module.exports = router;
