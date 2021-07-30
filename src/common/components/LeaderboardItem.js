import React from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
import { CustomText, ListItem, CustomTouchableText } from '.'
import { theme } from '../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as NavigationService from '../../utils/NavigationService'
import { RippleEffect } from './RippleEffect'

const LeaderBoardItem = ({ item, index, navigation }) => {
    const navToPublicProfile = () => {
        let id = item.user_id;
        NavigationService.navigate('PublicProfileScreen', id)
    }
    return (
        <RippleEffect activeOpacity={0.6} onPress={navToPublicProfile} style={[itemStyle.container, item.is_me && { backgroundColor: theme.colors.primary }]}>
            <View style={[itemStyle.imageWrapper, item.is_me && { borderColor: '#fff' }]}>
                <Image
                    // resizeMode={'repeat'}
                    style={itemStyle.image}
                    source={item.image ? { uri: item.image } : require('../../assets/profilecircle.png')} />
            </View>

            <CustomText
                style={[itemStyle.text, item.is_me && { color: '#fff' }]}
                numberOfLines={1}
                fontSize={theme.fontSize.font14}
                textColor={theme.colors.gray2} >
                {item.username}
            </CustomText>
            <View style={{ flex: 1 }} />
            <Text style={{ fontSize: theme.fontSize.font20, color: item.is_me && '#fff' }}>#{item.rank}</Text>
        </RippleEffect>
    )
}

const itemStyle = StyleSheet.create({
    container: {
        width: wp(90),
        // height: hp(10),
        alignSelf: 'center',
        borderRadius: wp(3),
        justifyContent: 'center',
        padding: wp(3),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginTop: hp(1),
        marginBottom: hp(1),
        backgroundColor: theme.colors.white,
        // elevation: 2
    },
    image: {
        width: hp(6),
        height: hp(6),
        resizeMode: 'cover'
    },
    imageWrapper: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
        borderWidth: 1,
        borderColor: theme.colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    text: {
        padding: hp(0.5),
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'right',
        marginRight: wp(2),
    }
})

export { LeaderBoardItem }