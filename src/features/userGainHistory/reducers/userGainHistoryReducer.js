import * as ActionTypes from '../actions/ActionTypes';

const userGainHistoryReducer = (state = {
    loading: false,
    userGainHistory: [],
    error: '',
    activeTab: '0',
    loading: false,
    userGainHistory: '',
    pageNum: 1,
    listLoading: false,
    listData: [],
    showPageGuide: false,
}, action) => {
    switch (action.type) {

        case ActionTypes.GET_USER_GAIN_HISTORY_PENDING:
            return { ...state, loading: true }

        case ActionTypes.GET_USER_GAIN_HISTORY_ERROR:
            return { ...state, loading: false, error: action.error, listLoading: false }

        case ActionTypes.GET_USER_GAIN_HISTORY_SUCCESS:
            return { ...state, loading: false, userGainHistory: action.payload, listData: action.mergeData, listLoading: false, error: null }

        case ActionTypes.CHANGE_MYGAINS_PAGENUM:
            return { ...state, pageNum: action.payload }

        case ActionTypes.MYGAIN_LOADING:
            return { ...state, listLoading: action.payload };

        case ActionTypes.SHOW_PAGEGUIDE:
            return { ...state, showPageGuide: action.payload }
        default: return { ...state }
    }
}

export default userGainHistoryReducer;