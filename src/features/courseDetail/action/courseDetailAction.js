import { store } from '../../../store/store'
import { courseChapters, courseDownloads } from '../../../utils/api/Url'
import * as ActionTypes from './ActionTypes'
import { apiRequest } from '../../../utils/api/apiService';
import { getCourseChapters, refreshCourseStatus } from './chaptersAction';
import { getCourseDownloads } from './courseDownloadsAction';
import { changeAppHeaderColor } from '../../../store/globalActions';
import { refreshMyCourses } from '../../myCourses/actions/myCoursesAction';
export const changeActiveTab = (value,id) => ({
    type: ActionTypes.CHANGE_ACTIVE_TAB,
    payload: value,
    id: id,
});

export const changeBuyStatus = (status) => ({
    type: ActionTypes.CHANGE_BUY_STATUS,
    payload: status,
});
export const getCourseDetailPending = () => ({
    type: ActionTypes.GET_COURSE_DETAIL_PENDING
});
export const getCourseDetailError = (error) => ({
    type: ActionTypes.GET_COURSE_DETAIL_ERROR,
    error: error
});
export const getCourseDetailSuccess = (data) => ({
    type: ActionTypes.GET_COURSE_DETAIL_SUCCESS,
    payload: data
});
const getCourseDetailOnSuccess = async (response, exData) => {
    let data = response.data.data, state, color;
    color = data ? data.image[0].color : null;
    //console.log('getCourseDetailOnSuccess', color)
    exData.func(data)
    store.dispatch(getCourseDetailSuccess(response.data))
    store.dispatch(changeAppHeaderColor(color))

    let url = 'http://pms-api.myfreenet.ir/api/v1/' + courseChapters + exData.courseId + '/chapters';
    //here 
    let downloadUrl = courseDownloads + exData.courseId + '/attachments';
    await store.dispatch(getCourseChapters(url, exData.chaptersFunc))
    //call attachment
    store.dispatch(getCourseDownloads(downloadUrl, exData.downloadListFunc))
};
const getCourseDetailOnFailed = (error) => {
    store.dispatch(getCourseDetailError('error'))
};
export const getCourseDetail = (method, url, courseId, func, chaptersFunc, downloadListFunc) => (dispatch) => {
    dispatch(getCourseDetailPending());
    apiRequest(
        method,
        url,
        // url,
        false,
        getCourseDetailOnSuccess,
        getCourseDetailOnFailed,
        getCourseDetail(method, url, func),
        true,
        { func, courseId, chaptersFunc, downloadListFunc }
    )
};
export const getCourseDetailContentRowsPending = () => ({
    type: ActionTypes.GET_COURSE_DETAIL_CONTENT_ROWS_PENDING
});
export const getCourseDetailContentRowsError = (error) => ({
    type: ActionTypes.GET_COURSE_DETAIL_CONTENT_ROWS_ERROR,
    error: error
});
export const getCourseDetailContentRowsSuccess = (data) => ({
    type: ActionTypes.GET_COURSE_DETAIL_CONTENT_ROWS_SUCCESS,
    payload: data
});
const getCourseDetailContentRowsOnSuccess = (response, exData) => {
    let data = response.data.data;
    exData.func(data)
    store.dispatch(getCourseDetailContentRowsSuccess(response.data))
};
const getCourseDetailContentRowsOnFailed = (error) => {
    store.dispatch(getCourseDetailContentRowsError('error'))
};
export const getCourseDetailContentRows = (method, url, func) => (dispatch) => {
    dispatch(getCourseDetailContentRowsPending());
    apiRequest(
        method,
        url,
        false,
        getCourseDetailContentRowsOnSuccess,
        getCourseDetailContentRowsOnFailed,
        getCourseDetailContentRows(method, url, func),
        false,
        { func }
    )
};
//send exam result
export const sendExamResultPending = () => ({
    type: ActionTypes.SEND_EXAM_RESULT_PENDING
});
export const sendExamResultError = error => ({
    type: ActionTypes.SEND_EXAM_RESULT_ERROR,
    error: error
});
export const sendExamResultSuccess = value => ({
    type: ActionTypes.SEND_EXAM_RESULT_SUCCESS,
    payload: value
});
const sendExamResultOnSuccess = (response, exData) => {
    let data = response.data.data;
    store.dispatch(refreshCourseStatus(true));
    if (data ? data.update : null) {
        store.dispatch(refreshMyCourses(true));
    }
    store.dispatch(sendExamResultSuccess(), null);

    exData.callback(
        JSON.stringify({ status: "result", data: { success: true } }),
        null
    );
};
const sendExamResultOnFailed = (error, exData) => {
    store.dispatch(sendExamResultError(error));
    exData.callback(
        JSON.stringify({ status: "result", data: { success: false } }),
        null);
};
export const sendExamResult = (id, callback, data) => {
    let url = `/courses/${id}/exam`;
    return dispatch => {
        const formData = new FormData();
        formData.append('data', data);
        dispatch(sendExamResultPending());
        apiRequest(
            "post",
            url,
            formData,
            sendExamResultOnSuccess,
            sendExamResultOnFailed,
            sendExamResult(id, callback, data),
            true,
            { callback }
        );
    }
};
//add to library
export const addToLibraryPending = () => ({
    type: ActionTypes.ADD_To_LIBRARY_PENDING
});
export const addToLibraryError = error => ({
    type: ActionTypes.ADD_To_LIBRARY_ERROR,
    error: error
});
export const addToLibrarySuccess = value => ({
    type: ActionTypes.ADD_To_LIBRARY_SUCCESS,
    payload: value
});
const addToLibraryOnSuccess = (response, exData) => {
    //console.log('addToLibraryOnSuccess',response)
    store.dispatch(addToLibrarySuccess('succes'));
    // exData.callback('success');
    exData.callback();
    //here
};
const addToLibraryOnFailed = (error, exData) => {
    store.dispatch(addToLibraryError('error'));

    // exData.callback();

};
export const addToLibrary = (url, id, mehtod, callback) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('course_id', id);
        dispatch(addToLibraryPending());
        // callback()
        apiRequest(
            //need to change with mehtod
            'post',
            // mehtod=='POST'?'post':'post',
            url,
            formData,
            addToLibraryOnSuccess,
            addToLibraryOnFailed,
            addToLibrary(url, id, mehtod, callback),
            true,
            { callback }
        );

    }
};