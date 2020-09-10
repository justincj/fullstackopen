const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const BlogRouter = require("./controllers/blogs");
const blogRouter = require("./controllers/blogs");

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MONGODB");
  })
  .catch(() => {
    console.log("error connecting to database");
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
