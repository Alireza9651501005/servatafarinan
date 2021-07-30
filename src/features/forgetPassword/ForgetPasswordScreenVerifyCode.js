import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { AuthenticationParentView } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { CustomeButton } from "../../common/components/CustomeButton";
import { headerText, verifyCodeText, verifyCodeValidateText } from "./texts";
import CToast from "../../common/components/CToast";
import { whiteThird } from "../../utils/helper/commonVariables";
import { theme } from "../../common/constants";
import { checkVerifyCode } from "../authentication/actions/authenticationAction";
import { forgetPasswordAction } from "../forgetPassword/actions/forgetPasswordAction";
import CustomeCountDown from "../changePhoneNumber/CustomeCountDown";
export default function ForgetPasswordScreenVerifyCode({ route, navigation }) {
  const [changeVerifyCOoe, setChangeVerifyCOoe] = useState({ loading: false })
  const states = useSelector(state => state);
  let loading, timeOut, changePhoneNumberLevel, timer, forgetPasswordloading,phoneNumber;
  loading = states.authenticationReducer.loading;
  forgetPasswordloading = states.forgetPasswordReducer.forgetPasswordloading;
  timeOut = states.changePhoneNumberReducer.timeout;
  changePhoneNumberLevel = states.changePhoneNumberReducer.changePhoneNumberLevel;
   phoneNumber = states.authenticationReducer.phoneNumber;
  timer = states.authenticationReducer.timer;
  const dispatch = useDispatch();
  const [verifyCode, setVerifyCode] = useState('');
  const handleVerifyCode = () => {
    verifyCode ? dispatch(checkVerifyCode(verifyCode, phoneNumber, () => { navigation.navigate('ForgetPasswordScreen') })) : CToast(verifyCodeValidateText);
  };
  const apiHandle = value => {
    if (value === "pending") {
      setChangeVerifyCOoe({ loading: true });
    } else if (value === "error") {
      setChangeVerifyCOoe({ loading: false });
    } else {
      setChangeVerifyCOoe({
        loading: false,
      });

    }
  };
  return (
    <AuthenticationParentView
      noRradius
      titleColor={whiteThird}
      navigation={navigation}
      title={headerText}
      back
      buttomPictureContainerHeight={60}
      buttomPicture
    >
      <View style={{ borderWidth: 0, borderColor: 'red', height: hp(33) }}>
        <CustomTxetInputes
          onSubmitEditing={handleVerifyCode}
          lableWrapperStyle={{ marginTop: hp(4) }}
          // lableTextWrapperStyle={theme.colors.textInuteTitleColor}
          onChangeText={text => setVerifyCode(text)}
          value={verifyCode}
          label={verifyCodeText}
          keyboardType="number-pad" />

        <View style={{ width: wp(79.7), alignSelf: "center", marginTop: hp(1) }}>
          <CustomeCountDown
            loading={changeVerifyCOoe.loading}
            onPress={() => dispatch(forgetPasswordAction(phoneNumber, null, 'post', apiHandle))}
            timer={timer} />
        </View>
        <View style={styles.changePasswordBtnContainer}>
          <CustomeButton
            btnStyle={{ alignSelf: 'flex-start', marginTop: hp(3) }}
            onPress={handleVerifyCode}
            loading={loading}
            backgroundColor={theme.colors.blue1}
          >
            {'تایید'}
          </CustomeButton>
        </View>
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
    alignSelf: "center",
  },
});