import * as Actiontypes from '../actions/ActionTypes';

const generalListReducer = (state = {
    loading: false,
    generalListData: '',
    error: '',
    pageNum: 1,
    listLoading: false,
    listData: []
}, action) => {
    switch (action.type) {
        case Actiontypes.GET_General_LIST_PENDING:
            return { ...state, loading: true }

        case Actiontypes.GET_General_LIST_ERROR:
            return { ...state, loading: false, error: action.error,listLoading:false }

        case Actiontypes.GET_General_LIST_SUCCESS:
            return { ...state, loading: false, generalListData: action.payload, listData: action.mergeData ,listLoading:false}

        case Actiontypes.CHANGE_GENERAL_LIST_PAGENUM:
            return { ...state, pageNum: action.payload }

        case Actiontypes.GENERAL_LIST_LOADING:
            return { ...state, listLoading: action.payload }


        default:
            return state;
    }
}

export default generalListReducer;