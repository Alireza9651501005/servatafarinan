import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomText, RatingStars, RippleEffect } from '../../../common/components';
import { theme } from '../../../common/constants';
import { font16, fontSize16 } from '../../../utils/helper/responsiveSizes';
import { changeRankType } from '../../userLeaderBoard/actions/userLeaderBoardAction';
import { monthlyEnText, yearlyEnText } from '../../userLeaderBoard/texts';
import * as NavigationService from '../../../utils/NavigationService'
import { useSelector, useDispatch } from 'react-redux'
const UserInfo = ({ userInfo }) => {
    let info = userInfo.info, profileData;
    const [showView, setShowView] = useState(true)
    const dispatch = useDispatch();
    const states = useSelector(state => state);
    profileData = states.profileReducer.profileData;
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {showView ?
                <View style={styles.container}>
                    <View style={styles.row1}>
            <CustomText style={{ color: theme.colors.white }}>{info.title.replace("@username", profileData.username)}</CustomText>
                    </View>

                    <View style={styles.row2}>
                        <RippleEffect 
                        onPress={() => NavigationService.navigate('NetworkingScreen')}
                        style={styles.row2Right}>
                            <CustomText style={{ color: theme.colors.lightBlue, fontSize: font16 }}>{info.network_score}</CustomText>
                            <CustomText style={{ color: theme.colors.white }}>شبکه سازی</CustomText>
                        </RippleEffect>

                        <View style={styles.row2Center}>
                            <RippleEffect rippleSize={hp(.1)} onPress={() => NavigationService.navigate('ProfileScreen')} style={styles.profileImageWrapper}>
                                <Image
                                    source={ profileData ? { uri: profileData.image } : require('../../../assets/profile.png')}
                                    style={styles.profileImage}
                                />
                            </RippleEffect>
                        </View>

                        <View style={styles.row2Left}>

                            <RippleEffect rippleSize={hp(.1)} style={{ alignItems: 'center' }} onPress={() => NavigationService.navigate('userGainHistoryScreen')}>
                                <CustomText style={{ color: theme.colors.lightBlue, fontSize: font16 }}>{info.scientific_score}</CustomText>
                                <CustomText style={{ color: theme.colors.white }}>مهارت علمی</CustomText>
                            </RippleEffect>
                        </View>
                    </View>

                    <View style={styles.row3}>
                        <RatingStars type={'profile'} rate={5} />
                    </View>

                    <View style={styles.row4}>
                        <RippleEffect
                        rippleSize={hp(.1)}
                            onPress={() => {
                                dispatch(changeRankType(yearlyEnText))
                                NavigationService.navigate('UserLeaderBoardScreen')
                            }}
                            style={{ flexDirection: 'row-reverse' }}>
                            <CustomText style={{ marginLeft: 5, color: theme.colors.white }}>رتبه سالانه</CustomText>
                            <CustomText style={{ color: theme.colors.yellow, fontSize: font16 }}>{info.yearly_rank}</CustomText>
                        </RippleEffect>
                        <View style={styles.row4Separator} />
                        <RippleEffect
                        rippleSize={hp(.1)}
                            onPress={() => {
                                dispatch(changeRankType(monthlyEnText))
                                NavigationService.navigate('UserLeaderBoardScreen')
                            }}
                            style={{ flexDirection: 'row-reverse' }}>
                            <CustomText style={{ color: theme.colors.yellow, fontSize: font16 }}>{info.monthly_rank}</CustomText>
                            <CustomText style={{ marginRight: 5, color: theme.colors.white }}>رتبه ماهانه</CustomText>
                        </RippleEffect> 
                    </View>

                </View>
                :
                <View style={styles.container}>
                    <View >
                    <CustomText style={{ color: theme.colors.white }}>{info.title.replace("@username", profileData.username)}</CustomText>
                    </View>
                </View>
            }
            <Pressable
                onPress={() => { setShowView(!showView) }}
                style={{ zIndex: 5, position: 'absolute', alignSelf: 'center', bottom: 0 }}>
                <Image
                    style={[{ width: wp(8), height: wp(8) }, !showView && { transform: [{ rotate: '180deg' }] }]}
                    source={require('../../../assets/arrow-up.png')}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: wp(5),
        backgroundColor: theme.colors.darkBlue,
        borderBottomEndRadius: wp(5),
        borderBottomStartRadius: wp(5),
        marginBottom: wp(4)
    },
    row1: {
        marginBottom: hp(2)
    },
    row2: {
        width: wp(80),
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    row3: {
        marginTop: hp(2),
        marginBottom: hp(1)
    },
    row4: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    profileImage: {
        width: wp(20),
        height: wp(20),
        resizeMode: 'cover',
        borderRadius: wp(3),
    },
    profileImageWrapper: {
        padding: 5,
        backgroundColor: theme.colors.blue,
        // borderRadius:wp(5),
        // overflow:'hidden'
    },
    row2Right: {
        alignItems: 'center',
        // flex:2
    },
    row2Center: {
        // flex:1,
        borderRadius: wp(5),
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: theme.colors.lightBlue
    },
    row2Left: {
        alignItems: 'center',
        // flex:2

    },
    row4Separator: {
        borderRightWidth: 2,
        borderColor: theme.colors.lightBlue,
        height: hp(2),
        margin: 5
    }
})

export default UserInfo;