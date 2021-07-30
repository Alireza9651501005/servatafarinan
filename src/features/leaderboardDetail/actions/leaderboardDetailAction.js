import * as ActionTypes from './ActionTypes';
import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';

export const getLeaderboardListPending = () => ({
    type: ActionTypes.GET_LEADERBOARD_LIST_PENDING
})

export const getLeaderboardListError = (error) => ({
    type: ActionTypes.GET_LEADERBOARD_LIST_ERROR,
    error: error
})

export const getLeaderboardListSuccess = (data,mergeData) => ({
    type: ActionTypes.GET_LEADERBOARD_LIST_SUCCESS,
    payload: data,
    mergeData:mergeData
})

const getLeaderboardListOnSuccess = (response,exData) => {
    let data = response.data.data
    let preData = exData.preData
    let mergeData = preData.concat(data.data)
    //console.log('ex data',exData)
    store.dispatch(changeLeaderboardListPageNum(exData.pageNum + 1))
    store.dispatch(getLeaderboardListSuccess(data,mergeData))
}

const getLeaderboardListOnFailed = (error) => {
    store.dispatch(getLeaderboardListSuccess(error))
}

export const getLeaderboardList = ( url, pageNum, prevData) => (dispatch) => {

    let preData = []
    if (pageNum == 1) {
        preData = [];
        dispatch(getLeaderboardListPending());
    } else {
        preData = prevData
        dispatch(leaderboardListLoading(true))
    }


    apiRequest(
        'get',
        url,
        false,
        getLeaderboardListOnSuccess,
        getLeaderboardListOnFailed,
        getLeaderboardList(url, pageNum, prevData),
        false,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeLeaderboardListPageNum = (value) => ({
    type: ActionTypes.CHANGE_LEADERBOARD_LIST_PAGENUM,
    payload: value
})

export const leaderboardListLoading = (value) => ({
    type: ActionTypes.LEADERBOARDL_LIST_LOADING,
    payload: value
})