import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { CustomText } from '../../../common/components'
import { colors, white } from '../../../common/constants/theme'
import { fontSize10, fontSize12, fontSize16, fontSizeXL } from '../../../utils/helper/responsiveSizes'

export default function CircularProgress(props) {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ borderRadius: wp(19), backgroundColor: colors.componentWhite2 }}>
                <Progress.Circle
                    size={wp(38)}
                    thickness={wp(1.5)}
                    color={colors.progress}
                    unfilledColor={colors.progressInvert}
                    borderWidth={0}
                    // fill={white}
                    progress={props.percent?props.percent / 100:0} />
            </View>

            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: wp(38), height: wp(38), }}>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText style={{ fontSize: fontSizeXL, top: 10 }}>{props.percent}</CustomText>
                        <CustomText style={{ fontSize: fontSizeXL + 5, top: 10 }}>%</CustomText>
                    </View>

                </View>

                <View style={{ width: wp(30), height: wp(0.5), backgroundColor: colors.progressInvert }} />

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CustomText style={{ fontSize: fontSizeXL, includeFontPadding: false, top: -3 }}>{props.doneCount}</CustomText>
                        <CustomText style={{ fontSize: fontSize16 }}>/</CustomText>
                        <CustomText style={{ fontSize: fontSize16 }}>{props.totalCount}</CustomText>
                    </View>
                    <CustomText style={{ fontSize: fontSize10 + 1, top: -hp(2) }}>{props.title}</CustomText>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})