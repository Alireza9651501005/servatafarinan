import * as ActionTypes from '../actions/ActionTypes';

const userInboxReducer = (state = {
    loading: false,
    messages: [],
    error: '',
    activeTab: '0',
    loading: false,
    messages: '',
    pageNum: 1,
    listLoading: false,
    listData: [],
    currentMessage: [],
    fullMessageData: [],
    fullMessageLoading: false,
    deleteMessageLoading: false,
}, action) => {
    switch (action.type) {

        case ActionTypes.GET_USER_MESSAGES_PENDING:
            return { ...state, loading: true }

        case ActionTypes.GET_USER_MESSAGES_ERROR:
            return { ...state, loading: false, error: action.error, listLoading: false }

        case ActionTypes.GET_USER_MESSAGES_SUCCESS:
            return { ...state, loading: false, messages: action.payload, listData: action.mergeData, listLoading: false, error: null }
        //get full message
        case ActionTypes.GET_USER_FULL_MESSAGES_PENDING:
            return { ...state, fullMessageLoading: true }

        case ActionTypes.GET_USER_FULLMESSAGES_ERROR:
            return { ...state, fullMessageLoading: false, error: action.error }

        case ActionTypes.GET_USER_FULLMESSAGES_SUCCESS:
            return { ...state, fullMessageLoading: false, fullMessageData: action.payload, error: null}
        //delete message
        case ActionTypes.DELETE_USER_MESSAGES_PENDING:
            return { ...state, deleteMessageLoading: true }

        case ActionTypes.DELETE_USER_MESSAGES_ERROR:
            return { ...state, deleteMessageLoading: false, error: action.error }

        case ActionTypes.DELETE_USER_MESSAGES_SUCCESS:
            return { ...state, deleteMessageLoading: false,error: null}


        case ActionTypes.CHANGE_MESSAGE_PAGENUM:
            return { ...state, pageNum: action.payload }

        case ActionTypes.MESSAGE_LOADING:
            return { ...state, listLoading: action.payload };

        case ActionTypes.CURRENT_MESSAGE:
            return { ...state, currentMessage: action.payload };

        default: return { ...state }
    }
}

export default userInboxReducer;