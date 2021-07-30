import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView, Linking, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { ParentViewActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CToast from "../../common/components/CToast";
import { whiteThird,spinnerColor } from "../../utils/helper/commonVariables";
import Spinner from 'react-native-spinkit';
import { theme } from "../../common/constants";
import { actionsTypes } from "../../common/constants/variables";
export default function LiveWebView({ route, navigation }) {
    let params = route.params, CourseId, interactiveUrl, headerTitle;
    headerTitle = params.title;
    //console.log('params', params)
    //console.log('params', params.url)
    interactiveUrl = 'https://app.scrumdesk.com/#/projects/33062/work-scrum/399907-backlog-item';
    // interactiveUrl = params.data.interactive.url;
    interactiveUrl = params.url;
    const [myWebView, setMyWebView] = useState([]);
    const [contentRowsData, setContentRowsData] = useState([]);
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    const navigationObj = actionsTypes
    const handleWebViewOnMessage = data => {
        let obj = JSON.parse(data.nativeEvent.data);
        //console.log("handleWebViewOnMessage", obj);
        let action = obj.data.action;
        switch (obj.status == "call-action") {
            case action.type == "user-view":
                navigation.push(navigationObj[action.type], action)
                break;
            case action.type == "course-view":
                navigation.push(navigationObj[action.type], action)
                break;
            default:
                break;
        }
        // if (obj.status == "call-action") {
        //     if (action.type == "course-view") {
        //         alert("course-view")
        //     } else if (action.type == "user-view") {
        //         navigation.push('PublicProfileScreen', action)
        //     }
        // }
    };
    const renderLoading = () => {
        return (
            // <ActivityIndicator style={{ flex: 1,marginBottom:hp(35) }} animating color="blue" size={"large"} />
            <Spinner style={{ flex: 1,marginBottom:hp(35),alignSelf:'center' }} isVisible={true} size={hp(8)} type={'ThreeBounce'} color={theme.colors.primary } />
            );
    };
    const notifySendResultStatusToWebView = (data, url) => {
        myWebView.postMessage(data);
        //console.log("notifySendResultStatusToWebView", data);
        //console.log("myWebView", myWebView);
    };
    return (
        headerTitle ?
            <ParentViewActionBar noRradius titleColor={whiteThird} navigation={navigation} title={headerTitle} back style={{ marginBottom: hp(0) }}>
                <WebView ref={el => setMyWebView(el)} startInLoadingState={true} onMessage={event => handleWebViewOnMessage(event)} source={{ uri: interactiveUrl }} renderLoading={renderLoading} />
            </ParentViewActionBar >
            :
            <View style={{ flex: 1 }}>
                <WebView ref={el => setMyWebView(el)} startInLoadingState={true} onMessage={event => handleWebViewOnMessage(event)} source={{ uri: interactiveUrl }} renderLoading={renderLoading} />
            </View >
    );
}
const styles = StyleSheet.create({
});