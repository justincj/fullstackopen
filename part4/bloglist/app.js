const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blogs");
const { response } = require("express");
const middleware = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
