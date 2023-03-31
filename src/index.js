const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const token = jwt.sign({ _id: "abc@1234" }, "ashok");
  const data = jwt.verify(token, "ashok");
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is Running on Port : ${port}`);
});
