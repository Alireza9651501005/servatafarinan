import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { CustomPending, ActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { headerText, monthlyEnText } from "./texts";
import ListItem from './components/ListItem';
import { changeRankType, getRankList } from "./actions/userLeaderBoardAction";
import { monthlyRankWb, yearlyRankWb } from '../../utils/api/Url';
import TopRankHeader from "./components/TopRankHeader";
import { whiteThird } from "../../utils/helper/commonVariables";
import RewardComponent from "./components/RewardComponent";
// import {getUserPublicProfile} from './actions/userScoreAction';

export default function UserLeaderBoardScreen({ navigation }) {
    const [onViewableItems, setOnViewableItems] = useState([])
    const [showSpecialUserItem, setShowSpecialUserItem] = useState(false)
    const [secondCondition, setSecondCondition] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        let userCheck = user ? user.username : null;
        for (let index = 0; index < onViewableItems.length; index++) {
            const element = onViewableItems[index];
            if (userCheck === element.item.username) {
                setShowSpecialUserItem(false)
                break;
            } else {
                setShowSpecialUserItem(true)
            }
        }
        let secondCondtion = listData.length != 0 ? listData[0].username == user.username || listData[1].username == user.username || listData[2].username == user.username ? false : true : null;
        setSecondCondition(secondCondtion)

    }, [onViewableItems])

    const states = useSelector(state => state);
    let loading, error, listData, pageNum, lastPage, listLoading, rankType, user, tabMode, tabModeLoading;
    loading = states.userLeaderBoardReducer.loading;
    error = states.userLeaderBoardReducer.error;
    listData = states.userLeaderBoardReducer.listData;
    pageNum = states.userLeaderBoardReducer.pageNum;
    lastPage = states.userLeaderBoardReducer.ranksList.last_page;
    listLoading = states.userLeaderBoardReducer.listLoading;
    rankType = states.userLeaderBoardReducer.rankType;
    tabMode = states.userLeaderBoardReducer.tabMode;
    tabModeLoading = states.userLeaderBoardReducer.tabModeLoading;
    user = states.userLeaderBoardReducer.ranksList.user;
    const onViewRef = React.useRef((viewableItems, user) => {
        let array = viewableItems.viewableItems;
        setOnViewableItems(array)
    })
    const goToPublicProfile = (id) => () => {
        navigation.navigate('PublicProfileScreen', { id: id })
    }
    const renderRanksList = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, borderWidth: wp(0), borderColor: 'red', borderRadius: theme.sizes.globalRadius }}>
                    <View style={{ height: hp(35), borderWidth: wp(0), marginBottom: hp(1) }}>
                        <TopRankHeader onPress={goToPublicProfile} item={listData.slice(0, 3)} />
                        <RewardComponent />
                    </View>
                    <View style={{ flex: showSpecialUserItem && secondCondition ? .97 : 1, borderWidth: wp(0), zIndex: -1 }}>
                        {error || tabModeLoading ?
                            <CustomPending
                                style={[styles.pending, { marginTop: hp(25) }]}
                                pending={tabModeLoading}
                                retryAction={() => dispatch(getRankList('get', url, 1, []))} />
                            :
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                        onRefresh={() => {
                                            dispatch(getRankList('get', url, 1, []))
                                            dispatch(changeRankType(rankType, true))
                                        }}
                                    />}
                                onViewableItemsChanged={onViewRef.current}
                                viewabilityConfig={{
                                    itemVisiblePercentThreshold: 50
                                }}
                                contentContainerStyle={{ paddingBottom: hp(2) }}
                                data={listData.slice(3, listData.length - 1)}
                                keyExtractor={(_, i) => i.toString()}
                                renderItem={({ item, index }) => <ListItem
                                    wrapperStyle={{ marginTop: index == 0 ? wp(1) : wp(3) }}
                                    onPress={goToPublicProfile(item.id)}
                                    userStars={user.stars}
                                    ownerAccount={item.username == user.username}
                                    item={item}
                                    index={index} />}
                                ListFooterComponent={ListFooter(listLoading)}
                                onEndReached={({ distanceFromEnd }) => {
                                    if (distanceFromEnd >= 0) {
                                        onEndFunction();
                                    }
                                }}
                                onEndReachedThreshold={0.3}
                            />
                        }
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {showSpecialUserItem && secondCondition ?
                            <ListItem
                                onPress={goToPublicProfile(user.id)}
                                specialItem
                                userStars={user.stars}
                                innerContainerwrapperStyle={{ right: wp(-1), borderWidth: 0 }}
                                wrapperStyle={{
                                    backgroundColor: theme.colors.userItemBackgroundInLeaderBoard,
                                    height: hp(8),
                                    width: wp(92),
                                    left: wp(0),

                                }}
                                ownerAccount
                                item={user} />
                            : null}
                    </View>
                </View>
            </View >
        )
    }
    const ListFooter = (loading) => () => {
        if (loading) {
            return (
                <View style={{ height: hp(5), width: '100%', borderWidth: 0, marginTop: hp(2), paddingBottom: hp(2), bottom: hp(1.5) }}>
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
        url = rankType == monthlyEnText ? monthlyRankWb : yearlyRankWb;
        if (pageNum <= lastPage) {
            dispatch(getRankList('get', url, pageNum, listData))
        }
    }

    let url;
    url = rankType === monthlyEnText ? monthlyRankWb : yearlyRankWb;

    useEffect(() => {
        dispatch(getRankList('get', url, 1, []))
        // console.log(url);
    }, [])
    
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.bgGray }} >
            <View style={{ height: hp(7), borderWidth: wp(0) }}>
                <ActionBar noRradius back title={headerText} titleColor={whiteThird} />
            </View>
            {error || loading == true && !tabMode ?
                <CustomPending
                    style={styles.pending}
                    pending={loading}
                    retryAction={() => dispatch(getRankList('get', url, 1, []))} /> :
                renderRanksList()
            }
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