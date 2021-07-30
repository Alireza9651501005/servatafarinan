import React, { Component, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import Icon from 'react-native-vector-icons//FontAwesome'
import ProgressBar from 'react-native-progress/Bar';
import { fontSize100, fontSize120, h10, h20, h40, h50, h60, toolbarH } from "../../../utils/helper/Global";
import * as NavigationService from '../../../utils/NavigationService';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation';
import { CustomText } from '../../../common/components';
import PlayerSlider from './PlayerSlider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fontSize16 } from '../../../utils/helper/responsiveSizes';
import SeekBar from './SeekBar';

const activeTint = '#d4d4d4';
const inputBorderColor = '#333'
const defaultString = {
    activeColor: '#d4d4d4',
    deactiveColor: '#333',
    thumbColor: '#fff'
}

function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
]);

const PlayButton = ({ iconName, onPress, isPlay = false, color = '#fff', size = fontSize100 }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={.5}
            style={{
                // padding: h10, 
                // marginRight: h10,
                justifyContent: 'center', alignItems: 'center'
            }}>
            {/* <Icon name={iconName} size={size} color={color} />
             */}
            <Image
                style={{ width: hp(5), height: hp(5), resizeMode: 'contain' }}
                source={isPlay ? require('../../../assets/video/pause.png') : require('../../../assets/video/play.png')}
            />
        </TouchableOpacity>
    )
};

export const Controller = ({
    // isControllerUp,
    onValueChange,
    onSlidingComplete,
    onSlidingStart,
    paused,
    onEnd, onPlayPress,
    duration,
    currentTime,
    playableDuration,
    setVolume,
    player,
    volume,
    lessonName,
    courseTitle
}) => {
    const [isControllerUp, setisControllerUp] = useState(false);
    const [thumbIcon, setThumbIcon] = useState()
    duration = Math.round(duration);
    let pos = currentTime
    currentTime = Math.round(currentTime);
    const elapsed = minutesAndSeconds(currentTime);
    const totalTime = minutesAndSeconds(duration);
    useEffect(() => {
        Icon.getImageSource('circle', wp(4), defaultString.thumbColor).then(source => setThumbIcon(source))
        setTimeout(() => {
            if (isControllerUp) {
                setisControllerUp(false)
            }
        }, 10000);
    }, [isControllerUp])
    // handleProgressVolume = (e) => {
    //     const position = e.nativeEvent.locationX;
    //     const progress = (position / hp(18));
    //     setVolume(progress)
    // }

    return (
        <View style={{ position: 'absolute', width: hp(100), height: wp(100) }}>
            <View
                style={{ height: wp(15), backgroundColor: '#000', display: isControllerUp ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={
                        () => {
                            Orientation.lockToPortrait();
                            NavigationService.goBack()
                        }
                    }
                    style={{ width: hp(10), alignItems: 'center' }}>
                    <Image
                        style={{ width: wp(7), height: wp(7), resizeMode: 'contain' }}
                        source={require('../../../assets/video/back.png')}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <CustomText style={{ color: '#fff' }}>{courseTitle}</CustomText>
                </View>

                <View style={{ width: hp(10) }} />
            </View>
            <Pressable onPress={() => { setisControllerUp(!isControllerUp) }} style={{ flex: 1, justifyContent: 'space-between' }}>
            </Pressable>

            <View style={[styles.bottomControlContainer, { display: isControllerUp ? 'flex' : 'none', position: 'relative' }]}>
                < View style={styles.seekBarWrapper} >

                    <SeekBar
                        // onSeek={(data) => player.seek(data)}
                        onSeek={onSlidingComplete}
                        trackLength={duration}
                        currentPosition={pos}
                        onSlidingStart={onSlidingStart}
                        onSlidingComplete={onSlidingComplete}
                        show={isControllerUp}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    paddingRight: 16,
                    paddingLeft: 16,
                    borderColor: '#fff',
                    justifyContent: 'space-between'
                }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 15 }}>
                            <PlayButton
                                onPress={onPlayPress}
                                isPlay={paused ? false : true}
                                size={fontSize120}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => player.seek(currentTime - 10)}
                            style={{ marginRight: 10 }}>
                            <Image
                                style={{ width: hp(5), height: hp(5), resizeMode: 'contain' }}
                                source={require('../../../assets/video/backward.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => player.seek(currentTime + 10)}
                            style={{ marginRight: 15 }}>
                            <Image
                                style={{ width: hp(5), height: hp(5), resizeMode: 'contain' }}
                                source={require('../../../assets/video/forward.png')}
                            />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginRight: 5 }}>
                            <Image
                                style={{ width: hp(4), height: hp(4), resizeMode: 'contain' }}
                                source={require('../../../assets/video/volume.png')}
                            />
                        </View>

                        {/* volume progress */}
                        <View>
                            {isControllerUp ?
                                <Slider
                                    style={{ width: hp(20) }}
                                    maximumValue={100}
                                    // onSlidingStart={onSlidingStart}
                                    onSlidingComplete={(data) => setVolume(data / 100)}
                                    value={volume * 100}
                                    minimumTrackTintColor={defaultString.activeColor}
                                    maximumTrackTintColor={defaultString.deactiveColor}
                                    // thumbTintColor={defaultString.thumbColor}
                                    // thumbImage={'../../../assets/video/seekthumb.png'}
                                    thumbImage={thumbIcon}
                                />
                                :
                                null
                            }

                        </View>
                    </View>

                    <View>
                        {/* time duration */}
                        <View style={{ flexDirection: 'row' }}>
                            <CustomText style={movieS.textTimeS}>
                                {elapsed[0] + ":" + elapsed[1]}
                            </CustomText>
                            <CustomText style={movieS.textTimeS}>
                                {duration > 1 && " / " + totalTime[0] + ":" + totalTime[1]}
                            </CustomText>
                        </View>
                    </View>

                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        width: '100%', height: wp(30)
    },
    wrapper: {
        height: '100%', width: '100%',
        // flexDirection: 'row',
        padding: h10, paddingRight: h40, paddingLeft: h20,
        backgroundColor: 'rgba(0,0,0,.9)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    seekBarWrapper: {
        width: '100%',
        // borderWidth: 1,
        borderColor: '#fff'
    },
    bottomControlContainer: {
        position: 'absolute',
        bottom: 0,
        width: hp(100),
        // height: wp(18),
        // paddingRight: wp(5),
        // paddingLeft: wp(5),
        paddingBottom: wp(3),
        paddingTop: 3,
        backgroundColor: '#000',
        opacity: 0.9,
    }
})

export const movieS = StyleSheet.create({
    textTimeS: {
        color: 'white',
        textAlign: 'center',
        fontSize: fontSize16,
    },
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: 'red'
    },
    thumb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
});



export const TopController = ({ onBackPress, volume, onMutePress, isControllerUp }) => {
    return (
        <View
            style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                width: '100%', minHeight: toolbarH / 2
            }}>
            <View style={{
                height: '100%', width: '100%',
                flexDirection: 'row',
                padding: h10, paddingRight: h60, paddingLeft: h60,
                //backgroundColor: 'rgba(0,0,0,.4)',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                display: isControllerUp ? 'flex' : 'none'
            }}>

                <PlayButton
                    onPress={onBackPress}
                    iconName='ios-arrow-back'
                />

                <View style={{ flex: 1 }} />
                <PlayButton
                    onPress={onMutePress}
                    iconName={'ios-volume-off'}
                    color={volume === 1 ? '#999' : '#fff'}
                />

            </View>
        </View>
    )
};

