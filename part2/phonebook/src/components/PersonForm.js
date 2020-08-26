import React, { useState } from "react";

const PersonForm = ({ persons, onSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();
    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    const newperson = { name: newName, number: newNumber };
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
