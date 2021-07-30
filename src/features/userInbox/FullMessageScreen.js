import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { CustomPending, ActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { delteTitleText, delteMessageContentText } from "./texts";
import MessageItem, { ShowMessageDateAndTimeComponent } from "./components/MessageItem";
import { deleteUserMessage, getUserFullMessage, getUserMessages } from "./actions/userInboxAction";
import { baseUrl, baseUrlReal, userMessagesWb } from '../../utils/api/Url';
import HTML from 'react-native-render-html';
import { fontSize14 } from "../../utils/helper/responsiveSizes";
import { iranSans } from "../../utils/helper/commonVariables";
import { showModalConfirm } from "../../store/globalActions";
export default function FullMessageScreen({ navigation, route }) {
    const [fullMessageDataState, setFullMessageDataState] = useState({ loading: false, data: {} })
    let params = route.params, messageId;
    messageId = params.id;
    const states = useSelector(state => state);
    let loading, error, listData, pageNum, lastPage, listLoading, userInboxReducer, fullMessageData;
    userInboxReducer = states.userInboxReducer;
    loading = userInboxReducer.fullMessageLoading;
    error = userInboxReducer.error;
    listData = userInboxReducer.listData;
    fullMessageData = userInboxReducer.fullMessageData.message;
    pageNum = userInboxReducer.pageNum;
    lastPage = userInboxReducer.messages.last_page;
    // listLoading = userInboxReducer.listLoading;
    const apiHandle = (value) => {
        if (value === 'pending') {
            setFullMessageDataState({ ...fullMessageDataState, loading: true })
        }
        else if (value === 'error') {
            setFullMessageDataState({ ...fullMessageDataState, loading: false })
            dispatch(showModalConfirm(false, delteTitleText, delteMessageContentText, null))
        }
        else {
            setFullMessageDataState({ ...fullMessageDataState, loading: false, data: value })
            dispatch(showModalConfirm(false, delteTitleText, delteMessageContentText, null))
            navigation.goBack()
        }
    }
    const renderMyFullMessagesList = () => {
        return (
            <View style={{ flex: 1, marginTop: hp(2) }}>
                {/* {ShowMessageDateAndTimeComponent(null, 'asdas', '1asd', 'asdsad', 'null')} */}
                {ShowMessageDateAndTimeComponent(null, fullMessageData ? fullMessageData.date : null, fullMessageData ? fullMessageData.hour : null, fullMessageData ? fullMessageData.title : null, null, { read: false })}
                <View style={{ borderWidth: 0, flex: 1, width: wp(90), alignSelf: "center" }}>
                    <ScrollView style={{ flex: 1 }}>
                        <HTML uri={baseUrlReal} allowFontScaling={false} baseFontStyle={{ fontSize: fontSize14, fontFamily: iranSans,textAlign:'right' }} onLinkPress={(href, attribs) => { Linking.openURL(attribs) }} html={fullMessageData ? fullMessageData.description : null} />
                    </ScrollView>
                </View>

            </View>
        )
    }
    const FullMessagesCallBack = () => {
        let currentMessage = userInboxReducer.listData[params.index];
        userInboxReducer.listData[params.index].read = true
    }
    const ListFooter = (loading) => () => {
        if (loading) {
            return (
                <View style={{ height: hp(5), width: '100%', borderWidth: 0, marginTop: hp(2) }}>
                    <ActivityIndicator size={hp(4)} color={'#00b'} />
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }
    // const onEndFunction = () => {
    //     //console.log('lastPage', lastPage)
    //     if (pageNum <= lastPage) {
    //         // dispatch(getUserMessages('get', userMessagesWb, pageNum, listData))
    //         getUserMessages(pageNum, listData)
    //     }
    // };
    const getUserMessagesFunction = (id, callBack,index) => {
        dispatch(getUserFullMessage(id, callBack,index))
    };
    const deleteMessage = (id, callBack) => {
        dispatch(showModalConfirm(true, delteTitleText, delteMessageContentText, () => dispatch(deleteUserMessage(messageId, apiHandle, params.index))))
        // dispatch(showModalConfirm(true, delteTitleText,delteMessageContentText, () => alert()))
        // ()=>dispatch(deleteMessage(messageId)
    };
    useEffect(() => {
        getUserMessagesFunction(messageId, FullMessagesCallBack,params.index)
    }, []);
    const dispatch = useDispatch();
    const { background, someHeaderColor } = theme.colors;
    return (
        <View style={{ backgroundColor: background, height: hp(99) }} >
            <ActionBar delete deleteOnPress={deleteMessage} back titleColor={someHeaderColor} title={params.title} navigation={navigation} />
            <View style={styles.container}>
                {error || loading == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={loading}
                        retryAction={() => getUserMessagesFunction(messageId, FullMessagesCallBack,params.index)} /> :
                    renderMyFullMessagesList()
                    // ShowMessageDateAndTimeComponent(null, 'asdas', '1asd', 'asdsad', 'null')

                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pending: {
        position: 'relative',
        marginTop: hp(40)
    }
})