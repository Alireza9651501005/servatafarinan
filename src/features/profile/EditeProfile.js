import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator, Image, PermissionsAndroid, Keyboard, Linking } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mainContainerBg, whiteThird, componentsBg, borderColor, white, iranSans, mainBlue } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import { AuthenticationParentView } from '../../common/components/AuthenticationParentView';
import SimpleDatePicker from '../../common/components/SimpleDatePicker';
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import CToast from "../../common/components/CToast";
import { theme } from "../../common/constants";
import { CustomeButton } from '../../common/components/CustomeButton';
import { passwordIsNotMatch, email } from "../../common/constants/strings";
import Ripple from 'react-native-material-ripple';
import { showModalConfirm, changeModalVisble } from "../../store/globalActions";
import { getprofile, logOut, shareApp, uploadProfileImageAc, changeProfileImage, changeUserNameAc, updateUserNameAction, editeUserProfileInfoAction, geteUserProfileInfoAction, changeUserNamePending, changeUserNameSuccess } from "./actions/profileAction";
import { CustomPending, RippleEffect } from "../../common/components";
import { CustomText } from "../../common/components/CustomText";
import ImagePicker from 'react-native-image-crop-picker';
import { fontSize14 } from "../../utils/helper/responsiveSizes";
import {
  nameAndFamilyText,
  emailText,
  aliasNameText,
  educationText,
  jobPositionText,
  cityText,
  birthDateText,
  resumeText,
  uploadProfileText,
  accessToStorageText,
  getPcitureFromCameraText,
  choosePictureFromGalleryText,
  confirmText,
  userNameValidationText,
  phdTxt,
  mastersTxt,
  bachelorTxt,
  associateTxt,
  diplomaTxt,
  educationModalTitleTxt,
  accessToCameraText
}
  from './texts';
import Spinner from "react-native-spinkit";
import { navigate } from "../../utils/NavigationService";
import { reportcatchToFireBase } from "../../utils/helper/functions";
export default function EditeProfile({ navigation }) {
  useEffect(() => {
    dispatch(geteUserProfileInfoAction(getUserInfoApiHandle));
  }, []);
  const [nameAndFamily, setNameAndFamily] = useState('');
  const [email, setEmail] = useState('');
  const [aliasName, setAliasName] = useState('');
  const [educaiton, setEdicaiton] = useState('');
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [resume, setResume] = useState('');
  const [image, setImage] = useState(null);
  const [changeuserInfo, setChangeuserInfo] = useState({ loading: false })
  const [getUserInfo, setUserInfo] = useState({ loading: false, error: null })
  const states = useSelector(state => state);
  let profileData = states.profileReducer, registerOptionalInfoLoading;
  registerOptionalInfoLoading = states.authenticationReducer.registerOptionalInfoLoading;
  const showUploadImageModal = () => {
    dispatch(showModalConfirm(true, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const granted2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (granted == 'never_ask_again') {
        dispatch(showModalConfirm(true, 'ثروت آفرینان', accessToCameraText, () => {
          Linking.openSettings().then(() => {
            dispatch(showModalConfirm(false, 'ثروت آفرینان', accessToCameraText, null))
          })
        }))
      }
      if (granted != PermissionsAndroid.RESULTS.DENIED && granted2 != PermissionsAndroid.RESULTS.DENIED) {
        takePhotoFcamera()
      }
    } catch (err) {
      // reportcatchToFireBase(err, 'EditeProfile.js/line:82')
      console.log(err);
    }
  };
  const options = {
    compressImageQuality: .9,
    compressImageMaxWidth: 2048,
    compressImageMaxHeight: 1536,
    cropping: true,
    cropperCircleOverlay: true,
    mediaType: "photo",
    freeStyleCropEnabled: false,
    cropperStatusBarColor: 'gray',
    includeBase64: true,
    // includeBase64: true,
    cropperToolbarTitle: 'برش تصویر',
    hideBottomControls: true,
    height: hp(100),
    width: wp(200)
  }
  const takePhotoFgallery = () => {
    ImagePicker.openPicker(options).then(image => {
      let imageAddress = `data:${image.mime};base64,${image.data}`;
      setImage(imageAddress)
      dispatch(changeProfileImage(imageAddress))
      uploadProfileImage(imageAddress)
      dispatch(showModalConfirm(false, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
    });
  };
  const takePhotoFcamera = () => {
    ImagePicker.openCamera(options).then(image => {
      let imageAddress = `data:${image.mime};base64,${image.data}`;
      setImage(imageAddress)
      dispatch(changeProfileImage(imageAddress))
      uploadProfileImage(imageAddress)
      dispatch(showModalConfirm(false, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
    });
  };
  const takePhotoFgalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const granted2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      // const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (granted == 'never_ask_again' || granted2 == 'never_ask_again') {
        dispatch(showModalConfirm(true, 'ثروت آفرینان', accessToStorageText, () => {
          Linking.openSettings().then(() => {
            dispatch(showModalConfirm(false, 'ثروت آفرینان', accessToStorageText, null))
          })
        }))
      }
      // if (granted != PermissionsAndroid.RESULTS.DENIED) {
      //   takePhotoFgallery()
      // }
      if (granted != PermissionsAndroid.RESULTS.DENIED && granted2 != PermissionsAndroid.RESULTS.DENIED) {
        takePhotoFgallery()
      }
    } catch (err) {
      reportcatchToFireBase(err, 'EditeProfile.js/line:134')
      console.log(err);
    }
  };
  const uploadImage = () => {
    let camera, gallery;
    camera = require('../../assets/uploadImage/camera.png');
    gallery = require('../../assets/uploadImage/gallery.png');
    return (
      <View style={styles.uploadImageModalContainer}>
        <UploadModalItm onPress={requestCameraPermission} title={getPcitureFromCameraText} src={camera} />
        <View style={{ borderBottomWidth: 0, borderColor: borderColor }} />
        <UploadModalItm onPress={takePhotoFgalleryPermission} title={choosePictureFromGalleryText} src={gallery} />
      </View>
    )
  };
  const educationOnPress = (value) => () => {
    setEdicaiton(value)
    dispatch(showModalConfirm(false, educationModalTitleTxt, educationModalContetn(), uploadProfileImage, null, closeModal))

  }
  const educationModalContetn = () => {
    return (
      <View style={[styles.educationModalContetnContainerStyle, { marginTop: hp(0) }]}>
        <UploadModalItm modelaMode='education' onPress={educationOnPress(phdTxt)} title={phdTxt} />
        <UploadModalItm modelaMode='education' onPress={educationOnPress(mastersTxt)} title={mastersTxt} />
        <UploadModalItm modelaMode='education' onPress={educationOnPress(bachelorTxt)} title={bachelorTxt} />
        <UploadModalItm modelaMode='education' onPress={educationOnPress(associateTxt)} title={associateTxt} />
        <UploadModalItm modelaMode='education' onPress={educationOnPress(diplomaTxt)} title={diplomaTxt} />
      </View>
    )
  };
  const uploadProfileImage = (image) => {
    dispatch(uploadProfileImageAc(image));
  };
  const closeModal = () => {
    dispatch(showModalConfirm(false, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
    dispatch(changeProfileImage(false))
  };
  // const renderPicture = () => {
  //   return (
  //     <View style={{ height: hp(12), width: "100%", alignItems: "center", marginTop: hp(1), borderWidth: 0, borderColor: whiteThird }}>
  //       <View style={{ width: wp(22), height: wp(22), borderRadius: wp(11), borderWidth: 0, backgroundColor: '#abd9ec', justifyContent: 'center' }}>
  //         {/* rippleContainerBorderRadius={wp(24)} */}
  //         {profileData.uploadProfileImageLoading ?
  //           <ActivityIndicator color={mainBlue} size="large" />
  //           :
  //           [
  //             <Ripple onPress={showUploadImageModal} rippleContainerBorderRadius={wp(12)} style={{ width: wp(10), height: wp(10), borderRadius: wp(5), borderWidth: 0, backgroundColor: '#c8e2ec', left: wp(12.5), top: hp(6.8), position: "absolute", justifyContent: 'center' }} >
  //               <Image style={{ width: wp(4), height: wp(4), borderRadius: wp(2), resizeMode: 'contain', alignSelf: 'center' }} source={require('../../assets/uploadImage/camera.png')} />
  //             </Ripple>
  //             ,
  //             <Image style={{ width: wp(7), height: wp(7), borderRadius: wp(3.5), resizeMode: 'contain', alignSelf: 'center' }} source={require('../../assets/userDefaultProfile/userDefaultProfile.png')} />

  //           ]


  //         }


  //       </View>
  //     </View>
  //   );
  // };
  const registerUserData = () => {
    let validateFieldsCondition =
      nameAndFamily &&
      aliasName &&
      password &&
      confirmPassword;
    if (validateFieldsCondition) {
      dispatch(register(nameAndFamily, aliasName, password, confirmPassword));
    } else if (password != confirmPassword) {
      CToast(passwordIsNotMatch);
    } else {
      CToast("لطفا اطلاعات خود را تکمیل نمایید.");
    }
  };
  const renderPicture = () => {
    return (
      <View style={{ height: hp(12), width: "100%", alignItems: "center", marginTop: hp(2), borderWidth: 0, borderColor: whiteThird }}>
        <View style={styles.userImageContainer}>
          {/* rippleContainerBorderRadius={wp(24)} */}
          {profileData.uploadProfileImageLoading ?
            <ActivityIndicator color={mainBlue} size="large" />
            :
            [
              <Image style={profileData.profileData.image ? [styles.userImageContainer, { borderWidth: hp(.3), borderColor: theme.colors.userProfileBorderColor }] : styles.userDefaultImageStyle} source={profileData.profileData.image ? { uri: profileData.profileData.image } : require('../../assets/userDefaultProfile/userDefaultProfile.png')} />
              ,

              <Ripple onPress={showUploadImageModal} rippleContainerBorderRadius={wp(12)} style={{ width: wp(10), height: wp(10), borderRadius: wp(5), borderWidth: 1, backgroundColor: theme.colors.editeProfileUserImageBackColor, left: profileData.profileData.image ? wp(15) : wp(12), top: profileData.profileData.image ? hp(8) : hp(8.5), position: "absolute", justifyContent: 'center', borderColor: theme.colors.userProfileBorderColor }} >
                <Image style={{ width: wp(4), height: wp(4), borderRadius: wp(2), resizeMode: 'contain', alignSelf: 'center' }} source={require('../../assets/uploadImage/camera.png')} />
              </Ripple>
            ]


          }


        </View>
      </View >
    );
  };
  const apiHandle = value => {
    if (value === "pending") {
      setChangeuserInfo({ loading: true });
    } else if (value === "error") {
      setChangeuserInfo({ loading: false });
    } else {
      setChangeuserInfo({
        loading: false,
      });
      dispatch(changeUserNamePending())
      profileData.profileData.username = aliasName;
      dispatch(changeUserNameSuccess())
      Keyboard.dismiss()
      // setEmail('')
      // setNameAndFamily('')
      // setAliasName('')
      // setJob('')
      // setEdicaiton('')
      // setCity('')
      // setBirthDate('')
      // setResume('')
    }
  };
  const getUserInfoApiHandle = value => {
    if (value === "pending") {
      setUserInfo({ loading: true, error: null });
    } else if (value === "error") {
      setUserInfo({ loading: false, error: true });
    } else {
      setUserInfo({
        loading: false,
        error: null
      });
      setEmail(!value.email ? '' : value.email)
      setNameAndFamily(value.name == 'null' ? '' : value.name)
      setAliasName(value.username == 'null' ? '' : value.username)
      setJob(value.work_position == 'null' ? '' : value.work_position)
      setEdicaiton(value.certificate == 'null' ? '' : value.certificate)
      setCity(value.birth_place == 'null' ? '' : value.birth_place)
      setBirthDate(value.birth_date == 'null' ? '' : value.birth_date)
      setResume(value.personal_resume == 'null' ? '' : value.personal_resume)
      // navigation.navigate('EditeProfile')
    }
  };
  let
    userConfirmPassword,
    userName,
    userJob,
    userEmail,
    userJobPosition,
    loading,
    userPhoneNumber,
    modalVisble;
  // userPassword = states.authenticationReducer.userPassword;
  userConfirmPassword = states.authenticationReducer.userConfirmPassword;
  userName = states.authenticationReducer.userName;
  userJob = states.authenticationReducer.userJob;
  userEmail = states.authenticationReducer.userEmail;
  userJobPosition = states.authenticationReducer.userJobPosition;
  loading = states.authenticationReducer.loading;
  userPhoneNumber = states.authenticationReducer.userPhoneNumber;
  modalVisble = states.globalReducer.modalVisible;
  const dispatch = useDispatch();

  if (!getUserInfo.loading && !getUserInfo.error) {
    return (
      <AuthenticationParentView
        titleColor={whiteThird}
        navigation={navigation}
        title={'ویرایش پروفایل'}
        back
        style={{ backgroundColor: theme.colors.background }}
      scrollToPosition={true}
      >
        {/* <View style={[styles.followHeaderShapeStyle, { backgroundColor: theme.colors.darkBlue }]} /> */}
            {renderPicture()}
            <CustomTxetInputes
              lableTextWrapperStyle={theme.colors.black1}
              lableWrapperStyle={{ marginTop: hp(1) }}
              onChangeText={text => (setNameAndFamily(text))}
              value={nameAndFamily}
              label={nameAndFamilyText}
            />
            <CustomTxetInputes
              lableTextWrapperStyle={theme.colors.black1}
              lableWrapperStyle={{ marginTop: hp(1.3) }}
              onChangeText={text => (setEmail(text))}
              value={email}
              label={emailText}
            />
            <CustomTxetInputes
              lableTextWrapperStyle={theme.colors.black1}
              lableWrapperStyle={{ marginTop: hp(1.3) }}
              onChangeText={text => (setAliasName(text))}
              value={aliasName}
              label={aliasNameText}
            />
            <CustomTxetInputes
              lableTextWrapperStyle={theme.colors.black1}
              lableWrapperStyle={{ marginTop: hp(1.3) }}
              onChangeText={text => (setEdicaiton(text))}
              value={educaiton}
              label={educationText}
              onPress={() => dispatch(showModalConfirm(true, educationModalTitleTxt, educationModalContetn(), () => dispatch(showModalConfirm(false, educationModalTitleTxt, educationModalContetn(), null, 'انصراف')), "انصراف", closeModal))}
            />
            <CustomTxetInputes
              lableTextWrapperStyle={theme.colors.black1}
              lableWrapperStyle={{ marginTop: hp(1.3) }}
              onChangeText={text => (setJob(text))}
              value={job}
              label={jobPositionText}
            />
            <View style={{ flexDirection: 'row', width: wp(79.7), borderWidth: 0, borderColor: white, alignSelf: "center", justifyContent: 'space-between', marginTop: hp(1.3) }}>
              <CustomTxetInputes
                lableTextWrapperStyle={theme.colors.black1}
                onPress={() => dispatch(changeModalVisble(true))}
                lableWrapperStyle={{ width: wp(34) }}
                wrapperStyle={{ width: wp(36) }}
                onChangeText={text => (setBirthDate(text))}
                value={birthDate}
                label={birthDateText}
              />
              <CustomTxetInputes

                lableTextWrapperStyle={theme.colors.black1}
                lableWrapperStyle={{ width: wp(34) }}
                wrapperStyle={{ width: wp(36) }}
                onChangeText={text => (setCity(text))}
                value={city}
                label={cityText}
              />
            </View>
            <CustomTxetInputes
              multiline
              lableTextWrapperStyle={theme.colors.black1}
              lableWrapperStyle={{ marginTop: hp(1.3) }}
              wrapperStyle={{ height: hp(17) }}
              inputeWrapperStyle={{ height: hp(17), borderWidth: 0, textAlignVertical: 'top', top: hp(1) }}
              onChangeText={text => (setResume(text))}
              value={resume}
              label={resumeText}
            />
            <View style={styles.changePasswordBtnContainer}>
              <CustomeButton
                backgroundColor={theme.colors.blue1}
                onPress={() => {
                  aliasName ? dispatch(editeUserProfileInfoAction(nameAndFamily, email, aliasName, educaiton, job, city, birthDate, resume, apiHandle)) : CToast(userNameValidationText)
                }}
                // onPress={() => Keyboard.dismiss()}
                loading={changeuserInfo.loading}
                btnStyle={{ alignSelf: 'flex-start', marginTop: hp(2) }}
              >
                {confirmText}
              </CustomeButton>
        </View>
        <View>
          {/* <DatePickerModal /> */}
          <SimpleDatePicker
            changeVisible={() => dispatch(changeModalVisble(false))}
            // activeDate={birthDate}
            type={'register'}
            changeValue={setBirthDate}
            visible={modalVisble}
          />

        </View>
      </AuthenticationParentView >
    );

  } else {
    return (
      <CustomPending
        style={styles.pending}
        pending={getUserInfo.loading}
        retryAction={() =>
          dispatch(geteUserProfileInfoAction(getUserInfoApiHandle))
        }
      />
    )
  }
}
const confirmChangeUserInfo = () => {
  // dispatch(editeUserProfileInfo(nameAndFamily, email, aliasName, educaiton, job, city, birthDate, resume))
  // dispatch(editeUserProfileInfo(nameAndFamily, email, aliasName, education, email, educaiton, job, city, birthDate, resume))
}
export const UploadModalItm = (props) => {
  const { onPress, title, src, modelaMode } = props;
  if (modelaMode == 'education') {
    return (
      <RippleEffect onPress={onPress} style={styles.modalItm}>
        <CustomText style={{ fontSize: fontSize14, fontFamily: iranSans, borderWidth: 0, top: hp(.3), marginRight: wp(6) }}>{title}</CustomText>
      </RippleEffect>
    )
  } else {
    return (
      <RippleEffect onPress={onPress} style={styles.modalItm}>
        <Image source={src} style={styles.image} />
        <CustomText style={{ fontSize: fontSize14, fontFamily: iranSans, borderWidth: 0, top: hp(.3) }}>{title}</CustomText>
      </RippleEffect>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    flex: 1,
    backgroundColor: mainContainerBg
  },
  uploadImageModalContainer: {
    width: wp(80),
    height: hp(15),
    // borderWidth:1,
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  educationModalContetnContainerStyle: {
    width: wp(80),
    height: hp(40),
    borderWidth: 0,
    justifyContent: 'space-around',
    marginTop: hp(2),
    marginBottom: hp(1),
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    // justifyContent: "flex-end",
    alignSelf: "center",
    // flex: 1
  },
  modalItm: {
    width: wp(80),
    height: hp(6.5),
    borderRadius: theme.sizes.globalRadius,
    alignItems: 'center',
    backgroundColor: componentsBg,
    flexDirection: 'row-reverse'
  },
  image: {
    width: wp(8),
    height: hp(3),
    borderWidth: 0,
    resizeMode: 'contain',
    marginLeft: wp(4),
    marginRight: wp(4),
  },
  followHeaderShapeStyle: {
    width: wp(100),
    borderWidth: 0,
    height: hp(6),
    borderBottomLeftRadius: theme.sizes.globalRadius,
    borderBottomRightRadius: theme.sizes.globalRadius,
  },
  userImageContainer: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(11),
    backgroundColor: theme.colors.editeProfileUserImageBackColor,
    justifyContent: 'center',
  },
  userDefaultImageStyle: {
    width: wp(7), height: wp(7), borderRadius: wp(3.5), resizeMode: 'contain', alignSelf: 'center'
  },
  pending: {
    position: "relative",
    marginTop: hp(50)
  },
});

