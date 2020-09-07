const Blog = require("../models/blog");
const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blogObject = {
    author: request.body.author,
    likes: request.body.likes || 0,
    url: request.body.url,
  };

  const blog = new Blog(blogObject);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
