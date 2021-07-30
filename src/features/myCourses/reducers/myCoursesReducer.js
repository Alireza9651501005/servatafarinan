import * as ActionTypes from '../actions/ActionTypes';

const myCoursesReducer = (state = {
    loading: false,
    myCoursesData: [],
    error: '',
    activeTab: '0',
    loading: false,
    // myCoursesData: '',
    pageNum: 1,
    listLoading: false,
    listData: [],
    refreshMycourses: false
}, action) => {
    switch (action.type) {
        case ActionTypes.MY_COURSES_ACTIVE_TAB:
            return { ...state, activeTab: action.payload }

        case ActionTypes.GET_MYCOURSES_PENDING:
            return { ...state, loading: true, error: false }

        case ActionTypes.GET_MYCOURSES_ERROR:
            return { ...state, loading: false, error: action.error, listLoading: false }

        case ActionTypes.GET_MYCOURSES_SUCCESS:
            return { ...state, loading: false, myCoursesData: action.payload, listData: action.mergeData, listLoading: false, refreshMycourses: false }

        case ActionTypes.CHANGE_MYCOURSES_PAGENUM:
            return { ...state, pageNum: action.payload }

        case ActionTypes.MYCOURSES_LOADING:
            return { ...state, listLoading: action.payload }
        //refresh my courses
        case ActionTypes.REFRESH_MYCOURSES:
            return { ...state, refreshMycourses: action.payload };

        default: return { ...state }
    }
}

export default myCoursesReducer;