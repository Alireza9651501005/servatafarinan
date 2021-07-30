import React, { Component } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { CustomeButton } from '../../common/components/CustomeButton';
// import { MediumButton } from 'utils/commonComponents/MediumButton';
// import { CustomText } from 'utils/commonComponents'
import { font14 } from "../../utils/helper/responsiveSizes";
// import { yes, no, progressBarStatusTxtA, cancelTxt, openReport, progressBarStatusTxtB, settings, accessToStorage, accessToCamera, closeTxt } from "utils/helper/commonTexts";
import { showModalConfirm } from "../../store/globalActions";
import { uploadProfileImageAc } from '../../features/profile/actions/profileAction';
import { CustomText } from "./CustomText";
import { MediumButton } from "../components/MediumButton";
import { MediumButtonWhite } from "../components/MediumButtonWhite";
import { uploadProfileText, accessToCameraText, accessToStorageText, confirmLogOutText, confirmLogOutModalTitleText } from "../../features/profile/texts";
import CToast from "./CToast";
import { theme } from "../constants";
import { delteTitleText } from "../../features/userInbox/texts";
class ModalVu extends Component {
  cancelBtnAction = () => {
    const {
      showModalConfirm,
      ConfirmModalTitle,
      ConfirmModalContent,
      noButtonAction
    } = this.props;
    noButtonAction ? noButtonAction() : null;
    showModalConfirm(false, ConfirmModalTitle, ConfirmModalContent, null);
  };
  renderModalBtns = () => {
    const {
      showModalConfirm,
      ConfirmModalTitle,
      ConfirmModalContent,
      yesBtn,
      loading,
      singleBtnTitle,
      uploadProfileImageLoading,
      profileImage,
      logOutLoading,
      deleteMessageLoading,
      profileData,
      uploadProfileImageAc
    } = this.props;
    let uploadProfileImageValidationText = 'لطفا عکس پروفایل خود را انتخاب نمایید.';
    let ConfirmModalContentType = typeof ConfirmModalContent;
    if (ConfirmModalTitle == uploadProfileText) {
      return (
        <View style={styles.btnContainerS}>
          {profileData.image_exist ? <CustomeButton
            backgroundColor={theme.colors.deleteProfielImageBackground}
            btnStyle={styles.noBtnS}
            onPress={() => {
              this.cancelBtnAction();
              uploadProfileImageAc(null, 'delete')
            }}>
            {"حذف عکس کاربری"}
          </CustomeButton> : null}
          <CustomeButton
            backgroundColor={theme.colors.blue1}
            btnStyle={styles.yesBtnS}
            onPress={this.cancelBtnAction}>{"انصراف"}</CustomeButton>
        </View>
      );
    }
    else if (ConfirmModalContentType != "string") {
      return (
        <MediumButton
          btnStyle={{ marginBottom: hp(3.2), marginTop: hp(0) }}
          onPress={yesBtn}
          loading={loading}
          labelStyle={styles.ConfirmationLableTxtS}
        >
          {singleBtnTitle}
        </MediumButton>
      );
    }
    else if (ConfirmModalTitle == confirmLogOutModalTitleText) {
      return (
        <View style={styles.btnContainerS}>
          <MediumButton
            btnStyle={styles.noBtnS}
            onPress={this.cancelBtnAction}
            loading={loading}
          >
            {"خیر"}
          </MediumButton>
          < MediumButtonWhite
            btnStyle={styles.yesBtnS}
            onPress={yesBtn}
            loading={logOutLoading ? logOutLoading : loading}
            labelStyle={styles.ConfirmationLableTxtS}
          >
            {'بله'}
          </MediumButtonWhite>
        </View>
      );
    }
    else {
      let yetBtnTitle = null;
      if (ConfirmModalContent == accessToCameraText || ConfirmModalContent == accessToStorageText) {
        yetBtnTitle = 'تنظیمات'
      } else {
        yetBtnTitle = 'بله'
      }
      return (
        <View style={styles.btnContainerS}>
          <MediumButtonWhite
            btnStyle={ConfirmModalTitle == confirmLogOutModalTitleText ? null : styles.yesBtnS}
            onPress={this.cancelBtnAction}
            loading={loading}
          >
            {"خیر"}
          </MediumButtonWhite>
          <MediumButton
            btnStyle={styles.noBtnS}
            onPress={yesBtn}
            loading={ConfirmModalTitle == confirmLogOutModalTitleText ? logOutLoading : deleteMessageLoading}
            labelStyle={styles.ConfirmationLableTxtS}
          >
            {yetBtnTitle}
            {/* {ConfirmModalTitle == confirmLogOutModalTitleText || delteTitleText ? 'بله' : ConfirmModalContent == accessToCameraText || accessToStorageText ? 'تنظیمات' : "بله"} */}
          </MediumButton>
        </View>
      );
    }
  };
  renderModalContent = () => {
    const { ConfirmModalContent } = this.props;
    let ConfirmModalContentType = typeof ConfirmModalContent;
    //console.log('ConfirmModalContentType', ConfirmModalContentType)
    //console.log("condition,", ConfirmModalContentType);
    //  return ConfirmModalContent;
    // return(null)
    if (ConfirmModalContentType == "string") {
      return (
        <View style={{ margin: wp(5), borderWidth: 0, width: wp(75) }}>
          <CustomText style={{ textAlign: "right" }}>
            {ConfirmModalContent}
          </CustomText>
        </View>
      );
    } else if (ConfirmModalContentType == "object") {
      return ConfirmModalContent;
    }
  };
  render() {
    const {
      yesBtn,
      showConfirmModal,
      ConfirmModalContent,
      ConfirmModalTitle,
      progressValue,
      logOutLoading
    } = this.props;
    //console.log("showConfirmModal", showConfirmModal);
    return (
      <Modal
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        animationType="slide"
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        // isVisible={false}
        isVisible={showConfirmModal}
        onBackButtonPress={logOutLoading ? null : this.cancelBtnAction}
        onBackdropPress={logOutLoading ? null : this.cancelBtnAction}
      >
        <View key="modalView" style={styles.modalChildVu}>
          {/* <View style={{ width: 200, height: 200, borderWidth: 1 }}></View> */}
          <CustomText bold style={styles.modalTitleS}>
            {ConfirmModalTitle}
          </CustomText>
          {this.renderModalContent()}
          {this.renderModalBtns()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalChildVu: {
    // height: hp(25),
    height: "auto",
    // padding: 1,
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: theme.sizes.globalRadius,
    backgroundColor: "white"
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
  modalTitleS: {
    marginTop: hp(3.2),
    marginBottom: hp(0),
    fontSize: font14,
    // borderWidth: 1,
    alignSelf: "center"
  }
});
const mapStateToProps = state => ({
  showConfirmModal: state.globalReducer.showConfirmModal,
  yesBtn: state.globalReducer.ConfirmModalConfirmFunc,
  noButtonAction: state.globalReducer.noButtonAction,
  ConfirmModalContent: state.globalReducer.ConfirmModalContent,
  ConfirmModalTitle: state.globalReducer.ConfirmModalTitle,
  singleBtnTitle: state.globalReducer.singleBtnTitle,
  progressValue: state.globalReducer.downloadPercentage,
  uploadProfileImageLoading: state.profileReducer.uploadProfileImageLoading,
  logOutLoading: state.profileReducer.logOutLoading,
  deleteMessageLoading: state.userInboxReducer.deleteMessageLoading,
  profileImage: state.profileReducer.profileImage,
  profileData: state.profileReducer.profileData,
});
export default connect(mapStateToProps, { showModalConfirm, uploadProfileImageAc })(ModalVu);
