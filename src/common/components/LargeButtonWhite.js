import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mainBtnBg, white, mainBlue, iranSans } from '../../utils/helper/commonVariables';
import Spinner from 'react-native-spinkit'
import ShadowView from 'react-native-simple-shadow-view'
import { font12, font14 } from '../../utils/helper/responsiveSizes';
import { RippleEffect } from '../components/RippleEffect';

const LargeButtonWhite = ({ onPress, children, btnStyle, labelStyle, shadow, icon, iconStyle, disable, loading }) => {
    const { buttonContainer, txtStyle, shadowStyle } = styles
    return (
        <RippleEffect 
        rippleContainerBorderRadius={wp(2)}
        disabled={loading || disable}
         style={[buttonContainer, btnStyle]} onPress={onPress} >
            {/* {shadow ?
                <ShadowView
                    style={[buttonContainer]}
                >
                    <Text style={[txtStyle, labelStyle]}>{children}</Text>
                </ShadowView>
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
                </View>
            } */}

            {shadow ?
                <ShadowView
                    style={[buttonContainer, shadowStyle, btnStyle]}
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
                        <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={mainBlue} />
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

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: hp(1.1),
        marginBottom: hp(1.1),
        marginLeft: hp(1.8),
        marginRight: hp(1.8),
        borderRadius: hp(2),
        width: wp(90),
        height: hp(7.6),
        backgroundColor: white,
        borderWidth: 1,
        borderColor: mainBlue,
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
    // shadowStyle: {
    //     shadowColor: mainBlue,
    //     shadowOpacity: 0.6,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowRadius: 10,
    //     elevation: 2
    // },
    txtStyle: {
        fontFamily: iranSans,
        fontSize: font14,
        color: mainBlue,
    }
})

export { LargeButtonWhite };