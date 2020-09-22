import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

const user = {
  username: "justin",
};

const blog = {
  title: "example",
  author: "author1",
  url: "url1",
  likes: "2",
  user: {
    username: "justin",
    name: "justin",
  },
};

let component;
beforeEach(() => {
  component = render(<Blog blog={blog} user={user} refresh />);
});

test("only renders blogs title and author by default", () => {
  const detail = component.container.querySelector(".singleBlog");
  expect(detail).toHaveTextContent("example author1");
  expect(detail).not.toHaveTextContent("likes");
  expect(detail).not.toHaveTextContent("url1");
});

test("url and number of likes are shown when clicked", () => {
  const button = component.container.querySelector("button");
  fireEvent.click(button);
  const detail = component.container.querySelector(".singleBlog");
  expect(detail).toHaveTextContent("likes");
  expect(detail).toHaveTextContent("url1");
});
