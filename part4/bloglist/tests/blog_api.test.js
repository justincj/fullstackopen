const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlog) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("notes are returned in json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlog.length);
});

test("post request increase the number of blogs ", async () => {
  const newblog = {
    author: "person1",
    likes: 2,
    title: "name of blog",
    url: "http://www.example.com/",
  };
  await api.post("/api/blogs").send(newblog);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toEqual(helper.initialBlog.length + 1);
});

test("like property defaults to zero", async () => {
  const newblog = {
    author: "person1",
    title: "name of blog",
    url: "http://www.example.com/",
  };
  const response = await api.post("/api/blogs").send(newblog);
  expect(response.body.likes).toEqual(0);
});

test("absence of title and url cause 400 bad requst", async () => {
  const newBlog = {
    author: "person1",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toEqual(helper.initialBlog.length);
});

afterAll(() => {
  mongoose.connection.close();
});
