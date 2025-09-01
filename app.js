const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use("/users", userRouter);
app.use("/projects", projectRouter);
module.exports = app;
