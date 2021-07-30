import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
import { forgotPasswordWS } from '../../../utils/api/Url';
import { logOut } from '../../profile/actions/profileAction';
import * as NavigationService from '../../../utils/NavigationService';
import ForgetPasswordScreen from '../ForgetPasswordScreen';
import { saveAccessToken, saveRefreshToken } from '../../../store/globalActions';
import CToast from '../../../common/components/CToast';
import { changeVerifyCode, changeVerifytimer } from '../../authentication/actions/authenticationAction';
export const forgetPasswordPending = () => ({
    type: ActionTypes.FORGET_PASSWORD_PENDING
});
export const forgetPasswordError = (error) => ({
    type: ActionTypes.FORGET_PASSWORD_ERROR,
    error: error
});
export const forgetPasswordSuccess = (value) => ({
    type: ActionTypes.FORGET_PASSWORD_SUCCESS,
    payload: value
});
const forgetPasswordOnSuccess = (response, exData) => {
    let data = response.data.data;
    store.dispatch(forgetPasswordSuccess(data))
    exData.callback(response.data.data)
    // store.dispatch(changeVerifytimer(20));
    store.dispatch(changeVerifytimer(data.timeout));
    NavigationService.navigate('ForgetPasswordScreenVerifyCode', { routeName: 'password' })


};
const forgetPasswordOnSuccessModeTwo = (response, exData) => {
    let data = response.data.data;
    // store.dispatch(saveAccessToken(data.access_token));
    // store.dispatch(saveRefreshToken(data.refresh_token));
    store.dispatch(forgetPasswordSuccess(data))
    exData.callback(response.data.data)
    NavigationService.navigate('AuthenticationStepTwo');
    CToast("تغییر رمز عبور شما با موفقیت انجام شد.", "success");

};
const forgetPasswordOnFailed = (error, exData) => {
    store.dispatch(forgetPasswordError(error))
    exData.callback('error')
};
export const forgetPasswordAction = (phoneNumber, newPassword, apiMethod, callback) => (dispatch) => {
    const formData = new FormData();
    // formData.append('phone_number', '09013235579');
    formData.append('phone_number', phoneNumber);
    formData.append('new_password', newPassword);
    dispatch(forgetPasswordPending())
    callback('pending')
    apiRequest(
        apiMethod,
        // 'post',
        forgotPasswordWS,
        formData,
        apiMethod == 'post' ? forgetPasswordOnSuccess : forgetPasswordOnSuccessModeTwo,
        forgetPasswordOnFailed,
        forgetPasswordAction(phoneNumber, newPassword, apiMethod, callback),
        false,
        { callback },
        false,
        true,
    )
}