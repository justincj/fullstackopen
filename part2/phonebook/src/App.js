import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonServices from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    PersonServices.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleUpdate = (id, personObject) => {
    PersonServices.update(id, personObject)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : personObject))
        );
      })
      .catch((error) => {
        setErrorMessage(
          `Information ${personObject.name} is already deleted from server`
        );
        setPersons(persons.filter((person) => person.id !== id));
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleSearch = (event) => setSearch(event.target.value);

  const handleSubmission = (person) => {
    for (let member of persons) {
      if (member.name.toLowerCase() === person.name.toLowerCase()) {
      }
    }
    PersonServices.create(person).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setSuccessMessage(`Added ${person.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
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
      {successMessage ? (
        <Notification message={successMessage} type="success" />
      ) : (
        <Notification message={errorMessage} type="error" />
      )}

      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        onSubmit={handleSubmission}
        handleUpdate={handleUpdate}
      />
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
