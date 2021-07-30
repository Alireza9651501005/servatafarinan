import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText } from '../../../common/components';
import { colors } from '../../../common/constants/theme';
import { iranSansMedium } from '../../../utils/helper/commonVariables';

export default function PeopleItem({ item, index }) {


    return (
        <View style={[styles.container]}>
            < CustomText style={
                {
                    color: colors.textBlue,
                    fontFamily: iranSansMedium,
                    borderBottomWidth: wp(.5),
                    borderColor: colors.borderGray
                }
            } > {item.persons} نفر </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(19.7),
        alignItems: 'center',
        justifyContent: 'center',

    }
})