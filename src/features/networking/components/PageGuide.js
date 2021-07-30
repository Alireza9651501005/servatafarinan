import React from "react";
import { Image, View } from "react-native";
import { CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { pageGuideText, pageGuideTitleText, gainHistoryText } from "../texts";
import { fontSize12 } from "../../../utils/helper/responsiveSizes";
import { showPageGuide } from "../actions/networkingAction";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
export default function PageGuide({ navigation }) {
    let arrowDonw = require("../../../assets/arrowUpAndDown/arrowDown.png");
    let arrowUp = require("../../../assets/arrowUpAndDown/arrowUp.png");
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    let showPageGuideStatus = states.networkingReducer.showPageGuide;
    let CustomTextsStyle = { alignSelf: 'center', textAlign: 'right', marginRight: wp(1.2), top: hp(.1), fontFamily: iranSansMedium };
    return (
        <View>
            <RippleEffect
                onPress={() => dispatch(showPageGuide(!showPageGuideStatus))}
                style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'flex-end', height: hp(5), alignItems: 'center' }}>
                <CustomText style={CustomTextsStyle}>
                    {pageGuideTitleText}
                </CustomText>
                <View>
                    <Image source={showPageGuideStatus ? arrowUp : arrowDonw} style={{ width: wp(6), height: wp(6), alignSelf: 'center', borderRadius: hp(2) }} />
                </View>
            </RippleEffect>
            {
                showPageGuideStatus ?
                    <View style={{ width: wp(90), alignSelf: 'center' }}>
                        <CustomText style={{ fontSize: fontSize12 }}>
                            {pageGuideText}
                        </CustomText>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <View>
                                <CustomText style={{ fontSize: fontSize12 }}>
                                    {
                                        ` امتیاز         	          
 به ازای هر کاربر 80  امتیاز
 به ازای هر کاربر 40 امتیاز
 به ازای هر کاربر 20 امتیاز
 به ازای هر کاربر 10 امتیاز
                `
                                    }
                                </CustomText>

                            </View>
                            <View style={{ marginRight: 10 }}>
                                <CustomText style={{ fontSize: fontSize12 }}>
                                    {
                                        ` سطح         	          
 سطح یک
 سطح دو
 سطح سه
 سطح چهار
                `
                                    }
                                </CustomText>

                            </View>
                        </View>
                    </View>
                    : null
            }
            <CustomText style={[CustomTextsStyle, { marginBottom: hp(2), marginTop: hp(1), }]}>
                {gainHistoryText}
            </CustomText>
        </View >
    )
}