const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(taskRouter);

module.exports = app;
