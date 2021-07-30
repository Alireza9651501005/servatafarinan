import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { AuthenticationParentView } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { CustomeButton } from "../../common/components/CustomeButton";
import { headerText, verifyCodeText, verifyCodeValidateText } from "./texts";
import CToast from "../../common/components/CToast";
import {  whiteThird } from "../../utils/helper/commonVariables";
import { theme } from "../../common/constants";
import { checkVerifyCode } from "../authentication/actions/authenticationAction";
import { changePhoneNumberAction } from "./actions/changePhoneNumberAction";
import { phoneNumberVerrificationCode, refreshToken } from "../../utils/api/Url";
import CustomeCountDown from "./CustomeCountDown";
import { saveAccessToken } from "../../store/globalActions";
export default function changePhoneNumberVerifyCode({ route, navigation }) {
  let routeName = route.params;
  //console.log('routeName', routeName)
  //states
  const [changeVerifyCode, setChangeVerifyCode] = useState({ loading: false })

  const states = useSelector(state => state);
  let loading, timeOut, changePhoneNumberLevel, timer, forgetPasswordloading;
  loading = states.authenticationReducer.loading;
  forgetPasswordloading = states.forgetPasswordReducer.forgetPasswordloading;
  timeOut = states.changePhoneNumberReducer.timeout;
  changePhoneNumberLevel = states.changePhoneNumberReducer.changePhoneNumberLevel;
  timer = states.authenticationReducer.timer;
  const dispatch = useDispatch();
  const [verifyCode, setVerifyCode] = useState('');
  const handleVerifyCode = () => {
    let phoneNumber = states.authenticationReducer.phoneNumber;
      verifyCode ? dispatch(checkVerifyCode(verifyCode, routeName.phoneNumber, () => {
        navigation.navigate('AuthenticationStepOne')
        dispatch(saveAccessToken(''))
        dispatch(refreshToken(''))
      }, phoneNumberVerrificationCode)) : CToast(verifyCodeValidateText);

  };
  const apiHandle = value => {
    if (value === "pending") {
      setChangeVerifyCode({ loading: true });
    } else if (value === "error") {
      setChangeVerifyCode({ loading: false });
    } else {
      setChangeVerifyCode({
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
      buttomPictureType={'changePasswordMode'}
      buttomPicture
    >
      <View style={{ height: hp(33), borderWidth: 0, borderColor: "yellow" }}>
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(4) }}
          onChangeText={text => setVerifyCode(text)}
          value={verifyCode}
          label={verifyCodeText}
          keyboardType="number-pad"
          disable={loading}
          onSubmitEditing={handleVerifyCode}
        />

        <View style={{ width: wp(79.7), alignSelf: "center", marginTop: hp(1) }}>
          <CustomeCountDown
            loading={changeVerifyCode.loading}
            onPress={() => dispatch(changePhoneNumberAction(routeName.phoneNumber, apiHandle))}
            timer={timer} />
        </View>
        <View style={styles.changePasswordBtnContainer}>
          <CustomeButton
            btnStyle={{ alignSelf: 'flex-start', marginTop: hp(3) }}
            onPress={handleVerifyCode}
            loading={timer ? loading : null}
            backgroundColor={theme.colors.blue1} >
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
  }
}); 