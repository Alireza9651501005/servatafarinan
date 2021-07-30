import React from "react";
import { Image, View } from "react-native";
import { CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { pageGuideText, pageGuideTitleText, gainHistoryText } from "../texts";
import { fontSize12 } from "../../../utils/helper/responsiveSizes";
import { showPageGuide } from "../actions/userGainHistoryAction";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
export default function PageGuide({ navigation }) {
    let arrowDonw = require("../../../assets/arrowUpAndDown/arrowDown.png");
    let arrowUp = require("../../../assets/arrowUpAndDown/arrowUp.png");
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    let showPageGuideStatus = states.userGainHistoryReducer.showPageGuide;
    let CustomTextsStyle = { alignSelf: 'center', textAlign: 'right', marginRight: wp(1.2), top: hp(.1), fontFamily: iranSansMedium };
    return (
        <View>
            <RippleEffect onPress={() => dispatch(showPageGuide(!showPageGuideStatus))} style={{ flexDirection: 'row', marginTop: hp(-2), borderWidth: 0, justifyContent: 'flex-end', height: hp(5), marginRight: wp(3) }}>
                <CustomText style={CustomTextsStyle}>
                    {pageGuideTitleText}
                </CustomText>
                <Image source={showPageGuideStatus ? arrowUp : arrowDonw} style={{ width: wp(6), height: wp(6), alignSelf: 'center', borderRadius: hp(2), marginRight: wp(1.2) }} />
            </RippleEffect>
            {
                showPageGuideStatus ?
                    <View style={{ width: wp(90), alignSelf: 'center' }}>
                        <CustomText style={{ fontSize: fontSize12 }}>
                            {pageGuideText}
                        </CustomText>
                    </View>
                    : null
            }
            <CustomText style={[CustomTextsStyle, { marginBottom: hp(2), marginTop: hp(1), }]}>
                {gainHistoryText}
            </CustomText>
        </View >
    )
}