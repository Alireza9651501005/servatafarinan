import * as ActionTypes from "../actions/ActionTypes";
const publicProfileReducer = (
    state = {
        error: false,
        loading: true,
        profileData: '',
    },
    action
) => {
    switch (action.type) {

        case ActionTypes.GET_USER_PUBLIC_PROFILE_PENDING:
            return { ...state, loading: true ,error:false};

        case ActionTypes.GET_USER_PUBLIC_PROFILE_ERROR:
            return { ...state, loading: false, error: action.error };

        case ActionTypes.GET_USER_PUBLIC_PROFILE_SUCCESS:
            return { ...state, loading: false, profileData: action.payload ,error:false };

        default:
            return state;
    }
};
export default publicProfileReducer;