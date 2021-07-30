import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { whiteThird } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import { checkUserAccount, changePassword, changeVerifyCode, checkVerifyCode, changeAuthentionLevel } from "./actions/authenticationAction";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import CToast from "../../common/components/CToast";
import { AuthenticationParentView } from '../../common/components/AuthenticationParentView';
import { CustomeButton } from '../../common/components/CustomeButton';
import { theme } from "../../common/constants";
import CustomeCountDown from "../changePhoneNumber/CustomeCountDown";
export default function VerifyScreen({ route, navigation }) {
  const [verifyCode, setVerifyCode] = useState('');
  useEffect(() => {
    return () => {
      // dispatch(changePhoneNumber(""));
      dispatch(changePassword(""));
      dispatch(changeVerifyCode(""));
      dispatch(changeAuthentionLevel(1));
    };
  }, []);
  const dispatch = useDispatch();
  const states = useSelector(state => state);
  let phoneNumber,
    loading,
    authenticationReducerStep,
    password,
    timer;
  phoneNumber = states.authenticationReducer.phoneNumber;
  loading = states.authenticationReducer.loading;
  timer = states.authenticationReducer.timer;
  authenticationReducerStep =
    states.authenticationReducer.authenticationReducerStep;
  password = states.authenticationReducer.password;
  const authentication = () => {
    if (verifyCode) {
      dispatch(checkVerifyCode(verifyCode, phoneNumber, () => navigation.navigate('Register')));
    } else {
      CToast("لطفا کد تایید خود را وارد نمایید.");
    }
  };
  return (
    <AuthenticationParentView
      noRradius
      titleColor={whiteThird}
      navigation={navigation}
      title={'خوش آمدی!'}
      back
      // buttomPictureContainerHeight={63}
      buttomPicture
    >
      {/* <View style={{ borderWidth: 1, borderColor: 'red', height: hp(30) }}> */}
      <CustomTxetInputes
        onChangeText={text => (setVerifyCode(text))}
        value={verifyCode}
        label={"کد ارسال شده"}
        keyboardType="numeric"
        lableWrapperStyle={{ marginTop: hp(3.9) }}
        maxLength={11}
        onSubmitEditing={authentication}
      />
      <View style={{ width: wp(79.7), alignSelf: "center", marginTop: hp(1) }}>
        <CustomeCountDown
          loading={loading}
          onPress={() => dispatch(checkUserAccount(phoneNumber))}
          timer={timer} />
      </View>
      <View style={styles.changePasswordBtnContainer}>
        <CustomeButton
          btnStyle={{ alignSelf: 'flex-start', marginTop: hp(2) }}
          onPress={authentication}
            checkUserPassword
            loading={timer ? loading : null}
            backgroundColor={theme.colors.blue1}
          >
            {'ادامه'}
          </CustomeButton>
        </View>
      {/* </View> */ }
    </AuthenticationParentView >
  );
}
const styles = StyleSheet.create({
  changePasswordBtnContainer: {
    width: wp(79.7),
    height: hp(6.2),
    borderWidth: 0,
    alignItems: 'flex-start',
    alignSelf: "center",
  },
});
