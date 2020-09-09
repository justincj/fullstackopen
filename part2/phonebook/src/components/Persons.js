import React from "react";

const Persons = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.numberid}
    <button onClick={handleDelete}>delete</button>
  </p>
);

export default Persons;
