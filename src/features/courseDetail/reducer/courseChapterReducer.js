import * as ActionTypes from "../action/ActionTypes";
const courseChapterReducer = (
  state = {
    error: "",
    loading: false,
    courseChapters: '',
  },
  action
) => {
  switch (action.type) {

    case ActionTypes.GET_COURSE_CHAPTERS_PENDING:
      return { ...state, loading: true };
    case ActionTypes.GET_COURSE_CHAPTERS_ERROR:
      return { ...state, loading: false };
    case ActionTypes.GET_COURSE_CHAPTERS_SUCCESS:
      return { ...state, loading: false, courseChapters: action.payload };

    default:
      return state;
  }
};
export default courseChapterReducer;
