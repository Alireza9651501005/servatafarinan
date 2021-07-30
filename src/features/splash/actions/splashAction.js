import * as NavigationService from "../../../utils/NavigationService";
import * as ActionTypes from "../actions/ActionTypes";
import { Url } from "../../../utils/api";
import { apiRequest } from "../../../utils/api/apiService";
import { store } from "../../../store/store";
import { showModalConfirm, changeAppHeaderColor, changePendingNotification } from "../../../store/globalActions";
import { Linking } from "react-native";
import { morePageHeaderColor } from "../../../utils/helper/commonVariables";
import AsyncStorage from '@react-native-community/async-storage';
import { actionsTypes, lessonView } from "../../../common/constants/variables";
const appStarterSuccess = response => {
  let fbToken = store.getState().globalReducer.fbToken;
  console.log('appStarterSuccess', fbToken)
  let updateTitle,
    noAction,
    updateInfo = response.data.update,
    actions;
  // updateInfo = response.data.data.update;
  updateTitle = "بروز رسانی";
  const closeModal = () => NavigationService.resetFirst("Home");
  const updateApp = () => Linking.openURL(updateInfo.url);
  actions = store.getState().globalReducer.pendingNotificaiton;
  updateInfo
    ? store.dispatch(
      showModalConfirm(true, updateTitle, updateInfo.message, updateApp, null, closeModal)
    )
    :
    actions ? actions.type ?
      [
        NavigationService.navigate(actionsTypes[actions.type], actions.type == lessonView ? { actions: actions } : actions),
        store.dispatch(changePendingNotification(null)),
      ]
      : NavigationService.resetFirst("Home")
      : NavigationService.resetFirst("Home")
    // store.dispatch(changeAppHeaderColor(morePageHeaderColor));
    //   if (actions ? actions.type : null) {

    // }
    ;
  //console.log("updateInfo", updateInfo);
  store.dispatch(splashLoadingSuccess("Success"));
};

const appStarterFaild = error => {
  store.dispatch(splashLoadingError(error));
};
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
export const startup = () => {
  // let accessToken = store.getState().globalReducer.accessToken;
  let state, accessToken, fbToken;
  state = store.getState();
  accessToken = state.globalReducer.accessToken;
  fbToken = state.globalReducer.fbToken;
  const formData = new FormData();
  formData.append('app_version', 1);
  formData.append('access_token', accessToken);
  formData.append('firebase_token', fbToken);
  return dispatch => {
    dispatch(splashLoadingPending());
    apiRequest(
      "post",
      // Url.startup,
      'http://pms-api.myfreenet.ir/api/v1/' + Url.startup,
      // Url.startup,
      formData,
      appStarterSuccess,
      appStarterFaild,
      startup(),
      true,
      null,
      false,
      true
    );
  };
};
//updateFbToken
export const updateFbTokenPending = () => ({
  type: ActionTypes.UPDATE_FBTOKEN_PENDING
})
export const updateFbTokenSuccess = (data) => ({
  type: ActionTypes.UPDATE_FBTOKEN_SUCCESS,
  data: data
})
export const updateFbTokenError = () => ({
  type: ActionTypes.UPDATE_FBTOKEN_ERROR
})

const updateFbTokenOnSuccess = (response) => {
  //need to update change fb token here
  let data = response.data.data, state;
  state = store.getState();
  store.dispatch(updateFbTokenSuccess(data))
}

const updateFbTokenOnFailed = () => {
  store.dispatch(updateFbTokenError())
}

export const updateFbTokenRequest = () => {
  let state, accessToken, fbToken;
  state = store.getState();
  accessToken = state.globalReducer.accessToken;
  fbToken = state.globalReducer.fbToken;
  const formData = new FormData();
  formData.append('app_version', 1);
  formData.append('access_token', accessToken);
  formData.append('firebase_token', fbToken);
  return dispatch => {
    dispatch(splashLoadingPending());
    apiRequest(
      "post",
      // Url.startup,
      Url.updateFbTokenWb,
      // Url.startup,
      formData,
      updateFbTokenOnSuccess,
      updateFbTokenOnFailed,
      updateFbTokenRequest(),
      true,
      null,
      false,
      true
    );
  };
};
//update FCM token
export const updateFcmTokenPending = () => ({
  type: ActionTypes.UPDATE_FBTOKEN_PENDING
})
export const updateFcmTokenSuccess = (data) => ({
  type: ActionTypes.UPDATE_FBTOKEN_SUCCESS,
  data: data
})
export const updateFcmTokenError = (error) => ({
  type: ActionTypes.UPDATE_FBTOKEN_ERROR,
  error: error
})

const updateFcmTokenOnSuccess = (response) => {
  let data = response.data.data, state;
  store.dispatch(updateFcmTokenSuccess())
}

const updateFcmTokenOnFailed = (error) => {
  store.dispatch(updateFcmTokenError(error))
}
export const updateFcmTokenRequest = (newFbToken) => {
  const formData = new FormData();
  // formData.append('firebase_token', 'asdeasdasd');
  formData.append('firebase_token', newFbToken);
  return dispatch => {
    dispatch(updateFcmTokenPending());
    apiRequest(
      "post",
      Url.updateFbTokenWb,
      formData,
      updateFcmTokenOnSuccess,
      updateFcmTokenOnFailed,
      updateFcmTokenRequest(newFbToken),
      true,
    );
  };
};
