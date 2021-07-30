import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {theme} from '../constants'
import NavigationService from '../../utils/NavigationService'
import {CustomText} from '.'

const CategoryListItem = ({item , actions}) => {
    const onPress = () => () => {
        // NavigationService.navigate('issueList', actions)
    }
    return(
         <TouchableOpacity activeOpacity={0.6} onPress={onPress()} style={styles.container}>
            <Image 
                style={styles.image} 
                source={{uri : item.item.image}} />
            <View style={styles.text}>
                <CustomText 
                    numberOfLines={1}
                    fontSize={theme.fontSize.font14} 
                    textColor={theme.colors.gray2} >
                    {item.item.title} 
                </CustomText>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(24.7),
        height: hp(15.1),
        borderRadius:  wp(3),
        backgroundColor: theme.colors.white,
        // elevation: 2
    },
    image:{
        width: wp(24.7),
        height: hp(12.3),
        borderRadius:  wp(3),
    },
    text:{
        padding: hp(0.5),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export {CategoryListItem}