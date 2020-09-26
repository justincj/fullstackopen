import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisbility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = visible ? { display: "none" } : { display: "" };
  const showWhenVisible = visible ? { display: "" } : { display: "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisbility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisbility}>cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
