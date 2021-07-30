import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mainBtnBg, white, mainBlue, iranSans } from '../../utils/helper/commonVariables';
import ShadowView from 'react-native-simple-shadow-view'
import Spinner from 'react-native-spinkit'
import { font14, font12 } from '../../utils/helper/responsiveSizes';
import { RippleEffect } from '../components/RippleEffect';
import CustomeImage from "./CustomeImage";

const LargeButton = ({ onPress, children, btnStyle, labelStyle, shadow, icon, iconStyle, loading, disable }) => {
    const { buttonContainer, txtStyle, shadowStyle } = styles
    return (
        <RippleEffect 
        disabled={loading || disable}
         style={[buttonContainer,{backgroundColor:disable? '#aaa':mainBlue}, btnStyle]} 
         onPress={loading ? null : onPress}
         >
            {shadow ?
                <ShadowView
                    style={[ shadowStyle, btnStyle]}
                >
                    {loading ?
                        <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={white} />
                        :
                        <View style={styles.buttonRow}>
                            <Text style={[txtStyle, labelStyle]}>{children}</Text>
                            {icon ?
                                <Image
                                    style={[styles.iconStyle, iconStyle]}
                                    source={icon}
                                /> : 
                                null
                            }
                        </View>}
                </ShadowView>
                :
                <View>
                    {loading ?
                        <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={white} />
                        :
                        <View style={styles.buttonRow}>
                            <Text style={[txtStyle, labelStyle]}>{children}</Text>
                            {icon ?
                                <Image
                                    style={[styles.iconStyle, iconStyle]}
                                    source={icon}
                                /> :
                                null
                            }
                        </View>}
                </View>

            }

        </RippleEffect>
    )
}

//sum of button height : hp(9.8)
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: hp(1.1),
        marginBottom: hp(1.1),
        marginLeft: hp(1.8),
        marginRight: hp(1.8),
        borderRadius: hp(2),
        width: wp(90),
        height: hp(7.6),
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
    shadowStyle: {
        marginTop: hp(1.1),
        marginBottom: hp(1.1),
        marginLeft: hp(1.8),
        marginRight: hp(1.8),
        borderRadius: hp(2),
        width: wp(90),
        height: hp(7.6),
        // backgroundColor: mainBtnBg,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: mainBlue,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        // elevation: 3
    },
    txtStyle: {
        fontFamily: iranSans,
        fontSize: font14,
        color: white,
    }
})

export { LargeButton };