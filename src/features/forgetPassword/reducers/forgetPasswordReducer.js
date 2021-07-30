import * as ActionTypes from "../actions/ActionTypes";
const forgetPasswordReducer = (
  state = {
    error: "",
    forgetPasswordloading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FORGET_PASSWORD_PENDING:
      return { ...state, forgetPasswordloading: true };
    case ActionTypes.FORGET_PASSWORD_ERROR:
      return { ...state, forgetPasswordloading: false };
    case ActionTypes.FORGET_PASSWORD_SUCCESS:
      return { ...state, forgetPasswordloading: false };
    default:
      return state;
  }
};
export default forgetPasswordReducer;