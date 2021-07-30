import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { ParentViewActionBar } from "../../common/components";
import { sendIntractiveResult } from "./action/intractiveAction";
import { sendExamResult } from "../courseDetail/action/courseDetailAction";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CToast from "../../common/components/CToast";
import { theme } from "../../common/constants";
import Spinner from "react-native-spinkit";
export default function IntractiveScreen({ route, navigation }) {
  let isExam = route.params.exam,
    CourseId,
    url,
    headerTitle,
    lessonId,
    params = route.params;
  //console.log("route", route);
  if (isExam) {
    url = isExam.url;
    headerTitle = isExam.window_title;
    CourseId = params.id;
    //console.log("CourseId", params.id);
  } else {
    //console.log('lesson params',params)
    lessonId = params.CourseId;
    url = params.data.interactive.url;
    headerTitle = params.data.interactive.window_title;
  }
  const [myWebView, setMyWebView] = useState([]);
  const dispatch = useDispatch();
  const states = useSelector(state => state);
  const handleWebViewOnMessage = data => {
    let obj = JSON.parse(data.nativeEvent.data);
    console.log('handleWebViewOnMessage', obj)
    if (obj.status == "toast") {
      let toastData = obj.data;
      CToast(toastData.msg, toastData.type);
    } else if (obj.status == "sendResult") {
      isExam
        ? dispatch(sendExamResult(CourseId, notifySendResultStatusToWebView, obj.data))
        :
        null        // dispatch(
      //   sendIntractiveResult(lessonId, notifySendResultStatusToWebView)
      // );
    } else if (obj.status == "sendInteractiveResult") {
      dispatch(sendIntractiveResult(lessonId, notifySendResultStatusToWebView,obj.data))
    }
    else if (obj.status == "closeWindow") {
      navigation.goBack();
    }
  };
  const renderLoading = () => {
    return (
      <Spinner style={{ flex: 1, marginBottom: hp(35), alignSelf: 'center' }} isVisible={true} size={hp(8)} type={'ThreeBounce'} color={theme.colors.primary} />
    );
  };
  const notifySendResultStatusToWebView = (data, url) => {
    myWebView.postMessage(data);
  };
  return (
    <ParentViewActionBar
      navigation={navigation}
      titleColor={theme.colors.headerTitleColor}
      title={headerTitle}
      back
      style={{ marginBottom: hp(0) }}
      noRradius
    >
      {/* <TouchableOpacity onPress={() => dispatch(sendExamResult(CourseId, notifySendResultStatusToWebView, [{ id: 1 }]))}>
        <Text>tigdfsfd</Text>
      </TouchableOpacity> */}
      <WebView
        ref={el => setMyWebView(el)}
        startInLoadingState={true}
        onMessage={event => handleWebViewOnMessage(event)}
        source={{ uri: url }}
        renderLoading={renderLoading}
      />
    </ParentViewActionBar>
  );
}
const styles = StyleSheet.create({});
