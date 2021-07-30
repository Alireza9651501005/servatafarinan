import * as actionTypes from '../action/ActionTypes'

const HomeReducer = (state = {
    contents: '',
    userInfo: {
        info: {
            title: '',
            network_score: 0,
            scientific_score: 0,
            yearly_rank: 0,
            monthly_rank: 0
        }
    },
    data: '',
    homePending: true,
    failed: false,
    newMessageCount: 0

}, action) => {
    switch (action.type) {
        case actionTypes.HOME_START:
            return { ...state, homePending: true, failed: false }
        case actionTypes.HOME_SUCCESS:
            return { ...state, homePending: false, contents: action.payload, data: action.data ,failed: false}
        case actionTypes.HOME_FAILED:
            return { ...state, homePending: false, failed: true }

        case actionTypes.CHANGE_NEW_MESSAGE_COUNT:
            return { ...state, newMessageCount: action.payload }
        default:
            return state
    }
}

export default HomeReducer;