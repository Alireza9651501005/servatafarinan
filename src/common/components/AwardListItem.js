import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '../constants'
import { CustomText } from '.'
import { font16 } from '../../utils/helper/responsiveSizes'
import Ripple from 'react-native-material-ripple'
import { Lable } from './Lable'
import { handleAction } from '../../utils/helper/functions'
import { useSelector, useDispatch } from "react-redux";
const AwardListItem = ({ item, actions, itemLayout }) => {
    const dispatch = useDispatch();
    const { image, title, label, action, height } = item.item;
    return (
        <View style={[styles.container, {}]}>
            <Ripple style={{ height: height, width: wp(90) }} rippleSize={.1} onPress={handleAction(action, dispatch)}>
                <View style={{ height: height, borderWidth: 0 }}>
                    <Image
                        style={[styles.image, { height: height }]}
                        source={{ uri: image }} />
                </View>
            </Ripple>
            <View style={styles.text}>
                <CustomText
                    style={{
                        width: wp(80),
                        // marginTop: hp(2),
                        marginBottom: hp(1),
                    }} 
                // numberOfLines={1}
                >
                    {title}
                </CustomText>
                {label ? <Lable  action={label.action} /> : null}
                {/* //here */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: wp(90),
        // borderRadius: wp(10),
        top: hp(2),
        borderRadius: theme.sizes.globalRadius,
        backgroundColor: theme.colors.white,

    },
    image: {
        resizeMode: 'contain',
        bottom: hp(2),
        borderTopLeftRadius: theme.sizes.globalRadius,
        borderTopRightRadius: theme.sizes.globalRadius,
    },
    text: {
        flex: 1,
        fontSize: font16,
        alignSelf: 'center',
        borderWidth: 0,
        bottom: hp(1),
    }
})
export { AwardListItem }