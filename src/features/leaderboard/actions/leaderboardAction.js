import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';

export const getLeaderboardPending = () => ({
    type: ActionTypes.GET_LEADERBOARDS_PENDING
})

export const getLeaderboardError = (error) => ({
    type: ActionTypes.GET_LEADERBOARDS_ERROR,
    error: error
})

export const getLeaderboardSuccess = (data) => ({
    type: ActionTypes.GET_LEADERBOARDS_SUCCESS,
    payload: data
})

const getLeaderboardOnSuccess = (response, exData) => {
    store.dispatch(getLeaderboardSuccess(response.data.data))
}

const getLeaderboardOnFailed = (error, exData) => {
    store.dispatch(getLeaderboardError(error))
}

export const getLeaderboardData = (url) => (dispatch) => {
    dispatch(getLeaderboardPending())
    apiRequest(
        'get',
        url,
        null,
        getLeaderboardOnSuccess,
        getLeaderboardOnFailed,
        getLeaderboardData(url),
        true
    )
}