import { store } from '../../../store/store';
import { apiRequest } from '../../../utils/api/apiService';
import * as ActionTypes from './ActionTypes';
import { getProfile, logOutApi, shareAppApi, uploadProfileImageApi, changeUserNameApi, editeUserProfileInfo } from '../../../utils/api/Url';
import * as NavigationService from '../../../utils/NavigationService';
import { saveAccessToken, saveRefreshToken, showModalConfirm } from '../../../store/globalActions';
import { homeRequest, homeRequestModeTwo } from '../../home/action/HomeAction';
import { uploadProfileText } from '../texts';
export const changeProfileImage = (value) => ({
    type: ActionTypes.CHANGE_PROFILE_IMAGE,
    payload: value
});
export const changeUserNameAc = (value) => ({
    type: ActionTypes.CHANGE_USER_NAME,
    payload: value
});
export const getprofilePending = () => ({
    type: ActionTypes.GET_PROFILE_PENDING
});
export const getprofileError = (error) => ({
    type: ActionTypes.GET_PROFILE_ERROR,
    error: error
});
export const getprofileSuccess = (value) => ({
    type: ActionTypes.GET_PROFILE_SUCCESS,
    payload: value
});
const getprofileOnSuccess = (response, exData) => {
    let data = response.data.data;
    let userName = data.username;
    store.dispatch(changeYearlyRank(data ? data.yearly_rank : 0))
    store.dispatch(changeMonthlyRank(data ? data.monthly_rank : 0))
    store.dispatch(changeNetworkScore(data ? data.network_score : 0))
    store.dispatch(changeScientificScore(data ? data.scientific_score : 0))
    store.dispatch(changeStarCount(data ? data.stars : 0))
    store.dispatch(getprofileSuccess(response.data.data))
    // store.dispatch(changeUserNameAc(userName))
    // exData.callback(response.data.data)
};
const getprofileOnFailed = (error) => {
    store.dispatch(getprofileError(error))

    // exData.callback('error')
};
export const getprofile = () => (dispatch) => {
    dispatch(getprofilePending())
    // callback('pending')
    apiRequest(
        'get',
        'http://pms-api.myfreenet.ir/api/v1/' + getProfile,
        false,
        getprofileOnSuccess,
        getprofileOnFailed,
        getprofile(),
        true,
        // { callback }
    )
}

export const logOutMode = (value) => ({
    type: ActionTypes.LOG_OUT_Mode,
    payload: value
});

//log out profile
export const logOutPending = () => ({
    type: ActionTypes.LOG_OUT_PENDING
});
export const logOutError = (error) => ({
    type: ActionTypes.LOG_OUT_ERROR,
    error: error
});
export const logOutSuccess = (value) => ({
    type: ActionTypes.LOG_OUT_SUCCESS,
    payload: value
});

const logOutOnSuccess = async (response, exData) => {
    // NavigationService.navigate('Home')
    // NavigationService.navigate('Home')
    exData.callback('success')
    store.dispatch(logOutSuccess())
    store.dispatch(saveAccessToken(''))
    store.dispatch(saveRefreshToken(''))
    store.dispatch(getprofileSuccess({ image: null }))
    store.dispatch(homeRequestModeTwo())
    NavigationService.navigate('Home')
};
const logOutOnFailed = (error, exData) => {
    store.dispatch(logOutError('error'))
    exData.callback('error')
};
export const logOut = (callback) => (dispatch) => {
    dispatch(logOutPending())
    dispatch(logOutMode(true))
    // callback()
    apiRequest(
        'post',
        logOutApi,
        false,
        logOutOnSuccess,
        logOutOnFailed,
        logOut(),
        true,
        { callback }
    )
}
//share app
export const shareAppPending = () => ({
    type: ActionTypes.SHARE_APP_PENDING
});
export const shareAppError = (error) => ({
    type: ActionTypes.SHARE_APP_ERROR,
    error: error
});
export const shareAppSuccess = (value) => ({
    type: ActionTypes.SHARE_APP_SUCCESS,
    payload: value
});
const shareAppOnSuccess = (response, exData) => {
    store.dispatch(shareAppSuccess())
};
const shareAppOnFailed = (error) => {
    store.dispatch(shareAppError(error))
};
export const shareApp = () => (dispatch) => {
    dispatch(shareAppPending())
    apiRequest(
        'post',
        shareAppApi,
        false,
        shareAppOnSuccess,
        shareAppOnFailed,
        shareApp(),
        true,
    )
}
//upload profile image
export const uploadProfileImagePending = () => ({
    type: ActionTypes.UPLOAD_PROFILE_IMAGE_PENDING
});
export const uploadProfileImageError = (error) => ({
    type: ActionTypes.UPLOAD_PROFILE_IMAGE_ERROR,
    error: error
});
export const uploadProfileImageSuccess = () => ({
    type: ActionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS,
});
const uploadProfileImageOnSuccess = (response) => {
    let state = store.getState()
    let profileReducerData = state.profileReducer.profileData;
    // profileReducerData.image_url = state.profileReducer.profileImage;
    profileReducerData.image = response.data.data.image;
    profileReducerData.image_exist = !profileReducerData.image_exist;
    // store.dispatch(getprofileSuccess(profileReducerData))    
    store.dispatch(changeProfileImage(false))
    store.dispatch(uploadProfileImageSuccess())
    // let closeModalHelper = () => { };
    // store.dispatch(showModalConfirm(false, uploadProfileText, closeModalHelper, closeModalHelper, null, null))
};
const uploadProfileImageOnFailed = (error) => {
    store.dispatch(uploadProfileImageError(error))
};
export const uploadProfileImageAc = (image, method) => (dispatch) => {
    const formData = new FormData();
    formData.append("file", image);
    dispatch(uploadProfileImagePending())
    apiRequest(
        method ? method : 'post',
        'http://pms-api.myfreenet.ir/api/v1/' + uploadProfileImageApi,
        formData,
        uploadProfileImageOnSuccess,
        uploadProfileImageOnFailed,
        uploadProfileImageAc(image),
        true,
        null,
        false,
        false
    )
}
//change user name
export const changeUserNamePending = () => ({
    type: ActionTypes.CHANGE_USER_NAME_PENDING
});
export const changeUserNameError = (error) => ({
    type: ActionTypes.CHANGE_USER_NAME_ERROR,
    error: error
});
export const changeUserNameSuccess = () => ({
    type: ActionTypes.CHANGE_USER_NAME_SUCCESS,
});
const changeUserNameOnSuccess = (response, exData) => {
    let state = store.getState()
    let profileReducerData = state.profileReducer.profileData;
    profileReducerData.username = state.profileReducer.userName;
    let closeModalHelper = () => { };
    store.dispatch(showModalConfirm(false, uploadProfileText, closeModalHelper, closeModalHelper, null, null))
    exData.callback()
    store.dispatch(changeUserNameSuccess())
};
const changeUserNameOnFailed = (error, exData) => {
    store.dispatch(changeUserNameError(error))
    let closeModalHelper = () => { };
    store.dispatch(showModalConfirm(false, uploadProfileText, closeModalHelper, closeModalHelper, null, null))
    exData.callback()
};
export const updateUserNameAction = (userName, callback) => (dispatch) => {
    const formData = new FormData();
    formData.append("username", userName);
    dispatch(changeUserNamePending())
    apiRequest(
        'post',
        'http://pms-api.myfreenet.ir/api/v1/' + changeUserNameApi,
        // changeUserNameApi,
        formData,
        changeUserNameOnSuccess,
        changeUserNameOnFailed,
        updateUserNameAction(userName, callback),
        true,
        { callback }
    )
};
//edite user profile info
export const editUserProifleInfoPending = () => ({
    type: ActionTypes.EDIT_USER_PROFILE_INFO_PENDING
});
export const editUserProifleInfoError = (error) => ({
    type: ActionTypes.EDIT_USER_PROFILE_INFO_ERROR,
    error: error
});
export const editUserProifleInfoSuccess = (value) => ({
    type: ActionTypes.EDIT_USER_PROFILE_INFO_SUCCESS,
    payload: value
});
const editUserProifleInfoOnSuccess = (response, exData) => {
    //console.log('response.data.data', response.data.data)
    store.dispatch(editUserProifleInfoSuccess(response.data.data))
    exData.callback('success')
};
const editUserProifleInfoOnFailed = (error, exData) => {
    store.dispatch(editUserProifleInfoError(error))
    exData.callback('error')
};
export const editeUserProfileInfoAction = (name, email, userName, education, job, city, birthDate, resume, callback) => (dispatch) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", userName);
    formData.append("certificate", education);
    formData.append("work_position", job);
    formData.append("birth_place", city);
    formData.append("birth_date", birthDate);
    formData.append("personal_resume", resume);
    callback('pending')
    dispatch(editUserProifleInfoPending())
    apiRequest(
        'post',
        editeUserProfileInfo,
        formData,
        editUserProifleInfoOnSuccess,
        editUserProifleInfoOnFailed,
        editeUserProfileInfoAction(name, email, userName, education, job, city, birthDate, resume, callback),
        true,
        { callback }
    )
};
//get user profile info
export const getUserProifleInfoPending = () => ({
    type: ActionTypes.GET_USER_PROFILE_INFO_PENDING
});
export const getUserProifleInfoError = (error) => ({
    type: ActionTypes.GET_USER_PROFILE_INFO_ERROR,
    error: error
});
export const getUserProifleInfoSuccess = (value) => ({
    type: ActionTypes.GET_USER_PROFILE_INFO_SUCCESS,
    payload: value
});
const getUserProifleInfoOnSuccess = (response, exData) => {
    let data = response.data.data;
    //console.log('response.data.data', data)
    store.dispatch(getUserProifleInfoSuccess(response.data.data))
    exData.callback(data)
};
const getUserProifleInfoOnFailed = (error, exData) => {
    store.dispatch(getUserProifleInfoError(error))
    exData.callback('error')
};
export const geteUserProfileInfoAction = (callback) => (dispatch) => {
    callback('pending')
    dispatch(getUserProifleInfoPending())
    apiRequest(
        'get',
        editeUserProfileInfo,
        false,
        getUserProifleInfoOnSuccess,
        getUserProifleInfoOnFailed,
        geteUserProfileInfoAction(callback),
        true,
        { callback }
    )
};
//
export const changeYearlyRank = (value) => ({
    type: ActionTypes.CHANGE_YEARLY_RANK,
    payload: value
});
export const changeMonthlyRank = (value) => ({
    type: ActionTypes.CHANGE_MONTHLY_RANK,
    payload: value
});
export const changeNetworkScore = (value) => ({
    type: ActionTypes.CHANGE_NETWORK_SCORE,
    payload: value
});
export const changeScientificScore = (value) => ({
    type: ActionTypes.CHANGE_SCIENTIFIC_SCORE,
    payload: value
});
export const changeStarCount = (value) => ({
    type: ActionTypes.CHANGE_STAR_COUNT,
    payload: value
});
