import React, { useState } from "react";
import BloginService from "../services/blogs";

export const Details = ({ visible, blog, refresh }) => {
  console.log(blog);
  const [likes, setLikes] = useState(blog.likes);
  const [username, setUsername] = useState("");

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
    const user = JSON.parse(window.localStorage.getItem("loggedUser"));
    setUsername(user.username);
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          likes {likes}
          <button onClick={likeHandler}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === username ? (
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
