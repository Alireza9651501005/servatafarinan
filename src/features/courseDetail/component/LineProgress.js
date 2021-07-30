import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { CustomText } from '../../../common/components'
import { colors } from '../../../common/constants/theme'
import { fontSize12 } from '../../../utils/helper/responsiveSizes'

export default function LineProgress(props) {
    return (
        <View>
            <CustomText style={{ textAlign: 'right' ,fontSize:fontSize12 }}>{props.fromCount}/{props.toCount}</CustomText>
            <Progress.Bar
                width={wp(40)}
                height={wp(3)}
                borderRadius={8}
                color={colors.progressInvert}
                unfilledColor={colors.progress}
                borderWidth={0}
                // fill={white}
                // progress={1 - (props.percent/100)}
                progress={props.fromCount?1 - (props.fromCount/props.toCount):1}

            />
            <CustomText style={{textAlign:'center'}}>{props.title}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})