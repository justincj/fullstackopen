import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/messageReducer";

const AnecdoteForm = () => {
  const formStyle = {
    marginBottom: "10px",
  };
  const dispatch = useDispatch();
  const newNote = (e) => {
    e.preventDefault();
    const content = e.target.quote.value;
    e.target.quote.value = "";
    dispatch(createNote(content));
    dispatch(notify(content));
    setTimeout(() => {
      dispatch(notify(""));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form style={formStyle} onSubmit={newNote}>
        <div>
          <input name="quote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
