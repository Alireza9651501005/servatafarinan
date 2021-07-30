import React from 'react'
import { StyleSheet } from 'react-native'
import { RetryButton } from '.'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default CustomPending = ({pending, retryAction, style}) => {
    const spinnerStyle = [
        styles.spinner ,
        style
    ]
    return( 
        <RetryButton 
            pending={pending} 
            onPress={retryAction } 
            style={spinnerStyle} />
    )
}
const styles = StyleSheet.create({
    spinner:{
        position: 'absolute', 
        marginTop: hp(45), 
        alignSelf: 'center'
    },
})