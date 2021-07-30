import Axios from "axios";
import { apiRequest } from "../utils/api/apiService";
import { refreshToken } from "../utils/api/Url";
import { store } from "./store";
import * as NavigationService from '../utils/NavigationService';
import { homeRequest } from "../features/home/action/HomeAction";
export const SHOW_CONFIRM_MODAL = 'show_confirm_modal';
export const CHANGE_MODAL_VISIBLE = 'change_modal_visible';
export const GLOBAL_NVIGATION = 'global_navigation';
export const SAVE_ACCESSTOKEN = 'save_accessToken';
export const SAVE_REFRESHTOKEN = 'save_refreshToken';
export const ACTIVE_TOPNAVIGATION = 'active_topNavigation';
export const CHANGE_CURRENT_COURSE = 'change_current_Course';
export const CHANGE_APP_HEADER_COLOR = 'change_app_header_color';
export const CHANGE_MODAL_VISIBL_DATE= 'change_modal_visible_date';
export const ACTIVE_TAB_NAVIGATION= 'active_tab_visible_date';
export const CHANGE_FB_TOKEN= 'change_fb_token';
export const CHANGE_HOME_APP_TOUR = 'change_home_app_tour';
export const CHANGE_PROFILE_APP_TOUR = 'change_profile_app_tour';
export const CHANGE_NETWORKING_APP_TOUR = 'change_networking_app_tour';
export const CHANGE_COURSE_APP_TOUR = 'change_course_app_tour';
export const CHANGE_LESSON_APP_TOUR = 'change_lesson_app_tour';
export const SAVE_CURRENT_ROUTE = 'save_current_route'


export const PENDING_NOTIFICATION= 'pending_notification';

export const changeToken = (error, myFunc) => {
    //console.log('start refresh token')
    return (dispatch, getState) => {
        let state = getState();
        let formData = new FormData();
        formData.append('refresh_token', state.globalReducer.refreshToken)

        apiRequest('post',
            refreshToken, 
            formData,
            changeTokenOnSuccess,
            changeTokenOnFailed,
            false,
            false,
            { myFunc: myFunc, error: error },
            false,
            true
        )

    }
}

const changeTokenOnSuccess = (response, exData) => {
    store.dispatch(saveAccessToken(response.data.data.access_token))
    store.dispatch(saveRefreshToken( response.data.data.refresh_token))
    // storageService.saveToken(response.data.data)
    // dispatch(setTimeout(() => {
    store.dispatch(exData.myFunc)
}

const changeTokenOnFailed = (error, exData) => {
    store.dispatch(saveAccessToken(''))
    store.dispatch(saveRefreshToken(''))
    store.dispatch(homeRequest())
    NavigationService.resetFirst('Home')
    store.dispatch(exData.error)

}


export const showModalConfirm = (visibleModal, titleModal, contentModal, funcModal, singleBtnTitle,noButtonAction) => ({
    type: SHOW_CONFIRM_MODAL,
    visible: visibleModal,
    title: titleModal,
    func: funcModal,
    contentModal: contentModal,
    singleBtnTitle: singleBtnTitle,
    noButtonAction: noButtonAction,
});
export const globalNav = (navFunvtion) => ({
    type: GLOBAL_NVIGATION,
    navFunvtion: navFunvtion,
});
export const saveAccessToken = (accessToken) => ({
    type: SAVE_ACCESSTOKEN,
    accessToken: accessToken,
});
export const saveRefreshToken = (refreshToken) => ({
    type: SAVE_REFRESHTOKEN,
    refreshToken: refreshToken,
});
export const ativeTopNavigation = (activeTab) => ({
    type: ACTIVE_TOPNAVIGATION,
    payload: activeTab,
});
export const changeCurrentCourse = (courseId) => ({
    type: CHANGE_CURRENT_COURSE,
    payload: courseId,
});
export const changeAppHeaderColor = (color) => ({
    type: CHANGE_APP_HEADER_COLOR,
    payload: color,
});
export const changeModalVisble = (value) => ({
    type: CHANGE_MODAL_VISIBL_DATE,
    payload: value,
});
export const chagneFbToken = (value) => ({
    type: CHANGE_FB_TOKEN,
    payload: value,
});

//app tour
export const changeHomeAppTour = (value) => ({
    type: CHANGE_HOME_APP_TOUR,
    payload: value,
});

export const changeProfileAppTour = (value) => ({
    type: CHANGE_PROFILE_APP_TOUR,
    payload: value,
});

export const changeNetworkingAppTour = (value) => ({
    type: CHANGE_NETWORKING_APP_TOUR,
    payload: value,
});

export const changeCourseAppTour = (value) => ({
    type: CHANGE_COURSE_APP_TOUR,
    payload: value,
});

export const changeLessonAppTour = (value) => ({
    type: CHANGE_LESSON_APP_TOUR,
    payload: value,
});

export const saveCurrentRoute = (value) => ({
    type:SAVE_CURRENT_ROUTE,
    payload:value
})
export const changePendingNotification = (value) => ({
    type: PENDING_NOTIFICATION,
    payload: value,
});
