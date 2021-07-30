
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mainBtnBg, white, mainBlue, iranSans } from '../../utils/helper/commonVariables';
import ShadowView from 'react-native-simple-shadow-view'
import Spinner from 'react-native-spinkit'
import { font14, font12, fontSize20, fontSize14 } from '../../utils/helper/responsiveSizes';
import { RippleEffect } from './RippleEffect';
import CustomeImage from "./CustomeImage";
import { theme } from '../constants';
import { CustomText } from './CustomText';

const CustomeButton = ({ onPress, children, btnStyle, labelStyle, icon, iconStyle, loading, disable, backgroundColor }) => {
    const { buttonContainer, txtStyle } = styles
    return (
        <RippleEffect
            disabled={loading || disable}
            style={[buttonContainer, { backgroundColor: disable ? theme.colors.disable : backgroundColor ? backgroundColor : theme.colors.buttons }, btnStyle]}
            onPress={onPress} >

            <View>
                {loading ?
                    <Spinner isVisible={true} size={wp(10)} type={'ThreeBounce'} color={white} />
                    :
                    <View style={styles.buttonRow}>
                        <CustomText style={[txtStyle, labelStyle]}>{children}</CustomText>
                        {icon ?
                            <Image
                                style={[styles.iconStyle, iconStyle]}
                                source={icon}
                            /> :
                            null
                        }
                    </View>}
            </View>
        </RippleEffect>
    )
}

//sum of button height : hp(9.8)
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: hp(1.8),
        marginBottom: hp(1.8),
        borderRadius: wp(4),
        minHeight: hp(4.9),
        minWidth: wp(18),
        backgroundColor: mainBtnBg,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        height: hp(1.9),
        width: wp(4),
        marginLeft: wp(2),
        resizeMode: 'contain',
    },
    txtStyle: {
        fontFamily: iranSans,
        fontSize: fontSize14,
        // fontSize: fontSize20,
        color: theme.colors.whiteTypeC,
        borderWidth: 0,
        marginLeft: wp(3.2),
        marginRight: wp(3.2),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        // height: hp(5),
    }
})

export { CustomeButton };
