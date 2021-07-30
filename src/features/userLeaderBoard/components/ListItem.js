import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomText, RatingStars, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
import { fontSize16 } from "../../../utils/helper/responsiveSizes";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { UserProfileImage } from "./UserProfileImage";
export default function ListItem({ navigation, item, ownerAccount, wrapperStyle, specialItem, userStars, innerContainerwrapperStyle, onPress }) {
    const { userProfileBorderColor, componentWhite2, userItemBackgroundInLeaderBoard, componentWhite } = theme.colors;
    if (specialItem) {
        return (
            <RippleEffect rippleSize={1} onPress={onPress} style={[styles.specialItemRippleEffectcontainer, wrapperStyle]}>
                <View style={[styles.container, { height: wp(13.5), width: wp(78), backgroundColor: userItemBackgroundInLeaderBoard }, innerContainerwrapperStyle]}>
                    <View style={[{ width: wp(62), justifyContent: 'space-between', flexDirection: 'row' },]}>
                        <View style={{ width: wp(25), justifyContent: 'center', alignItems: 'center', right: wp(2.5) }}>
                            <CustomText
                                numberOfLines={1}
                                style={{
                                    textAlign: 'center',
                                    width: wp(25),
                                    fontFamily: iranSansMedium,
                                    color: componentWhite2,
                                    fontSize: fontSize16,
                                    alignSelf: 'center'
                                }}>
                                {item ? item.scores : null}
                            </CustomText>
                            <View style={{ bottom: wp(.4) }}>
                                <RatingStars type={'profile'} rate={userStars} medium />
                            </View>
                        </View>
                        <CustomText
                            numberOfLines={1}
                            style={{
                                width: wp(35),
                                fontFamily: iranSansMedium,
                                color: componentWhite2,
                                fontSize: fontSize16,
                                marginRight: wp(1),
                                marginTop: hp(1)
                            }}>
                            {item ? item.username : null}
                        </CustomText>
                    </View>
                    <View style={{ width: wp(11), height: wp(12), justifyContent: 'center', alignItems: 'center', left: wp(3) }}>
                        <UserProfileImage
                            ownerAccount
                            image={item ? item.image : null}
                            specialItem
                            simpleMode
                            size={11}
                            style={{}} />
                    </View>
                </View>
                <View style={{ width: wp(10), justifyContent: 'flex-end', alignSelf: 'center', height: wp(14) }}>
                    <CustomText
                        numberOfLines={1}
                        style={{
                            fontFamily: iranSansMedium,
                            color: componentWhite2,
                            fontSize: fontSize16, bottom: hp(1.7), right: wp(.5)
                        }}>
                        {item ? item.rank : null}
                    </CustomText>
                </View>
            </RippleEffect >
        )
    }
    else if (ownerAccount) {
        return (
            <RippleEffect rippleSize={1} onPress={onPress} style={[styles.rippleEffectcontainer, wrapperStyle]}>
                <View style={[styles.container, { height: hp(7), width: wp(78), backgroundColor: userItemBackgroundInLeaderBoard }, innerContainerwrapperStyle]}>
                    <View style={[{ width: wp(62), borderColor: 'blue', justifyContent: 'space-between', flexDirection: 'row' },]}>
                        <View style={{ width: wp(25), justifyContent: 'center', alignItems: 'center', right: wp(4.5) }}>
                            <CustomText
                                numberOfLines={1}
                                style={{ fontFamily: iranSansMedium, color: componentWhite2, fontSize: fontSize16, alignSelf: 'center' }}>
                                {item ? item.scores : null}
                            </CustomText>
                            <View style={{ bottom: hp(.4) }}>
                                <RatingStars type={'profile'} rate={userStars} medium />
                            </View>
                        </View>
                        <CustomText
                            numberOfLines={1}
                            style={{ width: wp(34), fontFamily: iranSansMedium, color: componentWhite2, fontSize: fontSize16, marginRight: wp(8), marginTop: hp(1) }}>
                            {item ? item.username : null}
                        </CustomText>
                    </View>
                    <View style={{ width: wp(11), height: hp(7), justifyContent: 'center', alignItems: 'center' }}>
                        <UserProfileImage
                            ownerAccount
                            image={item ? item.image : null}
                            specialItem
                            simpleMode
                            size={14.3}
                            style={{}} />
                    </View>
                </View>
                <View style={{ width: wp(10), justifyContent: 'flex-end', alignSelf: 'center', height: hp(7) }}>
                    <CustomText
                        numberOfLines={1}
                        style={{ fontFamily: iranSansMedium, color: userProfileBorderColor, fontSize: fontSize16, bottom: hp(1.5), right: specialItem ? wp(3.5) : wp(2.6) }}>
                        {item ? item.rank : null}
                    </CustomText>
                </View>
            </RippleEffect>
        )

    } else {
        return (
            <View style={[styles.rippleEffectcontainer, wrapperStyle]}>
                <RippleEffect onPress={onPress} style={[styles.container, { width: wp(78), backgroundColor: componentWhite, }]}>
                    <View style={{ width: wp(65), borderColor: 'red', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <CustomText
                            numberOfLines={1
                            } style={{
                                width: wp(20),
                                fontFamily: iranSansMedium,
                                color: userProfileBorderColor,
                                fontSize: fontSize16,
                                top: hp(.2),
                                textAlign: 'center',
                            }}>
                            {item ? item.scores : null}
                        </CustomText>
                        <CustomText numberOfLines={1} style={{ width: wp(35), fontFamily: iranSansMedium, color: userProfileBorderColor, fontSize: fontSize16, marginRight: wp(4) }}>
                            {item ? item.username : null}
                        </CustomText>
                    </View>
                    <View style={{ width: wp(11), height: hp(7), justifyContent: 'center', alignItems: 'center' }}>
                        <UserProfileImage image={item ? item.image : null} simpleMode size={13.6} style={{}} />
                    </View>
                </RippleEffect>
                <View style={{ width: wp(10), justifyContent: 'flex-end', alignSelf: 'center', height: hp(7) }}>
                    <CustomText numberOfLines={1}
                        style={{
                            fontFamily: iranSansMedium,
                            color: userProfileBorderColor,
                            fontSize: fontSize16,
                            right: wp(3),
                            bottom: hp(1.5),
                            width: wp(10),
                            textAlign: 'center',
                            left: wp(1)
                        }}>
                        {item ? item.rank : null}
                    </CustomText>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    rippleEffectcontainer: {
        height: wp(14),
        width: wp(88),
        borderRadius: theme.sizes.globalRadius,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'flex-end',
        marginTop: wp(3),
        left: wp(2)
    },
    specialItemRippleEffectcontainer: {
        height: wp(15),
        width: wp(88),
        borderRadius: theme.sizes.globalRadius,
        backgroundColor: theme.colors.userItemBackgroundInLeaderBoard,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    container: {
        height: hp(7),
        width: wp(85),
        borderRadius: theme.sizes.globalRadius,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'flex-end',
    },
});