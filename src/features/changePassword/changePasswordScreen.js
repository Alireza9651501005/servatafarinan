import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import { AuthenticationParentView } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { CustomeButton } from "../../common/components/CustomeButton";
import { headerText, newPassText, repeatNewPassText, currentPassText, confirmText, wholeFieldValidationTxt, missMatchPassTxt } from "./texts";
import { changePasswordUserpassword } from "./actions/changePasswordAction";
import CToast from "../../common/components/CToast";
import { theme } from "../../common/constants";
import { saveAccessToken } from "../../store/globalActions";
import { whiteThird } from "../../utils/helper/commonVariables";
import { refreshToken } from "../../utils/api/Url";
export default function ChangePasswordScreen({ route, navigation }) {
  const [currentPass, setCurrentPass] = useState('');
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
      setCurrentPass('')
      setNewPass('')
      setRepeatNewPass('')
      navigation.navigate('AuthenticationStepOne')
      dispatch(saveAccessToken(''))
      dispatch(refreshToken(''))
    }
  };
  const changeCurrentPass = (value) => {
    setCurrentPass(value)
  };
  const changeNewPass = (value) => {
    setNewPass(value)
  };
  const changeRepeatNewPass = (value) => {
    setRepeatNewPass(value)
  };
  const handleChangePassword = (value) => {
    if (!currentPass || !newPass || !repeatNewPass) {
      CToast(wholeFieldValidationTxt)
    } else if (newPass != repeatNewPass) {
      CToast(missMatchPassTxt)
    } else {
      dispatch(changePasswordUserpassword(currentPass, newPass, apiHandle))
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
      buttomPictureType={'changePasswordMode'}
      buttomPicture
    >
      <View style={{ height: hp(43), borderWidth: 0, borderColor: "yellow" }}>
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(2.9) }}
          onChangeText={text => changeCurrentPass(text)}
          value={currentPass}
          label={currentPassText}
          password />
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(1.2) }}
          onChangeText={text => changeNewPass(text)}
          value={newPass}
          label={newPassText} password />
        <CustomTxetInputes
          onSubmitEditing={handleChangePassword}
          lableWrapperStyle={{ marginTop: hp(1.2) }}
          onChangeText={text => changeRepeatNewPass(text)}
          value={repeatNewPass}
          label={repeatNewPassText}
          password />
        <View style={styles.changePasswordBtnContainer}>
          <CustomeButton
            btnStyle={{ alignSelf: 'flex-start', marginTop: hp(3) }}
            onPress={handleChangePassword}
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