import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, sizes } from '../constants/theme';
import { RippleEffect } from './RippleEffect';
import * as NavigationService from '../../utils/NavigationService';
import { CustomText } from './CustomText';
import { fontSize14, fontSize16 } from '../../utils/helper/responsiveSizes';

function BigHeader(props) {

    const renderRightIcon = () => {
        if (props.rightIcon) {
          return (
            <RippleEffect
              rippleCentered
              rippleContainerBorderRadius={wp(0)}
              onPress={props.rightIconPress}
              style={styles.menuIconArea}
            >
              <Image style={styles.icon} source={props.rightIcon} />
            </RippleEffect>
          )
        } else {
          return <View style={styles.menuIconArea} />
        }
    
    
    
      }

    return (
        <View style={{borderBottomRightRadius:sizes.globalRadius,borderBottomLeftRadius:sizes.globalRadius,overflow:'hidden'}}>
            <View style={[styles.container, { backgroundColor: props.headerColor?props.headerColor:colors.headerDarkBlue }]}>
                {props.back ? (<RippleEffect rippleCentered rippleContainerBorderRadius={wp(0)} onPress={() => NavigationService.goBack()} style={styles.backIconArea}>
                    <Image source={require("../../assets/arrow/whiteArrow.png")} style={styles.icon} />
                </RippleEffect>) :
                    <View style={styles.backIconArea} />
                }
                <CustomText style={{ color: props.titleColor ? props.titleColor : colors.textWhite, fontSize: fontSize16 }} >{props.title}</CustomText>

                {renderRightIcon()}
            </View>
            <View style={{paddingBottom:wp(5),paddingTop:wp(5),alignItems:'center', backgroundColor: props.headerColor?props.headerColor:colors.headerDarkBlue }}>
                <Image 
                    source = {props.bigImage}
                    style={{width:'100%',height:hp(23),resizeMode:'contain'}}
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
      // height: hp(5),
      width: '100%',
      alignSelf: "center",
      alignItems: "center",
      flexDirection: "row",
      borderColor: "white",
      paddingTop:wp(5),
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

  export { BigHeader };