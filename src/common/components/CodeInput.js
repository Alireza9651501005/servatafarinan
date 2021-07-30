import React from 'react'
import {TextInput, StyleSheet, View} from 'react-native'
import {theme} from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const CodeInput = ({ value, onChangeText, editable, autoFocus, style }) => {
    const containerStyle = [
        styles.container,
        style
    ]
    return <View style={containerStyle}>
            <TextInput 
                autoCorrect={false}
                autoCapitalize={'none'}
                style={styles.input}
                // value={value}
                autoFocus={autoFocus}
                editable={editable}
                maxLength={5}
                selectionColor={theme.colors.white}
                onChangeText={onChangeText} 
                keyboardType= {'number-pad'} />
            </View>
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.colors.primary,
        borderRadius: wp(3),
        width: wp(35.7),
        height: hp(5.7),
        justifyContent: 'center'
    },
    input: {
        fontSize: theme.fontSize.font20,
        fontFamily: 'Vazir',
        color: theme.colors.white,
        textDecorationLine: 'underline',
        paddingTop: hp(0),
        paddingBottom: hp(0),
        width: wp(35.7),
        height: hp(5),
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})
export {CodeInput}