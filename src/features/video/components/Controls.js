import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fontSize16 } from '../../../utils/helper/responsiveSizes';
import { CustomText } from '../../../common/components';
import { fontSize100, fontSize120, h10, h20, h40, h50, h60, toolbarH } from "../../../utils/helper/Global";
import { minutesAndSeconds } from '../../../utils/helper/functions';


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

export default class Controls extends Component {

    handleProgressPress = (e) => {
        const position = e.nativeEvent.locationX;
        const progress = (position / hp(94)) * this.props.duration;
        this.props.player.seek(progress)
    }

    handleProgressVolume = (e) => {
        const position = e.nativeEvent.locationX;
        const progress = (position / hp(18));
        this.props.setVolume(progress)
    }

    render() {
        const { isControllerUp, onPlayPress, paused, position, duration, currentTime, progress, player, volume } = this.props
        let durations = Math.round(duration);
        const elapsed = minutesAndSeconds(currentTime);
        const totalTime = minutesAndSeconds(durations);
        console.log('=====>', player)
        // let progress = currentTime/durations
        return (
            <View style={[movieS.bottomContainer, { display: isControllerUp ? 'flex' : 'none' }]}>
                < View style={movieS.progressContainer} >
                    <TouchableWithoutFeedback onPress={this.handleProgressPress}>
                        <View>
                            <ProgressBar
                                progress={progress}
                                color="#d4d4d4"
                                unfilledColor="#333"
                                borderColor="#000"
                                width={hp(94)}
                                height={8}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
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


                        <TouchableWithoutFeedback
                            onPress={this.handleProgressVolume}
                        >
                            <View>
                                <ProgressBar
                                    progress={volume}
                                    color="#d4d4d4"
                                    unfilledColor="#333"
                                    borderColor="#000"
                                    width={hp(18)}
                                    height={5}
                                />
                            </View>
                        </TouchableWithoutFeedback>


                    </View>

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomText style={movieS.textTimeS}>
                                {elapsed[0] + ":" + elapsed[1]}
                            </CustomText>
                            <CustomText style={movieS.textTimeS}>
                                {durations > 1 && " / " + totalTime[0] + ":" + totalTime[1]}
                            </CustomText>
                        </View>
                    </View>

                </View>

            </View>
        )
    }
}

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
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: hp(100),
        // height: wp(18),
        paddingRight: hp(3),
        paddingLeft: hp(3),
        paddingBottom: wp(3),
        paddingTop: 3,
        backgroundColor: '#000',
        opacity: 0.9,
    },
    progressContainer: {
        width: '100%',
        // borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 10
    }
});
