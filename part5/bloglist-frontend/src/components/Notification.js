import React from "react";

const Notification = ({ err, success }) => {
  const successStyle = {
    color: "green",
    padding: "1em",
    backgroundColor: "gray",
    border: "2px solid green",
  };
  const errorStyle = {
    color: "red",
    padding: "1em",
    backgroundColor: "gray",
    border: "2px solid red",
  };

  if (err) {
    return (
      <div style={errorStyle}>
        <h2>{err}</h2>
      </div>
    );
  } else if (success) {
    return (
      <div style={successStyle}>
        <h2>{success} </h2>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Notification;
