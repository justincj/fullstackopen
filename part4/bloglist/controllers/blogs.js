const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  let body = request.body;
  body.likes = body.likes || 0;

  if (!(body.title && body.url)) {
    return response
      .status(400)
      .json({ error: "title and url properties are required" });
  }
  const blog = new Blog(request.body);
  const returnedBlog = await blog.save();
  response.status(201).json(returnedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
