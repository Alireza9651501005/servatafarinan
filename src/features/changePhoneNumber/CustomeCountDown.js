import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../common/constants";
import { useDispatch } from "react-redux";
import { font16, fontSize16 } from "../../utils/helper/responsiveSizes";
import { changeVerifytimer } from "../authentication/actions/authenticationAction";
import { iranSans, mainBlue } from "../../utils/helper/commonVariables";
import CountDown from "react-native-countdown-component";
import { CustomText } from "../../common/components";
import { dontGetVerifyCodeText, verifyCodeSentText } from "./texts";
import Spinner from "react-native-spinkit";
export default function CustomeCountDown({ navigation, loading, timer, onPress }) {
  const dispatch = useDispatch();
  // //console.log('item', item)
  const { userProfileBorderColor, white,blue1 } = theme.colors;
  if (timer) {
    return (
      <View style={{ flexDirection: 'row-reverse', borderWidth: 0, borderColor: 'white', height: hp(5) }}>
        <CustomText style={{ fontSize: fontSize16, color: white }}>
          {verifyCodeSentText}
        </CustomText>
        <CountDown
          style={{ borderWidth: 0, height: hp(3.8), borderColor: 'white', justifyContent: 'flex-end' }}
          size={fontSize16}
          until={timer}
          onFinish={() => dispatch(changeVerifytimer(null))}
          digitStyle={{ backgroundColor: 'transparent', width: wp(5) }}
          digitTxtStyle={{ color: blue1, fontFamily: iranSans }}
          separatorStyle={{ color: blue1 }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: null, s: null }}
          showSeparator
        />
      </View>
    );
  } else {
    return (
      <View style={{ flexDirection: 'row-reverse', height: hp(5), borderWidth: 0 }}>
        {!loading ?
          <CustomText onPress={onPress} style={styles.resendCodeTextStyle}>
            {dontGetVerifyCodeText}
          </CustomText > :
          <Spinner isVisible={true} size={40} type={'ThreeBounce'} color={theme.colors.primary} />}
      </View>


    )
  }

}
const styles = StyleSheet.create({
  resendCodeTextStyle: {
    fontSize: fontSize16,
    color: theme.colors.blue1,
    textDecorationColor: theme.colors.blue1,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },

});