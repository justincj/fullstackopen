const Blog = require("../models/blog");
const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blogObject = {
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes || 0,
    url: request.body.url,
  };

  if (!blogObject.title || !blogObject.url) {
    return response
      .status(400)
      .json({ error: "title and url properties should be present" });
  }

  const blog = new Blog(blogObject);

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).send({ message: "notes deleted" });
});

blogRouter.put("/:id", async (request, response) => {
  const blogObject = request.body;
  const blog = await Blog.findByIdAndUpdate(request.params.id, blogObject, {
    new: true,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).json({ error: "note of that does not exist" });
  }
});

module.exports = blogRouter;
