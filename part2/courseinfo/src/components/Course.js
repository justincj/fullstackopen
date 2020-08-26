import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Total = ({ parts }) => {
  const sum = parts
    .map((part) => part.exercises)
    .reduce((acc, val) => acc + val, 0);
  return (
    <p>
      <b>Total of {sum} exercises </b>
    </p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

export default Course;
