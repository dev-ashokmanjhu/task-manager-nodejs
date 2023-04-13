const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ashokmanjhu:ashokmanjhu@cluster0.m8gxypg.mongodb.net/task-app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
