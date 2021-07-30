import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';


//get my courses list


export const getPublicCoursesPending = () => ({
    type: ActionTypes.GET_PUBLIC_COURSES_PENDING
})

export const getPublicCoursesError = (error) => ({
    type: ActionTypes.GET_PUBLIC_COURSES_ERROR,
    error: error
})

export const getPublicCoursesSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_PUBLIC_COURSES_SUCCESS,
    payload: data,
    mergeData: mergeData
})

const getPublicCoursesOnSuccess = (response, exData) => {
    let data = response.data.data
    let preData = exData.preData
    let mergeData = preData.concat(data.courses)
    //console.log('ex data', exData)
    store.dispatch(changePublicCoursesPageNum(exData.pageNum + 1))
    store.dispatch(getPublicCoursesSuccess(data, mergeData))
}

const getPublicCoursesOnFailed = (error) => {
    store.dispatch(getPublicCoursesError(error))
}

export const getPublicCourses = (method, url, page, prevData,sortType) => (dispatch,getState) => {
    let state= getState()
    let pageNum = state.publicCoursesReducer.pageNum
    let prevData = state.publicCoursesReducer.listData
    let preData = []
    if (page == 1) {
        dispatch(changePublicCoursesPageNum(1))
        pageNum=1
        preData = [];
        dispatch(getPublicCoursesPending());
    } else {
        preData = prevData
        dispatch(publicCoursesLoading(true))
    }


    apiRequest(
        method,
        url +'?page='+pageNum,
        false,
        getPublicCoursesOnSuccess,
        getPublicCoursesOnFailed,
        getPublicCourses(method, url, pageNum, prevData),
        true,
        { pageNum: pageNum, preData, preData }
    )
}

export const changePublicCoursesPageNum = (value) => ({
    type: ActionTypes.CHANGE_PUBLIC_COURSES_PAGENUM,
    payload: value
})

export const publicCoursesLoading = (value) => ({
    type: ActionTypes.PUBLIC_COURSES_LOADING,
    payload: value
})
