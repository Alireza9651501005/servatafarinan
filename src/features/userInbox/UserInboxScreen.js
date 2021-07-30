import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { CustomPending, ActionBar, ParentViewActionBar, ProfilePageForGuestUser } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { headerText, listIsEmptyText } from "./texts";
import MessageItem from "./components/MessageItem";
import { getUserMessages } from "./actions/userInboxAction";
import { userMessagesWb } from '../../utils/api/Url';
import { whiteThird } from "../../utils/helper/commonVariables";
import ListEmpty from "../userGainHistory/components/ListEmpty";
export default function UserInboxScreen({ navigation }) {
    const states = useSelector(state => state);
    let loading, error, listData, pageNum, lastPage, listLoading, userInboxReducer;
    let globalReducer = states.globalReducer;
    userInboxReducer = states.userInboxReducer;
    loading = userInboxReducer.loading;
    error = userInboxReducer.error;
    listData = userInboxReducer.listData;
    pageNum = userInboxReducer.pageNum;
    lastPage = userInboxReducer.messages.last_page;
    listLoading = userInboxReducer.listLoading;
    const renderMyMessagesList = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                getUserMessagesFunction(1, [])
                            }}
                        />}
                    style={{ paddingTop: hp(2) }}
                    contentContainerStyle={{ paddingBottom: hp(17), paddingTop: hp(2) }}
                    data={listData}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item, index }) => <MessageItem item={item} index={index} />}
                    ListFooterComponent={ListFooter(listLoading)}
                    // ListHeaderComponent={() => <PageGuide />}
                    ItemSeparatorComponent={() => <View style={{ height: hp(1.6) }} />}
                    onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd >= 0) {
                            onEndFunction();
                        }
                    }}
                    onEndReachedThreshold={0.3}
                    ListEmptyComponent={() => <ListEmpty
                        message={listIsEmptyText}
                        imageStyle={{ width: wp(50), height: hp(15) }}
                        src={require('../../assets/message/messageEmpty.png')}
                        style={{ width: wp(50), height: hp(12), marginTop: hp(30) }} />}

                />
            </View>
        )
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
    const onEndFunction = () => {
        //console.log('lastPage', lastPage)
        if (pageNum <= lastPage) {
            // dispatch(getUserMessages('get', userMessagesWb, pageNum, listData))
            getUserMessagesFunction(pageNum, listData)
        }
    };
    const getUserMessagesFunction = (pageNum, listData) => {
        dispatch(getUserMessages('get', userMessagesWb, pageNum, listData))
    };
    useEffect(() => {
        globalReducer.accessToken ? getUserMessagesFunction(1, []) : null
    }, []);
    const dispatch = useDispatch();
    const { background, someHeaderColor } = theme.colors;
    if (globalReducer.accessToken.length > 2) {
        return (
            <View style={{ backgroundColor: background, height: hp(99) }} >
                <ActionBar back titleColor={someHeaderColor} title={headerText} navigation={navigation} />
                <View style={styles.container}>
                    {error || loading == true ?
                        <CustomPending
                            style={styles.pending}
                            pending={loading}
                            retryAction={() => getUserMessagesFunction(1, [])} /> :
                        renderMyMessagesList()
                    }

                </View>
            </View>
        )

    }
    else {
        return (
            <ParentViewActionBar titleColor={whiteThird} style={{ width: '100%' }} navigation={navigation} title={headerText} back>
                {/* <CustomeButton onPress={() => { navigation.navigate('AuthenticationStepOne') }}>ثبت نام / ورود</CustomeButton> */}
                <ProfilePageForGuestUser navigation={navigation} />
            </ParentViewActionBar>
        )
    }
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