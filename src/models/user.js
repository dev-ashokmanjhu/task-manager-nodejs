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
// const me = new User({
//   name: "Mike",
//   age: 32,
//   password: "4354233",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

module.exports = User;

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const task = new Task({
//   description: "Learn the Mongoose library",
//   completed: false,
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
