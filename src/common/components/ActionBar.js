import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { CustomText } from ".";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../constants";
import { RippleEffect } from "../components/RippleEffect";
import CustomeImage from "./CustomeImage";
import { useSelector, useDispatch } from "react-redux";
import { iranSans, iranSansMedium } from "../../utils/helper/commonVariables";
import { font14, fontSize14, fontSize16 } from "../../utils/helper/responsiveSizes";
import * as NavigationService from '../../utils/NavigationService';
const ActionBar = ({ back, menu, title, navigation, titleColor, share, shareOnPress, noRradius, deleteOnPress }) => {
  const states = useSelector(state => state);
  let headerColor = states.globalReducer.appHeaderColor;

  const renderRightIcon = (menu, share, deleteOnPress ) => {
    if (menu) {
      return (
        <RippleEffect
          rippleCentered
          rippleContainerBorderRadius={wp(0)}
          onPress={share ? shareOnPress : () => {
            navigation.toggleDrawer();
          }}
          style={styles.menuIconArea}
        >
          <Image style={styles.icon} source={require("../../assets/menu.png")} />
        </RippleEffect>
      )
    } else if (share) {
      return (
        <RippleEffect
          rippleCentered
          rippleContainerBorderRadius={wp(0)}
          onPress={share ? shareOnPress : () => {
            navigation.toggleDrawer();
          }}
          style={styles.menuIconArea}
        >
          <Image style={styles.icon} source={require("../../assets/share/share.png")} />
        </RippleEffect>
      )
    } else if (deleteOnPress) {
      return (
        <RippleEffect
          rippleCentered
          rippleContainerBorderRadius={wp(0)}
          onPress={deleteOnPress ? deleteOnPress : () => {
            navigation.toggleDrawer();
          }}
          style={styles.menuIconArea}
        >
          <Image style={styles.icon} source={require("../../assets/delete/delete.png")} />
        </RippleEffect>
      )
    }

    else {
      return <View style={styles.menuIconArea} />
    }



  }

  return (
    // onPress={() => navigation.goBack()}
    <View style={[styles.container, { backgroundColor: headerColor }, noRradius ? {} : { borderBottomLeftRadius: theme.sizes.globalRadius, borderBottomRightRadius: theme.sizes.globalRadius, }]}>
      {back ? (<RippleEffect rippleCentered rippleContainerBorderRadius={wp(0)} onPress={() => NavigationService.goBack()} style={styles.backIconArea}>
        <Image source={require("../../assets/arrow/whiteArrow.png")} style={styles.icon} />
      </RippleEffect>) :
        <View style={styles.backIconArea} />
      }
      {/* <View
        style={{
          borderWidth: 1,
          justifyContent: "center",
          alignSelf: "center"
        }}
      > */}
      <View style={{flex:1,alignItems:'center',}}>
      <CustomText numberOfLines={1} 
      style={{ color: titleColor ? titleColor : theme.colors.black, fontSize: fontSize16, fontFamily: iranSansMedium }} 
      >{title}</CustomText>

      </View>
      {/* </View> */}
      {renderRightIcon(menu, share,deleteOnPress)}
      {/* {share ? (<RippleEffect
        rippleCentered
        rippleContainerBorderRadius={wp(0)}
        onPress={shareOnPress}
        style={styles.menuIconArea}
      >

      </RippleEffect>) :
        <View style={styles.menuIconArea} />
      } */}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
    justifyContent: "space-between",
    height: hp(7),
    width: '100%',
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 0,
    // backgroundColor: theme.colors.white,
    // elevation: 2
  },
  icon: {
    width: wp(6.4),
    height: hp(3),
    resizeMode: "contain",
    borderWidth: 0,
    borderColor: 'white'
  },
  menuIconArea: {
    width: wp(15),
    height: hp(4.5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  },
  backIconArea: {
    width: wp(15),
    height: hp(4.5),
    // height: hp(1.4),
    borderWidth: 0,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center"
    // marginLeft: wp(5)
  }
});
export { ActionBar };