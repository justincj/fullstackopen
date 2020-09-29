const messageReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    default:
      return state;
  }
};

export const notify = (message) => {
  return {
    type: "NOTIFY",
    data: {
      message,
    },
  };
};

export default messageReducer;
