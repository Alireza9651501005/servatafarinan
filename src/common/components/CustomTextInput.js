import React from 'react'
import { TextInput, StyleSheet, View, Image } from 'react-native'
import { theme } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CustomeImage from "./CustomeImage";
const CustomTextInput = ({ value, onChangeText, secureTextEntry, keyboardType, children, icon, maxLength, editable, autoFocus, style, multiline, onSelectionChange,inputRef }) => {
    return (
        
        <View style={styles.border}>
            <TextInput
                ref={inputRef}
                secureTextEntry={secureTextEntry}
                // placeholder={placeholder}
                selectionColor={theme.colors.primary}
                autoCorrect={false}
                autoCapitalize={'none'}
                style={[styles.input, style]}
                value={value}
                autoFocus={autoFocus}
                editable={editable}
                maxLength={maxLength}
                onChangeText={onChangeText}
                multiline={multiline}
                onSelectionChange={onSelectionChange}
                keyboardType={keyboardType} />
        </View>
    )
}
const styles = StyleSheet.create({
    border: {
        flex:1,
        // width: wp(79.4),
        // height: hp(5.7),
        // position: 'absolute',
        // borderWidth: wp(0.5),
        // borderColor: theme.colors.primary,
        borderRadius: wp(3),
    },
    container: {
        flexDirection: 'row',
        borderRadius: wp(3),
        // width: wp(79.4),
        flex:1,
        height: hp(5.7),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: theme.colors.primary,
        borderRadius: wp(3),
        width: hp(5.7),
        height: hp(5.7),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: wp(4),
        height: wp(4),
        resizeMode: 'contain'
    },
    input: {
        fontSize: theme.fontSize.font16,
        flex: 1,
        color: theme.colors.textWhite,
        paddingTop: hp(0.4),
        paddingBottom: hp(0.6),
        paddingLeft: wp(1),
        paddingRight: wp(1),
    }
})
export { CustomTextInput }