import * as ActionTypes from "../action/ActionTypes";
const courseStatusReducer = (
    state = {
        error: "",
        loading: true,
        statusData: '',
        refreshCourseStatus: false,
    },
    action
) => {
    switch (action.type) {

        case ActionTypes.GET_COURSE_STATUS_PENDING:
            return { ...state, loading: true };
        case ActionTypes.GET_COURSE_STATUS_ERROR:
            return { ...state, loading: false, error: action.error };
        case ActionTypes.GET_COURSE_STATUS_SUCCESS:
            return { ...state, loading: false, statusData: action.payload, refreshCourseStatus: false };
        //refresh course status
        case ActionTypes.REFRESH_COURSE_STATUS:
            return { ...state, refreshCourseStatus: action.payload };

        default:
            return state;
    }
};
export default courseStatusReducer;
