import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { CustomText, RippleEffect } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { fontSize10, fontSize12, fontSize14, fontSize16 } from "../../utils/helper/responsiveSizes";
import { useDispatch, useSelector } from "react-redux";
export default function Badge({ type }) {
    const getLength = (value) => {
        return value ? value.toString().length : null;
    }
    const states = useSelector(state => state);
    const dispatch = useDispatch();
    let newMessageCount = states.home.newMessageCount, fontSize, hasUserCreditGift;
    // console.log('states.home.data.user', states.home.data.user ? states.home.data.user.info.has_credit_gift : null)
    hasUserCreditGift = states.home.data.user ? states.home.data.user.info.has_credit_gift : null
    fontSize = getLength(newMessageCount) == 3 ? fontSize10 : fontSize12

    // //console.log('item', item)
    if (type == 'Credit') {
        return (
            // <View style={styles.CreditStyle} />
            hasUserCreditGift ? <View style={styles.CreditStyle} /> : null
        )
    }
    if (newMessageCount) {
        if (type == 'isFocus') {
            return (
                <View style={styles.containerIsFocus} >
                    <CustomText style={{ fontSize: fontSize, color: theme.colors.textWhite, alignSelf: 'center', marginTop: wp(1) }}>{newMessageCount}</CustomText>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <CustomText style={{ fontSize: fontSize, color: theme.colors.textWhite, alignSelf: 'center', marginTop: wp(1) }}>{newMessageCount}</CustomText>
                </View>
            )

        }
    }
    else {
        return null
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: wp(4.2),
        height: wp(4.2),
        borderRadius: wp(2.1),
        position: 'absolute',
        left: wp(11),
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerIsFocus: {
        backgroundColor: 'red',
        width: wp(4.2),
        height: wp(4.2),
        borderRadius: wp(2.1),
        position: 'absolute',
        // left: wp(7.5),
        // bottom: wp(2.3),
        left: wp(6.5),
        bottom: wp(1.6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    CreditStyle: {
        backgroundColor: 'red',
        width: wp(2.2),
        height: wp(2.2),
        borderRadius: wp(1.5),
        position: 'absolute',
        // left: wp(7.5),
        // bottom: wp(2.3),
        left: wp(11),
        bottom: wp(6.5),
        justifyContent: 'center',
        alignItems: 'center'
    },

});