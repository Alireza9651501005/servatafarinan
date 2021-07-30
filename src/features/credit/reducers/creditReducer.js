import * as ActionTypes from '../actions/ActionTypes';

const creditReducer = (
    state = {
        loading: true,
        transactionsData: '',
        walletData: '',
        error: '',
        listError: false,
        pageNum: 1,
        listLoading: false,
        listData: []
    }, action) => {
    switch (action.type) {

        case ActionTypes.GET_TRANSACTIONS_PENDING:
            return { ...state, listLoading: true, listError: false }

        case ActionTypes.GET_TRANSACTIONS_ERROR:
            return { ...state, listLoading: false, listError: action.error, listLoading: false }

        case ActionTypes.GET_TRANSACTIONS_SUCCESS:
            return { ...state, listLoading: false, transactionsData: action.payload, listData: action.mergeData, listLoading: false, listError: false }

        case ActionTypes.CHANGE_TRANSACTIONS_PAGENUM:
            return { ...state, pageNum: action.payload }

        case ActionTypes.TRANSACTIONS_LOADING:
            return { ...state, listLoading: action.payload };


        case ActionTypes.GET_CREDIT_PENDING:
            return { ...state, loading: true, error: false }

        case ActionTypes.GET_CREDIT_ERROR:
            return { ...state, loading: false, error: action.error }

        case ActionTypes.GET_CREDIT_SUCCESS:
            return { ...state, loading: false, error: false , walletData:action.payload }


        default:
            return state;
    }
}


export default creditReducer