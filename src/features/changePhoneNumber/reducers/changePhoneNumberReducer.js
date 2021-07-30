import * as ActionTypes from "../actions/ActionTypes";
const changePhoneNumberReducer = (
  state = {
    loading: false,
    changePhoneNumberLevel: 0,
    timeout: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PHONENUMBER_LEVEL:
      return { ...state, changePhoneNumberLevel: action.payload };

    case ActionTypes.GET_VERIFY_CODE_PENDING:
      return { ...state, loading: true };
    case ActionTypes.GET_VERIFY_CODE_ERROR:
      return { ...state, loading: false };
    case ActionTypes.GET_VERIFY_CODE_SUCCESS:
      return { ...state, loading: false, timeout: action.payload };

    case ActionTypes.CHANGE_PHONENUMBER_PENDING:
      return { ...state, loading: true };
    case ActionTypes.CHANGE_PHONENUMBER_ERROR:
      return { ...state, loading: false };
    case ActionTypes.CHANGE_PHONENUMBER_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default changePhoneNumberReducer;