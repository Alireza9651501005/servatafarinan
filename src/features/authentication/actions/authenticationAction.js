import * as ActionTypes from "../actions/ActionTypes";
import { Url } from "../../../utils/api";
import { apiRequest } from "../../../utils/api/apiService";
import { store } from "../../../store/store";
import { changeBuyStatus } from "../../courseDetail/action/courseDetailAction";
import {
  saveAccessToken,
  saveRefreshToken
} from "../../../store/globalActions";
import * as NavigationService from "../../../utils/NavigationService";
import CToast from "../../../common/components/CToast";
export const changePhoneNumber = phoneNumber => ({
  type: ActionTypes.CHANGE_PHONENUMBER,
  payload: phoneNumber
});
export const changePassword = password => ({
  type: ActionTypes.CHANGE_PASSWORD,
  payload: password
});
export const changeVerifytimer = timer => ({
  type: ActionTypes.VERIFY_TIMER,
  payload: timer
});
// export const changeVerifytimerTozero = () => ({
//   type: ActionTypes.VERIFY_TIMER_TOZERO
// });
export const changeVerifyCode = verifyCode => ({
  type: ActionTypes.VERIFY_CODE,
  payload: verifyCode
});
export const changeAuthentionLevel = value => ({
  type: ActionTypes.SECOND_LEVEL_AUTHENTICATION,
  value: value
});
export const splashLoadingPending = () => ({
  type: ActionTypes.SPLASH_LOADING_PENDING
});
export const splashLoadingError = value => ({
  type: ActionTypes.SPLASH_LOADING_ERROR,
  error: value
});
export const splashLoadingSuccess = value => ({
  type: ActionTypes.SPLASH_LOADING_SUCCESS,
  payload: value
});

export const checkUserAccount = (phoneNumber) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('phone_number', phoneNumber);
    dispatch(checkUserAccountPending());
    apiRequest(
      "post",
      Url.checkUserAccount,
      formData,
      checkUserAccountOnSuccess,
      checkUserAccountOnFailed,
      checkUserAccount(phoneNumber),
      false,
      false,
      false,
      true
    );
  };
};
const checkUserAccountOnSuccess = (response, exData) => {
  let isLogin = response.data.data.timeout;
  store.dispatch(checkUserAccountSuccess());
  store.dispatch(changeVerifytimer(isLogin));
  !isLogin
    ? NavigationService.navigate("AuthenticationStepTwo")
    : NavigationService.navigate("VerifyScreen");
};
const checkUserAccountOnFailed = error => {
  store.dispatch(checkUserAccountError(error));
};
export const checkUserAccountSuccess = () => ({
  type: ActionTypes.CHECK_USER_ACCOUNT_SUCCESS
});
export const checkUserAccountError = error => ({
  type: ActionTypes.CHECK_USER_ACCOUNT_ERROR
});
export const checkUserAccountPending = error => ({
  type: ActionTypes.CHECK_USER_ACCOUNT_PENDING
});
export const checkUserPassword = (password, phoneNumber) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('phone_number', phoneNumber);
    dispatch(checkUserPasswordPending());
    apiRequest(
      "post",
      Url.checkUserPass,
      // Url.checkUserPass,
      formData,
      checkUserPasswordOnSuccess,
      checkUserPasswordOnFailed,
      checkUserPassword(password),
      false,
      null,
      false,
      true
    );
  };
};
const checkUserPasswordOnSuccess = (response, exData) => {
  let data = response.data.data, BuyStatus;
  store.dispatch(checkUserPasswordSuccess(data));
  store.dispatch(saveAccessToken(data.access_token));
  store.dispatch(saveRefreshToken(data.refresh_token));
  BuyStatus = store.getState().courseDetailReducer.BuyStatus;
  if (BuyStatus) {
    NavigationService.reset("CourseDetailScreen");
    store.dispatch(changeBuyStatus(false));
  } else {
    setTimeout(() => {
      NavigationService.resetFirst("Home");
    }, 100);
  }
};
const checkUserPasswordOnFailed = error => {
  store.dispatch(checkUserPasswordError(error));
};
export const checkUserPasswordSuccess = data => ({
  type: ActionTypes.CHECK_USER_PASS_SUCCESS,
  payload: data
});
export const checkUserPasswordError = error => ({
  type: ActionTypes.CHECK_USER_PASS_ERROR
});
export const checkUserPasswordPending = error => ({
  type: ActionTypes.CHECK_USER_PASS_PENDING
});
//check verify code
export const checkVerifyCode = (verifyCode, phoneNumber, callback, url) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("code", verifyCode);
    formData.append("phone_number", phoneNumber);
    dispatch(checkVerifyCodePending());
    apiRequest(
      "post",
      url ? url : Url.verificationCode,
      // 'http://pms-api.myfreenet.ir/api/v1/' + Url.verificationCode,
      formData,
      checkVerifyCodeOnSuccess,
      checkVerifyCodeOnFailed,
      checkVerifyCode(verifyCode, phoneNumber, url),
      false,
      { callback },
      false,
      true
    );
  };
};
const checkVerifyCodeOnSuccess = (response, exData) => {
  store.dispatch(checkUserPasswordSuccess());
  exData.callback()
  store.dispatch(checkVerifyCodeSuccess(response.data.data));
  // NavigationService.navigate("Register");
};
const checkVerifyCodeOnFailed = error => {
  store.dispatch(checkVerifyCodeError(error));
};
export const checkVerifyCodeSuccess = (data) => ({
  type: ActionTypes.CHECK_VERIFY_CODE_SUCCESS,
  data:data
});
export const checkVerifyCodeError = error => ({
  type: ActionTypes.CHECK_VERIFY_CODE_ERROR
});
export const checkVerifyCodePending = error => ({
  type: ActionTypes.CHECK_VERIFY_CODE_PENDING
});
//register action
export const changeUserPass = pass => ({
  type: ActionTypes.CHANGE_USER_PASS,
  payload: pass
});
export const changeUserConfirmPass = confirmPass => ({
  type: ActionTypes.CHANGE_USER_CONFIRM_PASS,
  payload: confirmPass
});
export const changeUserName = name => ({
  type: ActionTypes.CHANGE_USER_NAME,
  payload: name
});
export const changeUserJob = job => ({
  type: ActionTypes.CHANGE_USER_JOB,
  payload: job
});
export const changeUserJobPosition = jobPosition => ({
  type: ActionTypes.CHANGE_USER_JOB_POSITION,
  payload: jobPosition
});
export const changeUserEmail = email => ({
  type: ActionTypes.CHANGE_USER_EMAIL,
  payload: email
});
export const changeUserPhoneNumber = phoneNumber => ({
  type: ActionTypes.CHANGE_USER_PHONENUMBER,
  payload: phoneNumber
});
// name, username, phone_number, email, password, certificate, birth_date, birth_place, gender
export const register = (nameAndFamily, aliasName, password, confirmPassword,inviteCode) => {
  let phoneNumber = store.getState().authenticationReducer.phoneNumber;
  return dispatch => {
    const formData = new FormData();
    formData.append("phone_number", phoneNumber);
    formData.append("name", nameAndFamily);
    formData.append("username", aliasName);
    formData.append("password", password);
    formData.append("invite_code", inviteCode);
    dispatch(registerPending());
    apiRequest(
      "post",
      Url.register,
      // Url.register,
      formData,
      registerOnSuccess,
      registerOnFailed,
      register(nameAndFamily, aliasName, password, confirmPassword,inviteCode),
      false,
      null,
      false,
      true
    );
  };
};
const registerOnSuccess = (response, exData) => {
  let data = response.data.data;
  //console.log('registerOnSuccess', data)
  store.dispatch(registerSuccess(data));
  store.dispatch(saveAccessToken(data.access_token));
  store.dispatch(saveRefreshToken(data.refresh_token));
  BuyStatus = store.getState().courseDetailReducer;
  if (BuyStatus ? BuyStatus.BuyStatus : null) {
    NavigationService.resetFirst("CourseDetailScreen");
    store.dispatch(changeBuyStatus(false));
    // CToast("ثبت نام شما با موفقیت انجام شد.", "success");
  } else {
    NavigationService.resetFirst("RegisterStepTwo");
  }
};
const registerOnFailed = error => {
  store.dispatch(registerError(error));
};
export const registerSuccess = data => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload: data
});
export const registerError = error => ({
  type: ActionTypes.REGISTER_ERROR
});
export const registerPending = error => ({
  type: ActionTypes.REGISTER_PENDING
});

//register user optional information
registerUserOptionalInfoOnSuccess
const registerUserOptionalInfoOnSuccess = (response, exData) => {
  store.dispatch(registerUserOptionalInfoSuccess());
  NavigationService.resetFirst("Home");
};
const registerUserOptionalInfoOnFailed = error => {
  store.dispatch(registerUserOptionalInfoError(error));
};
export const registerUserOptionalInfoSuccess = data => ({
  type: ActionTypes.REGISTER_USER_OPTIONAL_INFORMATION_SUCCESS,
  payload: data
});
export const registerUserOptionalInfoError = error => ({
  type: ActionTypes.REGISTER_USER_OPTIONAL_INFORMATION_ERROR
});
export const registerUserOptionalInfoPending = error => ({
  type: ActionTypes.REGISTER_USER_OPTIONAL_INFORMATION_PENDING
});
//check verify code
export const registerUserOptionalInfo = (edicaiton, job, city, birthDate, email) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("certificate", edicaiton);
    formData.append("work_position", job);
    formData.append("birth_place", city);
    formData.append("birth_date", birthDate);
    formData.append("email", email);
    dispatch(registerUserOptionalInfoPending());
    apiRequest(
      "post",
      Url.optionalInfo,
      // 'http://pms-api.myfreenet.ir/api/v1/' + Url.verificationCode,
      formData,
      registerUserOptionalInfoOnSuccess,
      registerUserOptionalInfoOnFailed,
      registerUserOptionalInfo(edicaiton, job, city, birthDate, email),
      true,
      null,
      false,
      true
    );
  };
};