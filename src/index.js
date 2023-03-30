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
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.send(err));
});
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => res.send(e));
});
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User Not Found");
      }
      res.send(user);
    })
    .catch((err) => res.send(err));
});
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => res.send(tasks))
    .catch((err) => res.send(err));
});
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task Not Found");
      }
      res.send(task);
    })
    .catch((err) => res.send(err));
});
app.post("/task", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((task) => res.send(task))
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`Server is Running on Port : ${port}`);
});
