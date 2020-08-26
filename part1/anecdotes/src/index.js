import React, { useState } from "react";
import ReactDOM from "react-dom";

const Buttons = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const MostVoted = ({ votes, anecdotes }) => {
  const max = Math.max(...votes);
  const index = votes.findIndex((val) => val === max);
  return (
	  <div>
	  <p>{anecdotes[index]}</p>
	  <p>has {max} votes </p>
	</div>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)); // initial array of zero filled elements

  const selectRandom = () => {
    const random = Math.floor(Math.random() * (anecdotes.length - 1));
    setSelected(random);
  };

  const upVote = () => {
    const arr = [...votes];
    arr[selected] += 1;
    setVotes(arr);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} votes</p>
      <Buttons onClick={upVote} text="vote" />
      <Buttons onClick={selectRandom} text="next anecdote" />
      <h1>Anecdotes with most votes</h1>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById("root")
);
