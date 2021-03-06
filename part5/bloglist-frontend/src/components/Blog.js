import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, incLike, handleDelete, user }) => {
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

  const removeBlog = async () => {
    console.log(blog.id);
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await handleDelete(blog.id);
    }
  };

  return (
    <div className="Blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button className="View" onClick={toggleDetails}>
        {view ? "hide" : "view"}
      </button>
      <div className="details" style={showWhenDetails}>
        <p> {blog.url} </p>
        <div>
          likes {likes}
          <button onClick={incrementLike}>like</button>
        </div>
        <p>{blog.author}</p>
        {blog.user.username === user.username ? (
          <button onClick={removeBlog}>remove</button>
        ) : (
          <div>null</div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  incLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

export default Blog;
