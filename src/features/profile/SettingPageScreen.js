import React from "react";
import { Image, View } from "react-native";
import { ParentViewActionBar, CustomText, RippleEffect } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { aboutUsText, aboutUsDescriptionText, servatAfarinanText, confirmLogOutModalTitleText, confirmLogOutText, changePasswordText, changePhoneNumberText, settingPageHeaderText } from "./texts";
import { theme } from "../../common/constants";
import { showModalConfirm } from "../../store/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./actions/profileAction";
export default function SettingPageScreen({ navigation }) {
    let phoneImg = require("../../assets/setting/phone.png");
    let lockImg = require("../../assets/setting/lock.png");
    let logOutImg = require("../../assets/setting/logOut.png");
    const dispatch = useDispatch();
    let CustomTextsStyle = { borderWidth: 0, alignSelf: 'center', textAlign: 'right', marginRight: wp(1.2), top: hp(.1) };
    const item = (title, onPress, src) => {
        return (
            <RippleEffect onPress={onPress} style={{ flexDirection: 'row', marginTop: hp(.5), borderWidth: 0, justifyContent: 'flex-end', height: hp(5), marginRight: wp(4) }}>
                <CustomText style={CustomTextsStyle}>
                    {title}
                </CustomText>
                <Image source={src} style={{ width: wp(6), height: wp(6), borderWidth: 0, alignSelf: 'center', borderRadius: hp(2), marginRight: wp(1.2) }} />
            </RippleEffect>
        )
    }
    const closeModal = (value) => {
        dispatch(showModalConfirm(false, confirmLogOutModalTitleText, confirmLogOutText, null, null, null))
        value == 'success' ? navigation.navigate('Home') : null
    }
    return (
        <ParentViewActionBar followHeaderShape titleColor={theme.colors.someHeaderColor} navigation={navigation} title={settingPageHeaderText} back scroll>
            {item(changePhoneNumberText, () => navigation.navigate('ChangePhoneNumberScreen'), phoneImg)}
            {item(changePasswordText, () => navigation.navigate('ChangePasswordScreen'), lockImg)}
            {item(confirmLogOutModalTitleText, () => dispatch(showModalConfirm(true, confirmLogOutModalTitleText, confirmLogOutText, () => dispatch(logOut(closeModal)), null, null)), logOutImg)}
        </ParentViewActionBar>
    )
}