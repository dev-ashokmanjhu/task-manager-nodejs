const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    max: 14,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password Does't Contain Password");
      }
    },
  },
});

module.exports = User;
