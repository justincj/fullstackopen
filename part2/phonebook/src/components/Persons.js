import React from "react";

const Persons = ({ person, deleteNote }) => (
  <p>
    {person.name} {person.number}
    <button onClick={deleteNote}>delete</button>
  </p>
);

export default Persons;
