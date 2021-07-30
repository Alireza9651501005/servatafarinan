import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView, Text, Pressable, Linking } from "react-native";
import {
    ParentViewActionBar,
    ContentList,
    GradientImageButton,
    CustomPending,
    CustomText,
    MediumButtonWhite, LeaderboardList
} from "../../common/components";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { getLeaderboardData } from "./actions/leaderboardAction";
import { getLeaderboardApi } from "../../utils/api/Url";
export default function LeaderBoardScreen({ route, navigation }) {
    useEffect(() => {
        dispatch(getLeaderboardData(getLeaderboardApi))
    }, []);

    const states = useSelector(state => state);

    let leaderboard = states.leaderboardReducer

    const dispatch = useDispatch();

    const renderPageContent = () => {
        return (
            <View style={{ flex: 1 }}>
                <ContentList contents={leaderboard.leaderboardData.content_rows} />  
                <LeaderboardList type={'monthly'} data={leaderboard.leaderboardData.monthly_top}/>
                <LeaderboardList type={'yearly'} data={leaderboard.leaderboardData.yearly_top}/>
            </View>
        );
    };


    return (
        <ParentViewActionBar
            scroll
            onPullDown={() => dispatch(getLeaderboardData(getLeaderboardApi))}
            navigation={navigation}
            // title={lessonData.data.title}
            back
        >
            {leaderboard.loading == true || !leaderboard.leaderboardData? (
                <CustomPending
                    style={styles.pending}
                    pending={leaderboard.loading}
                    retryAction={() => dispatch(getLeaderboardData(getLeaderboardApi))}
                />
            ) : (
                    renderPageContent()
                )
            }
        </ParentViewActionBar>
    );
}


const styles = StyleSheet.create({
    button: {
        marginRight: wp(5.5)
    },
    buttonView: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: theme.sizes.verticalMargin10
    },
    pending: {
        position: "relative",
        marginTop: hp(34)
    },
    titleAndBuyBtnVuStyle: {
        borderWidth: 1,
        width: wp(90),
        height: hp(10),
        borderWidth: 0,
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    courseDescriptionVuStyle: {
        borderWidth: 1,
        width: wp(90),
        // maxHeight: hp(40),
        borderWidth: 0,
        alignSelf: "center"
        // marginBottom:hp(10)
    }
});
