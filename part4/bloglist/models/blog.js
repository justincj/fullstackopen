const mongoose = require("mongoose");
<<<<<<< HEAD
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: { type: String },
  url: {
    type: String,
  },
  likes: { type: Number },
=======

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
>>>>>>> parent of fc9dd9c... user
});

module.exports = mongoose.model("Blog", blogSchema);
