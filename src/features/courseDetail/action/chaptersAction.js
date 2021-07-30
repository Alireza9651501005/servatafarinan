import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';


export const getCourseChaptersPending = () => ({
    type: ActionTypes.GET_COURSE_CHAPTERS_PENDING
})

export const getCourseChaptersError = (error) => ({
    type: ActionTypes.GET_COURSE_CHAPTERS_ERROR,
    error: error
})

export const getCourseChaptersSuccess = (value) => ({
    type: ActionTypes.GET_COURSE_CHAPTERS_SUCCESS,
    payload: value
})

const getCourseChaptersOnSuccess = (response, exData) => {
    store.dispatch(getCourseChaptersSuccess(response.data.data))
    exData.callback(response.data.data)
}

const getCourseChaptersOnFailed = (error) => {
    store.dispatch(getCourseChaptersError(error))
}

export const getCourseChapters = (url, callback) => (dispatch) => {
    dispatch(getCourseChaptersPending())

    apiRequest(
        'get',
        url,
        false,
        getCourseChaptersOnSuccess,
        getCourseChaptersOnFailed,
        getCourseChapters(url, callback),
        true,
        { callback }
    )
}
//refresh course status
export const refreshCourseStatus = (value) => ({
    type: ActionTypes.REFRESH_COURSE_STATUS,
    payload: value
})