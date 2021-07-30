import React from 'react'
import {View, StyleSheet} from 'react-native'
import {CustomTextInput,CustomText} from '.'
import {theme} from '../constants'
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'

const CustomInput = ({ value, onChangeText, secureTextEntry, keyboardType, children, icon, maxLength, editable, autoFocus, style, label}) => {
    const container = [
        styles.view,
        style
    ]
    return(
        <View style={container}>
            {'label' ? 
            <CustomText 
                style={styles.text} 
                bold 
                // textColor={theme.colors.darkGray} 
                // fontSize={theme.fontSize.font16}
                >
                {'label'}
            </CustomText>
            : null}
            <CustomTextInput 
                editable={editable} 
                autoFocus= {autoFocus}
                icon={icon} 
                value={value} 
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                // children={children}
                onChangeText={onChangeText}
                maxLength={maxLength} >{children}</CustomTextInput>  
        </View>
    )
}
const styles = StyleSheet.create({
    view:{
        alignSelf: 'center'
    },
    text:{
        margin: wp(0.6)
    }
})
export {CustomInput}