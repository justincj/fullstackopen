const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
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

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
