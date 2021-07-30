import * as Actiontypes from '../actions/ActionTypes';

const commentsReducer = (state = {
    loading: false,
    sendLoading: false,
    commentsData: '',
    error: '',
    pageNum: 1,
    listLoading: false,
    listData: [],
    showReply: false,
    reply: '',
    selectedComment: false,
    selectedIndex: false,
    mentionsLoading: false,
    mentionsList: [],
    mentionsVisible: false,
    selectedCommentData:''
}, action) => {
    switch (action.type) {
        case Actiontypes.GET_COMMENTS_PENDING:
            return { ...state, loading: true }

        case Actiontypes.GET_COMMENTS_ERROR:
            return { ...state, loading: false, error: action.error, listLoading: false }

        case Actiontypes.GET_COMMENTS_SUCCESS:
            return { ...state, loading: false, commentsData: action.payload, listData: action.mergeData, listLoading: false }

        case Actiontypes.CHANGE_COMMENTS_PAGENUM:
            return { ...state, pageNum: action.payload }

        case Actiontypes.COMMENTS_LOADING:
            return { ...state, listLoading: action.payload }

        case Actiontypes.SEND_COMMENT_PENDING:
            return { ...state, sendLoading: true, listData: action.payload }

        case Actiontypes.SEND_COMMENT_ERROR:
            return { ...state, sendLoading: false, error: action.error }

        case Actiontypes.SEND_COMMENT_SUCCESS:
            return { ...state, sendLoading: false, listData: action.payload ,reply:'' }

        case Actiontypes.CHANGE_COMMENT_VISIBLE:
            return { ...state, showReply: action.payload }

        case Actiontypes.CHANGE_COMMENT_TEXT:
            return { ...state, reply: action.payload }

        case Actiontypes.SAVE_SELECTED_COMMENT:
            return { ...state, selectedComment: action.item, selectedIndex: action.index ,selectedCommentData:action.selectedItem }

        case Actiontypes.MENTION_LIST_PENDING:
            return { ...state, mentionsLoading: true }

        case Actiontypes.MENTION_LIST_ERROR:
            return { ...state, mentionsLoading: false, error: action.error }

        case Actiontypes.MENTION_LIST_SUCCESS:
            return { ...state, mentionsLoading: false, mentionsList: action.payload }

        case Actiontypes.MENTIONS_VISIBLE:
            return { ...state, mentionsVisible: action.payload }


            case Actiontypes.REACTION_COMMENT_PENDING:
            return { ...state, listData: action.payload }

        case Actiontypes.REACTION_COMMENT_ERROR:
            return { ...state, error: action.error }

        case Actiontypes.REACTION_COMMENT_SUCCESS:
            return { ...state  }


        default:
            return state;
    }
}

export default commentsReducer;