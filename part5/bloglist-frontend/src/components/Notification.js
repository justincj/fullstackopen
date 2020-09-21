import React from "react";

const Notification = ({ successMessage, errorMessage }) => {
  const successStyle = {
    color: "green",
    background: "gray",
  };

  const errorStyle = {
    color: "red",
    background: "gray",
  };

  if (successMessage) {
    return (
      <div style={successStyle}>
        <h2>{successMessage}</h2>
      </div>
    );
  } else if (errorMessage) {
    return (
      <div style={errorStyle}>
        <h2>{errorMessage}</h2>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Notification;
