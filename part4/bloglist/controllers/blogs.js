const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post("/", async (request, response) => {
  let body = request.body;
  body.likes = body.likes || 0;

  const token = getToken(request);
  const decodedtoken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedtoken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedtoken.id);

  if (!(body.title && body.url)) {
    return response
      .status(400)
      .json({ error: "title and url properties are required" });
  }
  const blog = new Blog(body);
  const returnedBlog = await blog.save();
  user.blogs = user.blogs.concat(returnedBlog._id);
  await user.save();
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
