import * as ActionTypes from "../actions/ActionTypes";
const lessonReducer = (
  state = {
    error: "",
    loading: false,
    lesson: '',
    likeLoading: false,
    refreshPage: null
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.GET_LESSON_PENDING:
      return { ...state, loading: true };
    case ActionTypes.GET_LESSON_ERROR:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.GET_LESSON_SUCCESS:
      return { ...state, loading: false, lesson: action.payload };

    case ActionTypes.LIKE_LESSON_PENDING:
      return { ...state };
    case ActionTypes.LIKE_LESSON_ERROR:
      return { ...state };
    case ActionTypes.LIKE_LESSON_SUCCESS:
      return { ...state };

    case ActionTypes.REFRESH_PAGE:
      return { ...state, refreshPage: action.payload };

    default:
      return state;
  }
};
export default lessonReducer;
