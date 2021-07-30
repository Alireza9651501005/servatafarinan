import React from 'react';
import { useSelector } from 'react-redux'
import { Image, View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText, RatingStars } from '../../../common/components';
import { colors, sizes } from '../../../common/constants/theme';
import { fontSize12, fontSize14, fontSize16, fontSize20 } from '../../../utils/helper/responsiveSizes';
import { totalPointTxt } from '../../profile/texts';


export default function PublicProfileInfo({ profileData }) {
    return (
        <View style={{ padding: sizes.globalMargin, alignItems: 'center' }}>
            <View>
                <CustomText bold style={styles.userName}>{profileData.username}</CustomText>
            </View>
            <View>
                <CustomText style={styles.regDate}>تاریخ عضویت : {profileData.register_date}</CustomText>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <CustomText bold style={{ fontSize: fontSize20, color: colors.textWhite, top: 2 }}>{profileData.scores}</CustomText>
                <RatingStars type={'profile'} rate={profileData.stars} />
            </View>

            <View style={styles.scoresWrapper}>
                <View
                    style={styles.scoreItem}>
                    <CustomText style={styles.infoItemText}>{profileData.scientific_score}</CustomText>
                    <CustomText light style={styles.infoItemTitle}>علمی</CustomText>
                </View>

                <View style={styles.separator} />

                <View
                    style={styles.scoreItem}>
                    <CustomText style={styles.infoItemText}>{profileData.yearly_rank}</CustomText>
                    <CustomText light style={styles.infoItemTitle}>رتبه سالانه</CustomText>
                </View>

                <View style={styles.separator} />

                <View
                    style={styles.scoreItem}>
                    <CustomText style={styles.infoItemText}>{profileData.monthly_rank}</CustomText>
                    <CustomText light style={styles.infoItemTitle}>رتبه ماهانه</CustomText>
                </View>

                <View style={styles.separator} />

                <View
                    style={styles.scoreItem}>
                    <CustomText style={styles.infoItemText}>{profileData.network_score}</CustomText>
                    <CustomText light style={styles.infoItemTitle}>شبکه سازی</CustomText>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: hp(4),
        borderRightWidth: 1,
        borderColor: colors.componentWhite
    },
    infoItemText: {
        fontSize: fontSize20,
        color: colors.textWhite
    },
    infoItemTitle: {
        fontSize: fontSize12,
        color: colors.textWhite
    },
    userName: {
        color: colors.textWhite,
        fontSize: fontSize16,
        textAlign: 'center'
    },
    regDate: {
        color: colors.textWhite,
        fontSize: fontSize14,
        textAlign: 'center'
    },
    scoresWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(1)
    },
    scoreItem: {
        alignItems: 'center',
        flex: 1
    }
})