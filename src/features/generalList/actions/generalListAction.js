import * as ActionTypes from './ActionTypes';
import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';

export const getGeneralListPending = () => ({
    type: ActionTypes.GET_General_LIST_PENDING
})

export const getGeneralListError = (error) => ({
    type: ActionTypes.GET_General_LIST_ERROR,
    error: error
})

export const getGeneralListSuccess = (data,mergeData) => ({
    type: ActionTypes.GET_General_LIST_SUCCESS,
    payload: data,
    mergeData:mergeData
})

const getGeneralListOnSuccess = (response,exData) => {
    let data = response.data.data.content_rows;
    //console.log('getGeneralListOnSuccess',data)
    let preData = exData.preData
    let mergeData = preData.concat(data)
    // let mergeData = preData.concat(data.data)
    //console.log('ex data',exData)
    store.dispatch(changeGeneralListPageNum(exData.pageNum + 1))
    store.dispatch(getGeneralListSuccess(data,mergeData))
}

const getGeneralListOnFailed = (error) => {
    store.dispatch(getGeneralListSuccess(error))
}

export const getGeneralList = (method, url, pageNum, prevData) => (dispatch) => {

    let preData = []
    if (pageNum == 1) {
        preData = [];
        dispatch(getGeneralListPending());
    } else {
        preData = prevData
        dispatch(generalListLoading(true))
    }


    apiRequest(
        method,
        url,
        false,
        getGeneralListOnSuccess,
        getGeneralListOnFailed,
        getGeneralList(method, url),
        false,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeGeneralListPageNum = (value) => ({
    type: ActionTypes.CHANGE_GENERAL_LIST_PAGENUM,
    payload: value
})

export const generalListLoading = (value) => ({
    type: ActionTypes.GENERAL_LIST_LOADING,
    payload: value
})