import * as ActionTypes from '../actions/ActionTypes';
import { yearlyEnText } from '../texts';

const userLeaderBoardReducer = (state = {
    loading: false,
    ranksList: [],
    error: '',
    loading: false,
    // ranksList: '',
    pageNum: 1,
    listLoading: false,
    listData: [],
    rankType: yearlyEnText,
    tabMode: false,
    tabModeLoading: false,
}, action) => {
    switch (action.type) {

        case ActionTypes.GET_RANK_PENDING:
            return { ...state, loading: true }

        case ActionTypes.GET_RANK_ERROR:
            return { ...state, loading: false, error: action.error, listLoading: false,tabModeLoading:false }

        case ActionTypes.GET_RANK_SUCCESS:
            return { ...state, loading: false, ranksList: action.payload, listData: action.mergeData, listLoading: false, error: null,tabModeLoading:false }

        case ActionTypes.CHANGE_RANK_PAGENUM:
            return { ...state, pageNum: action.payload }

        case ActionTypes.RANK_LOADING:
            return { ...state, listLoading: action.payload };

        case ActionTypes.CHANGE_RANK_TYPE:
            return { ...state, rankType: action.payload, tabMode: action.tabMode,tabModeLoading:true };

        default: return { ...state }
    }
}

export default userLeaderBoardReducer;