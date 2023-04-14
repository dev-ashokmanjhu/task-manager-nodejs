const User = require("../models/user");

exports.createUser = async (req, res) => {
  const user = await new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
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
};

exports.logOutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

exports.logOutAllUser = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.send({ error: error.message });
  }
};
exports.getUserProfile = async (req, res) => {
  res.send(req.user);
};

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
};
