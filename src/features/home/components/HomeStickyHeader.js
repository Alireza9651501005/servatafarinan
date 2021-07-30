import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Pressable, DeviceEventEmitter, BackHandler, Platform,TouchableOpacity } from 'react-native';
import {
    useFocusEffect,
} from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'
import { CustomText, RatingStars, RippleEffect } from '../../../common/components';
import { theme } from '../../../common/constants';
import { font16, fontSize16 } from '../../../utils/helper/responsiveSizes';
import { changeRankType } from '../../userLeaderBoard/actions/userLeaderBoardAction';
import { monthlyEnText, yearlyEnText } from '../../userLeaderBoard/texts';
import * as NavigationService from '../../../utils/NavigationService'
import { useSelector, useDispatch } from 'react-redux'
import ScoreButton from './ScoreButton';
import RankingButton from './RaninkgButton';

import { montlyRankGuidDescription, montlyRankGuidTitle, networkingGuidDescription, networkingGuidTitle, scientificGuidDescription, scientificGuidTitle, yearlyRankGuidDescription, yearlyRankGuidTitle } from '../texts';
import { changeHomeAppTour } from '../../../store/globalActions';
import { store } from '../../../store/store';
const HomeStickyHeader = ({ userInfo, navigation }) => {
    const states = useSelector(state => state);
    const [showView, setShowView] = useState(true)
    let profileReducerV, yearlyRank, monthlyRank, appTourTargets, sequenceStepListener, finishSequenceListener, currentRouteName, homeAppTour, accessToken;
    accessToken = states.globalReducer.accessToken;
    profileReducerV = states.profileReducer;
    yearlyRank = profileReducerV.yearlyRank;
    monthlyRank = profileReducerV.monthlyRank;
    appTourTargets = []
    sequenceStepListener = null
    finishSequenceListener = null
    currentRouteName = states.globalReducer.currentRouteName
    homeAppTour = states.globalReducer.homeAppTour
    const dispatch = useDispatch();


    // useEffect(() => {

    //     registerSequenceStepEvent()
    //     registerFinishSequenceEvent()
    //     setTimeout(() => {
    //         if (currentRouteName === 'Home') {
    //             showTour()
    //         }
    //     }, 20);


    // }, [])
    // const registerSequenceStepEvent = () => {
    //     if (sequenceStepListener) {
    //         sequenceStepListener.remove()
    //     }
    //     sequenceStepListener = DeviceEventEmitter.addListener(
    //         'onShowSequenceStepEvent',
    //         (e) => {
    //             //console.log(e)
    //         }
    //     )
    // };

    // const registerFinishSequenceEvent = () => {
    //     if (finishSequenceListener) {
    //         finishSequenceListener.remove()
    //     }
    //     finishSequenceListener = DeviceEventEmitter.addListener(
    //         'onFinishSequenceEvent',
    //         (e) => {
    //             //console.log(e)
    //             dispatch(changeHomeAppTour(false))
    //         }
    //     )
    // };

    // const showTour = () => {
    //     if (homeAppTour) {
    //         let appTourSequence = new AppTourSequence()
    //         appTourTargets.forEach(appTourTarget => {
    //             appTourSequence.add(appTourTarget)
    //         })
    //         AppTour.ShowSequence(appTourSequence)

    //     }
    // }





    //console.log('states', states.profileReducer);
    // profileReducerV = states.profileReducer;
    // yearlyRank = profileReducerV.yearlyRank;
    // monthlyRank = profileReducerV.monthlyRank;
    // networkScores = profileReducerV.networkScores;
    // scientificScores = profileReducerV.scientificScores;
    // starCount = profileReducerV.starCount;
    // profileData = profileReducerV.profileData;
    if (accessToken) {
        return (
            <View style={Platform.OS==='ios'?styles.containerIos: styles.container}>
                {accessToken ?
                    <View style={styles.row4}>
                        <TouchableOpacity
                            activeOpacity={1}
                            // onPress={() => {
                            //     dispatch(changeRankType(yearlyEnText))
                            //     NavigationService.navigate('UserLeaderBoardScreen')
                            // }}
                            onPress={() => {
                                dispatch(changeRankType(yearlyEnText))
                                NavigationService.navigate('UserLeaderBoardScreen')
                            }}
                        >
                            <RankingButton
                             onPress={() => {
                                dispatch(changeRankType(yearlyEnText))
                                NavigationService.navigate('UserLeaderBoardScreen')
                            }}
                                key={'Yearly Rank'}
                                rank={yearlyRank}
                                addAppTourTarget={appTourTarget => {
                                    appTourTargets.push(appTourTarget)

                                }}
                                direction={'right'}
                                title={'رتبه سالانه'}
                                tourProps={{
                                    order: 3,
                                    title: yearlyRankGuidTitle,
                                    description: yearlyRankGuidDescription,
                                    outerCircleColor: '#3f52ae',
                                    // cancelable: false,
                                    descriptionTextSize: 14

                                }}
                            />
                        </TouchableOpacity>

                        <View style={styles.row4Separator} />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                dispatch(changeRankType(yearlyEnText))
                                NavigationService.navigate('UserLeaderBoardScreen')
                            }}
                        >
                            <RankingButton
                                key={'Monthly Rank'}
                                onPress={() => {
                                    dispatch(changeRankType(monthlyEnText))
                                    NavigationService.navigate('UserLeaderBoardScreen')
                                }}
                                rank={monthlyRank}
                                addAppTourTarget={appTourTarget => {
                                    appTourTargets.push(appTourTarget)

                                }}
                                direction={'left'}
                                title={'رتبه ماهانه'}
                                tourProps={{
                                    order: 4,
                                    title: montlyRankGuidTitle,
                                    description: montlyRankGuidDescription,
                                    outerCircleColor: '#3f52ae',
                                    // cancelable: false,
                                    descriptionTextSize: 14

                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    : null}

                {/* <Pressable
                    onPress={() => { alert() }}
                    // onPress={() => { setShowView(!showView) }}
                    style={{ zIndex: 5, position: 'absolute', alignSelf: 'center', bottom: hp(-2) }}>
                    <Image
                        style={[{ width: wp(8), height: wp(8) }, !showView && { transform: [{ rotate: '180deg' }] }]}
                        source={require('../../../assets/arrow-up.png')}
                    />
                </Pressable> */}
            </View>
        )
    } else {
        return (null)
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: wp(5),
        backgroundColor: theme.colors.darkBlue,
        borderBottomEndRadius: wp(5),
        borderBottomStartRadius: wp(5),
        // marginBottom: wp(4),
        backgroundColor: theme.colors.darkBlue,
        width: wp(100),
        height: hp(8.7),
        // borderWidth:1,
        // backgroundColor:'red',
        bottom: hp(1.8),

    },
    containerIos: {
        alignItems: 'center',
        padding: wp(5),
        backgroundColor: theme.colors.black,
        borderBottomEndRadius: wp(5),
        borderBottomStartRadius: wp(5),
        // marginBottom: wp(4),
        backgroundColor: theme.colors.darkBlue,
        width: wp(100),
        height: hp(9),
        // borderWidth:1,
        // backgroundColor:'red',
        // bottom: hp(-1.5),
        top: hp(22),
        zIndex:2,
        position:'absolute'
        // borderBottomLeftRadius:wp(2),
        // borderBottomRightRadius:wp(2)

    },
    row4: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        // borderWidth:1,
        // borderColor:'white',
        bottom: hp(-.8),
        zIndex: 99
    },
    row4Separator: {
        borderRightWidth: 2,
        borderColor: theme.colors.lightBlue,
        height: hp(2),
        margin: 5
    }
})

export default HomeStickyHeader;