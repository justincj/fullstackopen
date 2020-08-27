import React from "react";

const Persons = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}
    <button onClick={handleDelete}>delete</button>
  </p>
);

export default Persons;
