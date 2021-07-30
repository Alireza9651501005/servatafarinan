import React from "react";
import {  Image } from "react-native";
import { ParentViewActionBar, CustomText } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { aboutUsText,aboutUsDescriptionText,servatAfarinanText } from "./texts";
export default function AboutUsScreen({ navigation }) {
    let logoUrl = require("../../assets/coachPictures/00.jpg");
    let CustomTextsStyle={ marginTop: hp(2),borderWidth:0,width:wp(90),alignSelf:'center',textAlign:'right' };
    return (
        <ParentViewActionBar navigation={navigation} title={aboutUsText} back scroll>
            <Image source={logoUrl} style={{ width: wp(90),height:hp(45), borderWidth: 0, alignSelf: 'center', marginTop: hp(2),borderRadius:hp(2) }} />
            <CustomText bold style={CustomTextsStyle}>
                {servatAfarinanText}
            </CustomText>
            <CustomText  style={CustomTextsStyle}>
                {aboutUsDescriptionText}
            </CustomText>
        </ParentViewActionBar>
    )
}