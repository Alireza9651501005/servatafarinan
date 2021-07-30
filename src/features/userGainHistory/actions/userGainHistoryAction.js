import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';

export const getUserHistoryGainPending = () => ({
    type: ActionTypes.GET_USER_GAIN_HISTORY_PENDING
});
export const getUserHistoryGainError = (error) => ({
    type: ActionTypes.GET_USER_GAIN_HISTORY_ERROR,
    error: error
});
export const getUserHistoryGainSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_USER_GAIN_HISTORY_SUCCESS,
    payload: data,
    mergeData: mergeData
});

const getUserHistoryGainOnSuccess = (response, exData) => {
    let data = response.data.data;
    let preData = exData.preData
    let mergeData = preData.concat(data.content_rows)
    //console.log('ex data', exData)
    store.dispatch(changeMyGainsPageNum(exData.pageNum + 1))
    store.dispatch(getUserHistoryGainSuccess(data, mergeData))
}

const getUserHistoryGainOnFailed = (error) => {
    store.dispatch(getUserHistoryGainError("error"))
}

export const getUserHistoryGain = (method, url, page, prevData) => (dispatch, getState) => {
    let state = getState()
    let pageNum = state.userGainHistoryReducer.pageNum
    let prevData = state.userGainHistoryReducer.listData
    let preData = []
    if (page == 1) {
        dispatch(changeMyGainsPageNum(1))
        pageNum = 1
        preData = [];
        dispatch(getUserHistoryGainPending());
    } else {
        preData = prevData
        dispatch(myGainsLoading(true))
    }

    apiRequest(
        method,
        url + '?page=' + pageNum,
        false,
        getUserHistoryGainOnSuccess,
        getUserHistoryGainOnFailed,
        getUserHistoryGain(method, url, pageNum, prevData),
        true,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeMyGainsPageNum = (value) => ({
    type: ActionTypes.CHANGE_MYGAINS_PAGENUM,
    payload: value
})

export const myGainsLoading = (value) => ({
    type: ActionTypes.MYGAIN_LOADING,
    payload: value
})
export const showPageGuide = (value) => ({
    type: ActionTypes.SHOW_PAGEGUIDE,
    payload: value
})