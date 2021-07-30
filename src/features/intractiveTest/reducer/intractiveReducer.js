import * as ActionTypes from "../action/ActionTypes";
const intractiveReducer = (
  state = {
    error: "",
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SEND_INTERACTIVE_RESULT_PENDING:
      return { ...state, loading: true };
    case ActionTypes.SEND_INTERACTIVE_RESULT_SUCCESS:
      return { ...state, loading: false};
    case ActionTypes.SEND_INTERACTIVE_RESULT_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default intractiveReducer;
