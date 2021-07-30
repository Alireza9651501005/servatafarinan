import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';

export const myCoursesActiveTab = (value) => ({
    type: ActionTypes.MY_COURSES_ACTIVE_TAB,
    payload: value
})

export const refreshMyCourses = (value) => ({
    type: ActionTypes.REFRESH_MYCOURSES,
    payload: value
})


//get my courses list


export const getMyCoursesPending = () => ({
    type: ActionTypes.GET_MYCOURSES_PENDING
})

export const getMyCoursesError = (error) => ({
    type: ActionTypes.GET_MYCOURSES_ERROR,
    error: error
})

export const getMyCoursesSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_MYCOURSES_SUCCESS,
    payload: data,
    mergeData: mergeData
})

const getMyCoursesOnSuccess = (response, exData) => {
    let data = response.data.data
    let preData = exData.preData
    let mergeData = preData.concat(data.courses)
    //console.log('ex data', exData)
    store.dispatch(changeMyCoursesPageNum(exData.pageNum + 1))
    store.dispatch(getMyCoursesSuccess(data, mergeData))
}

const getMyCoursesOnFailed = (error) => {
    store.dispatch(getMyCoursesError(error))
}

export const getMyCourses = (method, url, page, prevData,sortType) => (dispatch,getState) => {
    let state= getState()
    let pageNum = state.myCoursesReducer.pageNum
    let prevData = state.myCoursesReducer.listData
    let preData = []
    let pageNumber = 1
    if (page == 1) {
        dispatch(changeMyCoursesPageNum(1))
        pageNumber=1
        preData = [];
        dispatch(getMyCoursesPending());
    } else {
        preData = prevData
        pageNumber = pageNum
        dispatch(myCoursesLoading(true))
    }


    apiRequest(
        method,
        url +'?page='+pageNumber+sortType,
        false,
        getMyCoursesOnSuccess,
        getMyCoursesOnFailed,
        getMyCourses(method, url, page, prevData,sortType),
        true,
        { pageNum: pageNumber, preData, preData }
    )
}

export const changeMyCoursesPageNum = (value) => ({
    type: ActionTypes.CHANGE_MYCOURSES_PAGENUM,
    payload: value
})

export const myCoursesLoading = (value) => ({
    type: ActionTypes.MYCOURSES_LOADING,
    payload: value
})
