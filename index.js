/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { makeNotificationFunction } from './src/utils/helper/functions';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    makeNotificationFunction(remoteMessage)
    });

AppRegistry.registerComponent(appName, () => App);
