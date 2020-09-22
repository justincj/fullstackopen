import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

const blog = {
  title: "example",
  author: "author1",
  url: "url1",
  likes: "2",
};
const component = render(<Blog blog={blog} />);

test("only renders blogs title and author by default", () => {
  const detail = component.container.querySelector(".singleBlog");
  expect(detail).toHaveTextContent("example author1");
  expect(detail).not.toHaveTextContent("likes");
  expect(detail).not.toHaveTextContent("url1");
});
