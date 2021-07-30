import * as ActionTypes from "../actions/ActionTypes";
const videoReducer = (
  state = {
    error: "",
    loading: true,
    videoData: { url: '', urlTimeOut: 0 },
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.GET_VIDEO_PENDING:
      return { ...state, loading: true };
    case ActionTypes.GET_VIDEO_ERROR:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.GET_VIDEO_SUCCESS:
      return { ...state, loading: false, videoData: action.payload };

    default:
      return state;
  }
};
export default videoReducer;
