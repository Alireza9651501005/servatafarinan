import * as ActionTypes from "../actions/ActionTypes";
const videoTimesReducer = (
  state = {
    error: "",
    videoRecords: [],
    lastProgress: {},
    sendLoading: false
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.SAVE_VIDEO_RECORD:
      return { ...state, videoRecords: action.payload };

    case ActionTypes.SEND_VIDEO_RECORD_PENDING:
      return { ...state, sendLoading: true };

    case ActionTypes.SEND_VIDEO_RECORD_ERROR:
      return { ...state, sendLoading: false, error: action.error };

    case ActionTypes.SEND_VIDEO_RECORD_SUCCESS:
      return { ...state, sendLoading: false, videoRecords: [] };

      case ActionTypes.SAVE_VIDEO_PROGRESS:
      return { ...state, lastProgress: action.payload };

    default:
      return state;
  }
};
export default videoTimesReducer;
