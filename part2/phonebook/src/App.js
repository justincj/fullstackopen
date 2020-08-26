import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => setSearch(event.target.value);

  const handleSubmission = (person) => setPersons([...persons, person]);

  const personsToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} onSubmit={handleSubmission} />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Persons key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
