import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Image, View, StyleSheet } from 'react-native';
import * as NavigationService from '../../../utils/NavigationService'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText, RippleEffect } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize12, fontSize14, fontSize16, fontSize20 } from '../../../utils/helper/responsiveSizes';
import Ripple from 'react-native-material-ripple';
import { changeRankType } from '../../userLeaderBoard/actions/userLeaderBoardAction';
import { monthlyEnText, yearlyEnText } from '../../userLeaderBoard/texts';


export default function ProfileInfo(props) {
    const states = useSelector(state => state)
    const dispatch = useDispatch();
    const profileData = states.profileReducer.profileData;
    let yearlyRank, monthlyRank, networkScores, scientificScores;
    yearlyRank = states.profileReducer.yearlyRank;
    monthlyRank = states.profileReducer.monthlyRank;
    networkScores = states.profileReducer.networkScores;
    scientificScores = states.profileReducer.scientificScores;
    return (
        <View style={{ padding: sizes.globalMargin, alignItems: 'center' }}>
            <View>
                <CustomText onPress={() => props.changeUserName()} bold style={{ color: colors.textLightBlue2, fontSize: fontSize16, textAlign: 'center' }}>{profileData.username}</CustomText>
            </View>
            <View>
                <CustomText style={{ color: colors.textLightBlue2, fontSize: fontSize14, textAlign: 'center', opacity: .66 }}>تاریخ عضویت : {profileData.register_date}</CustomText>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp(1) }}>
                <RippleEffect
                    rippleOpacity={0}
                    onPress={() => {
                        NavigationService.navigate('userGainHistoryScreen')
                    }}
                    style={{ alignItems: 'center', flex: 1 }}>
                    <CustomText style={{ fontSize: fontSize20, color: colors.textWhite }}>{scientificScores}</CustomText>
                    <CustomText light style={{ fontSize: fontSize12, color: colors.textWhite }}>علمی</CustomText>
                </RippleEffect>
                <View style={styles.separator} />
                <RippleEffect
                    rippleOpacity={0}
                    onPress={() => {
                        dispatch(changeRankType(yearlyEnText, false))
                        NavigationService.navigate('UserLeaderBoardScreen')
                    }}
                    style={{ alignItems: 'center', flex: 1 }}>
                    <CustomText style={{ fontSize: fontSize20, color: colors.textWhite }}>{yearlyRank}</CustomText>
                    <CustomText light style={{ fontSize: fontSize12, color: colors.textWhite }}>رتبه سالانه</CustomText>
                </RippleEffect>
                <View style={styles.separator} />

                <RippleEffect
                    rippleOpacity={0}
                    onPress={() => {
                        dispatch(changeRankType(monthlyEnText, false))
                        NavigationService.navigate('UserLeaderBoardScreen')
                    }}
                    style={{ alignItems: 'center', flex: 1 }}>
                    <CustomText style={{ fontSize: fontSize20, color: colors.textWhite }}>{monthlyRank}</CustomText>
                    <CustomText light style={{ fontSize: fontSize12, color: colors.textWhite }}>رتبه ماهانه</CustomText>
                </RippleEffect>
                <View style={styles.separator} />

                <RippleEffect
                    rippleOpacity={0}
                    onPress={() => {
                        NavigationService.navigate('NetworkingScreen')
                    }}
                    style={{ alignItems: 'center', flex: 1 }}>
                    <CustomText style={{ fontSize: fontSize20, color: colors.textWhite }}>{networkScores}</CustomText>
                    <CustomText light style={{ fontSize: fontSize12, color: colors.textWhite }}>شبکه سازی</CustomText>
                </RippleEffect>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: hp(4),
        borderRightWidth: 1,
        borderColor: colors.componentWhite
    }
})