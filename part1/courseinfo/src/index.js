import React from "react";
import ReactDOM from "react-dom";

const Part = ({ part, exercise }) => (
  <p>
    {part} {exercise}
  </p>
);
const Header = ({ course }) => <h1>{course}</h1>;
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part.name} exercise={part.exercises} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const total = parts
    .map((part) => part.exercises)
    .reduce((acc, val) => acc + val, 0);
  return <p>Number of exercises is {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
