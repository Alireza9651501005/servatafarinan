import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText } from '../../../common/components';
import { colors } from '../../../common/constants/theme';
import { iranSansMedium } from '../../../utils/helper/commonVariables';
import { fontSize16 } from '../../../utils/helper/responsiveSizes';

export default function CircleItem({item,index}) {

    return (
        <View>
            < View style={styles.container} >
                <View style={styles.innerCircleBackground}>
                    < View style={styles.contentCircle} >
                        <CustomText style={
                            {
                                color: colors.textBlue,
                                fontFamily: iranSansMedium,
                                fontSize:fontSize16
                            }
                        } >{item.total_score}</CustomText>
                    </View>
                </View>

                <View style={styles.halfCircle} />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(16),
        height: wp(16),
        borderBottomEndRadius: wp(8),
        borderBottomStartRadius: wp(8),
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    halfCircle: {
        backgroundColor: colors.borderGray,
        width: wp(16),
        height: wp(8),
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomEndRadius: wp(7.9),
        borderBottomLeftRadius: wp(7.9),
    },
    innerCircleBackground: {
        width: wp(15.4),
        height: wp(15.4),
        borderRadius: wp(7.7),
        backgroundColor: colors.background,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentCircle: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        backgroundColor: colors.componentWhite,
        borderWidth: 5,
        borderColor: colors.borderBlue2,
        alignItems:'center',
        justifyContent:'center'
    }

})