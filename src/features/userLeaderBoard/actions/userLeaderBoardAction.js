import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
export const getRankListPending = () => ({
    type: ActionTypes.GET_RANK_PENDING
});
export const getRankListError = (error) => ({
    type: ActionTypes.GET_RANK_ERROR,
    error: error
});
export const getRankListSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_RANK_SUCCESS,
    payload: data,
    mergeData: mergeData
});

const getRankListOnSuccess = (response, exData) => {
    let data = response.data.data;
    let preData = exData.preData
    let mergeData = preData.concat(data.users)
    //console.log('ex data', exData)
    store.dispatch(changeRankListPageNum(exData.pageNum + 1))
    store.dispatch(getRankListSuccess(data, mergeData))
}

const getRankListOnFailed = (error) => {
    store.dispatch(getRankListError("error"))
}

export const getRankList = (method, url, page, prevData) => (dispatch, getState) => {
    let state = getState()
    let pageNum = state.userLeaderBoardReducer.pageNum
    let prevData = state.userLeaderBoardReducer.listData
    let preData = []
    if (page == 1) {
        dispatch(changeRankListPageNum(1))
        pageNum = 1
        preData = [];
        dispatch(getRankListPending());
    } else {
        preData = prevData
        dispatch(rankListLoading(true))
    }

    apiRequest(
        method,
        url + '?page=' + pageNum,
        false,
        getRankListOnSuccess,
        getRankListOnFailed,
        getRankList(method, url, pageNum, prevData),
        true,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeRankListPageNum = (value) => ({
    type: ActionTypes.CHANGE_RANK_PAGENUM,
    payload: value
})

export const rankListLoading = (value) => ({
    type: ActionTypes.RANK_LOADING,
    payload: value
})
export const changeRankType = (value,tabMode) => ({
    type: ActionTypes.CHANGE_RANK_TYPE,
    payload: value,
    tabMode: tabMode,
})