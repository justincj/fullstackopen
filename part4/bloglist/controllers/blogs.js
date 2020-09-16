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

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    title: body.title,
  };
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  return response.status(200).send(newBlog);
});

module.exports = blogRouter;
