import * as Actiontypes from '../actions/ActionTypes';

const leaderboardDetailReducer = (state = {
    loading: false,
    leaderboardListData: '',
    error: '',
    pageNum: 1,
    listLoading: false,
    listData: []
}, action) => {
    switch (action.type) {
        case Actiontypes.GET_LEADERBOARD_LIST_PENDING:
            return { ...state, loading: true }

        case Actiontypes.GET_LEADERBOARD_LIST_ERROR:
            return { ...state, loading: false, error: action.error,listLoading:false }

        case Actiontypes.GET_LEADERBOARD_LIST_SUCCESS:
            return { ...state, loading: false, leaderboardListData: action.payload, listData: action.mergeData ,listLoading:false}

        case Actiontypes.CHANGE_LEADERBOARD_LIST_PAGENUM:
            return { ...state, pageNum: action.payload }

        case Actiontypes.LEADERBOARDL_LIST_LOADING:
            return { ...state, listLoading: action.payload }


        default:
            return state;
    }
}

export default leaderboardDetailReducer;