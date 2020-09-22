import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const refresh = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const handleLogin = async (userObject) => {
    try {
      const returnedUser = await loginService.create(userObject);
      setUser(returnedUser);
      window.localStorage.setItem("loggedUser", JSON.stringify(returnedUser));
      blogService.setToken(returnedUser.token);
    } catch (error) {
      console.log(error);
      setErrorMessage("Wrong Username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handlePost = async (blogObject) => {
    // @ts-ignore
    blogRef.current.toggleVisibility();
    try {
      const newblog = await blogService.create(blogObject);
      setBlogs([...blogs, newblog]);
      setSuccessMessage(
        `a new blog ${newblog.title} by ${newblog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <Notification
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
        <h2>Log in to application</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    );
  };
  if (!user) {
    return loginForm();
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Create New Blog</h2>
      <Togglable buttonLabel="create new" ref={blogRef}>
        <BlogForm onSubmit={handlePost} />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} user={user} blog={blog} refresh={refresh} />
          ))}
      </div>
    </div>
  );
};

export default App;
