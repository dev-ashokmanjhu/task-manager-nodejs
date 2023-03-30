const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is Running Successfully");
});
app.post("/users", async (req, res) => {
  const user = await new User(req.body);
  try {
    user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(err);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!user) {
      res.status(404).send("User Not Found");
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("User Not Found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});
app.get("/tasks/:id", async (req, res) => {
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
app.put("/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!task) {
      res.status(404).send("Task not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});
app.delete("/task/:id", async (req, res) => {
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
app.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is Running on Port : ${port}`);
});
