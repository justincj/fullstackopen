import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/messageReducer";

const AnecdoteList = (props) => {
  let anecdotes;
  if (!props.query) {
    anecdotes = props.anecdotes;
  } else {
    anecdotes = props.anecdotes.filter((anecs) =>
      anecs.content.includes(props.query)
    );
  }

  const voteHandler = (anecdote) => {
    props.vote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 });
    props.notify(`you voted '${anecdote.content}'`, 5000);
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapsStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    message: state.message,
    query: state.query,
  };
};

const mapDispatchToProps = {
  vote,
  notify,
};

export default connect(mapsStateToProps, mapDispatchToProps)(AnecdoteList);
