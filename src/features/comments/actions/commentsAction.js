import * as ActionTypes from './ActionTypes';
import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import react from 'react';

export const getCommentsPending = () => ({
    type: ActionTypes.GET_COMMENTS_PENDING
})

export const getCommentsError = (error) => ({
    type: ActionTypes.GET_COMMENTS_ERROR,
    error: error
})

export const getCommentsSuccess = (data, mergeData) => ({
    type: ActionTypes.GET_COMMENTS_SUCCESS,
    payload: data,
    mergeData: mergeData
})

const getCommentsOnSuccess = (response, exData) => {
    let data = response.data.data
    let preData = exData.preData
    let mergeData = preData.concat(data.comments)
    //console.log('ex data', exData)
    store.dispatch(changeCommentsPageNum(exData.pageNum + 1))
    store.dispatch(getCommentsSuccess(data, mergeData))
}

const getCommentsOnFailed = (error) => {
    store.dispatch(getCommentsError(error))
}

export const getComments = (method, url,page) => (dispatch,getState) => {
    // //console.log('hicomment',prevData,pageNum)
    let state = getState()
    
    let pageNum = state.commentsReducer.pageNum
    let prevData = state.commentsReducer.listData
    let preData = []
    if (page == 1) {
        dispatch(changeCommentsPageNum(1))
        pageNum = 1
        preData = [];
        dispatch(getCommentsPending());
    } else {
        preData = prevData
        dispatch(commentsLoading(true))
    }


    apiRequest(
        method,
        url+ '?page='+pageNum,
        false,
        getCommentsOnSuccess,
        getCommentsOnFailed,
        getComments(method, url, pageNum, prevData),
        true,
        { pageNum: pageNum, preData, preData }
    )
}

export const changeCommentsPageNum = (value) => ({
    type: ActionTypes.CHANGE_COMMENTS_PAGENUM,
    payload: value
})

export const commentsLoading = (value) => ({
    type: ActionTypes.COMMENTS_LOADING,
    payload: value
})


//comment visible
export const changeCommentVisible = (value) => ({
    type: ActionTypes.CHANGE_COMMENT_VISIBLE,
    payload: value
})

export const changeCommentText = (value) => ({
    type: ActionTypes.CHANGE_COMMENT_TEXT,
    payload: value
})

export const saveSelectedComment = (item, index,selectedItem) => ({
    type: ActionTypes.SAVE_SELECTED_COMMENT,
    item: item,
    index: index,
    selectedItem:selectedItem
})

//send comment
export const sendCommentPending = (listData) => ({
    type: ActionTypes.SEND_COMMENT_PENDING,
    payload: listData
})

export const sendCommentError = (error) => ({
    type: ActionTypes.SEND_COMMENT_ERROR,
    error: error
})

export const sendCommentSuccess = (listData) => ({
    type: ActionTypes.SEND_COMMENT_SUCCESS,
    payload: listData,
})

const sendDataHandlePending = (data, reply, replyId, replyIndex) => {
    let mydata = {
        id: 9999,
        content: reply,
        loading: true
    }
    let listData = data

    // //console.log('=-=-=-=-=-=-=-', replyIndex)
    if (replyId) {
        if (listData[replyIndex].children) {
            listData[replyIndex].children.push(mydata)
        } else {
            listData[replyIndex].children = [mydata]
        }
    } else {
        listData.splice(0, 0, mydata)
    }
    store.dispatch(sendCommentPending(listData))
}

const sendCommentOnSuccess = (response, exData) => {
    let data = response.data.data
    let listData = exData.listData
    if (exData.replyId) {
        listData[exData.replyIndex].children.pop()
        listData[exData.replyIndex].children.push(data.comment)

    } else {
        // if (exData.replyIndex == 0) {
        //     listData[exData.replyIndex].children.push(data.comment)

        // } else {
        listData.splice(0, 1, data.comment)

        // }

    }
    // //console.log('=-=-', data, exData, listData)
    store.dispatch(saveSelectedComment(false,false))
    store.dispatch(sendCommentSuccess(listData))
}

const sendCommentOnFailed = (error, exData) => {
    let listData = exData.listData
    if (exData.replyId) {
        listData[exData.replyIndex].children.pop()
    } else {
        // if (exData.replyIndex == 0) {
        //     listData[exData.replyIndex].children.pop()

        // } else {
        listData.splice(0, 1)

        // }
    }
    store.dispatch(sendCommentSuccess(listData))
    store.dispatch(sendCommentError(error))
}

export const sendComment = (url, text, listData, replyToId, replyIndex) => (dispatch) => {

    let formData = new FormData()
    sendDataHandlePending(listData, text, replyToId, replyIndex)
    formData.append('content', text)
    if (replyToId) {
        formData.append('parent_id', replyToId)
    }
    apiRequest(
        'post',
        url,
        formData,
        sendCommentOnSuccess,
        sendCommentOnFailed,
        sendComment(url, text, listData, replyToId),
        true,
        { listData: listData, replyIndex: replyIndex, replyId: replyToId }
    )
}


//mention list 
export const getMentionsPending = () => ({
    type: ActionTypes.MENTION_LIST_PENDING
})

export const getMentionsError = (error) => ({
    type: ActionTypes.MENTION_LIST_ERROR,
    error: error
})

export const getMentionsSuccess = (data) => ({
    type: ActionTypes.MENTION_LIST_SUCCESS,
    payload: data,
})

const getMentionsOnSuccess = (response, exData) => {
    let data = response.data.data
    store.dispatch(getMentionsSuccess(data))
}

const getMentionsOnFailed = (error) => {
    store.dispatch(getMentionsError(error))
}

export const getMentionList = (url) => (dispatch) => {
    dispatch(getMentionsPending())
    apiRequest(
        'get',
        url,
        false,
        getMentionsOnSuccess,
        getMentionsOnFailed,
        getMentionList(url),
        true,
    )
}

export const changeMentionsVisible = (value) => ({
    type: ActionTypes.MENTIONS_VISIBLE,
    payload: value
})



//reaction comment
export const reactionCommentPending = (listData) => ({
    type: ActionTypes.REACTION_COMMENT_PENDING,
    payload: listData
})

export const reactionCommentError = (error) => ({
    type: ActionTypes.REACTION_COMMENT_ERROR,
    error: error
})

export const reactionCommentSuccess = () => ({
    type: ActionTypes.REACTION_COMMENT_SUCCESS
})

const reactionDataHandlePending = (data, reaction, parentIndex, subIndex) => {
    // //console.log(data, reaction, parentIndex, subIndex)
    
    let listData = data
    if(subIndex!==false){
        listData[parentIndex].children[subIndex].reaction=reaction
        if(reaction==='LIKE'){
            listData[parentIndex].children[subIndex].likes += 1

        }
        if(reaction==='DISLIKE'){
            listData[parentIndex].children[subIndex].dislikes += 1

        }
    }else{
        listData[parentIndex].reaction=reaction
        if(reaction==='LIKE'){
            listData[parentIndex].likes += 1

        }
        if(reaction==='DISLIKE'){
            listData[parentIndex].dislikes += 1

        }
    }
    store.dispatch(reactionCommentPending(listData))
}

const reactionCommentOnSuccess = (response, exData) => {
    store.dispatch(reactionCommentSuccess())
}

const reactionCommentOnFailed = (error, exData) => {
    let listData = exData.listData
    let subIndex = exData.subIndex
    let reaction 
    let parentIndex = exData.parentIndex
    if(exData.reaction==='LIKE'){
        reaction = 'DISLIKE'
    }else if(exData.reaction==='DISLIKE'){
        reaction='LIKE'
    }
    if(subIndex!==false){
        listData[parentIndex].children[subIndex].reaction=reaction==='NONE'
        if(reaction==='LIKE'){
            listData[parentIndex].children[subIndex].likes -= 1

        }
        if(reaction==='DISLIKE'){
            listData[parentIndex].children[subIndex].dislikes = 1

        }
    }else{
        listData[parentIndex].reaction=exData.reaction
        if(reaction==='LIKE'){
            listData[parentIndex].likes -= 1

        }
        if(reaction==='DISLIKE'){
            listData[parentIndex].dislikes -= 1

        }
    }
    store.dispatch(reactionCommentPending(listData))
    store.dispatch(reactionCommentError(error))
}

export const reactionComment = (url, reaction, listData, parentIndex, subIndex) => (dispatch) => {

    let formData = new FormData()
    reactionDataHandlePending(listData, reaction, parentIndex, subIndex)
    formData.append('reaction', reaction)
    apiRequest(
        'post',
        url,
        formData,
        reactionCommentOnSuccess,
        reactionCommentOnFailed,
        reactionComment(url, reaction, listData, parentIndex, subIndex),
        true,
        { listData, reaction, parentIndex,subIndex}
    )
}