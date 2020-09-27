import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

const onSubmit = jest.fn();

describe("BlogForm", () => {
  let component;
  beforeEach(() => {
    component = render(<BlogForm onSubmit={onSubmit} />);
  });

  test("event handler is called with correct details", () => {
    const author = component.container.querySelector("#author");
    const title = component.container.querySelector("#title");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("form");

    fireEvent.change(author, {
      target: { value: "dummy author" },
    });
    fireEvent.change(title, {
      target: { value: "dummy title" },
    });
    fireEvent.change(url, {
      target: { value: "dummy url" },
    });
    fireEvent.submit(form);
    expect(onSubmit.mock.calls).toHaveLength(1);
  });
});
