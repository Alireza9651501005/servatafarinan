import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
import { userFullMessagesWb } from '../../../utils/api/Url';
import * as NavigationService from '../../../utils/NavigationService';
import { saveAccessToken, saveRefreshToken, showModalConfirm } from '../../../store/globalActions';
import { changeNewMessageCount, homeRequest, homeRequestModeTwo } from '../../home/action/HomeAction';
import { uploadProfileText } from '../texts';
export const getUserMessagesPending = () => ({
    type: ActionTypes.GET_USER_MESSAGES_PENDING
});
export const getUserMessagesError = (error) => ({
    type: ActionTypes.GET_USER_MESSAGES_ERROR,
    error: error
});
export const getUserMessagesSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_USER_MESSAGES_SUCCESS,
    payload: data,
    mergeData: mergeData
});

const getUserMessagesOnSuccess = (response, exData) => {
    let data = response.data.data;
    let preData = exData.preData
    let mergeData = preData.concat(data.messages)
    //console.log('ex data', exData)
    store.dispatch(changeMyMessagesPageNum(exData.pageNum + 1))
    store.dispatch(getUserMessagesSuccess(data, mergeData))
}

const getUserMessagesOnFailed = (error) => {
    store.dispatch(getUserMessagesError("error"))
}

export const getUserMessages = (method, url, page, prevData) => (dispatch, getState) => {
    let state = getState()
    let pageNum = state.userInboxReducer.pageNum
    let prevData = state.userInboxReducer.listData
    let preData = []
    if (page == 1) {
        dispatch(changeMyMessagesPageNum(1))
        pageNum = 1
        preData = [];
        dispatch(getUserMessagesPending());
    } else {
        preData = prevData
        dispatch(myMessagesLoading(true))
    }

    apiRequest(
        method,
        url + '?page=' + pageNum,
        // url + '?page=' + pageNum+'&limit=5',
        false,
        getUserMessagesOnSuccess,
        getUserMessagesOnFailed,
        getUserMessages(method, url, pageNum, prevData),
        true,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeMyMessagesPageNum = (value) => ({
    type: ActionTypes.CHANGE_MESSAGE_PAGENUM,
    payload: value
});

export const myMessagesLoading = (value) => ({
    type: ActionTypes.MESSAGE_LOADING,
    payload: value
});
export const currentMessage = (value) => ({
    type: ActionTypes.CURRENT_MESSAGE,
    payload: value
})
//get user fill message
export const getUserFullMessagePending = () => ({
    type: ActionTypes.GET_USER_FULL_MESSAGES_PENDING
});
export const getUserFullMessageError = (error) => ({
    type: ActionTypes.GET_USER_FULLMESSAGES_ERROR,
    error: error
});
export const getUserFullMessageSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_USER_FULLMESSAGES_SUCCESS,
    payload: data,
});

const getUserFullMessageOnSuccess = (response, exData) => {
    let data = response.data.data, state, newMessageCount, currentMessage;
    state = store.getState();
    newMessageCount = state.home.newMessageCount;
    currentMessage = state.userInboxReducer.listData[exData.index].read;
    exData.callBack()
    store.dispatch(getUserFullMessageSuccess(data))
    //console.log('currentMessage',currentMessage)
    //console.log('exData',exData)
    newMessageCount != 0 && !currentMessage? store.dispatch(changeNewMessageCount(newMessageCount - 1)) : null;
}

const getUserFullMessageOnFailed = (error) => {
    store.dispatch(getUserFullMessageError("error"))
}

export const getUserFullMessage = (id, callBack,index) => (dispatch, getState) => {
    let state = getState()
    dispatch(getUserFullMessagePending());
    apiRequest(
        'get',
        userFullMessagesWb + '/' + id,
        false,
        getUserFullMessageOnSuccess,
        getUserFullMessageOnFailed,
        getUserFullMessage(id),
        true,
        { callBack, id ,index}
    )
}
//delete user fill message
export const deleteUserMessagePending = () => ({
    type: ActionTypes.DELETE_USER_MESSAGES_PENDING
});
export const deleteUserMessageError = (error) => ({
    type: ActionTypes.DELETE_USER_MESSAGES_ERROR,
    error: error
});
export const deleteUserMessageSuccess = (data, mergeData) => ({
    type: ActionTypes.DELETE_USER_MESSAGES_SUCCESS,
    payload: data,
});

const deleteUserMessageOnSuccess = (response, exData) => {
    let messages = store.getState().userInboxReducer.listData;
    let data = response.data.data;
    //console.log('messages', messages.splice(exData.messageIndex, 1))
    exData.callBack('success')
    store.dispatch(deleteUserMessageSuccess(data))
}

const deleteUserMessageOnFailed = (error, exData) => {
    store.dispatch(deleteUserMessageError("error"))
    exData.callBack('error')
}

export const deleteUserMessage = (id, callBack, messageIndex) => (dispatch, getState) => {
    let state = getState()
    // let messages = store.getState().userInboxReducer.listData;
    dispatch(deleteUserMessagePending());
    // //console.log('messages', messages.splice(messageIndex, 1))
    callBack('pending')
    apiRequest(
        'delete',
        userFullMessagesWb + '/' + id,
        false,
        deleteUserMessageOnSuccess,
        deleteUserMessageOnFailed,
        deleteUserMessage(id),
        true,
        { callBack, messageIndex }
    )
}
