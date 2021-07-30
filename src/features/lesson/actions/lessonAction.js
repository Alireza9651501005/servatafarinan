import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
import { getVideo, getVideoSuccess } from '../../video/actions/videoAction';

export const getLessonPending = () => ({
    type: ActionTypes.GET_LESSON_PENDING
})

export const getLessonError = (error) => ({
    type: ActionTypes.GET_LESSON_ERROR,
    error: error
})

export const getLessonSuccess = (value) => ({
    type: ActionTypes.GET_LESSON_SUCCESS,
    payload: value
})

const getLessonOnSuccess = (response, exData) => {
    let data = response.data.data, url, access, timeOut;
    url = data.video.url;
    timeOut = data.video.timeout;
    access = data.video.access;
    if (!url && access) {
        store.dispatch(getVideo(exData.url + '/video'))
    } else if (url) {
        store.dispatch(getVideoSuccess({ url: url, urlTimeOut: timeOut }))
    }
    store.dispatch(getLessonSuccess(data))
    exData.callback(data)
}
const getLessonOnFailed = (error,exData) => {
    store.dispatch(getLessonError(error))
    exData.callback('error')

}

export const getLesson = (url, callback,disableLoading) => (dispatch) => {
    // dispatch(getLessonPending())
    if(!disableLoading){
        callback('pending')
    }
    apiRequest(
        'get',
        url,
        false,
        getLessonOnSuccess,
        getLessonOnFailed,
        getLesson(url, callback),
        true,
        { callback, url }
    )
}

//like lesson

export const likeLessonPending = () => ({
    type: ActionTypes.LIKE_LESSON_PENDING
})

export const likeLessonError = (error) => ({
    type: ActionTypes.LIKE_LESSON_ERROR,
    error: error
})

export const likeLessonSuccess = (value) => ({
    type: ActionTypes.LIKE_LESSON_SUCCESS,
    payload: value
})

export const refreshPage = (value) => ({
    type: ActionTypes.REFRESH_PAGE,
    payload: value
})

const likeLessonOnSuccess = (response, exData) => {
    let data = response.data.data
    // store.dispatch(likeLessonSuccess(data))
    exData.callback(data)
}
const likeLessonOnFailed = (error,exData) => {
    // store.dispatch(likeLessonError(error))
    exData.callback('error')

}

export const likeLesson = (method,url,callback) => (dispatch) => {
    // dispatch(getLessonPending())
    callback('pending')
    apiRequest(
        method,
        url,
        false,
        likeLessonOnSuccess,
        likeLessonOnFailed,
        likeLesson(url, callback),
        true,
        { callback }
    )
}