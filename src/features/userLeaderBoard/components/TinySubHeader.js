import React from "react";
import {  View, StyleSheet } from "react-native";
import { CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import {  yearlyText, monthlyText, monthlyEnText, yearlyEnText } from "../texts";
import { fontSize12, fontSize20 } from "../../../utils/helper/responsiveSizes";
import { changeRankType, getRankList } from "../actions/userLeaderBoardAction";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { theme } from "../../../common/constants";
import { white2 } from "../../../common/constants/theme";
import { monthlyRankWb, yearlyRankWb } from "../../../utils/api/Url";
export default function TinySubHeader({ navigation }) {
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    let rankType;
    rankType = states.userLeaderBoardReducer.rankType;
    const changeRankTypeFunction = (type) => () => {
        dispatch(changeRankType(type,true))
        getRanksList(type)
    }
    const getRanksList = (type) => {
        let url;
        url = rankType == monthlyEnText ? yearlyRankWb : monthlyRankWb;
        if (rankType != type) {
            dispatch(getRankList('get', url, 1, []))
        }
    }
    return (
        <View style={styles.container}>
            <RippleEffect
                onPress={changeRankTypeFunction(yearlyEnText)}
                style={styles.itemStyle}>
                <CustomText numberOfLines={1} style={rankType == yearlyEnText ? styles.activeTextColorStyle : styles.inActiveTextColorStyle}>
                    {yearlyText}
                </CustomText>
            </RippleEffect>
            <RippleEffect
                onPress={changeRankTypeFunction(monthlyEnText)}
                style={styles.itemStyle}>
                <CustomText numberOfLines={1} style={rankType == monthlyEnText ? styles.activeTextColorStyle : styles.inActiveTextColorStyle}>
                    {monthlyText}
                </CustomText>
            </RippleEffect>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(4),
        backgroundColor: theme.colors.headerDarkBlue,
        // borderWidth: 1,
        borderColor: white2,
        flexDirection: "row",
        bottom: hp(27),
        zIndex: 2,
        position: 'absolute'
    },
    itemStyle: {
        width: wp(50),
        backgroundColor: theme.colors.headerDarkBlue,
        borderColor: white2,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    activeTextColorStyle: {
        color: theme.colors.componentWhite,
        fontFamily: iranSansMedium,
        fontSize: fontSize20
        //checko font size with mohmmad
    },
    inActiveTextColorStyle: {
        color: theme.colors.inActiveText,
        fontSize: fontSize12,
        bottom: hp(.8),
        opacity:.86
    },
});