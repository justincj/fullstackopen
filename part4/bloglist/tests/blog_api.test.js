const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);
const helper = require("./test_helpers");
const Blog = require("../models/blog");
const User = require("../models/user");

let token;

beforeAll(async () => {
  await User.deleteMany({});
  const user = {
    name: "test",
    username: "test",
    password: "testpassword",
  };
  await api.post("/api/users").send(user);
  const response = await api
    .post("/api/login")
    .send({ username: user.username, password: user.password });
  token = response.body.token;
});

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
    jest.setTimeout(30000);

    const blogObject = new Blog({
      author: "Kent C dodds",
      likes: 4,
      title: "Why I love React",
      url: "http://www.epicreact.com",
    });

    await api
      .post("/api/blogs")
      .send(blogObject)
      .set("Authorization", `bearer ${token}`);
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
    const response = await api
      .post("/api/blogs")
      .send(blogObject)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toHaveProperty("likes");
  });
});

describe("title and url properties should be present", () => {
  test("return 400 Bad Request for missing title and url properties", async () => {
    const blog = {
      likes: 2,
      author: "Kent C dodds",
    };
    const response = await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });
});

describe("deleting single blog post", () => {
  jest.setTimeout(30000);
  test("deleting single blog post works", async () => {
    const blog = {
      author: "Kent C dodds",
      likes: 4,
      title: "Why I love React",
      url: "http://www.epicreact.com",
    };
    const blogObject = new Blog(blog);

    const resp = await api
      .post("/api/blogs")
      .send(blogObject)
      .set("Authorization", `bearer ${token}`);

    const url = `/api/blogs/${resp.body.id}`;
    await api.del(url).set("Authorization", `Bearer ${token}`).expect(204);

    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).not.toContain(blog);
  });
});

describe("updation", () => {
  test("can update likes", async () => {
    const blog = {
      author: "Kent C dodds",
      likes: 0,
      title: "Why I Love React",
      url: "http://www.epicreact.com",
    };
    const response = await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`);
    const initialblogs = await helper.blogsindb();

    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const res = await api
      .put(`/api/blogs/${response.body.id}`)
      .send(updatedBlog);

    expect(res.body.likes).toBe(blog.likes + 1);
    const updatedblogs = await helper.blogsindb();
    expect(initialblogs).toHaveLength(updatedblogs.length);
  });
});

describe("check credentials", () => {
  test("401 Unauthorized if token not provided", async () => {
    jest.setTimeout(30000);
    const blog = {
      author: "Kent C dodds",
      likes: 0,
      title: "Why I Love React",
      url: "http://www.epicreact.com",
    };
    await api.post("/api/blogs").send(blog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
