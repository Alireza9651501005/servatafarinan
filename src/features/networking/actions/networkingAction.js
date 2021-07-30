import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';

export const getNetworkingPending = () => ({
    type: ActionTypes.GET_NETWORKING_PENDING
});
export const getNetworkingError = (error) => ({
    type: ActionTypes.GET_NETWORKING_ERROR,
    error: error
});
export const getNetworkingSuccess = (data) => ({
    type: ActionTypes.GET_NETWORKING_SUCCESS,
    payload: data,
});

const getNetworkingOnSuccess = (response, exData) => {
    let data = response.data.data;
    store.dispatch(getNetworkingSuccess(data))
}

const getNetworkingOnFailed = (error) => {
    store.dispatch(getNetworkingError("error"))
}

export const getNetworking = (method,url) => (dispatch, getState) => {

    apiRequest(
        method,
        url,
        false,
        getNetworkingOnSuccess,
        getNetworkingOnFailed,
        getNetworking(method, url),
        true
    )
}

export const showPageGuide = (value) => ({
    type: ActionTypes.SHOW_PAGEGUIDE,
    payload: value
})