import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator, Image, PermissionsAndroid, Linking } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { mainContainerBg, whiteThird, componentsBg, borderColor, white, iranSans, mainBlue } from "../../utils/helper/commonVariables";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserEmail,
  changeUserJobPosition,
  changeUserJob,
  changeUserName,
  changeUserConfirmPass,
  changeUserPass,
  register,
  changeUserPhoneNumber,
  registerUserOptionalInfo
} from "./actions/authenticationAction";
import { AuthenticationParentView } from '../../common/components/AuthenticationParentView';
import SimpleDatePicker from '../../common/components/SimpleDatePicker';
import { LargeButton } from "../../common/components/LargeButton";
import { CustomTxetInputes } from "../../common/components/CustomTxetInputes";
import Header from "../../common/components/Header";
import CToast from "../../common/components/CToast";
import { theme } from "../../common/constants";
import { CustomeButton } from '../../common/components/CustomeButton';
import { nameAndFamilyTxt, aliasNameTxt, passwordTxt, confirmPasswordTxt, phoneNumberTxt, educationTxt, emailTxt, jobTxt, cityTxt, birthdayTxt } from "./texts";
import { passwordIsNotMatch, email } from "../../common/constants/strings";
import Ripple from 'react-native-material-ripple';
import { showModalConfirm, changeModalVisble } from "../../store/globalActions";
import { uploadProfileText, getPcitureFromCameraText, choosePictureFromGalleryText, accessToCameraText, accessToStorageText } from "../profile/texts";
import { getprofile, logOut, shareApp, uploadProfileImageAc, changeProfileImage, changeUserNameAc, updateUserNameAction } from "../profile/actions/profileAction";
import { RippleEffect } from "../../common/components";
import { CustomText } from "../../common/components/CustomText";
import ImagePicker from 'react-native-image-crop-picker';
import { fontSize14 } from "../../utils/helper/responsiveSizes";
import { reportcatchToFireBase } from "../../utils/helper/functions";
export default function RegisterStepTwo({ navigation }) {
  const [email, setEmail] = useState('');
  const [edicaiton, setEdicaiton] = useState('');
  const [job, setJob] = useState('');
  const [city, setCity] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [image, setImage] = useState(null);
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
  let profileData = states.profileReducer, registerOptionalInfoLoading;
  registerOptionalInfoLoading = states.authenticationReducer.registerOptionalInfoLoading;
  const showUploadImageModal = () => {
    dispatch(showModalConfirm(true, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const granted2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (granted == 'never_ask_again' || granted2 == 'never_ask_again') {
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
      console.log(err);
      // reportcatchToFireBase(err, 'RegisterStepTwo.js/line:79')
    }
  };
  const options = {
    compressImageQuality: .9,
    compressImageMaxWidth: 2048,
    compressImageMaxHeight: 1536,
    cropping: true,
    cropperCircleOverlay: true,
    mediaType: "photo",
    freeStyleCropEnabled: true,
    cropperStatusBarColor: 'gray',
    // includeBase64: false,
    includeBase64: true,
    cropperToolbarTitle: 'برش تصویر',
    hideBottomControls: true,
    height: hp(100),
    width: wp(200)
  }
  const takePhotoFgallery = () => {
    ImagePicker.openPicker(options).then(image => {
      // let imageAddress = `${image}`;
      // //console.log(image.path)
      let imageAddress = `data:${image.mime};base64,${image.data}`;
      setImage(imageAddress)
      dispatch(changeProfileImage(imageAddress))
      // uploadProfileImage(imageAddress)
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
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (granted == 'never_ask_again') {
        dispatch(showModalConfirm(true, 'ثروت آفرینان', accessToStorageText, () => {
          Linking.openSettings().then(() => {
            dispatch(showModalConfirm(false, 'ثروت آفرینان', accessToStorageText, null))
          })
        }))
      }
      else if (granted != PermissionsAndroid.RESULTS.DENIED) {
        takePhotoFgallery()
      }
      // takePhotoFgallery()
    } catch (err) {
      console.log(err);
      reportcatchToFireBase(err, 'RegisterStepTwo.js/line:135')
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
  const uploadProfileImage = (image) => {
    dispatch(uploadProfileImageAc(image));
  };
  const closeModal = () => {
    dispatch(showModalConfirm(false, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
    dispatch(changeProfileImage(false))
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
              <Image style={profileData.profileData.image ? styles.userImageContainer : styles.userDefaultImageStyle} source={profileData.profileData.image ? { uri: profileData.profileData.image } : require('../../assets/userDefaultProfile/userDefaultProfile.png')} />

              ,

              <Ripple onPress={showUploadImageModal} rippleContainerBorderRadius={wp(12)} style={{ width: wp(10), height: wp(10), borderRadius: wp(5), borderWidth: 0, backgroundColor: '#c8e2ec', left: profileData.profileData.image ? wp(15) : wp(12), top: profileData.profileData.image ? hp(9) : hp(8.5), position: "absolute", justifyContent: 'center' }} >
                <Image style={{ width: wp(4), height: wp(4), borderRadius: wp(2), resizeMode: 'contain', alignSelf: 'center' }} source={require('../../assets/uploadImage/camera.png')} />
              </Ripple>
            ]


          }


        </View>
      </View >
    );
  };
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
  let userPassword,
    userConfirmPassword,
    userName,
    userJob,
    userEmail,
    userJobPosition,
    loading,
    userPhoneNumber,
    modalVisble;
  userPassword = states.authenticationReducer.userPassword;
  userConfirmPassword = states.authenticationReducer.userConfirmPassword;
  userName = states.authenticationReducer.userName;
  userJob = states.authenticationReducer.userJob;
  userEmail = states.authenticationReducer.userEmail;
  userJobPosition = states.authenticationReducer.userJobPosition;
  loading = states.authenticationReducer.loading;
  userPhoneNumber = states.authenticationReducer.userPhoneNumber;
  modalVisble = states.globalReducer.modalVisible;
  const dispatch = useDispatch();
  //console.log("states", states.globalReducer);
  return (
    <AuthenticationParentView
      noRradius
      scrollToPosition={20}
      buttomPicture
      titleColor={whiteThird}
      navigation={navigation}
      title={'خوش آمدی!'}
      buttomPictureContainerHeight={27}
      back style={{ backgroundColor: theme.colors.darkBlue }}>
     {/* <View style={{borderWidth:0,borderColor:'red',height:hp(66)}}> */}
     {renderPicture()}

     <CustomTxetInputes
        lableWrapperStyle={{ marginTop: hp(3) }}
        onChangeText={text => (setEmail(text))}
        value={email}
        label={emailTxt}
      />
      <CustomTxetInputes
        lableWrapperStyle={{ marginTop: hp(1.3) }}
        onChangeText={text => (setEdicaiton(text))}
        value={edicaiton}
        label={educationTxt}
      />
      <CustomTxetInputes
        lableWrapperStyle={{ marginTop: hp(1.3) }}
        onChangeText={text => (setJob(text))}
        value={job}
        label={jobTxt}
      />
      <View style={{ flexDirection: 'row', width: wp(79.7), borderWidth: 0, borderColor: white, alignSelf: "center", justifyContent: 'space-between', marginTop: hp(1.3) }}>
        <CustomTxetInputes
          onPress={() => dispatch(changeModalVisble(true))}
          lableWrapperStyle={{ width: wp(34) }}
          wrapperStyle={{ width: wp(36) }}
          onChangeText={text => (setBirthDate(text))}
          value={birthDate}
          label={birthdayTxt}
        />
        <CustomTxetInputes
          lableWrapperStyle={{ width: wp(34) }}
          wrapperStyle={{ width: wp(36) }}
          onChangeText={text => (setCity(text))}
          value={city}
          // onSubmitEditing={() => dispatch(registerUserOptionalInfo(edicaiton, job, city, birthDate, email))}
          label={cityTxt}
        />
      </View>
      <View style={styles.changePasswordBtnContainer}>
        <CustomeButton
          backgroundColor={theme.colors.blue1}
          onPress={() => dispatch(registerUserOptionalInfo(edicaiton, job, city, birthDate, email))}
          loading={registerOptionalInfoLoading}
          btnStyle={{ alignSelf: 'flex-start', marginTop: hp(4) }}
        >
          {'ادامه'}
        </CustomeButton>
        <CustomeButton
          backgroundColor={theme.colors.blue1}
          onPress={() => navigation.navigate('Home')}
          // loading={loading}
          btnStyle={{ alignSelf: 'flex-start', marginTop: hp(4) }}
        >
          {'بعدا تکمیل میکنم'}
        </CustomeButton>
      </View>
      {/* </View> */}
      <View >
        {/* <DatePickerModal /> */}
        <SimpleDatePicker
          changeVisible={() => dispatch(changeModalVisble(false))}
          // activeDate={birthDate}
          type={'register'}
          changeValue={setBirthDate}
          visible={modalVisble}
        />

      </View>
    </AuthenticationParentView>
  );
}
export const UploadModalItm = (props) => {
  const { onPress, title, src } = props;
  return (
    <RippleEffect onPress={onPress} style={styles.modalItm}>
      <Image source={src} style={styles.image} />
      <CustomText style={{ fontSize: fontSize14, fontFamily: iranSans, borderWidth: 0, top: hp(.3) }}>{title}</CustomText>
    </RippleEffect>
  )
}
const styles = StyleSheet.create({
  userImageContainer: {
    width: wp(22), height: wp(22), borderRadius: wp(11), borderWidth: 0, backgroundColor: '#abd9ec', justifyContent: 'center'
  },
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
  userDefaultImageStyle: {
    width: wp(7), height: wp(7), borderRadius: wp(3.5), resizeMode: 'contain', alignSelf: 'center'
  },
});