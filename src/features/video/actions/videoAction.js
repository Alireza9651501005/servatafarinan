import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import { getLessonData } from '../../../utils/api/Url';
import { getLesson } from '../../lesson/actions/lessonAction';
import * as ActionTypes from './ActionTypes';


export const getVideoPending = () => ({
    type: ActionTypes.GET_VIDEO_PENDING
})

export const getVideoError = (error) => ({
    type: ActionTypes.GET_VIDEO_ERROR,
    error: error
})

export const getVideoSuccess = (value) => ({
    type: ActionTypes.GET_VIDEO_SUCCESS,
    payload: value
})

const getVideoOnSuccess = (response, exData) => {
    store.dispatch(getVideoSuccess(response.data.data))
}

const getVideoOnFailed = (error) => {
    store.dispatch(getVideoError(error))
}

export const getVideo = (url) => (dispatch) => {
    dispatch(getVideoPending())
    apiRequest(
        'get',
        url,
        false,
        getVideoOnSuccess,
        getVideoOnFailed,
        getVideo(url),
        true,
    )
}


export const saveVideoRecords = (value) => ({
    type: ActionTypes.SAVE_VIDEO_RECORD,
    payload: value
})


export const sendVideoRecordsPending = () => ({
    type: ActionTypes.SEND_VIDEO_RECORD_PENDING
})

export const sendVideoRecordsError = (error) => ({
    type: ActionTypes.SEND_VIDEO_RECORD_ERROR,
    error: error
})

export const sendVideoRecordsSuccess = () => ({
    type: ActionTypes.SEND_VIDEO_RECORD_SUCCESS
})

const sendVideoRecordsOnSuccess = (response, exData) => {
    let data = response.data.data;
    let lessonId = exData.lessonId
    let array = data.completed
    let apiHandleLesson = exData.apiHandleLesson
    store.dispatch(sendVideoRecordsSuccess(data))
    array.map((item) => {
        if (item.lesson_id == lessonId) {
            let url = getLessonData + lessonId
            store.dispatch(getLesson(url, apiHandleLesson,true))
            return;
        }
    })

}

const sendVideoRecordsOnFailed = (error) => {
    store.dispatch(sendVideoRecordsError(error))
}

export const sendVideoRecords = (url, records, lessonId, apiHandleLesson) => (dispatch) => {
    dispatch(sendVideoRecordsPending())
    const formData = new FormData()
    formData.append('records', JSON.stringify(records))
    apiRequest(
        'post',
        url,
        formData,
        sendVideoRecordsOnSuccess,
        sendVideoRecordsOnFailed,
        sendVideoRecords(url, records, lessonId, apiHandleLesson),
        true,
        { lessonId: lessonId, apiHandleLesson: apiHandleLesson }
    )
}

export const saveVideoProgress = (data) => ({
    type: ActionTypes.SAVE_VIDEO_PROGRESS,
    payload: data
})