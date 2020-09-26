import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { prettyDom } from "@testing-library/dom";
import Blog from "./Blog";

const blog = {
  author: "dummy author",
  title: "dummy title",
  url: "dummy url",
  likes: "dummy likes",
};

test("renders content", () => {
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("dummy author");
});

test("url and likes are hidden by default", () => {
  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector(".details");
  expect(div).toHaveTextContent("dummy url");
  expect(div).toHaveTextContent("dummy likes");
  expect(div).toHaveStyle("display: none");
});
