import React, { useState } from "react";
import BloginService from "../services/blogs";

export const Details = ({ visible, blog, user, refresh }) => {
  const [likes, setLikes] = useState(blog.likes);

  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
  };
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      BloginService.remove(blog.id);
    }
    refresh(blog.id);
  };

  const likeHandler = () => {
    BloginService.update({ ...blog, likes: likes + 1 });
    setLikes(likes + 1);
  };
  if (visible) {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          likes {likes}
          <button onClick={likeHandler}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username ? (
          <button style={buttonStyle} onClick={handleDelete}>
            Remove
          </button>
        ) : (
          <div></div>
        )}
      </div>
    );
  } else return <></>;
};
