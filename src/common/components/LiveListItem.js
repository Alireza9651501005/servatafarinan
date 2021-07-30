import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Linking, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import * as NavigationService from "../../utils/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import { font12, font16 } from '../../utils/helper/responsiveSizes'
import { actionsTypes } from '../constants/variables'
const LiveListItem = ({ item, actions, itemLayout }) => {
    const dispatch = useDispatch();
    return <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(actions, dispatch)} style={styles.container}>
        <Image style={styles.image} source={{ uri: item.item.image }} />
        <View style={{ padding: wp(5), paddingTop: hp(2), paddingBottom: hp(2) }}>
            <CustomText style={{ fontSize: font12 }} numberOfLines={1} >{item.item.date}</CustomText>

            <CustomText style={styles.text} numberOfLines={1} >{item.item.title}</CustomText>
        </View>
    </TouchableOpacity>
}
const navigation = actionsTypes
const onPress = (actions, dispatch) => {
    //console.log('actions', actions)
    let inApp = actions.in_app, url = actions.url;
    if (inApp) {
        //navigate
        NavigationService.push(navigation[actions.type], actions)
    } else if (!inApp) {
        //open url
        // url = 'https://www.instagram.com/mazaheri200/';
        Linking.openURL(url)
        // Linking.openURL(url)
    }
}
const styles = StyleSheet.create({
    container: {
        width: wp(55),
        borderRadius: wp(5),
        backgroundColor: theme.colors.white,
        // elevation: 2,
        overflow: 'hidden'
    },
    image: {
        width: wp(55),
        height: wp(75),
    },
    text: {
        flex: 1,
        fontSize: font16
        // alignSelf: 'center',
        // justifyContent: 'center',

    }
})
export { LiveListItem }