import { store } from '../../../store/store'
import { apiRequest } from '../../../utils/api/apiService'
import { baseUrlReal, getAwardsApi, home } from '../../../utils/api/Url'
import * as actionTypes from './ActionTypes'
export const getAwardsPending = () => ({
    type: actionTypes.GET_AWARDS_PENDING
})
export const getAwardsSuccess = ( data) => ({
    type: actionTypes.GET_AWARDS_SUCCESS,
    data: data
})
export const getAwardsError = () => ({
    type: actionTypes.GET_AWARDS_ERROR
})

const getAwardsOnSuccess = (response) => {
    let data = response.data.data, state;
    state = store.getState();   
    store.dispatch(getAwardsSuccess(data))
}

const getAwardsOnFailed = () => {
    store.dispatch(getAwardsError())
}

export const getAwardsRequest = () => (dispatch) => {
    let url = baseUrlReal + getAwardsApi;
    dispatch(getAwardsPending())
    apiRequest('get', url, false, getAwardsOnSuccess, getAwardsOnFailed, getAwardsRequest())
}
