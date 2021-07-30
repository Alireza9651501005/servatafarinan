import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mainBtnBg, white, whiteBtnBg, mainBlue, iranSans } from '../../utils/helper/commonVariables';
import { font12 } from '../../utils/helper/responsiveSizes'
import Spinner from 'react-native-spinkit'
import { RippleEffect } from '../components/RippleEffect';

const MediumButtonWhite = ({ onPress, children, btnStyle, labelStyle, loading, spinnerColor, disable }) => {
    const { buttonContainer, txtStyle } = styles
    return (
        <RippleEffect
        rippleContainerBorderRadius={wp(3.5)}
            disabled={loading || disable}
            onPress={onPress}
            style={[buttonContainer, btnStyle]}
        >
            {loading ?
                <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={spinnerColor} />
                :
                <Text style={[txtStyle, labelStyle]}>{children}</Text>
                }
        </RippleEffect>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: hp(1.8),
        marginBottom: hp(1.8),
        marginLeft: hp(1.8),
        marginRight: hp(1.8),
        borderRadius: hp(2),
        width: wp(42),
        height: hp(6.5),
        backgroundColor: whiteBtnBg,
        borderWidth: 1,
        borderColor: mainBlue,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    txtStyle: {
        fontFamily: iranSans,
        fontSize: font12,
        color: mainBlue
    }
})

export { MediumButtonWhite };