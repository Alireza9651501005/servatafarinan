import * as ActionTypes from "../action/ActionTypes";
const courseDownloadReducer = (
  state = {
    error: "",
    loading: false,
    downloadList: '',
    downloadLoading: false,
    downloadingIndex: false,
    downloadProgress: 0,
    downloadsState: {}
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.GET_COURSE_DOWNLOADS_PENDING:
      return { ...state, loading: true };
    case ActionTypes.GET_COURSE_DOWNLOADS_ERROR:
      return { ...state, loading: false };
    case ActionTypes.GET_COURSE_DOWNLOADS_SUCCESS:
      return { ...state, loading: false, downloadList: action.payload };

    case ActionTypes.DOWNLOAD_FILE_PENDING:
      return { ...state, downloadLoading: true };
    case ActionTypes.DOWNLOAD_FILE_ERROR:
      return { ...state, downloadLoading: false, error: action.error };
    case ActionTypes.DOWNLOAD_FILE_SUCCESS:
      return { ...state, downloadLoading: false };

    case action.fileName + '-' + ActionTypes.CHANGE_DOWNLOAD_PROGRESS:
      let name = action.fileName
      let dow = state.downloadsState
      dow[name] = { ...dow[name], progress: action.payload }
      //console.log('download state ----', dow)
      return { ...state, downloadsState: dow, downloadProgress: action.payload };

    case ActionTypes.CREATE_DOWNLOAD_STATE:
      return { ...state, downloadsState: action.payload }

    case ActionTypes.CHANGE_DOWNLOAD_STATE:
      return { ...state, downloadsState: action.payload }

    default:
      return state;
  }
};
export default courseDownloadReducer;
