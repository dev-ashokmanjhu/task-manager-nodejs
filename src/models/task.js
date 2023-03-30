const mongoose = require("mongoose");

const Task = mongoose.model("task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
  },
});
module.exports = Task;
