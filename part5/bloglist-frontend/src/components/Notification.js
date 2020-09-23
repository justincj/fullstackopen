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
    return <div style={errorStyle}>{err}</div>;
  } else if (success) {
    return <div style={successStyle}>{success}</div>;
  } else {
    return <></>;
  }
};

export default Notification;
