import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Platform } from "react-native";
import Spinner from "react-native-spinkit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { iranSans } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import { startup, updateFcmTokenRequest } from "./actions/splashAction";
import { font16 } from "../../utils/helper/responsiveSizes";
import CustomeImage from "../../common/components/CustomeImage";
import { theme } from "../../common/constants";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-community/async-storage';
import { chagneFbToken } from "../../store/globalActions";
import { reportcatchToFireBase } from "../../utils/helper/functions";
import crashlytics from '@react-native-firebase/crashlytics';
export default function SplashScreen({ navigation }) {
  const states = useSelector(state => state);
  let error, splashLoding, logoTitle, refreshIconUrl, splashBackground;
  error = states.splashReducer.error;
  splashLoding = states.splashReducer.loading;
  refreshIconUrl = require("../../assets/refresh/refresh.png");
  splashBackground = require("../../assets/splashBackground/splashBackground.png");
  logoTitle = "ثروت آفرینان";

  useEffect(() => {
    let fcmToken = states.globalReducer.fbToken;
    // dispatch(startup())
    if(Platform.OS==='android'){
      fcmToken ? dispatch(startup()) : checkPermission()
    }else{
      dispatch(startup()) 
    }
  }, []);
  
  const dispatch = useDispatch();
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    //console.log('enabled', enabled)
    // If Premission granted proceed towards token fetch
    if (enabled) {
      getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
      requestPermission();
    }
  };
  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    //console.log('fcmToken A', fcmToken)
    if (fcmToken) {
      dispatch(chagneFbToken(fcmToken))
      dispatch(startup())
    }
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('fcmToken', fcmToken)
      dispatch(chagneFbToken(fcmToken))

      if (fcmToken) {
        // user has a device token
        //console.log('fcmToken B', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
        dispatch(chagneFbToken(fcmToken))
        dispatch(startup())
      }
    }
  };
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      // reportcatchToFireBase(error, 'splashScreen.js/line:90')
      console.log('permission rejected');
    }
  };
  //console.log("states", states.globalReducer);
  return (
    <ImageBackground source={splashBackground} style={styles.container}>
      {splashLoding ? (
        <View style={{ alignSelf: "center", marginTop: hp(75) }}>
          <Spinner
            isVisible={splashLoding}
            size={theme.sizes.spinnerSize}
            type={"ThreeBounce"}
            color={theme.colors.splashLoading}
          />
        </View>
      ) : null}
      {error ? (
        <View style={[styles.bottomSection]}>
          <TouchableOpacity
            onPress={() => dispatch(startup())}
            style={styles.refreshClick}
          >
            <Image source={refreshIconUrl} style={styles.refreshIcon} />
          </TouchableOpacity>
        </View>
      ) : null}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    flex: 1
  },
  logoContainer: {
    borderWidth: 0,
    width: wp(90),
    height: hp(40),
    marginTop: hp(5),
    alignSelf: "center",
    alignItems: "center"
  },
  bottomSection: {
    width: wp(8.5),
    height: wp(8.5),
    marginTop: hp(75),
    alignSelf: 'center'
  },
  refreshClick: {
    width: hp(8),
    alignSelf: "center",
    alignItems: "center"
  },
  refreshIcon: {
    width: wp(17),
    height: wp(17),
    resizeMode: "contain"
  },
  logo: {
    // width: hp(80),
    // height: hp(7),
    resizeMode: "contain"
  }
});
