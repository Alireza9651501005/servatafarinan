import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import { getCreditApi } from '../../../utils/api/Url';
import * as ActionTypes from './ActionTypes';


export const getTransactionsPending = () => ({
    type: ActionTypes.GET_TRANSACTIONS_PENDING
});
export const getTransactionsError = (error) => ({
    type: ActionTypes.GET_TRANSACTIONS_ERROR,
    error: error
});
export const getTransactionsSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_TRANSACTIONS_SUCCESS,
    payload: data,
    mergeData: mergeData
});

const getTransactionsOnSuccess = (response, exData) => {
    let state = store.getState(), hasCrediGift;
    hasCrediGift = state.home.data.user ? state.home.data.user.info.has_credit_gift = false : false
    let data = response.data.data;
    let preData = exData.preData
    let mergeData = preData.concat(data.payment_logs)
    //console.log('ex data', exData)
    store.dispatch(changeTransactionsPageNum(exData.pageNum + 1))
    store.dispatch(getTransactionsSuccess(data, mergeData))
}

const getTransactionsOnFailed = (error) => {
    store.dispatch(getTransactionsError("error"))
}

export const getTransactions = (method, url, page) => (dispatch, getState) => {
    let state = getState()
    let pageNum = state.creditReducer.pageNum
    let prevData = state.creditReducer.listData
    let preData = []


    if (page == 1) {
        dispatch(changeTransactionsPageNum(1))
        pageNum = 1
        preData = [];
        dispatch(getTransactionsPending());
    } else {
        preData = prevData
        dispatch(transactionsLoading(true))
    }

    apiRequest(
        method,
        url + '?page=' + pageNum,
        false,
        getTransactionsOnSuccess,
        getTransactionsOnFailed,
        getTransactions(method, url, pageNum, prevData),
        true,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeTransactionsPageNum = (value) => ({
    type: ActionTypes.CHANGE_TRANSACTIONS_PAGENUM,
    payload: value
})

export const transactionsLoading = (value) => ({
    type: ActionTypes.TRANSACTIONS_LOADING,
    payload: value
})


//get credit data

export const getCreditPending = () => ({
    type: ActionTypes.GET_CREDIT_PENDING
})

export const getCreditError = (error) => ({
    type: ActionTypes.GET_CREDIT_ERROR,
    error: error
})

export const getCreditSuccess = (data) => ({
    type: ActionTypes.GET_CREDIT_SUCCESS,
    payload: data
})


const getCreditOnSuccess = (response, exData) => {
    store.dispatch(getCreditSuccess(response.data.data))
}

const getCreditOnFailed = (error) => {
    store.dispatch(getCreditError(error))
}

export const getCredit = () => (dispatch) => {
    dispatch(getCreditPending())

    apiRequest(
        'get',
        getCreditApi,
        false,
        getCreditOnSuccess,
        getCreditOnFailed,
        getCredit(),
        true
    )
}