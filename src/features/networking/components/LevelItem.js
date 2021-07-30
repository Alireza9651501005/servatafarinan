import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText } from '../../../common/components';
import { colors } from '../../../common/constants/theme';
import { iranSansMedium } from '../../../utils/helper/commonVariables';

export default function LevelItem({item,index}) {

    const calculateColor = () => {
        let color = '#eee'
        if(index==0){
            color = "#1f7aaa"
        }else if(index==1){
            color = "#5588a3"
        }
        else if(index==2){
            color = "#639db7"
        }
        else if(index==3){
            color = "#79bcd3"
        }
        return color
    }
    return (
        <View style={[styles.container,{backgroundColor:calculateColor()}]}>
            <CustomText style={{ color: colors.textWhite, fontFamily: iranSansMedium }}>{item.label}</CustomText>
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