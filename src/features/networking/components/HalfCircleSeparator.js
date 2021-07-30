import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../common/constants/theme';

export default function HalfCircleSeparator(props) {

    return (
        <View style={{justifyContent:'center'}}>
            < View style={styles.container} >
                <View style={styles.innerCircleBackground}>
                <Text style={{top:-4}} numberOfLines={1}>.....</Text>
                </View>

                <View style={styles.halfCircle} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(5),
        height: wp(5),
        borderBottomEndRadius: wp(2.5),
        borderBottomStartRadius: wp(2.5),
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    halfCircle: {
        backgroundColor: colors.borderGray,
        width: wp(5.6),
        height: wp(2.8),
        position: 'absolute',
        top: -wp(.3),
        left: -wp(.3),
        borderTopEndRadius: wp(2.8),
        borderTopStartRadius: wp(2.8),
    },
    innerCircleBackground: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(2.5),
        backgroundColor: colors.background,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1,borderColor:'red'
    }
})