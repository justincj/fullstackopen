import quoteServices from "../services/quotes";
const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const quoteObject = state.find((quote) => quote.id === id);
      const changedQuote = { ...quoteObject, votes: quoteObject.votes + 1 };
      return state.map((quote) => (quote.id !== id ? quote : changedQuote));
    }
    case "NEW_QUOTE":
      return [...state, action.data];
    case "INIT_QUOTES":
      return action.data;
    default:
      return state;
  }
};

export const createNote = (quote) => {
  return {
    type: "NEW_QUOTE",
    data: quote,
  };
};
export const vote = (id) => {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
};

export const initializeQuotes = (quotes) => {
  return async (dispatch) => {
    const quotes = await quoteServices.getAll();
    dispatch({
      type: "INIT_QUOTES",
      data: quotes,
    });
  };
};

export default reducer;
