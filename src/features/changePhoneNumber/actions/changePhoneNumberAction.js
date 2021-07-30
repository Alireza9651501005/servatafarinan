import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
import { changePhoneNumber, getVerifyCode } from '../../../utils/api/Url';
import * as NavigationService from "../../../utils/NavigationService";
import { changeVerifytimer } from '../../authentication/actions/authenticationAction';
export const changePhoneNumberLevelAction = (value) => ({
    type: ActionTypes.CHANGE_PHONENUMBER_LEVEL,
    payload: value
});
// export const changeVerifytimer = timer => ({
//     type: ActionTypes.VERIFY_TIMER,
//     payload: timer
//   });
//get verify code
export const getVerifyCodePending = () => ({
    type: ActionTypes.GET_VERIFY_CODE_PENDING
});
export const getVerifyCodeError = (error) => ({
    type: ActionTypes.GET_VERIFY_CODE_ERROR,
    error: error
});
export const getVerifyCodeSuccess = (value) => ({
    type: ActionTypes.GET_VERIFY_CODE_SUCCESS,
    payload: value
});
const getVerifyCodeOnSuccess = (response, exData) => {
    let timeout = response.data.data.timeout;
    store.dispatch(getVerifyCodeSuccess(timeout))
    store.dispatch(changePhoneNumberLevelAction(1))
    exData.callback(timeout)
};
const getVerifyCodeOnFailed = (error, exData) => {
    store.dispatch(getVerifyCodeError(error))
};
export const getVerifyCodeAction = (phoneNumber, callback) => (dispatch) => {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    dispatch(getVerifyCodePending())
    apiRequest(
        'post',
        getVerifyCode,
        formData,
        getVerifyCodeOnSuccess,
        getVerifyCodeOnFailed,
        getVerifyCodeAction(phoneNumber),
        true,
        { callback }
    )
}
//change phone number
export const changePhoneNumberPending = () => ({
    type: ActionTypes.CHANGE_PHONENUMBER_PENDING
});
export const changePhoneNumberError = (error) => ({
    type: ActionTypes.CHANGE_PHONENUMBER_ERROR,
    error: error
});
export const changePhoneNumberSuccess = (value) => ({
    type: ActionTypes.CHANGE_PHONENUMBER_SUCCESS,
    payload: value
});
const changePhoneNumberOnSuccess = (response, exData) => {
    let data=response.data.data;
    store.dispatch(changePhoneNumberSuccess())
    store.dispatch(changePhoneNumberLevelAction(0))
    // exData.callback()
    // store.dispatch(changeVerifytimer(5));
    exData.callback('succes')
    store.dispatch(changeVerifytimer(data.timeout));
    // NavigationService.navigate('changePhoneNumberVerifyCode')
    // NavigationService.navigate('AuthenticationStepOne')
};
const changePhoneNumberOnFailed = (error, exData) => {
    store.dispatch(changePhoneNumberError(error))
    exData.callback('error')
};
export const changePhoneNumberAction = ( phoneNumber, callback) => (dispatch) => {
    const formData = new FormData();
    // formData.append('verifyCode', verifyCode);
    formData.append('phone_number', phoneNumber);
    dispatch(changePhoneNumberPending())
    callback('pending')
    apiRequest(
        'post',
        changePhoneNumber,
        formData,
        changePhoneNumberOnSuccess,
        changePhoneNumberOnFailed,
        changePhoneNumberAction( phoneNumber, callback),
        true,
        { callback },
        false,
        false,

    )
}