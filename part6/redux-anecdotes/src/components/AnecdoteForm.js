import React from "react";
import { connect } from "react-redux";
import { createNote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/messageReducer";

const AnecdoteForm = (props) => {
  const newNote = async (e) => {
    e.preventDefault();
    const content = e.target.quote.value;
    e.target.quote.value = "";
    props.createNote({ content, votes: 0 });
    props.notify(`Added '${content}'`, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newNote}>
        <div>
          <input name="quote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
const mapDispatchToProps = {
  createNote,
  notify,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
