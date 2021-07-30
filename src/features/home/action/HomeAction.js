import { actionsTypes, lessonView } from '../../../common/constants/variables'
import { changePendingNotification } from '../../../store/globalActions'
import { store } from '../../../store/store'
import { apiRequest } from '../../../utils/api/apiService'
import { baseUrl, baseUrlReal, home } from '../../../utils/api/Url'
import { changeMonthlyRank, changeNetworkScore, changeScientificScore, changeStarCount, changeYearlyRank, logOutMode } from '../../profile/actions/profileAction'
import * as actionTypes from './ActionTypes'
import * as NavigationService from "../../../utils/NavigationService";
import { updateFcmTokenRequest } from '../../splash/actions/splashAction'
import { Platform } from 'react-native'

export const homeStart = () => ({
    type: actionTypes.HOME_START
})
export const homeSuccess = (contents, data) => ({
    type: actionTypes.HOME_SUCCESS,
    payload: contents,
    data: data
})
export const homeFailed = () => ({
    type: actionTypes.HOME_FAILED
})

const homeOnSuccess = (response) => {
    // alert('homeOnSuccess')
    let fbToken = store.getState().globalReducer.fbToken;
    let data = response.data.data, state, actions;
    actions = store.getState().globalReducer.pendingNotificaiton;
    state = store.getState();
    store.dispatch(changeNewMessageCount(data.user ? data.user.info.new_messages : null))
    state.profileReducer.profileData.image = data.user ? data.user.info.profile_image : null;
    state.profileReducer.profileData.username = data.user ? data.user.info.username : null;
    store.dispatch(changeYearlyRank(data.user ? data.user.info.yearly_rank : 0))
    store.dispatch(changeMonthlyRank(data.user ? data.user.info.monthly_rank : 0))
    store.dispatch(changeNetworkScore(data.user ? data.user.info.network_score : 0))
    store.dispatch(changeScientificScore(data.user ? data.user.info.scientific_score : 0))
    store.dispatch(changeStarCount(data.user ? data.user.info.stars : 0))
    // //console.log('response22222', response.data.data.content_rows)
    store.dispatch(homeSuccess(data.content_rows, data))
    setTimeout(() => {
        if (actions ? actions.type : null) {
            NavigationService.navigate(actionsTypes[actions.type], actions.type == lessonView ? { actions: actions } : actions),
                store.dispatch(changePendingNotification(null))
        }
    }, 0);
    //need to refactor
    // Platform.os === 'ios' ? null : store.dispatch(updateFcmTokenRequest(fbToken))
};

const homeOnSuccessMode2 = (response) => {
    // alert('homeOnSuccessMode2')
    let data, state, actions;
    data = response.data.data
    // console.log('response', response.data.data);
    state = store.getState();
    store.dispatch(changeNewMessageCount(data.user ? data.user.info.new_messages : null))
    state.profileReducer.profileData.image = data.user ? data.user.info.profile_image : null;
    state.profileReducer.profileData.username = data.user ? data.user.info.username : null;
    store.dispatch(changeYearlyRank(data.user ? data.user.info.yearly_rank : 0))
    store.dispatch(changeMonthlyRank(data.user ? data.user.info.monthly_rank : 0))
    store.dispatch(changeNetworkScore(data.user ? data.user.info.network_score : 0))
    store.dispatch(changeScientificScore(data.user ? data.user.info.scientific_score : 0))
    store.dispatch(changeStarCount(data.user ? data.user.info.stars : 0))
    store.dispatch(homeSuccess(data.content_rows, data))
    store.dispatch(logOutMode(false))
    // console.log('response22222', response.data.data.content_rows)

}

const homeOnFailed = (error) => {
    console.log('error', error)
    store.dispatch(homeFailed())
}

export const homeRequest = () => (dispatch) => {
    let randNum = Math.random(0, 10);
    let url = baseUrlReal + home + `?q=${randNum}`;
    // let url = baseUrl + home;
    dispatch(homeStart())
    apiRequest('get', url, false, homeOnSuccess, homeOnFailed, homeRequest(), true)
}
export const homeRequestModeTwo = () => (dispatch) => {
    let url = baseUrlReal + home;
    // let url = baseUrl + home;
    dispatch(homeStart())
    apiRequest('get', url, false, homeOnSuccessMode2, homeOnFailed, homeRequestModeTwo(), true, false, false, false, true)
};
export const changeNewMessageCount = (value) => ({
    type: actionTypes.CHANGE_NEW_MESSAGE_COUNT,
    payload: value
})