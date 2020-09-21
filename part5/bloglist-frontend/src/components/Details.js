import React, { useState } from "react";
import BloginService from "../services/blogs";

export const Details = ({ visible, blog }) => {
  console.log(blog);
  const [likes, setLikes] = useState(blog.likes);

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
      </div>
    );
  } else return <></>;
};

export default Details;
