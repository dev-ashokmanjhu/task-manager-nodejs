const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/users", async (req, res) => {
  const user = await new User(req.body);
  try {
    user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(err);
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
router.get("/users/:id", async (req, res) => {
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
router.put("/users/:id", async (req, res) => {
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
router.delete("/users/:id", async (req, res) => {
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
module.exports = router;