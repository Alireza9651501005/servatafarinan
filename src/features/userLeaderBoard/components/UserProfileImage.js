import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {  fontSize14, fontSize16 } from "../../../utils/helper/responsiveSizes";
import { iranSansMedium, whiteThird } from "../../../utils/helper/commonVariables";
import { theme } from "../../../common/constants";
export function UserProfileImage({ navigation, size, style, simpleMode, image, data,onPress,ownerAccount }) {
    if (simpleMode) {
        return (
            <View style={[styles.container, style]}>
                <View style={[styles.userImageContainer, { width: wp(size), height: wp(size), borderRadius: wp(size / 2) }]}>
                    <Image
                        style={image ? [styles.userImageContainer, { borderWidth:ownerAccount?hp(.15): hp(.2), borderRadius: wp(size / 2) }] : styles.userDefaultImageStyle}
                        source={image ? { uri: image } : require('../../../assets/userDefaultProfile/userDefaultProfile.png')} />
                </View>
            </View>
        )

    } else {
        return (
            <View  style={[styles.container, style]}>
                <RippleEffect onPress={onPress(data ? data.id : null)} style={[styles.userImageContainer, { width: wp(size), height: wp(size), }]}>
                    <Image
                        style={data ? [styles.userImageContainer, size == 25 ? { width: wp(size), height: wp(size), borderRadius: wp(size / 2), borderWidth: hp(.3) } : { width: wp(size), height: wp(size), borderRadius: wp(size / 2), borderWidth: hp(.3) }] : styles.userDefaultImageStyle}
                        source={data ? { uri: data.image } : require('../../../assets/userDefaultProfile/userDefaultProfile.png')} />

                    <View style={[styles.userRankCircle, size == 25 ? { left: wp(17), top: hp(9.5) } : {}]} >
                        <CustomText numberOfLines={1} style={[styles.userNameTextStyle, { color: theme.colors.userProfileBorderColor, fontSize: fontSize16 }]}>
                            {data ? data.rank : null}
                        </CustomText>
                   
                    </View>
                </RippleEffect>
                <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 0, paddingTop: hp(1.5) }}>
                    <CustomText numberOfLines={1} style={styles.userNameTextStyle}>
                        {data ? data.username : null}
                    </CustomText>
                    <CustomText numberOfLines={1} style={styles.userNameTextStyle}>
                        {data ? data.scores : null}
                    </CustomText>
                </View>
            </View>
        )

    }

}
const styles = StyleSheet.create({
    container: {
        width: wp(30),
        alignItems: "center",
        justifyContent:'center',
        borderColor: whiteThird,
    },
    userNameTextStyle: {
        color: theme.colors.componentWhite2,
        fontSize: fontSize14,
        fontFamily: iranSansMedium,
        top: hp(.3)
    },
    userImageContainer: {
        width: '100%',
        height: '100%',
        borderColor: theme.colors.userProfileBorderColor,
        justifyContent: 'center'
    },
    userDefaultImageStyle: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(3.5),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    userRankCircle: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(5),
        borderWidth: hp(.3),
        borderColor: theme.colors.userProfileBorderColor,
        backgroundColor: theme.colors.rewardBackGround,
        left: wp(14.5),
        top: hp(7),
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center'
    },
});