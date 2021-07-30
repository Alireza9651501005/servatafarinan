import * as ActionTypes from '../actions/ActionTypes';

const publicCoursesReducer = (state = {
    loading: false,
    publicCoursesData: [],
    error: '',
    loading: false,
    // publicCoursesData: '',
    pageNum: 1,
    listLoading: false,
    listData: []
}, action) => {
    switch (action.type) {

        case ActionTypes.GET_PUBLIC_COURSES_PENDING:
            return { ...state, loading: true ,error:false }

        case ActionTypes.GET_PUBLIC_COURSES_ERROR:
            return { ...state, loading: false, error: action.error, listLoading: false }

        case ActionTypes.GET_PUBLIC_COURSES_SUCCESS:
            return { ...state, loading: false, publicCoursesData: action.payload, listData: action.mergeData, listLoading: false }

        case ActionTypes.CHANGE_PUBLIC_COURSES_PAGENUM:
            return { ...state, pageNum: action.payload }

        case ActionTypes.PUBLIC_COURSES_LOADING:
            return { ...state, listLoading: action.payload }
        default: return { ...state }
    }
}

export default publicCoursesReducer;