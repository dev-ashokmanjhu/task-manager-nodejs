const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is Running Successfully");
});

app.listen(port, () => {
  console.log(`Server is Running on Port : ${port}`);
});
