import React from 'react'
import {TouchableOpacity, View, StyleSheet, Image, ActivityIndicator} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {CustomText} from '.'
import {theme, strings} from '../constants'
import Spinner from 'react-native-spinkit'
import CustomeImage from "./CustomeImage";

const RetryButton = ({ onPress, pending, style}) => {
    const containerStyle = [
        styles.container ,
        style
    ]
    return <View style={containerStyle}>
            {pending ? <Spinner isVisible={true} size={40} type={'ThreeBounce'} color={theme.colors.primary} /> : 
            <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.6}>
                 <Image 
                    style={styles.image} 
                    source={require('../../assets/retry.png')} />
                <CustomText
                    bold 
                    style={{color:theme.colors.white,alignSelf:'center'}}
                     >
                    {strings.retry}
                </CustomText>
            </TouchableOpacity> 
        }   
    </View>
}

const styles = StyleSheet.create({
    button:{
        width: wp(32),
        height: hp(5),
        borderRadius: wp(3),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
    },
    container:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: hp(3),
        height: hp(3),
        resizeMode: 'contain',
        marginRight: hp(1)
    },
})

export {RetryButton}