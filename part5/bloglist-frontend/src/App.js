import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginServices from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    //check whether a user is logged in
    const userObject = window.localStorage.getItem("loggedUser");
    if (userObject) {
      setUser(JSON.parse(userObject));
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const response = await loginServices.create(userObject);
      window.localStorage.setItem("loggedUser", JSON.stringify(response));
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (!user) {
    return <LoginForm onSubmit={handleLogin} />;
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={logoutHandler}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
