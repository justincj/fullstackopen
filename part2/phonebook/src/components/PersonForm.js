import React, { useState } from "react";

const PersonForm = ({ persons, onSubmit, handleUpdate }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();
    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with new one`
          )
        ) {
          handleUpdate(person.id, { ...person, numberid: newNumber });
          setNewName("");
          setNewNumber("");
          return;
        }
        onSubmit(person);
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    const newperson = { name: newName, numberid: newNumber };
    await onSubmit(newperson);
    setNewName("");
    setNewNumber("");
  };
  return (
    <form onSubmit={handleSubmission}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
