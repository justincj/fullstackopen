const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH":
      return action.data.query;
    default:
      return state;
  }
};

export const search = (query) => {
  return {
    type: "SEARCH",
    data: {
      query,
    },
  };
};

export default filterReducer;
