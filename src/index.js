const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
// const Task = require("./models/task");
// const User = require("./models/user");
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3000;

// const main = async () => {
//   // const task = await Task.findById("642baceb20c04e3be8b0179e");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("642ba48f4916114124e58205");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();

app.listen(port, () => {
  console.log(`Server is Running on Port : ${port}`);
});
