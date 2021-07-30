import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomText } from '../../../common/components';
import { colors } from '../../../common/constants/theme';
import { iranSansMedium } from '../../../utils/helper/commonVariables';
import { fontSize16 } from '../../../utils/helper/responsiveSizes';
import { useSelector, useDispatch } from "react-redux";
import CToast from '../../../common/components/CToast';
import Clipboard from '@react-native-community/clipboard';
export default function ScoreItem({ item, index, ...props }) {
    const states = useSelector(state => state);
    let inviteCode = states.networkingReducer.networking.invite_code;
    return (
        <View style={styles.container}>
            < View style={styles.contentCircle} >
                <CustomText style={
                    {
                        color: colors.textBlue,
                        fontFamily: iranSansMedium,
                        fontSize: fontSize16
                    }
                } >{props.score}</CustomText>
            </View>
            <CustomText style={
                {
                    color: colors.textBlue,
                    fontFamily: iranSansMedium,
                    marginTop: 8
                }
            }>مجموع امتیازات شما</CustomText>
            <CustomText
                onPress={() =>{
                    Clipboard.setString(inviteCode)
                    CToast('کد معرف شما کپی شد','success')
                }}
                 style={
                    {
                        color: colors.textBlue,
                        fontFamily: iranSansMedium,
                        marginTop:hp(2)
                    }
                } >{inviteCode}: کد معرف شما</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentCircle: {
        width: wp(22),
        height: wp(22),
        borderRadius: wp(11),
        backgroundColor: colors.componentWhite,
        borderWidth: 7,
        borderColor: colors.borderBlue2,
        alignItems: 'center',
        justifyContent: 'center'
    }

})