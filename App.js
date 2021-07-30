import React, { Component } from 'react';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
//
import { SafeAreaView, StyleSheet, Linking, I18nManager,Platform } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import Nav from "./src/features/index";
import ModalVU from "./src/common/components/ModalVU";
import Orientation from 'react-native-orientation';

import * as NavigationService from './src/utils/NavigationService';
import { changeActiveTab, getCourseDetail } from "./src/features/courseDetail/action/courseDetailAction";
import CustomStatusBar from './src/common/customeComponents/CustomStatusBar';
import { chagneFbToken, changeCurrentCourse, changePendingNotification } from './src/store/globalActions';
import { analyticCustomEvent, handleAction, makeNotificationFunction } from './src/utils/helper/functions';
import { actionsTypes, browse, categoryLsit, courseView, creditView, itemList, lessonView, netWorkView, ProfileView, userView, myCourses, openSetting, inboxView, leaderBoardView, scoreHistoryView, courseDetaiStatus } from './src/common/constants/variables';
import MyCourses from './src/features/myCourses/MyCourses';
import { updateFcmTokenRequest } from './src/features/splash/actions/splashAction';
// I18nManager.forceRTL(false);



//handle notifcation intract
// Must be outside of any component LifeCycle (such as `componentDidMount`).

//handle notifcation intract
class App extends Component {
  // componentWillMount() {
  //   this.checkPermission()
  // }

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL.bind(this));
    Orientation.lockToPortrait();

    if(Platform.OS==='android'){
      firebase.initializeApp()
    this.onMessageListener()
    this.onFcmRefreshTokenListener()
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android) 
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
  
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          let actions = { type: null }, setTimeOutTime = notification.foreground ? 0 : 350, accessToken;
          accessToken = store.getState().globalReducer.accessToken;
          console.log("NOTIFICATION: tapped", notification ? actions = notification.data : null);
          console.log('actions', actions)
          console.log('notification', notification)
          let actionType = actions.type;
          //bellow code need to refactor
          if (actionType == browse) {
            let inApp = actions.in_app, url = actions.url;
            if (inApp) {
              NavigationService.push(actionsTypes[actions.type], actions)
            } else if (!inApp) {
              Linking.openURL(url)
            }
  
          } else if (actionType == courseView) {
            let testFunc = null;
            let courseActionData = actions;
            // let changePendingNotificationData = JSON.stringify(actions.action);
            // console.log('dispatch',dispatch)
            store.dispatch(
              changeCurrentCourse({
                courseActionData,
                testFunc,
                testFunc
              })
            );
            if (accessToken) {
              setTimeout(() => {
                NavigationService.push(actionsTypes[actions.type], actions)
              }, setTimeOutTime);
  
            } else if (notification ? notification.userInteraction : null) {
              store.dispatch(changePendingNotification(actions))
              NavigationService.push('AuthenticationStepOne', actions)
            }
          }
          // else if (actionType == lessonView) {
          //   if (accessToken) {
          //     setTimeout(() => {
          //       NavigationService.push(actionsTypes[actions.type], { item: actions })
          //     }, setTimeOutTime);
          //   }
          //   else if (notification ? notification.userInteraction : null) {
          //     store.dispatch(changePendingNotification(actions))
          //     NavigationService.push('AuthenticationStepOne', actions)
          //   }
          // }
          else {
            let courseStatusTab = 3;
            if (accessToken) {
              actionType == courseDetaiStatus ? store.dispatch(changeActiveTab(courseStatusTab,actions.id)) : null
              setTimeout(() => {
                NavigationService.push(actionsTypes[actions.type], { courseId: actions.id })
              }, setTimeOutTime);
            }
            else if (notification ? notification.userInteraction : null) {
              actionType == courseDetaiStatus ? store.dispatch(changeActiveTab(courseStatusTab)) : null;
              actions.type == scoreHistoryView ? NavigationService.goBack() : null;
              store.dispatch(changePendingNotification(actions))
              NavigationService.push('AuthenticationStepOne', actions)
            }
          }
  
          //   NavigationService.navigate('Message')
  
  
  
          // process the notification
  
          // (required) Called when a remote is received or opened, or local notification is opened
          // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
  
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
          // NavigationService.navigate('Message')
  
          // process the action
        },
  
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },
  
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
  
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
  
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });
    }
    
  };

  componentWillUnmount() {
    this.onMessageListener()
    this.onFcmRefreshTokenListener()
    Linking.removeEventListener("url", this.handleOpenURL.bind(this));
  };
  
  handleOpenURL = event => {
    this.navigateFunc(event.url);
    console.log("deep linking event", event);
  };
  navigateFunc = url => {
    if (url.includes("success")) {
      NavigationService.resetFirst('MyCoursesTab')
      analyticCustomEvent('deep_link', { url: url })
      // let state = store.getState().globalReducer.currentCourseAction,
      //   mehtod,
      //   url,
      //   id;
      // mehtod = state.courseActionData.api_method;
      // id = state.courseActionData.id;
      // url = `${state.courseActionData.id}`;
    }
    console.log("url", url);
  };
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log('enabled', enabled)
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
      // alert("enabled")
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
      this.requestPermission();
    }
  };
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken A', fcmToken)
    store.dispatch(chagneFbToken(fcmToken))

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('fcmToken', fcmToken)
      store.dispatch(chagneFbToken(fcmToken))

      if (fcmToken) {
        // user has a device token
        console.log('fcmToken B', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
        store.dispatch(chagneFbToken(fcmToken))
      }
    }
  };
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };
  onMessageListener = () => messaging().onMessage(async remoteMessage => {
    console.log('remoteMessage', remoteMessage)
    makeNotificationFunction(remoteMessage)
  });
  //blow code is test and not test
  onFcmRefreshTokenListener = () => messaging().onTokenRefresh(async token => {
    store.dispatch(updateFcmTokenRequest(token))
  });
  //

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <StatusBar barStyle="dark-content" /> */}
          <CustomStatusBar />
          <SafeAreaView style={{ flex: 1 }}>
            <Nav
            //  ref={navigatorRef => {
            //    console.log('ref ref',navigatorRef)
            //   NavigationService.setTopLevelNavigator(navigatorRef)
            //  }}
            />
            {/* <Text>sdfdsf</Text> */}
          </SafeAreaView>
        </PersistGate>
        <ModalVU />
      </Provider>

    );
  }
}

export default App;