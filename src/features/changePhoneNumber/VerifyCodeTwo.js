import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { AuthenticationParentView, ParentViewActionBar } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { CustomeButton } from "../../common/components/CustomeButton";
import { headerText, newPhoneNumberText, verifyCodeText, getVerifyCodeText, phoneNumberValidateText, verifyCodeValidateText, resendVerifyCodeText } from "./texts";
import { getVerifyCodeAction, changePhoneNumberLevelAction, changePhoneNumberAction } from "./actions/changePhoneNumberAction";
import CountDown from "react-native-countdown-component";
import CToast from "../../common/components/CToast";
import { font16 } from "../../utils/helper/responsiveSizes";
import { white, mainBlue, lightBlueGrey, iranSans, whiteThird } from "../../utils/helper/commonVariables";
import { RippleEffect } from "../../common/components/RippleEffect";
import { CustomText } from "../../common/components/CustomText";
import { theme } from "../../common/constants";
export default function VerifyCodeTwo({ route, navigation }) {
  //states
  const states = useSelector(state => state);
  let loading, timeOut, changePhoneNumberLevel;
  loading = states.changePhoneNumberReducer.loading;
  timeOut = states.changePhoneNumberReducer.timeout;
  changePhoneNumberLevel = states.changePhoneNumberReducer.changePhoneNumberLevel;
  const dispatch = useDispatch();
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [timer, setTimer] = useState(0);
  const [verifyCode, setVerifyCode] = useState('');
  //fucntion
  const renderCountDown = () => {
    if (changePhoneNumberLevel == 1) {
      return (
        <View style={{ marginRight: 30 }}>
          {timer != 0 ? <CountDown size={font16} until={timer} onFinish={() => setTimer(0)} digitStyle={{ backgroundColor: white }} digitTxtStyle={{ color: mainBlue, fontFamily: iranSans }} separatorStyle={{ color: mainBlue }} timeToShow={["M", "S"]} timeLabels={{ m: null, s: null }} showSeparator /> : null}
        </View>
      );
    }
  };
  const handleChangePhoneNumberOnPress = () => {
    if (!newPhoneNumber) {
      CToast(phoneNumberValidateText)
    } else {
      if (!changePhoneNumberLevel) {
        dispatch(getVerifyCodeAction(newPhoneNumber, changeTimer))
      } else {
        verifyCode ? dispatch(changePhoneNumberAction(verifyCode, newPhoneNumber)) : CToast(verifyCodeValidateText);
      }
    }
  };
  const resendVerifyCodeVu = (title, onPress) => {
    return (
      <View style={{ marginRight: wp(5), marginTop: hp(1) }}>
        <RippleEffect onPress={onPress}>
          <CustomText style={[styles.resendCodeLabel, { color: mainBlue }]}>
            {title}
          </CustomText>
        </RippleEffect>
      </View>
    );
  };
  const changeTimer = (value) => {
    setTimer(value)
  };
  const resendVerifyCode = () => {
    dispatch(getVerifyCodeAction(newPhoneNumber, changeTimer))
  };
  const changeNewPhoneNumberField = () => {
    setVerifyCode('')
    dispatch(changePhoneNumberLevelAction(0))
  };
  return (
    // <ParentViewActionBar followHeaderShape titleColor={whiteThird} navigation={navigation} title={headerText} back>
    <AuthenticationParentView
    noRradius
    titleColor={whiteThird}
    navigation={navigation}
    title={headerText}
    back
    buttomPictureContainerHeight={60}
    // buttomPictureType={'changePasswordMode'}
    buttomPicture
  >
      <CustomTxetInputes  onSubmitEditing={handleChangePhoneNumberOnPress} lableWrapperStyle={{ marginTop: hp(4) }}  onChangeText={text => setVerifyCode(text)} value={verifyCode} label={verifyCodeText} keyboardType="number-pad" disable={loading} />
      {renderCountDown()}
      {changePhoneNumberLevel == 1 && timer == 0 ? resendVerifyCodeVu(resendVerifyCodeText, resendVerifyCode) : null}
      {changePhoneNumberLevel == 1 ? resendVerifyCodeVu(headerText, changeNewPhoneNumberField) : null}
      <View style={styles.changePasswordBtnContainer}>
        <CustomeButton btnStyle={{ alignSelf: 'flex-start', marginTop: hp(3) }} onPress={handleChangePhoneNumberOnPress} loading={loading} backgroundColor={theme.colors.blue1} disable={loading}>
          {'تایید'}
        </CustomeButton>
      </View>
    </AuthenticationParentView>
  );
};
const styles = StyleSheet.create({
  changePasswordBtnContainer: {
    width: wp(79.7),
    height: hp(11.2),
    borderWidth: 0,
    alignItems: 'flex-start',
    // justifyContent: "flex-end",
    alignSelf: "center",
    // flex: 1
  },
  resendCodeLabel: {
    fontSize: font16,
    color: lightBlueGrey
  }
});