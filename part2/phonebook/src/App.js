import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonServices from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    PersonServices.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleSearch = (event) => setSearch(event.target.value);

  const handleSubmission = (person) => {
    PersonServices.create(person).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
    });
  };

  const handleDelete = (id) => {
    const person = persons.filter((person) => person.id === id);
    if (window.confirm(`delete ${person[0].name}?`)) {
      PersonServices.remove(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

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
        <Persons
          key={person.name}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
