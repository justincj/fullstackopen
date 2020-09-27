const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// @ts-ignore
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  //@ts-ignore
  if (!request.token) {
    return response.status(401).end();
  }
  let body = request.body;
  body.likes = body.likes || 0;

  // @ts-ignore
  const token = request.token;
  const decodedtoken = jwt.verify(token, process.env.SECRET);
  // @ts-ignore
  if (!token || !decodedtoken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  // @ts-ignore
  const user = await User.findById(decodedtoken.id);

  if (!(body.title && body.url)) {
    return response
      .status(400)
      .json({ error: "title and url properties are required" });
  }
  body.user = user._id;
  const blog = new Blog(body);
  const returnedBlog = await blog.save();
  // @ts-ignore
  user.blogs = user.blogs.concat(returnedBlog._id);
  await user.save();
  return response.status(201).json(returnedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  // @ts-ignore
  const token = request.token;
  const decodedToken = await jwt.verify(token, process.env.SECRET);
  // @ts-ignore
  const userid = decodedToken.id;
  const user = await User.findById(userid);
  const blog = await Blog.findById(request.params.id);
  // @ts-ignore
  if (blog && blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(blog._id);
    // @ts-ignore
    user.blogs = user.blogs.filter((blog) => blog !== blog._id);
    await user.save();
    return response.status(204).end();
  }
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
