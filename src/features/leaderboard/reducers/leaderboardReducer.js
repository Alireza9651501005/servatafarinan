import * as ActionTypes from '../actions/ActionTypes';

const leaderboardReducer = (state = {
    loading: true,
    leaderboardData: '',
    error: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_LEADERBOARDS_PENDING:
            return { ...state, loading: true }

        case ActionTypes.GET_LEADERBOARDS_ERROR:
            return { ...state, loading: false, error: action.error }

        case ActionTypes.GET_LEADERBOARDS_SUCCESS:
            return { ...state, loading: false, leaderboardData: action.payload }

        default:
            return state;
    }
}

export default leaderboardReducer