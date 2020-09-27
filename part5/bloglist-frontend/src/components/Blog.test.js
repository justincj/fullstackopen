import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const user = {
  username: "jon",
  name: "jon Doe",
};
const blog = {
  author: "dummy author",
  title: "dummy title",
  url: "dummy url",
  likes: "dummy likes",
  user: {
    username: "jon",
    name: "jon Doe",
  },
};

const incLike = jest.fn();

describe("<Blog />", () => {
  let component;
  beforeEach(() => {
    component = render(<Blog blog={blog} incLike={incLike} user={user} />);
  });

  test("renders content", () => {
    expect(component.container).toHaveTextContent("dummy author");
  });

  test("url and likes are hidden by default", () => {
    const div = component.container.querySelector(".details");
    expect(div).toHaveTextContent("dummy url");
    expect(div).toHaveTextContent("dummy likes");
    expect(div).toHaveStyle("display: none");
  });

  test("if button clicked details are shown", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const div = component.container.querySelector(".details");
    expect(div).not.toHaveStyle("display: none");
  });

  test("if like button clicked handler called twice", () => {
    const likeHandler = jest.fn();
    const button = component.getByText("like");
    button.onclick = () => likeHandler();
    fireEvent.click(button);
    fireEvent.click(button);
    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
