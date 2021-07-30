import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import { AuthenticationParentView } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { CustomeButton } from "../../common/components/CustomeButton";
import { headerText, newPassText, repeatNewPassText, confirmText, wholeFieldValidationTxt, missMatchPassTxt } from "./texts";
import CToast from "../../common/components/CToast";
import { theme } from "../../common/constants";
import { whiteThird } from "../../utils/helper/commonVariables";
import { forgetPasswordAction } from './actions/forgetPasswordAction';
export default function ForgetPasswordScreen({ route, navigation }) {
  const states = useSelector(state => state);
  const [newPass, setNewPass] = useState('');
  const [repeatNewPass, setRepeatNewPass] = useState('');
  const [changePassData, setChangePassData] = useState({ loading: false })
  const dispatch = useDispatch();
  const apiHandle = value => {
    if (value === "pending") {
      setChangePassData({ loading: true });
    } else if (value === "error") {
      setChangePassData({ loading: false });
    } else {
      setChangePassData({
        loading: false,
      });
      setNewPass('')
      setRepeatNewPass('')
    }
  };
  const changeNewPass = (value) => {
    setNewPass(value)
  };
  const changeRepeatNewPass = (value) => {
    setRepeatNewPass(value)
  };
  const handleForgetPassword = (value) => {
    let phoneNumber = states.authenticationReducer.phoneNumber;
    if (!newPass || !repeatNewPass) {
      CToast(wholeFieldValidationTxt)
    } else if (newPass != repeatNewPass) {
      CToast(missMatchPassTxt)
    } else {
      dispatch(forgetPasswordAction(phoneNumber, newPass, 'put', apiHandle))
    }
  };
  return (
    <AuthenticationParentView
      noRradius
      titleColor={whiteThird}
      navigation={navigation}
      title={headerText}
      back
      buttomPictureContainerHeight={50}
      buttomPicture
    >
      <View style={{ borderWidth: 0, borderColor: 'red', height: hp(43) }}>
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(4) }}
          onChangeText={text => changeNewPass(text)}
          value={newPass}
          label={newPassText} password />
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(1.2) }}
          onChangeText={text => changeRepeatNewPass(text)}
          value={repeatNewPass}
          label={repeatNewPassText} password />
        <View style={styles.changePasswordBtnContainer}>
          <CustomeButton
            btnStyle={{ alignSelf: 'flex-start', marginTop: hp(3) }}
            onPress={handleForgetPassword}
            checkUserPassword
            loading={changePassData.loading}
            backgroundColor={theme.colors.blue1}>
            {confirmText}
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