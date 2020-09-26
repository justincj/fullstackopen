import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = (event) => {
    event.preventDefault();
    onSubmit({ username, password });
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={LoginHandler}>
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
