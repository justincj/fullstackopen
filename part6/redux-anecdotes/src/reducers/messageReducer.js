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

var st;
export const notify = (message, time) => {
  return async (dispatch) => {
    clearTimeout(st);
    dispatch({
      type: "NOTIFY",
      data: {
        message,
      },
    });
    st = setTimeout(() => {
      dispatch({
        type: "CLEAR",
      });
    }, time);
  };
};

export default messageReducer;
