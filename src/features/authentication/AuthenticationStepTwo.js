import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mainContainerBg, white, mainBlue, yekan, lightBlueGrey, whiteThird, iranSans } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import { changePhoneNumber, checkUserAccount, changePassword, checkUserPassword, changeVerifyCode, changeVerifytimer, checkVerifyCode, changeAuthentionLevel } from "./actions/authenticationAction";
import { font16, fontSize14 } from "../../utils/helper/responsiveSizes";
import Header from "../../common/components/Header";
import { LargeButton } from "../../common/components/LargeButton";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { RippleEffect } from "../../common/components/RippleEffect";
import { CustomText } from "../../common/components/CustomText";
import CountDown from "react-native-countdown-component";
import CToast from "../../common/components/CToast";
import * as NavigationService from "../../utils/NavigationService";
import { AuthenticationParentView } from '../../common/components/AuthenticationParentView';
import { CustomeButton } from '../../common/components/CustomeButton';
import { forgetPasswordAction } from '../forgetPassword/actions/forgetPasswordAction';
import { theme } from "../../common/constants";
import Spinner from "react-native-spinkit";
export default function AuthenticationStepOne({ route, navigation }) {
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
  const [changePassData, setChangePassData] = useState({ loading: false })
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
    if (password) {
      dispatch(checkUserPassword(password, phoneNumber));
    } else {
      CToast("لطفا رمز خود را وارد نمایید.");
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
            digitTxtStyle={{ color: mainBlue, fontFamily: yekan }}
            separatorStyle={{ color: mainBlue }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </View>
      );
    }
  };
  const apiHandle = value => {
    if (value === "pending") {
      setChangePassData({ loading: true });
    } else if (value === "error") {
      setChangePassData({ loading: false });
    } else {
      setChangePassData({
        loading: false,
      });
      dispatch(changePassword(""));
    }
  };
  return (
    <AuthenticationParentView noRradius buttomPicture screenName={'AuthenticationStepOne'} titleColor={whiteThird} navigation={navigation} title={'خوش آمدی!'} back style={{ backgroundColor: theme.colors.darkBlue }}>
      {/* <View style={{height:hp(83),borderWidth:0}}> */}
      <CustomTxetInputes
        lableWrapperStyle={{ marginTop: hp(3.9) }}
        // inputStyle={{ top: hp(.3),padddingTop:hp(1),padddingBottom:hp(1) }}
        password
        onChangeText={text => dispatch(changePassword(text))}
        value={password}
        label={"رمز عبور"}
        onSubmitEditing={authentication}
      />
      <RippleEffect
        style={{ marginRight: wp(5) }}
        onPress={() => {
          CToast("درحال توسعه", "alert");
        }}
      >
      </RippleEffect>
      <View style={styles.changePasswordBtnContainer}>
        <RippleEffect onPress={() => dispatch(forgetPasswordAction(phoneNumber, null, 'post', apiHandle))} style={{ borderWidth: 0, borderColor: 'white', width: wp(79.7), marginTop: wp(.4), alignItems: 'flex-end', height: hp(5) }} >
          {changePassData.loading ? <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={whiteThird} /> :
            <CustomText style={styles.resendCodeLabel}>
              {"رمز عبور خود را فراموش کرده اید؟"}
            </CustomText>
          }
        </RippleEffect>
        <CustomeButton
          btnStyle={{ alignSelf: 'flex-start', marginTop: hp(2) }}
          onPress={authentication}
          checkUserPassword
          loading={loading}
          backgroundColor={theme.colors.blue1}
        // disable={changeModemPasswordLoadin}
        >
          {authenticationReducerStep == 3 ? "بررسی کد تایید" : "ورود"}
        </CustomeButton>
      </View>
      {/* </View> */}
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
    marginTop: hp(1),
    borderWidth: 0,
    alignItems: 'flex-start',
    // justifyContent: "flex-end",
    alignSelf: "center",
    // flex: 1
  },
  resendCodeLabel: {
    fontSize: fontSize14,
    fontFamily: iranSans,
    color: theme.colors.blue2,
    textAlign: 'right',
    // color: lightBlueGrey
    // color: theme.colors.blue2
  }
});
