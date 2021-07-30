import * as ActionTypes from "../actions/ActionTypes";
const changePasswordReducer = (
  state = {
    error: "",
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_PENDING:
      return { ...state, loading: true };
    case ActionTypes.CHANGE_PASSWORD_ERROR:
      return { ...state, loading: false };
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default changePasswordReducer;