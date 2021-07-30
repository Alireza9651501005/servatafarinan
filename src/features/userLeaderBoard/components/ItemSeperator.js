import React from "react";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
export default function ItemSeperator({ navigation }) {
    return (
        <View style={{ height: hp(5), width: wp(70.2), alignSelf: 'center', borderWidth: 0, flexDirection: 'row-reverse' }}>
            <View style={{ backgroundColor: theme.colors.componentWhite, height: hp(7), width: wp(2) }} />
        </View>
    )
}