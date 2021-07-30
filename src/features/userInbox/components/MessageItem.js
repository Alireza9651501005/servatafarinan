import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
import { fontSize10, fontSize12, fontSize14 } from "../../../utils/helper/responsiveSizes";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { useDispatch, useSelector } from "react-redux";
import { currentMessage } from "../actions/userInboxAction";
import * as NavigationService from '../../../utils/NavigationService';

export default function MessageItem({ navigation, item, index }) {
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    let userInboxReducer;
    userInboxReducer = states.userInboxReducer;
    // //console.log('item', item)
    const { textInuteTitleColor, seenMEssage } = theme.colors;
    let textColor = item ? item.read ? seenMEssage : textInuteTitleColor : null;
    // let textColor = item ? item.read ? seenMEssage : textInuteTitleColor : null
    const showMessage = () => {
        let seenMessage;
        // //console.log('userInboxReducer.listData[item.id]', userInboxReducer.listData[index].read = true)
        dispatch(currentMessage(item))
        NavigationService.navigate('FullMessageScreen', { id: item.id, title: item.title, index: index })

    }
    return (
        <RippleEffect onPress={showMessage} style={{ backgroundColor: theme.colors.componentWhite, width: wp(86), borderRadius: theme.sizes.globalRadius, alignSelf: 'center' }}>
            {ShowMessageDateAndTimeComponent(showMessage, item ? item.date : null, item ? item.hour : null, item ? item.title : null, item ? item.short_description : null,item)}
        </RippleEffect>
    )
}
export const ShowMessageDateAndTimeComponent = (onPress, date, time, title, description,item) => {
    const { textInuteTitleColor, seenMEssage } = theme.colors;
    let textColor = item ? item.read ? seenMEssage : textInuteTitleColor : null;
    return (
        // <RippleEffect onPress={onPress} style={styles.container}>
        <View style={styles.container}>
            <View style={[styles.containerChildStyle, { width: wp(16), marginRight: hp(0), alignItems: 'flex-end' }]} >
                <View style={styles.messageDateAndTimeStyle} >
                    <CustomText numberOfLines={1} style={{ fontFamily: iranSansMedium, color: textColor, fontSize: fontSize12 }}>
                        {date}
                    </CustomText>
                </View>
                <View style={[styles.messageDateAndTimeStyle]} >
                    <CustomText style={{ fontSize: fontSize12, fontFamily: iranSansMedium, color: textColor }}>
                        {time}
                    </CustomText>
                </View>
            </View>
            <View style={[styles.containerChildStyle]} >
                <View style={styles.messageContainerStyle} >
                    <CustomText numberOfLines={1} style={{ fontFamily: iranSansMedium, color: textColor,borderWidth:0,top:hp(.5) }}>
                        {title}
                    </CustomText>
                </View>
                <View style={[styles.messageContainerStyle, { flexDirection: 'row', justifyContent: 'flex-end' }]} >
                    <CustomText numberOfLines={1} style={{ fontSize: fontSize12, color: textColor, fontFamily: iranSansMedium,borderWidth:0,top:hp(.4) }}>
                        {description}
                    </CustomText>
                </View>
            </View>
        </View>
        // </RippleEffect>

    )
}
const styles = StyleSheet.create({
    container: {
        height: hp(10),
        width: wp(86),
        borderRadius: theme.sizes.globalRadius,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'flex-end',
        // borderWidth:1,
        // backgroundColor:'red'
    },
    containerChildStyle: {
        width: wp(62),
        height: hp(5.4),
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: hp(2),
        // borderWidth: 1
    },
    itemTwo: {
        width: wp(20),
        height: hp(5.4),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    messageContainerStyle: {
        height: hp(3.2),
        borderColor: 'red',
    },
    messageDateAndTimeStyle: {
        height: hp(3.2),
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        width: wp(16),
        alignItems: 'flex-end'
    },
});