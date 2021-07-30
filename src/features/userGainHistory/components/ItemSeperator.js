import React, { useState } from "react";
import { Image, View } from "react-native";
import { ParentViewActionBar, CustomText, RippleEffect } from "../../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../../common/constants";
// import { showModalConfirm } from "../../store/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { pageGuideText, pageGuideTitleText } from "../texts";
import { fontSize12 } from "../../../utils/helper/responsiveSizes";
// import { headerText } from "./texts";
export default function ItemSeperator({ navigation }) {
    let arrowDonw = require("../../../assets/arrowUpAndDown/arrowDown.png");
    let arrowUp = require("../../../assets/arrowUpAndDown/arrowUp.png");
    const dispatch = useDispatch();
    const [showPageGuide, setShowPageGuide] = useState(false);
    let CustomTextsStyle = { borderWidth: 0, alignSelf: 'center', textAlign: 'right', marginRight: wp(1.2), top: hp(.1) };
    return (
        <View style={{ height: hp(5), width: wp(70.2), alignSelf: 'center', borderWidth: 0, flexDirection: 'row-reverse' }}>
            <View style={{ backgroundColor: theme.colors.componentWhite, height: hp(7), width: wp(2) }} />
        </View>
    )
}