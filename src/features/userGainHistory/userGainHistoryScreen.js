import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { CustomPending, ActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { headerText, whenListIsEmptyText } from "./texts";
import PageGuide from "./components/PageGuide";
import GainItem from "./components/GainItem";
import ItemSeperator from "./components/ItemSeperator";
import { getUserHistoryGain } from "./actions/userGainHistoryAction";
import { userGainHostoryWb } from '../../utils/api/Url';
import ListEmpty from "./components/ListEmpty";
export default function userGainHistoryScreen({ navigation }) {
    const states = useSelector(state => state);
    let loading, error, listData, pageNum, lastPage, listLoading,showPageGuideStatus;
    loading = states.userGainHistoryReducer.loading;
    error = states.userGainHistoryReducer.error;
    listData = states.userGainHistoryReducer.listData;
    pageNum = states.userGainHistoryReducer.pageNum;
    lastPage = states.userGainHistoryReducer.userGainHistory.last_page;
    listLoading = states.userGainHistoryReducer.listLoading;
     showPageGuideStatus = states.userGainHistoryReducer.showPageGuide;
    const renderGainHistoryList = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                 refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            dispatch(getUserHistoryGain('get', userGainHostoryWb, 1, []))
                        }}
                    />}
                    style={{ paddingTop: hp(2) }}
                    contentContainerStyle={{ paddingBottom: hp(10), paddingTop: hp(2) }}
                    data={listData}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item, index }) => <GainItem item={item} index={index} />}
                    ListFooterComponent={ListFooter(listLoading)}
                    ListHeaderComponent={() => <PageGuide />}
                    ItemSeparatorComponent={() => <ItemSeperator />}
                    onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd >= 0) {
                            onEndFunction();
                        }
                    }}
                    onEndReachedThreshold={0.3}
                    ListEmptyComponent={()=><ListEmpty 
                        message={whenListIsEmptyText}
                        imageStyle={{width:wp(40),height:hp(15) }}
                         src={require('../../assets/leaderBoard/whenLIstIsEmpty.png')}
                          style={{marginTop:showPageGuideStatus?hp(2): hp(20)}}
                          />}
                        
                />
            </View>
        )
    }
    const ListFooter = (loading) => () => {
        if (loading) {
            return (
                <View style={{ height: hp(10), width: '100%', borderWidth: 0, marginTop: hp(2) }}>
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
        //console.log('onEndFunction')
        //console.log('lastPage', lastPage)
        if (pageNum <= lastPage) {
            dispatch(getUserHistoryGain('get', userGainHostoryWb, pageNum, listData))
        }
    }
    useEffect(() => {
        dispatch(getUserHistoryGain('get', userGainHostoryWb, 1, []))

    }, [])
    const dispatch = useDispatch();
    let CustomTextsStyle = { borderWidth: 0, alignSelf: 'center', textAlign: 'right', marginRight: wp(1.2), top: hp(.1) };
    return (
        <View style={{ backgroundColor: theme.colors.background, height: hp(99) }} >
            <ActionBar back titleColor={theme.colors.someHeaderColor} title={headerText} navigation={navigation} />
            <View style={styles.container}>
                {error|| loading == true ?
                    <CustomPending
                        style={styles.pending}
                        pending={loading}
                        retryAction={() => dispatch(getUserHistoryGain('get', userGainHostoryWb, 1, []))} /> :
                    renderGainHistoryList()
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