const express = require("express");
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/tasks", auth, taskController.getAllTaskHandler);
router.post("/task", auth, taskController.addTaskHandler);
router.get("/tasks/:id", auth, taskController.getTaskHandler);
router.put("/task/:id", auth, taskController.updateTaskHandler);
router.delete("/task/:id", auth, taskController.deleteTaskHandler);

module.exports = router;
