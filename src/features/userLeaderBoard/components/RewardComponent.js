import React from "react";
import { Image, StyleSheet ,Platform} from "react-native";
import { CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { rewardText } from "../texts";
import { fontSize12, fontSize16 } from "../../../utils/helper/responsiveSizes";
import { iranSansMedium } from "../../../utils/helper/commonVariables";
import { theme } from "../../../common/constants";
import { white2 } from "../../../common/constants/theme";
import * as NavigationService from "../../../utils/NavigationService";

export default function RewardComponent({ navigation, item, onPress }) { 
    return (
        <RippleEffect onPress={() => NavigationService.navigate("ScoresPage")} style={styles.rewardStyle}>
            <Image style={styles.rewardIamgeStyle} source={require('../../../assets/reward/reward.png')} />
            <CustomText numberOfLines={1} style={{ fontFamily: iranSansMedium, top: hp(.3) }}>
                {rewardText}
            </CustomText>
        </RippleEffect>
    )
}
const styles = StyleSheet.create({ 
    rewardStyle: {
        width: wp(20),
        height: hp(10),
        backgroundColor: theme.colors.rewardBackGround,
        alignSelf: 'center',
        borderRadius: theme.sizes.globalRadius,
        bottom:Platform.OS==='ios'?hp(-1.2): hp(0),
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        borderWidth:Platform.OS==='ios'?hp(.3): hp(.5),
        borderColor:theme.colors.giftBorderColor
    },
    rewardIamgeStyle: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(2),
        resizeMode: 'contain',
        alignSelf: 'center',
        top: hp(.5)
    },
});