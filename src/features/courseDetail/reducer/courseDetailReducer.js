import * as ActionTypes from "../action/ActionTypes";
const courseDetailReducer = (
  state = {
    BuyStatus: "",
    error: "",
    loading: false,
    contentRowsLoading: false,
    sendExamResultPending: false,
    addToLibraryLoading: false,
    contentRowsData: [],
    courseDetail: [],
    activeTab: 2,
    id: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_BUY_STATUS:
      return { ...state, BuyStatus: action.payload };

    case ActionTypes.GET_COURSE_DETAIL_PENDING:
      return { ...state, loading: true };
    case ActionTypes.GET_COURSE_DETAIL_SUCCESS:
      return { ...state, loading: false, courseDetail: action.payload, error: null };
    case ActionTypes.GET_COURSE_DETAIL_ERROR:
      return { ...state, loading: false, error: action.error };

    case ActionTypes.GET_COURSE_DETAIL_CONTENT_ROWS_PENDING:
      return { ...state, contentRowsLoading: true };
    case ActionTypes.GET_COURSE_DETAIL_CONTENT_ROWS_SUCCESS:
      return { ...state, contentRowsLoading: false, contentRowsData: action.payload };
    case ActionTypes.GET_COURSE_DETAIL_CONTENT_ROWS_ERROR:
      return { ...state, contentRowsLoading: false };

    case ActionTypes.SEND_EXAM_RESULT_PENDING:
      return { ...state, sendExamResultPending: true };
    case ActionTypes.SEND_EXAM_RESULT_SUCCESS:
      return { ...state, sendExamResultPending: false, };
    case ActionTypes.SEND_EXAM_RESULT_ERROR:
      return { ...state, sendExamResultPending: false };
    //add to library
    case ActionTypes.ADD_To_LIBRARY_PENDING:
      return { ...state, addToLibraryLoading: true };
    case ActionTypes.ADD_To_LIBRARY_SUCCESS:
      return { ...state, addToLibraryLoading: false };
    case ActionTypes.ADD_To_LIBRARY_ERROR:
      return { ...state, addToLibraryLoading: false };
    //change active tab
    case ActionTypes.CHANGE_ACTIVE_TAB:
      return { ...state, activeTab: action.payload, id: action.id };

    default:
      return state;
  }
};
export default courseDetailReducer;
