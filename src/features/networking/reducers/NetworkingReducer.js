import * as ActionTypes from '../actions/ActionTypes';

const networkingReducer = (state = {
    networking: '',
    error: null,
    activeTab: '0',
    loading: true,
    showPageGuide: false,
}, action) => {
    switch (action.type) {

        case ActionTypes.GET_NETWORKING_PENDING:
            return { ...state, loading: true }

        case ActionTypes.GET_NETWORKING_ERROR:
            return { ...state, loading: false, error: action.error }

        case ActionTypes.GET_NETWORKING_SUCCESS:
            return { ...state, loading: false, networking: action.payload, error: null }

        case ActionTypes.SHOW_PAGEGUIDE:
            return { ...state, showPageGuide: action.payload }
        default: return { ...state }
    }
}

export default networkingReducer;