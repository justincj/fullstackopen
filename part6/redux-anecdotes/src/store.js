import { createStore, combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer,
  query: filterReducer,
});

export const store = createStore(reducer, composeWithDevTools());
