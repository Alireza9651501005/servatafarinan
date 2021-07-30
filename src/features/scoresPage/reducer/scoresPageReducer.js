import * as actionTypes from '../action/ActionTypes'

const scoresPageReducer = (state = {
    data: [null],
    error: false,
    loading: false

}, action) => {
    switch (action.type) {
        case actionTypes.GET_AWARDS_PENDING:
            return { ...state, loading: true }
        case actionTypes.GET_AWARDS_ERROR:
            return { ...state, loading: false, error: true }
        case actionTypes.GET_AWARDS_SUCCESS:
            return { ...state, loading: false, error: false, data: action.data }
        default:
            return state
    }
}

export default scoresPageReducer;