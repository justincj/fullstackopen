import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userObject = {
      username,
      password,
    };
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
    setUsername("");
    setPassword("");
  };

  const handlePost = async (blogObject) => {
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
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
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
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default App;
