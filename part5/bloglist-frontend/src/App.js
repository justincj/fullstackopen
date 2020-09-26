import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginServices from "./services/login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    //check whether a user is logged in
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const response = await loginServices.create(userObject);
      console.log("response", response);
      if (response) {
        window.localStorage.setItem("loggedUser", JSON.stringify(response));
        setUser(response);
      }
    } catch (error) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleLike = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject);
    return updatedBlog.likes;
  };

  const handleBlogPost = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Failed to Add Blog");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  if (!user) {
    return (
      <div>
        <Notification err={errorMessage} success={successMessage} />
        <LoginForm onSubmit={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification err={errorMessage} success={successMessage} />
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={logoutHandler}>logout</button>
      <h2>Create new</h2>
      <Togglable buttonLabel="create new">
        <BlogForm onSubmit={handleBlogPost} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} incLike={handleLike} />
      ))}
    </div>
  );
};

export default App;
