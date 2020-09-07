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

afterAll(() => {
  mongoose.connection.close();
});
