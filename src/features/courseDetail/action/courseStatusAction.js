import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';

const courseStatusOnSuccess = (response, exData) => {
    let data = response.data.data;
    store.dispatch(courseStatusSuccess(data));
    exData.callback(data)
};


const courseStatusOnFaild = (error, exData) => {
    store.dispatch(courseStatusError(error));
    exData.callback('error')
};


export const courseStatusPending = () => ({
    type: ActionTypes.GET_COURSE_STATUS_PENDING
});
export const courseStatusError = error => ({
    type: ActionTypes.GET_COURSE_STATUS_ERROR,
    error: error
});
export const courseStatusSuccess = value => ({
    type: ActionTypes.GET_COURSE_STATUS_SUCCESS,
    payload: value
});

export const courseStatusAction = (url, callback) => {
    return dispatch => {

        dispatch(courseStatusPending());
        callback('pending') 

        apiRequest(
            "get",
            url,
            false,
            courseStatusOnSuccess,
            courseStatusOnFaild,
            courseStatusAction(url, callback),
            true,
            { callback }
        );
    };
};