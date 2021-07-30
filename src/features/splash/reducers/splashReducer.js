import * as ActionTypes from "../actions/ActionTypes";
const splashReducer = (
  state = {
    text: "this text is for splash screen",
    two: 234234,
    networkError: false,
    error: "",
    loading: true,
    success: null,
    updateFcmTokenLoading: false,
    updateFcmTokenSuccess: null,
    updateFcmTokenError: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SPLASH_NETWORK_ERROR:
      return { ...state, networkError: action.payload };
    case ActionTypes.SPLASH_LOADING_PENDING:
      return { ...state, loading: true, error: "", success: null };
    case ActionTypes.SPLASH_LOADING_ERROR:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.SPLASH_LOADING_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    //update fcm token
    case ActionTypes.UPDATE_FBTOKEN_PENDING:
      return { ...state, updateFcmTokenLoading: true };
    case ActionTypes.UPDATE_FBTOKEN_ERROR:
      return { ...state, updateFcmTokenLoading: false, updateFcmTokenError: action.error };
    case ActionTypes.UPDATE_FBTOKEN_SUCCESS:
      return { ...state, updateFcmTokenLoading: false, updateFcmTokenSuccess: 'succes' };
    default:
      return state;
  }
};
export default splashReducer;
