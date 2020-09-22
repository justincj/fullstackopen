import React, { useState } from "react";
import { Details } from "./Details";

const Blog = ({ blog, refresh }) => {
  const [visible, setvisible] = useState(false);
  const blogStyle = {
    border: "solid",
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setvisible(!visible);
  };

  return (
    <div style={blogStyle} className="singleBlog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      <Details visible={visible} blog={blog} refresh={refresh} />
    </div>
  );
};

export default Blog;
