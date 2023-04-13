const express = require("express");
const User = require("../models/user");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
  const user = await new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(404).json({ error: "Paasword and Email is Incorrect" });
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.send({ error: error.message });
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send("User Not Found");
//     }
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// });
router.put("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});
// router.delete("/users/me", auth, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.user._id);
//     if (!user) {
//       res.status(404).send("User Not Found");
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });
module.exports = router;
