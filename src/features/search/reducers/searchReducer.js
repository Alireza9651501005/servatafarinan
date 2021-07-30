import * as ActionTypes from "../actions/ActionTypes";
const searchReducer = (
  state = {
    error: "",
    loading: true,
    data: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SEARTCH_TERM_PENDING:
      return { ...state, loading: true };
    case ActionTypes.SEARTCH_TERM_ERROR:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.SEARTCH_TERM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
};
export default searchReducer;
