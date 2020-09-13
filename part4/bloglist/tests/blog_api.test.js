const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);
const helper = require("./test_helpers");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObject = helper.bloglist.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.bloglist.length);
});

afterAll(() => {
  mongoose.connection.close();
});
