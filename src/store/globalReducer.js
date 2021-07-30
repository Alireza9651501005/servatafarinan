import * as ActionTypes from "./globalActions";
import { theme } from "../common/constants";
const globalReducer = (
  state = {
    showConfirmModal: false,
    ConfirmModalContent: null,
    ConfirmModalTitle: null,
    ConfirmModalConfirmFunc: null,
    noButtonAction: null,
    singleBtnTitle: null,
    navFunvtion: null,
    accessToken: '',
    refreshToken: '',
    activeTopTab: 100,
    currentCourseAction: null,
    appHeaderColor: theme.colors.darkBlue,
    modalVisible: false,
    fbToken: '',
    homeAppTour: true,
    profileAppTour: true,
    networkingAppTour: true,
    courseAppTour: true,
    lessonAppTour: true,
    currentRouteName: '',
    pendingNotificaiton:null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SHOW_CONFIRM_MODAL:
      return {
        ...state,
        showConfirmModal: action.visible,
        ConfirmModalContent: action.contentModal,
        ConfirmModalTitle: action.title,
        ConfirmModalConfirmFunc: action.func,
        noButtonAction: action.noButtonAction,
        singleBtnTitle: action.singleBtnTitle
      };
    case ActionTypes.GLOBAL_NVIGATION:
      return {
        ...state,
        navFunvtion: action.navFunvtion,
      };
    case ActionTypes.SAVE_ACCESSTOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case ActionTypes.SAVE_REFRESHTOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case ActionTypes.ACTIVE_TOPNAVIGATION:
      return {
        ...state,
        activeTopTab: action.payload,
      };
    case ActionTypes.CHANGE_CURRENT_COURSE:
      return {
        ...state,
        currentCourseAction: action.payload,
      };
    case ActionTypes.CHANGE_APP_HEADER_COLOR:
      return {
        ...state,
        appHeaderColor: action.payload,
      };
    case ActionTypes.CHANGE_MODAL_VISIBL_DATE:
      return {
        ...state,
        modalVisible: action.payload,
      };
    case ActionTypes.CHANGE_FB_TOKEN:
      return {
        ...state,
        fbToken: action.payload,
      };

    case ActionTypes.CHANGE_HOME_APP_TOUR:
      return {
        ...state,
        homeAppTour: action.payload,
      };

    case ActionTypes.CHANGE_PROFILE_APP_TOUR:
      return {
        ...state,
        profileAppTour: action.payload,
      };

    case ActionTypes.CHANGE_NETWORKING_APP_TOUR:
      return {
        ...state,
        networkingAppTour: action.payload,
      };

    case ActionTypes.CHANGE_COURSE_APP_TOUR:
      return {
        ...state,
        courseAppTour: action.payload,
      };

    case ActionTypes.CHANGE_LESSON_APP_TOUR:
      return {
        ...state,
        lessonAppTour: action.payload,
      };

    case ActionTypes.SAVE_CURRENT_ROUTE:
      return {
        ...state,
        currentRouteName: action.payload,
      };
    case ActionTypes.PENDING_NOTIFICATION:
      return {
        ...state,
        pendingNotificaiton: action.payload,
      };
    default:
      return state;
  }
};
export default globalReducer;