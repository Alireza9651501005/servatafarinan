import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';

export const getUserPublicProfilePending = () => ({
    type: ActionTypes.GET_USER_PUBLIC_PROFILE_PENDING
});

export const getUserPublicProfileError = (error) => ({
    type: ActionTypes.GET_USER_PUBLIC_PROFILE_ERROR,
    error: error
});

export const getUserPublicProfileSuccess = (value) => ({
    type: ActionTypes.GET_USER_PUBLIC_PROFILE_SUCCESS,
    payload: value
});

const getUserPublicProfileOnSuccess = (response, exData) => {
    //console.log('response.data.data', response.data.data)
    store.dispatch(getUserPublicProfileSuccess(response.data.data))
};

const getUserPublicProfileOnFailed = (error) => {
    store.dispatch(getUserPublicProfileError(error))
};

export const getUserPublicProfile = (id) => (dispatch) => {
    let url = `users/${id}/public-profile`;
    dispatch(getUserPublicProfilePending())
    apiRequest(
        'get',
        url,
        false,
        getUserPublicProfileOnSuccess,
        getUserPublicProfileOnFailed,
        getUserPublicProfile
    )
};