import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ query, anecdotes }) => {
    console.log(query, anecdotes);
    if (!query) {
      return anecdotes;
    } else {
      return anecdotes.filter((anecs) => anecs.content.includes(query));
    }
  });
  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 }));
    dispatch(notify(`you votes '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(notify(""));
    }, 5000);
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

export default AnecdoteList;
