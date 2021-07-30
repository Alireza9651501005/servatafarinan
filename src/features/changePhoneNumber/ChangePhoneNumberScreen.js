import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { AuthenticationParentView } from "../../common/components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import { CustomeButton } from "../../common/components/CustomeButton";
import { headerText, newPhoneNumberText, phoneNumberValidateText } from "./texts";
import {changePhoneNumberAction } from "./actions/changePhoneNumberAction";
// import CountDown from "react-native-countdown-component";
import CToast from "../../common/components/CToast";
import { font16 } from "../../utils/helper/responsiveSizes";
import { white, mainBlue, lightBlueGrey, iranSans, whiteThird } from "../../utils/helper/commonVariables";
import { RippleEffect } from "../../common/components/RippleEffect";
import { CustomText } from "../../common/components/CustomText";
import { theme } from "../../common/constants";
export default function ChangePhoneNumberScreen({ route, navigation }) {
  //states
  const states = useSelector(state => state);
  let loading, timeOut, changePhoneNumberLevel;
  loading = states.changePhoneNumberReducer.loading;
  timeOut = states.changePhoneNumberReducer.timeout;
  changePhoneNumberLevel = states.changePhoneNumberReducer.changePhoneNumberLevel;
  const dispatch = useDispatch();
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  // const [timer, setTimer] = useState(0);
  const [changephoneNumberData, setChangephoneNumberData] = useState({ loading: false })
  //fucntion
  // const renderCountDown = () => {
  //   if (changePhoneNumberLevel == 1) {
  //     return (
  //       <View style={{ marginRight: 30 }}>
  //         {timer != 0 ? <CountDown size={font16} until={timer} onFinish={() => setTimer(0)} digitStyle={{ backgroundColor: white }} digitTxtStyle={{ color: mainBlue, fontFamily: iranSans }} separatorStyle={{ color: mainBlue }} timeToShow={["M", "S"]} timeLabels={{ m: null, s: null }} showSeparator /> : null}
  //       </View>
  //     );
  //   }
  // };
  const apiHandle = value => {
    if (value === "pending") {
      setChangephoneNumberData({ loading: true });
    } else if (value === "error") {
      setChangephoneNumberData({ loading: false });
    } else {
      setChangephoneNumberData({
        loading: false,
      });
      navigation.navigate('changePhoneNumberVerifyCode', { phoneNumber: newPhoneNumber })

    }
  };
  const handleChangePhoneNumberOnPress = () => {
    if (!newPhoneNumber) {
      CToast(phoneNumberValidateText)
    } else {
      dispatch(changePhoneNumberAction(newPhoneNumber, apiHandle))
    }

  };
  // const resendVerifyCodeVu = (title, onPress) => {
  //   return (
  //     <View style={{ marginRight: wp(5), marginTop: hp(1) }}>
  //       <RippleEffect onPress={onPress}>
  //         <CustomText style={[styles.resendCodeLabel, { color: mainBlue }]}>
  //           {title}
  //         </CustomText>
  //       </RippleEffect>
  //     </View>
  //   );
  // };
  // const changeTimer = (value) => {
  //   setTimer(value)
  // };
  return (
    <AuthenticationParentView
      buttomPicture
      noRradius
      titleColor={whiteThird}
      navigation={navigation}
      title={headerText}
      back
      buttomPictureType={'changePasswordMode'}
    >
      <CustomTxetInputes
        onSubmitEditing={handleChangePhoneNumberOnPress}
        lableWrapperStyle={{ marginTop: hp(4) }}
        onChangeText={text => setNewPhoneNumber(text)}
        value={newPhoneNumber}
        label={newPhoneNumberText}
        keyboardType="number-pad"
        disable={changePhoneNumberLevel} />
      {/* {renderCountDown()} */}
      <View style={styles.changePasswordBtnContainer}>
        <CustomeButton
          btnStyle={{ alignSelf: 'flex-start', marginTop: hp(3) }}
          onPress={handleChangePhoneNumberOnPress}
          loading={loading}
          backgroundColor={theme.colors.blue1}>
          {'ادامه'}
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