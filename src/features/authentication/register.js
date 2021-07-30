import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { mainContainerBg, whiteThird } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserEmail,
  changeUserJobPosition,
  changeUserJob,
  changeUserName,
  changeUserConfirmPass,
  changeUserPass,
  register,
  changeUserPhoneNumber
} from "./actions/authenticationAction";
import { AuthenticationParentView } from '../../common/components/AuthenticationParentView';
import { LargeButton } from "../../common/components/LargeButton";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import Header from "../../common/components/Header";
import CToast from "../../common/components/CToast";
import { theme } from "../../common/constants";
import { CustomeButton } from '../../common/components/CustomeButton';
import { nameAndFamilyTxt, aliasNameTxt, passwordTxt, confirmPasswordTxt, phoneNumberTxt, inviteCodeTxt } from "./texts";
import { passwordIsNotMatch } from "../../common/constants/strings";
import { showModalConfirm } from "../../store/globalActions";
import { CustomText } from "../../common/components";
export default function Register({ navigation }) {
  const [nameAndFamily, setNameAndFamily] = useState('');
  const [aliasName, setAliasName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  useEffect(() => {
    return () => {
      // ComponentWillUnmount in Class Component
      dispatch(changeUserPass("")),
        dispatch(changeUserConfirmPass("")),
        dispatch(changeUserName("")),
        dispatch(changeUserJob(""));
      dispatch(changeUserEmail("")),
        dispatch(changeUserPhoneNumber("")),
        dispatch(changeUserJobPosition(""));
    };
  }, []);
  const states = useSelector(state => state);
  const registerUserData = () => {
    let validateFieldsCondition =
      nameAndFamily &&
      aliasName &&
      password &&
      confirmPassword;
    if (validateFieldsCondition) {
      if (password != confirmPassword) {
        CToast(passwordIsNotMatch);
      }
      else {
        dispatch(register(nameAndFamily, aliasName, password, confirmPassword, inviteCode));
      }
    } else {
      CToast("لطفا اطلاعات خود را تکمیل نمایید.");
    }
  };
  let userPassword,
    userConfirmPassword,
    userName,
    userJob,
    userEmail,
    userJobPosition,
    loading,
    userPhoneNumber,
    verificationCodeData;
  userPassword = states.authenticationReducer.userPassword;
  userConfirmPassword = states.authenticationReducer.userConfirmPassword;
  userName = states.authenticationReducer.userName;
  userJob = states.authenticationReducer.userJob;
  userEmail = states.authenticationReducer.userEmail;
  userJobPosition = states.authenticationReducer.userJobPosition;
  loading = states.authenticationReducer.loading;
  userPhoneNumber = states.authenticationReducer.userPhoneNumber;
  verificationCodeData = states.authenticationReducer.verificationCodeData;
  const dispatch = useDispatch();
  //console.log("states", states.globalReducer);
  const inviteCodeModalUi = () => {
    return (
      <ScrollView style={{ maxHeight: hp(30), marginTop: hp(2), marginBottom: hp(2), width: wp(80) }}>
        <CustomText>
          {verificationCodeData ? verificationCodeData.invite_code_description : null}
        </CustomText>
      </ScrollView>
    )

  }
  const closeModal = () => {
    dispatch(showModalConfirm(false, 'راهنما کد معرف', inviteCodeModalUi(), closeModal, 'متوجه شدم.'))
  }
  return (
    <AuthenticationParentView
      scrollToPosition={7}
      noRradius
      buttomPicture
      // screenName={'Register'}
      titleColor={whiteThird}
      navigation={navigation}
      title={'خوش آمدی!'}
      back
      style={{ backgroundColor: theme.colors.darkBlue }}>
      <View style={{ borderWidth: 0, borderColor: 'red' }}>

        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(4) }}
          onChangeText={text => (setNameAndFamily(text))}
          value={nameAndFamily}
          label={nameAndFamilyTxt}
        />
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(1.3) }}
          onChangeText={text => (setAliasName(text))}
          value={aliasName}
          label={aliasNameTxt}
        />
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(1.3) }}
          password
          onChangeText={text => (setPassword(text))}
          value={password}
          label={passwordTxt}
        />
        <CustomTxetInputes
          password
          lableWrapperStyle={{ marginTop: hp(1.3) }}
          onChangeText={text => (setConfirmPassword(text))}
          value={confirmPassword}
          label={confirmPasswordTxt}
        // onSubmitEditing={registerUserData}
        />
        <CustomTxetInputes
          lableWrapperStyle={{ marginTop: hp(1.3) }}
          onChangeText={text => (setInviteCode(text))}
          value={inviteCode}
          label={inviteCodeTxt}
          inviteCodeOnPress={() => dispatch(showModalConfirm(true, 'راهنما کد معرف', inviteCodeModalUi(), closeModal, 'متوجه شدم.'))}
          onSubmitEditing={registerUserData}
        />
        <View style={styles.changePasswordBtnContainer}>
          <CustomeButton
            backgroundColor={theme.colors.blue1}
            onPress={registerUserData}
            loading={loading}
            btnStyle={{ alignSelf: 'flex-start', marginTop: hp(4) }}
          >
            {'ادامه'}
          </CustomeButton>
        </View>
      </View>
    </AuthenticationParentView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    flex: 1,
    backgroundColor: mainContainerBg
  },
  logoContainer: {
    borderWidth: 0,
    width: wp(90),
    height: hp(40),
    marginTop: hp(5),
    alignSelf: "center",
    alignItems: "center"
  },
  bottomSection: {
    height: hp(50),
    paddingTop: hp(7)
  },
  refreshClick: {
    width: hp(8),
    alignSelf: "center",
    alignItems: "center"
  },
  refreshIcon: {
    width: hp(7),
    height: hp(7),
    resizeMode: "contain"
  },
  logo: {
    // width: hp(80),
    // height: hp(7),
    resizeMode: "contain"
  },
  changePasswordBtnContainer: {
    width: wp(79.7),
    height: hp(11.2),
    borderWidth: 0,
    alignItems: 'flex-start',
    // justifyContent: "flex-end",
    alignSelf: "center",
    // flex: 1
  },
});