import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Image, View, StyleSheet, PermissionsAndroid, Linking, ActivityIndicator ,Platform } from 'react-native';
// import { AppTour, AppTourView } from 'react-native-app-tour'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import ImagePicker from 'react-native-image-crop-picker';
import { changeProfileImage, uploadProfileImage, uploadProfileImageAc } from '../actions/profileAction'
import { CustomText, RatingStars, RippleEffect } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize16, fontSize20, largeFont } from '../../../utils/helper/responsiveSizes';
import { showModalConfirm } from '../../../store/globalActions';
import { accessToStorageText, choosePictureFromGalleryText, getPcitureFromCameraText, uploadProfileText, totalPointTxt, accessToCameraText } from '../texts';
import { borderColor } from '../../../utils/helper/commonVariables';
import { color } from 'react-native-reanimated';
import { theme } from '../../../common/constants';
import { reportcatchToFireBase } from '../../../utils/helper/functions';


export default function ProfileImageRow(props) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const states = useSelector(state => state)
    let starCount = states.profileReducer.starCount;


    let profileData = states.profileReducer;
    const options = {
        compressImageQuality: .9,
        compressImageMaxWidth: 2048,
        compressImageMaxHeight: 1536,
        cropping: true,
        cropperCircleOverlay: true,
        mediaType: "photo",
        freeStyleCropEnabled: true,
        cropperStatusBarColor: 'gray',
        includeBase64: true,
        cropperToolbarTitle: 'برش تصویر',
        hideBottomControls: true,
        height:hp(100),
        width:wp(200)
    }


    const showUploadImageModal = () => {
        dispatch(showModalConfirm(true, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
    }

    const closeModal = () => {
        dispatch(showModalConfirm(false, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
        dispatch(changeProfileImage(false))
    }

    const uploadImage = () => {
        let camera, gallery;
        camera = require('../../../assets/uploadImage/camera.png');
        gallery = require('../../../assets/uploadImage/gallery.png');
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

    const requestCameraPermission = async () => {
        try {
            if(Platform.OS==='ios'){
                takePhotoFcamera()
            }else{
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
        }
        } catch (err) {
            // reportcatchToFireBase(err, 'profileImageRow.js/line:84')
            console.log(err);
        }
    };

    const takePhotoFgalleryPermission = async () => {
        try {
            if(Platform.OS==='ios'){
                takePhotoFgallery()
            }else{
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
            }
            
        } catch (err) {
            reportcatchToFireBase(err, 'profileImageRow.js/line:102')
            console.log(err);
        }
    };

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
            //console.log('image address ', imageAddress)
            dispatch(changeProfileImage(imageAddress))
            uploadProfileImage(imageAddress)
            dispatch(showModalConfirm(false, uploadProfileText, uploadImage(), uploadProfileImage, null, closeModal))
        });
    };
    const renderPicture = () => {
        return (
            <View style={{ borderWidth: hp(.3), borderRadius: theme.sizes.globalRadius, overflow: 'hidden', borderColor: colors.borderBlue }}>
                <Ripple
                key={'props.key'}
                ref={ref => {
                    if (!ref) return

                    // this.button1 = ref

                    // props.addAppTourTarget &&
                    //     props.addAppTourTarget(AppTourView.for(ref, { ...props.tourProps }))
                }}
                    // rippleContainerBorderRadius={wp(24)}
                    style={{ width: wp(35), height: wp(33),alignItems:'center',justifyContent:'center' }}
                    // style={{ width: wp(33), height: wp(33),alignItems:'center',justifyContent:'center' }}
                    onPress={showUploadImageModal}
                    rippleOpacity={0} >
                    {profileData.uploadProfileImageLoading ?
                        <ActivityIndicator color={colors.buttons} size="large" />
                        // <Spinner style={{ flex: 1, marginBottom: hp(35), alignSelf: 'center' }} isVisible={true} size={hp(8)} type={'ThreeBounce'} color={theme.colors.primary} />
                        :
                        <Image
                            style={{ width: wp(35), height: wp(33) }}
                            // style={{ width: wp(33), height: wp(33) }}
                            source={{ uri: profileData.profileData.image }} />
                    }
                </Ripple>
            </View>
        );
    };
    return (
        < View style={
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: sizes.globalMargin,
                // paddingLeft: sizes.globalMargin
            }
        } >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <CustomText bold style={{ fontSize: fontSize20, color: colors.textWhite, top: 2 }}>{profileData.scientificScores}</CustomText>
                {console.log(profileData.profileData)}
                <RatingStars type={'profile'} rate={starCount} />
                <CustomText style={{ color: colors.textWhite, top: 2 }}>{totalPointTxt}</CustomText>
            </View>

            <View>
                {renderPicture()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    uploadImageModalContainer: {
        width: wp(80),
        height: hp(15),
        // borderWidth:1,
        justifyContent: 'space-between',
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    modalItm: {
        width: wp(80),
        height: hp(6.5),
        borderRadius: hp(2),
        alignItems: 'center',
        backgroundColor: colors.componentWhite,
        flexDirection: 'row-reverse'
    },
    image: {
        width: wp(8),
        height: hp(3),
        borderWidth: 0,
        resizeMode: 'contain',
        // marginLeft: wp(4),
        // marginRight: wp(4),
    },
})

export const UploadModalItm = (props) => {
    const { onPress, title, src } = props;
    return (
        <RippleEffect onPress={onPress} style={styles.modalItm}>
            <Image source={src} style={styles.image} />
            <CustomText>{title}</CustomText>
        </RippleEffect>
    )
}