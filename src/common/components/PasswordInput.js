import React, {useState} from 'react'
import { StyleSheet, Image, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {CustomInput} from '.'
import CustomeImage from "./CustomeImage";

const PasswordInput = ({value, style, label, onChangeText, keyboardType, maxLength, editable, autoFocus}) => {
    const [secure, setSecure] = useState(true)
    return(
        <CustomInput 
            style={style}
            // value={value} 
            label={label}
            onChangeText={onChangeText} 
            secureTextEntry={secure ? true : false} 
            keyboardType={keyboardType} 
            autoFocus={autoFocus}
            editable={editable}
            maxLength={maxLength}
            icon={require('../../assets/password.png')}>
            <TouchableOpacity style={styles.passwordIcon} onPress={() => setSecure(!secure)}>
                <Image style={styles.image} 
                    source={secure ? 
                    require('../../assets/showPassword.png') : 
                    require('../../assets/hidePassword.png')} />
            </TouchableOpacity>
        </CustomInput>
    )
}
const styles = StyleSheet.create({
    passwordIcon:{
        width: wp(8.8),
        height:wp(8.8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain'
    },
})
export {PasswordInput}