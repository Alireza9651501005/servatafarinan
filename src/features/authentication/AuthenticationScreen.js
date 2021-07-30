import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mainContainerBg, white, mainBlue, lightBlueGrey, whiteThird ,iranSans } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import { changePhoneNumber, checkUserAccount, changePassword, checkUserPassword, changeVerifyCode, changeVerifytimer, checkVerifyCode, changeAuthentionLevel } from "./actions/authenticationAction";
import { font16 } from "../../utils/helper/responsiveSizes";
import Header from "../../common/components/Header";
import { LargeButton } from "../../common/components/LargeButton";
import { CustomTxtInput } from "../../common/components/CustomTxtInput";
import { RippleEffect } from "../../common/components/RippleEffect";
import { CustomText } from "../../common/components/CustomText";
import CountDown from "react-native-countdown-component";
import CToast from "../../common/components/CToast";
import * as NavigationService from "../../utils/NavigationService";
import { AuthenticationParentView } from '../../common/components/AuthenticationParentView';
import { CustomeButton } from '../../common/components/CustomeButton';
import { theme } from "../../common/constants";
import { gray } from "color-name";
export default function AuthenticationScreen({ route, navigation }) {
  useEffect(() => {
    return () => {
      dispatch(changePhoneNumber(""));
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
    verifyCode,
    timer;
  phoneNumber = states.authenticationReducer.phoneNumber;
  loading = states.authenticationReducer.loading;
  verifyCode = states.authenticationReducer.verifyCode;
  timer = states.authenticationReducer.timer;
  authenticationReducerStep =
    states.authenticationReducer.authenticationReducerStep;
  password = states.authenticationReducer.password;
  const authentication = () => {
    if (phoneNumber) {
      if (authenticationReducerStep == 1) {
        dispatch(checkUserAccount(phoneNumber));
      } else if (authenticationReducerStep == 2) {
        if (authenticationReducerStep == 2 && password) {
          dispatch(checkUserPassword(password, phoneNumber));
        } else {
          CToast("لطفا رمز عبور را وارد نمایید.");
        }
      } else if (authenticationReducerStep == 3) {
        if (authenticationReducerStep == 3 && verifyCode) {
          dispatch(checkVerifyCode(verifyCode));
        } else {
          CToast("لطفا کد تایید را وارد نمایید.");
        }
      }
    } else {
      CToast("لطفا شماره تلفن خود را وارد نمایید.");
    }
  };
  const resendVerifyCode = () => {
    dispatch(checkUserAccount(phoneNumber));
  };
  const renderCountDown = () => {
    if (timer) {
      return (
        <View style={{ marginRight: 30 }}>
          <CountDown
            size={font16}
            until={timer}
            onFinish={() => dispatch(changeVerifytimer(null))}
            digitStyle={{ backgroundColor: white }}
            digitTxtStyle={{ color: mainBlue, fontFamily: iranSans }}
            separatorStyle={{ color: mainBlue }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </View>
      );
    }
  };
  const resendVerifyCodeVu = () => {
    return (
      <View style={{ marginRight: wp(5) }}>
        <RippleEffect onPress={resendVerifyCode}>
          {!timer ? (
            <CustomText style={[styles.resendCodeLabel, { color: mainBlue }]}>
              {"ارسال مجدد"}
            </CustomText>
          ) : null}
        </RippleEffect>
      </View>
    );
  };
  return (
    <AuthenticationParentView titleColor={whiteThird} navigation={navigation} title={'احراز هویت'} back style={{  backgroundColor:white }}>
      {/* <Header
        title={"احراز هویت"}
        leftItm={require("../../assets/arrow/left-arrow.png")}
        leftItmOnpress={() => navigation.goBack()}
      /> */}
      <CustomTxtInput
        onChangeText={text => dispatch(changePhoneNumber(text))}
        value={phoneNumber}
        disable={
          authenticationReducerStep == 3 || authenticationReducerStep == 2
            ? true
            : false
        }
        label={"شماره تلفن"}
        keyboardType="numeric"
        maxLength={11}
      />
      {authenticationReducerStep == 2
        ? [
          <CustomTxtInput
            password
            onChangeText={text => dispatch(changePassword(text))}
            value={password}
            label={"رمز عبور"}
          />,
          <RippleEffect
            style={{ marginRight: wp(5) }}
            onPress={() => {
              CToast("درحال توسعه", "alert");
            }}
          >
            <CustomText style={[styles.resendCodeLabel, { color: mainBlue }]}>
              {"فراموشی رمز عبور"}
            </CustomText>
          </RippleEffect>
        ]
        : null}
      {authenticationReducerStep == 3 ? (
        <View>
          <CustomTxtInput
            // password
            onChangeText={text => dispatch(changeVerifyCode(text))}
            value={verifyCode}
            label={"کد تایید"}
          />
          {renderCountDown()}
          {resendVerifyCodeVu()}
        </View>
      ) : null}

      <View style={styles.changePasswordBtnContainer}>
        <CustomeButton
          btnStyle={{ alignSelf: 'flex-start',marginTop:hp(6) }}
          onPress={authentication}
          checkUserPassword
          loading={loading}
          backgroundColor={theme.colors.blue1}
        // disable={changeModemPasswordLoadin}
        >
          {authenticationReducerStep == 3 ? "بررسی کد تایید" : "ادامه"}
        </CustomeButton>
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
  resendCodeLabel: {
    fontSize: font16,
    color: lightBlueGrey
  }
});
