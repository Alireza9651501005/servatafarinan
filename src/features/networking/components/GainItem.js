import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import {CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
import { useDispatch } from "react-redux";
import { fontSize12, fontSize14 } from "../../../utils/helper/responsiveSizes";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
export default function GainItem({ navigation, item }) {
    const dispatch = useDispatch();
    // //console.log('item', item)
    return (
        <View>
            <RippleEffect onPress={{}} style={styles.container}>
                <View style={styles.leftCircle} >
                    <View style={[styles.leftInnerCircle, { backgroundColor: item.color }]}>
                        <CustomText style={{ fontSize: fontSize14, fontFamily: iranSansMedium,color:theme.colors.textWhite }}>
                            {item.score}
                        </CustomText>
                    </View>
                </View>
                <View style={styles.gainInfo} >
                    <View style={styles.gainInfoContetnContainer} >
                        <CustomText numberOfLines={1} style={{ fontFamily: iranSansMedium,color:item.color }}>
                            {item.title}
                        </CustomText>
                    </View>
                    <View style={[styles.gainInfoContetnContainer, { flexDirection: 'row', justifyContent: 'flex-end' }]} >
                        <CustomText style={{ fontSize: fontSize12, marginRight: wp(8) }}>
                            {item.date}
                        </CustomText>
                        <CustomText style={{ fontSize: fontSize12 }}>
                            {item.detail}
                        </CustomText>
                    </View>
                </View>
                <View style={styles.rightCircle} >
                    <View style={[styles.rightInnerCircle, { backgroundColor: item.color }]}>
                        <Image source={{ uri: item.icon }} style={{ width: wp(6), height: wp(6), borderWidth: 0, alignSelf: 'center',resizeMode:'contain' }} />
                    </View>
                </View>
            </RippleEffect>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: hp(9.6),
        width: wp(70.2),
        backgroundColor: theme.colors.componentWhite,
        borderRadius: theme.sizes.globalRadius,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'flex-end'
    },
    leftCircle: {
        height: wp(13.9),
        width: wp(13.9),
        backgroundColor: theme.colors.gainCircle,
        borderRadius: wp(7),
        right: wp(-10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftInnerCircle: {
        height: wp(10),
        width: wp(10),
        backgroundColor: theme.colors.gainCircle,
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightCircle: {
        height: wp(19),
        width: wp(19),
        backgroundColor: theme.colors.gainCircle,
        borderRadius: wp(10),
        left: wp(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightInnerCircle: {
        height: wp(14),
        width: wp(14),
        backgroundColor: theme.colors.gainCircle,
        backgroundColor: 'white',
        borderRadius: wp(8),
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1
    },
    gainInfo: {
        width: wp(50),
        height: hp(5.4),
        alignSelf: 'center',
        left: hp(4),
        justifyContent: 'center',
        marginRight: hp(1),
        marginLeft: hp(1),
        marginTop: hp(.8),
    },
    gainInfoContetnContainer: {
        height: hp(3.2),
        borderColor: 'red',
        left: hp(0),
    },
});