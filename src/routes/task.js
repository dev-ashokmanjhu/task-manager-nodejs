const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({});
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.send(error);
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("Task Not Found");
    }
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});
router.put("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      res.status(404).send("Task not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send("Task not Found");
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});
router.post("/task", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
