const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
<<<<<<< HEAD
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blogs");
const { response } = require("express");
const middleware = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
=======
const blogRouter = require("./controllers/blog");
require("express-async-errors");

app.use(cors());

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to", config.MONGODB_URI);
  })
  .catch((error) => {
    console.log("error connecting", error.message);
  });
>>>>>>> parent of fc9dd9c... user

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);
=======
app.use("/api/blogs", blogRouter);
>>>>>>> parent of fc9dd9c... user

module.exports = app;
