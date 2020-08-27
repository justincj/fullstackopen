import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPersons(response.data);
    });
  }, []);

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
