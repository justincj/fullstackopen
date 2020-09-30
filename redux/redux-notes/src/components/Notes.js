import React from "react";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { connect } from "react-redux";

const Note = ({ note, clickHandler }) => {
  return (
    <li onClick={clickHandler}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = (props) => {
  return (
    <div>
      <ul>
        {props.notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            clickHandler={() => props.toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {
      notes: state.notes,
    };
  }
  return {
    notes:
      state.filter === "IMPORTANT"
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);
export default ConnectedNotes;
