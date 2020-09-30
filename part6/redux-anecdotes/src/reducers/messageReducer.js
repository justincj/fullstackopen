const messageReducer = (state = "", action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFY",
      data: {
        message,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR",
      });
    }, time);
  };
};

export default messageReducer;
