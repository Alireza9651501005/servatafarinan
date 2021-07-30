import React from 'react'
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import {theme} from '../constants'
import {CustomText} from '.'
// import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

const GradientImageButton = ({title, onPress, icon, style}) => {
    const btnStyle= [
        styles.container ,
        style
    ]
    return(
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        {/* <LinearGradient 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            colors={theme.colors.gradient} 
            style= {btnStyle}>
            <View style={styles.touchable} onPress={onPress}>
            <CustomText
                textColor={theme.colors.white} 
                fontSize={theme.fontSize.font14} >
                {title}
            </CustomText>
            <Image 
                style={styles.icon} 
                source={icon} />
            </View>
        </LinearGradient> */}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(30.5),
        height: hp(5.4),
        borderRadius: wp(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchable:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    icon :{
        width: theme.sizes.iconSize,
        height: theme.sizes.iconSize,
        resizeMode: 'contain',
        marginLeft: wp(1.5)
    }
})

export {GradientImageButton}