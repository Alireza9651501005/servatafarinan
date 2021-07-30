import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import { iranSans } from '../../utils/helper/commonVariables'
import { font14, font16, fontSize14 } from '../../utils/helper/responsiveSizes'
import {theme} from '../constants'
import { CustomText } from './CustomText'

const CustomTouchableText = ({text, style, disabled, lightText, large, underline, onPress }) => {
    const textStyle = [
        styles.textStyle,
        lightText && {color: theme.colors.gray},
        large && {fontSize: theme.fontSize.font16},
        underline && {textDecorationLine: 'underline'},
        style,
    ]
    return( 
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.6}>
            <CustomText style={textStyle}>{text}</CustomText>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    textStyle: {
        textAlignVertical: 'center',
        fontSize: font16,
        color: theme.colors.textGreen,
        fontFamily: iranSans,
    }
})
export {CustomTouchableText}
