import React from 'react';
import * as NavigationService from "../../utils/NavigationService";
import analytics from '@react-native-firebase/analytics';
import { actionsTypes, browse, categoryLsit, course, courseView, creditView, itemList, lessonView, netWorkView, ProfileView, userView } from '../../common/constants/variables';
import { Linking } from 'react-native';
import { changeCurrentCourse } from '../../store/globalActions';
import PushNotification from 'react-native-push-notification';
import { store } from '../../store/store';
import crashlytics from '@react-native-firebase/crashlytics';
import { factory, os, os_ver, uuid } from "../../common/constants/deviceInformations";
export const priceSeparator = price => {
    let p = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p
};
//handle crashlytics
export const reportcatchToFireBase = (error, errDescription) => {
    crashlytics().recordError(error);
    crashlytics().sendUnsentReports();
    crashlytics().setUserId(uuid).then(
        crashlytics().log(`${errDescription}/userToken:${store.getState().globalReducer.accessToken}`)
    );
    // alert('reportcatchToFireBase')
};
//handle actions
export const handleAction = (actions, dispatch) => () => {
    //console.log('handleAction', actions)
    let actionType = actions.type;
    if (actionType == browse) {
        let inApp = actions.in_app, url = actions.url;
        if (inApp) {
            NavigationService.push(actionsTypes[actions.type], actions)
        } else if (!inApp) {
            Linking.openURL(url)
        }

    } else if (actionType == courseView) {
        let courseActionData = actions;
        // //console.log('dispatch',dispatch)
        dispatch(
            changeCurrentCourse({
                courseActionData,
                testFunc,
                testFunc
            })
        );
        NavigationService.navigate(actionsTypes[actions.type], actions)
    } else if (actionType == userView) {
        NavigationService.push(actionsTypes[actions.type], actions)

    } else if (actionType == itemList) {
        NavigationService.push(actionsTypes[actions.type], actions)

    } else if (actionType == categoryLsit) {
        NavigationService.push(actionsTypes[actions.type], actions)
    } else if (actionType == lessonView) {
        NavigationService.push(actionsTypes[actions.type], { item: actions })
    } else if (actionType == ProfileView) {
        NavigationService.push(actionsTypes[actions.type], { item: actions })
    } else if (actionType == creditView) {
        NavigationService.push(actionsTypes[actions.type], { item: actions })
    } else if (actionType == netWorkView) {
        NavigationService.push(actionsTypes[actions.type], { item: actions })
    }
}
const testFunc = () => {
    return null;
};


export const makeNotificationFunction = (remoteMessage) => {
    let notificationAction = remoteMessage.data.action, time, generateTime;
    generateTime = new Date();
    time = generateTime.getHours() + ':' + generateTime.getMinutes();
    //console.log('remoteMessage', remoteMessage.data)
    const { title, description, text_color } = remoteMessage.data;
    console.log('makeNotificationFunction called')
    // alert('called')
    // if (remoteMessage.data.notification) {
    PushNotification.createChannel(
        {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "channel-id", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        ticker: "My Notificationnotificationnotificationnotification Ticker", // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher_round", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        // bigText: "My big text that will be shown when notificationnotificationnotification is expanded", // (optional) default: "message" prop
        subText: time, // (optional) default: none
        bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        bigLargeIcon: "ic_launcher", // (optional) default: undefined
        bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
        color: "black", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: "some_tag", // (optional) add tag to message
        group: "group", // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
        data: notificationAction,
        when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
        messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

        // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        /* iOS only properties */
        category: "", // (optional) default: empty string

        /* iOS and Android properties */
        title: title, // (optional)
        message: description, // (required)

    });

    // }
}

export const analyticCustomEvent = async (eventName, data) => {
    await analytics().logEvent(eventName, data).then((ok) => { console.log('=====>', ok) })
}




function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const minutesAndSeconds = (position) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
]);
