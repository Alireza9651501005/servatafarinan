import React from 'react'
import { View, StyleSheet } from 'react-native'
import { theme } from '../constants'
import { ColoredButton, CustomText } from '.'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal'

const CustomModal = ({isVisible, force, positive, negative, onNegative, onPositive, children}) => {
    return(
        <Modal 
            isVisible={isVisible} 
            onBackdropPress={force ? null : ()=> onNegative()} >
            <View style={styles.modal}>
            {children}
            <View style={{marginTop: hp(3.7), justifyContent: force ? 'center' : 'space-between', flexDirection: 'row'}} >
            {force ? null : 
            <ColoredButton 
                border 
                width={wp(36)} 
                onPress={() => onNegative()} 
                title={negative} />}
            <ColoredButton
                color={theme.colors.primary} 
                width={wp(36)} 
                onPress={() => onPositive() }
                title={positive} />
            </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
   
    modal:{
        backgroundColor: theme.colors.white, 
        paddingVertical:  hp(3.7),
        paddingHorizontal: wp(4.7),
        borderRadius: wp(3)
    }
})
export {CustomModal}