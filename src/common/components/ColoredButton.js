import React from 'react' 
import {TouchableOpacity, StyleSheet, View} from 'react-native'
import {CustomText} from '.'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'

const ColoredButton = ({title, style, color, onPress, border, width }) => {
    const btnStyle = [
        styles.container,
        color && {backgroundColor: color},
        border && {borderWidth: 1, borderColor: theme.colors.primary},
        width && {width: width},
        style
    ]
    return <TouchableOpacity activeOpacity={0.6} style={btnStyle} onPress={onPress} >
            <CustomText
                textColor={ border? theme.colors.primary : theme.colors.white} 
                fontSize={theme.fontSize.font14} 
                style={{flex:1}}>
                {title} 
            </CustomText>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        height: hp(4.6),
        borderRadius: wp(3),
        alignItems: 'center'
    }
})

export {ColoredButton}