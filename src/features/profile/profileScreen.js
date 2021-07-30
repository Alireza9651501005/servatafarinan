import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, PermissionsAndroid, Linking, DeviceEventEmitter } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeAppHeaderColor, showModalConfirm } from "../../store/globalActions";
import { ParentViewActionBar, CustomPending, CustomText, RippleEffect, MediumButton, MediumButtonWhite, CustomeButton, ProfilePageForGuestUser } from "../../common/components";
import { theme } from '../../common/constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { headerText, uploadProfileText, getPcitureFromCameraText, choosePictureFromGalleryText, changeUserNameText, userNameText, accessToCameraText, accessToStorageText, aboutUsText, confirmText, confirmLogOutText, confirmLogOutModalTitleText, settingPageHeaderText, shareGuidTitle, shareGuidDescription } from "./texts";
import { getprofile, logOut, shareApp, uploadProfileImageAc, changeProfileImage, changeUserNameAc, updateUserNameAction } from "./actions/profileAction";
import { font14 } from "../../utils/helper/responsiveSizes";
import { borderColor, componentsBg, mainBlue, iranSans, whiteThird } from "../../utils/helper/commonVariables";
import { CustomTxtInput } from "../../common/components/CustomTxtInput";
import Modal from "react-native-modal";
import { colors, sizes } from "../../common/constants/theme";
import ProfileShare from "./components/ProfileShare";
import ProfileImageRow from "./components/ProfileImageRow";
import ProfileInfo from "./components/ProfileInfo";
import MyCoursesList from "../myCourses/MyCoursesList";
import LinearGradient from 'react-native-linear-gradient';
import { myCoursesActiveTab } from "../myCourses/actions/myCoursesAction";
import ProfileButtons from "./components/ProfileButtons";
import ProfileTopSection from "./components/ProfileTopSection";


export default function ProfileScreen({ route, navigation }) {
  const states = useSelector(state => state);
  const [image, setImage] = useState(null);

  let profileData = states.profileReducer;
  let globalReducer = states.globalReducer;
  let listData = states.myCoursesReducer.listData
  const [userName, setUserName] = useState(profileData.profileData.username);
  const [modalIsVisible, setModalIsVisible] = useState(false);


  useEffect(() => {
    dispatch(changeAppHeaderColor(colors.headerDarkBlue))
    dispatch(myCoursesActiveTab('3'))
    globalReducer.accessToken ? dispatch(getprofile()) : null;
  }, []);



  const dispatch = useDispatch();




  const getProfileHandle = () => {
    // alert()
    // //console.log('handle')
    dispatch(getprofile())
  }

  const changeUserName = () => {
    let userName = profileData.profileData.username;
    dispatch(changeUserNameAc(userName))
    setModalIsVisible(true)
  };
  const renderChangeUserNameUi = () => {
    return (
      <View style={{ borderWidth: 0 }}>
        <CustomTxtInput
          wrapperStyle={{ width: wp(80), marginTop: hp(2), marginBottom: hp(2) }}
          onChangeText={text => dispatch(changeUserNameAc(text))}
          value={profileData.userName}
          label={userNameText}
        />
      </View>
    )
  };



  if (globalReducer.accessToken.length > 2) {
    return (
      <ParentViewActionBar onPullDown={() => getProfileHandle} scroll titleColor={whiteThird} style={{ flex: 1 }} navigation={navigation} title={headerText} back>
        {profileData.error || profileData.loading ?
          <CustomPending style={styles.pending} pending={profileData.loading} retryAction={() => dispatch(getprofile())} />
          :
          <View>
            < LinearGradient
              colors={['#232a47', '#2a346a', '#3847a0', '#3847a0']}
              style={
                {
                  width: '90%',
                  marginRight: sizes.globalMargin,
                  marginLeft: sizes.globalMargin,
                  marginTop: hp(2),
                  // height:hp(70),
                  borderRadius: sizes.globalRadius,
                  backgroundColor: colors.componentsDarkBlue
                }
              } >
              <ProfileTopSection navigation={navigation} profileData={profileData} />
              <ProfileInfo changeUserName={changeUserName} />
              <CustomText style={{ alignSelf: 'center', color: colors.textWhite, marginBottom: hp(1) }}>دوره‌های آموزشی</CustomText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {listData.length < 2 ? null : <View style={{ width: wp(5), alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    style={{ width: wp(3), height: wp(3), resizeMode: 'contain', top: -wp(3) }}
                    source={require('../../assets/arrow/arrow-left.png')}
                  />
                </View>}

                <View style={{ height: wp(43), flex: 1, paddingRight: sizes.globalMargin }}>

                  <MyCoursesList layout={'profile'} navigation={navigation} />

                </View>
              </View>
            </ LinearGradient>
            <ProfileButtons />
          </View>

        }

        <Modal
          animationOut="slideOutDown"
          backdropOpacity={0.5}
          backdropTransitionOutTiming={0}
          animationType="slide"
          hideModalContentWhileAnimating={true}
          useNativeDriver={true}
          isVisible={modalIsVisible}
          onBackButtonPress={() => setModalIsVisible(false)}
          onBackdropPress={() => setModalIsVisible(false)}
        >
          <View key="modalView" style={styles.modalChildVu}>
            <CustomText bold style={styles.modalTitleS}>{changeUserNameText}</CustomText>
            {renderChangeUserNameUi()}
            <View style={styles.btnContainerS}>
              <MediumButtonWhite btnStyle={styles.yesBtnS} onPress={() => setModalIsVisible(false)} >{"انصراف"}</MediumButtonWhite>
              <MediumButton
                btnStyle={styles.noBtnS}
                onPress={() => dispatch(updateUserNameAction(profileData.userName, () => setModalIsVisible(false)))}
                loading={profileData.changeUserNameLoading}
                labelStyle={styles.ConfirmationLableTxtS}>
                {"ارسال"}
              </MediumButton>
            </View>
          </View>
        </Modal>
      </ParentViewActionBar>
    );
  } else {
    return (
      <ParentViewActionBar titleColor={whiteThird} style={{ width: '100%' }} navigation={navigation} title={headerText} back>
        {/* <CustomeButton onPress={() => { navigation.navigate('AuthenticationStepOne') }}>ثبت نام / ورود</CustomeButton> */}
        <ProfilePageForGuestUser navigation={navigation} />
      </ParentViewActionBar>
    )
  }
}


const styles = StyleSheet.create({
  itemS: {
    // width: wp(90),
    alignSelf: 'center',
    width: '90%',
    // width: wp(18.5),
    height: hp(8),
    justifyContent: "center",
    // alignItems: 'flex-end',
    // borderWidth: 1,
    borderBottomWidth: .5,
    marginTop: hp(0),
    padding: hp(1.8),
  },
  modalChildVu: {
    // height: hp(25),
    height: "auto",
    // padding: 1,
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: hp(2),
    backgroundColor: "white"
  },
  modalTitleS: {
    marginTop: hp(3.2),
    marginBottom: hp(0),
    fontSize: font14,
    alignSelf: "center"
  },
  pending: {
    position: "relative",
    marginTop: hp(34)
  },
  modalItm: {
    width: wp(80),
    height: hp(6.5),
    borderRadius: hp(2),
    alignItems: 'center',
    backgroundColor: componentsBg,
    flexDirection: 'row-reverse'
  },
  border: {
    width: wp(80),
    // borderBottomWidth:1,
    height: hp(7),
  },
  image: {
    width: wp(8),
    height: hp(3),
    borderWidth: 0,
    resizeMode: 'contain',
    marginLeft: wp(4),
    marginRight: wp(4),
  },
  uploadImageModalContainer: {
    width: wp(80),
    height: hp(15),
    // borderWidth:1,
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  profileImage: {
    borderWidth: 1,
    borderColor: "blue",
    resizeMode: "contain",
    // flex: 1,
    // minWidth: wp(40),
    // minHeight: hp(40),
    // width: wp(40),
    // height: hp(40),
    // borderRadius: hp(40)
    width: 100,
    height: 100,
    borderRadius: 100
  },
  profileImageArea: {
    borderWidth: 1,
    borderColor: "red",
    // resizeMode: "contain",
    // flex: 1,
    width: 200,
    height: 200,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center'
    // width: wp(40),
    // height: hp(40),
    // borderRadius: hp(40)
  },
  btnContainerS: {
    flexDirection: "row",
    width: wp(80),
    borderWidth: 0,
    marginBottom: hp(3.2),
    marginTop: hp(0),
    // alignSelf:'center',
    justifyContent: "space-around"
    // height:hp(20)
  },
  yesBtnS: {
    marginBottom: hp(0),
    marginTop: hp(0),
    marginLeft: wp(0),
    marginRight: wp(0),
    width: wp(35)
  },
  noBtnS: {
    marginBottom: hp(0),
    marginTop: hp(0),
    marginLeft: wp(0),
    marginRight: wp(0),
    width: wp(35)
  },
});