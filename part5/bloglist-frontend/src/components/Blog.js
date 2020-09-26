import React, { useState } from "react";

const Blog = ({ blog, incLike }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenDetails = { display: view ? "" : "none" };

  const toggleDetails = () => {
    setView(!view);
  };
  const incrementLike = async () => {
    const blogObject = { ...blog, likes: likes + 1 };
    const updatedLike = await incLike(blogObject);
    if (updatedLike) {
      setLikes(updatedLike);
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{view ? "hide" : "view"}</button>
      <div style={showWhenDetails}>
        <p> {blog.url} </p>
        <div>
          likes {likes}
          <button onClick={incrementLike}>like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
