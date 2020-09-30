import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { initializeQuotes } from "./reducers/anecdoteReducer";
import quotService from "./services/quotes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    quotService.getAll().then((quotes) => dispatch(initializeQuotes(quotes)));
  }, [dispatch]);
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
