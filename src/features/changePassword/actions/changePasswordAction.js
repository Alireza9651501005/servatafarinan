import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
import { changeCurrentPassword } from '../../../utils/api/Url';
import { logOut } from '../../profile/actions/profileAction';
import * as NavigationService from '../../../utils/NavigationService';
import { saveAccessToken, saveRefreshToken } from '../../../store/globalActions';
export const changePasswordPending = () => ({
    type: ActionTypes.CHANGE_PASSWORD_PENDING
});
export const changePasswordError = (error) => ({
    type: ActionTypes.CHANGE_PASSWORD_ERROR,
    error: error
});
export const changePasswordSuccess = (value) => ({
    type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: value
});
const changePasswordOnSuccess = (response, exData) => {
    store.dispatch(changePasswordSuccess(response.data.data))
    store.dispatch(saveAccessToken(''))
    store.dispatch(saveRefreshToken(''))
    exData.callback(response.data.data)
    //call logout api
    // store.dispatch(logOut())
};
const changePasswordOnFailed = (error, exData) => {
    store.dispatch(changePasswordError(error))
    exData.callback('error')
};
export const changePasswordUserpassword = (currentPass, newPass, callback) => (dispatch) => {
    const formData = new FormData();
    formData.append('password', currentPass);
    formData.append('new_password', newPass);
    dispatch(changePasswordPending())
    callback('pending')
    apiRequest(
        'post',
        changeCurrentPassword,
        formData,
        changePasswordOnSuccess,
        changePasswordOnFailed,
        changePasswordUserpassword(currentPass, newPass, callback),
        true,
        { callback },
      
    )
}