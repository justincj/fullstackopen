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

describe("blogs are returned as json", () => {
  test("json for get all blogs", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

test("correct number of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.bloglist.length);
});

describe("id property is defined", () => {
  test("identifier property of blog is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("post request", () => {
  test("post request increases the number of blogs in database by one", async () => {
    const blogObject = new Blog({
      author: "Kent C dodds",
      likes: 4,
      title: "Why I love React",
      url: "http://www.epicreact.com",
    });
    await api.post("/api/blogs").send(blogObject);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.bloglist.length + 1);
  });
});

describe("likes property", () => {
  test("likes property defaults to zero if not provided one", async () => {
    const blog = {
      author: "Kent C dodds",
      title: "Why I Love React",
      url: "http://www.epicreact.com",
    };
    const blogObject = new Blog(blog);
    const response = await api.post("/api/blogs").send(blogObject);
    expect(response.body).toHaveProperty("likes");
  });
});

describe("title and url properties should be present", () => {
  test("return 400 Bad Request for missing title and url properties", async () => {
    const blog = {
      likes: 2,
      author: "Kent C dodds",
    };
    const blogObject = new Blog(blog);
    const response = await api.post("/api/blogs").send(blogObject);
    expect(response.status).toEqual(400);
  });
});

describe("deleting single blog post", () => {
  jest.setTimeout(10000);
  test("deleting single blog post works", async () => {
    const blogs = await helper.blogsindb();
    console.log(blogs);
    const blog = blogs[0];
    console.log(blog.id);
    const url = `/api/blogs/${blog.id}`;
    await api.del(url).expect(204);
    console.log("done2");

    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).not.toContain(blog);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
