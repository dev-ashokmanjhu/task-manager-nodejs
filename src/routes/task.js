const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task Not Found");
    }
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});
router.put("/task/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidator: true,
    // });
    if (!task) {
      res.status(404).send("Task not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send("Task not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
