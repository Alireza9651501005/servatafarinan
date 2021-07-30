import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import {CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
import { fontSize12, fontSize14, fontSize16 } from "../../../utils/helper/responsiveSizes";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { useDispatch, useSelector } from "react-redux";
export default function ListEmpty({ navigation, item,style,src,message,imageStyle }) {
    const states = useSelector(state => state);
    const dispatch = useDispatch();
    // //console.log('item', item)
    return (
        <View style={[styles.container,style]}>
            <Image style={[imageStyle,{resizeMode:'contain'}] } source={src}/>
            <CustomText style={{ marginTop: hp(1.7),fontSize:fontSize16 }}>
                            {message}
                        </CustomText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // height: hp(9.6),
        width: wp(70.2),
        // backgroundColor: theme.colors.componentWhite,
        // borderRadius: theme.sizes.globalRadius,
        alignSelf: 'center',
        // flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'flex-end',
        // borderWidth:1,
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